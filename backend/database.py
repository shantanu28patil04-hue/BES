# Database Configuration (PostgreSQL / MySQL / SQLite support)
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# By default, use SQLite for local testing or set DATABASE_URL for Postgres/MySQL
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "sqlite:///./bes_engineering.db"
    # For PostgreSQL: "postgresql://user:password@localhost:5432/bes_db"
    # For MySQL: "mysql+pymysql://user:password@localhost:3306/bes_db"
)

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_size=10)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
