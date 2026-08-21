# SQLAlchemy Models for BES – Best Engineering Services
from sqlalchemy import Column, String, Float, Boolean, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Appointment(Base):
    """
    Appointment Table matching the BES Schema:
    - appointment_id
    - customer_name
    - mobile_number
    - email
    - service_type
    - appliance_type
    - problem_description
    - appointment_date
    - appointment_time
    - latitude
    - longitude
    - address
    - landmark
    - city
    - state
    - pincode
    - assigned_worker
    - status
    - created_at
    """
    __tablename__ = "appointments"

    appointment_id = Column(String(50), primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    mobile_number = Column(String(20), nullable=False, index=True)
    email = Column(String(100), nullable=True)
    
    service_type = Column(String(50), nullable=False) # 'Electrical' | 'Appliance'
    appliance_type = Column(String(100), nullable=False)
    problem_description = Column(Text, nullable=False)
    
    appointment_date = Column(String(20), nullable=False, index=True)
    appointment_time = Column(String(50), nullable=False)
    emergency = Column(Boolean, default=False)
    
    # Location coordinates & address
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(String(255), nullable=False)
    landmark = Column(String(150), nullable=True)
    city = Column(String(100), default="New Delhi")
    state = Column(String(100), default="Delhi")
    pincode = Column(String(20), nullable=False)
    
    # Technician Assignment & Status
    # Workers: 'Aman Jumde' | 'Nehal Jumde' | None
    assigned_worker = Column(String(100), nullable=True, index=True)
    
    # Status: 'Pending' -> 'Accepted' -> 'Assigned' -> 'On the Way' -> 'In Progress' -> 'Completed' | 'Cancelled'
    status = Column(String(50), default="Pending", index=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
