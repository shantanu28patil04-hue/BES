# Pydantic Schemas for Request/Response validation in FastAPI
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AppointmentCreate(BaseModel):
    customer_name: str = Field(..., example="Aman Sharma")
    mobile_number: str = Field(..., example="+91 98111 22334")
    email: Optional[str] = Field(None, example="aman.sharma@example.com")
    service_type: str = Field(..., example="Appliance")
    appliance_type: str = Field(..., example="Air Conditioner")
    problem_description: str = Field(..., example="AC not cooling and dripping water.")
    appointment_date: str = Field(..., example="2026-08-21")
    appointment_time: str = Field(..., example="10:00 AM - 12:00 PM")
    emergency: bool = Field(False, example=False)
    latitude: Optional[float] = Field(None, example=28.6139)
    longitude: Optional[float] = Field(None, example=77.2090)
    address: str = Field(..., example="Flat 402, Royal Palms Residency")
    landmark: Optional[str] = Field(None, example="Near City Metro Gate 3")
    city: str = Field("New Delhi", example="New Delhi")
    state: str = Field("Delhi", example="Delhi")
    pincode: str = Field("110001", example="110001")

class AppointmentAssign(BaseModel):
    assigned_worker: str = Field(..., example="Aman Jumde") # 'Aman Jumde' | 'Nehal Jumde'

class AppointmentStatusUpdate(BaseModel):
    status: str = Field(..., example="On the Way") # 'Pending' | 'Accepted' | 'Assigned' | 'On the Way' | 'In Progress' | 'Completed' | 'Cancelled'

class AppointmentResponse(BaseModel):
    appointment_id: str
    customer_name: str
    mobile_number: str
    email: Optional[str]
    service_type: str
    appliance_type: str
    problem_description: str
    appointment_date: str
    appointment_time: str
    emergency: bool
    latitude: Optional[float]
    longitude: Optional[float]
    address: str
    landmark: Optional[str]
    city: str
    state: str
    pincode: str
    assigned_worker: Optional[str]
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
