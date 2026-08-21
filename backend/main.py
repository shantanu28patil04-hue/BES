# FastAPI Application for BES – Best Engineering Services
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
from datetime import datetime

from .database import get_db, init_db
from .models import Appointment
from .schemas import AppointmentCreate, AppointmentAssign, AppointmentStatusUpdate, AppointmentResponse

app = FastAPI(
    title="BES – Best Engineering Services API",
    description="Backend API for Electrician & Home Appliance Repair Booking Platform",
    version="1.0.0"
)

# CORS middleware for seamless frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {
        "service": "BES – Best Engineering Services",
        "owner": "Shubham",
        "technicians": ["Aman Jumde", "Nehal Jumde"],
        "status": "Operational",
        "docs": "/docs"
    }

# 1. Create Appointment
@app.post("/api/appointments", response_model=AppointmentResponse, status_code=201)
def create_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    # Generate unique ID: BES-2026-XXXX
    count = db.query(Appointment).count() + 1
    appointment_id = f"BES-2026-{count:04d}"

    new_app = Appointment(
        appointment_id=appointment_id,
        customer_name=payload.customer_name,
        mobile_number=payload.mobile_number,
        email=payload.email,
        service_type=payload.service_type,
        appliance_type=payload.appliance_type,
        problem_description=payload.problem_description,
        appointment_date=payload.appointment_date,
        appointment_time=payload.appointment_time,
        emergency=payload.emergency,
        latitude=payload.latitude,
        longitude=payload.longitude,
        address=payload.address,
        landmark=payload.landmark,
        city=payload.city,
        state=payload.state,
        pincode=payload.pincode,
        assigned_worker=None,
        status="Pending",
        created_at=datetime.utcnow()
    )

    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

# 2. Get All Appointments (with filters for Owner Dashboard)
@app.get("/api/appointments", response_model=List[AppointmentResponse])
def list_appointments(
    status: Optional[str] = Query(None),
    worker: Optional[str] = Query(None),
    date: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Appointment).order_by(Appointment.created_at.desc())
    if status:
        query = query.filter(Appointment.status == status)
    if worker:
        if worker == "unassigned":
            query = query.filter(Appointment.assigned_worker == None)
        else:
            query = query.filter(Appointment.assigned_worker == worker)
    if date:
        query = query.filter(Appointment.appointment_date == date)
    return query.all()

# 3. Get Single Appointment
@app.get("/api/appointments/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: str, db: Session = Depends(get_db)):
    app_obj = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
    if not app_obj:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return app_obj

# 4. Assign Technician (Owner Action)
@app.patch("/api/appointments/{appointment_id}/assign", response_model=AppointmentResponse)
def assign_technician(appointment_id: str, payload: AppointmentAssign, db: Session = Depends(get_db)):
    app_obj = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
    if not app_obj:
        raise HTTPException(status_code=404, detail="Appointment not found")

    app_obj.assigned_worker = payload.assigned_worker
    if app_obj.status == "Pending":
        app_obj.status = "Assigned"

    db.commit()
    db.refresh(app_obj)
    return app_obj

# 5. Update Appointment Status (Technician or Owner Action)
@app.patch("/api/appointments/{appointment_id}/status", response_model=AppointmentResponse)
def update_status(appointment_id: str, payload: AppointmentStatusUpdate, db: Session = Depends(get_db)):
    app_obj = db.query(Appointment).filter(Appointment.appointment_id == appointment_id).first()
    if not app_obj:
        raise HTTPException(status_code=404, detail="Appointment not found")

    valid_statuses = ["Pending", "Accepted", "Assigned", "On the Way", "In Progress", "Completed", "Cancelled"]
    if payload.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")

    app_obj.status = payload.status
    db.commit()
    db.refresh(app_obj)
    return app_obj

# 6. Technician Assigned Jobs Queue
@app.get("/api/technicians/{worker_name}/jobs", response_model=List[AppointmentResponse])
def get_technician_jobs(worker_name: str, db: Session = Depends(get_db)):
    jobs = db.query(Appointment).filter(
        Appointment.assigned_worker == worker_name
    ).order_by(Appointment.created_at.desc()).all()
    return jobs

# 7. Owner KPI Stats
@app.get("/api/dashboard/stats")
def get_owner_stats(db: Session = Depends(get_db)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    total = db.query(Appointment).count()
    today_count = db.query(Appointment).filter(Appointment.appointment_date == today_str).count()
    pending = db.query(Appointment).filter(Appointment.status == "Pending").count()
    in_progress = db.query(Appointment).filter(Appointment.status.in_(["On the Way", "In Progress"])).count()
    completed = db.query(Appointment).filter(Appointment.status == "Completed").count()
    cancelled = db.query(Appointment).filter(Appointment.status == "Cancelled").count()

    aman_jobs = db.query(Appointment).filter(Appointment.assigned_worker == "Aman Jumde", Appointment.status != "Completed").count()
    nehal_jobs = db.query(Appointment).filter(Appointment.assigned_worker == "Nehal Jumde", Appointment.status != "Completed").count()

    return {
        "owner": "Shubham",
        "total_appointments": total,
        "today_appointments": today_count,
        "pending_appointments": pending,
        "in_progress_jobs": in_progress,
        "completed_jobs": completed,
        "cancelled_jobs": cancelled,
        "technicians": {
            "Aman Jumde": {"active_jobs": aman_jobs, "status": "Available"},
            "Nehal Jumde": {"active_jobs": nehal_jobs, "status": "Available"}
        }
    }
