# BES – Best Engineering Services Web Application

A modern, responsive doorstep service-booking web platform for **BES – Best Engineering Services**.

## Business Overview
- **Business Name**: BES – Best Engineering Services
- **Owner**: Shubham
- **Technicians**: Aman Jumde, Nehal Jumde
- **Core Services**: Professional Electrician Services & Home Appliance Repair

---

## Key Features

1. **Customer Service Booking Flow**:
   - **Step 1**: Select Service Type (Electrical vs Appliance) & fixture/appliance from complete catalog.
   - **Step 2**: Enter Customer details (Name, Phone, Email).
   - **Step 3**: Pick Preferred Date and Time Slot + Emergency toggle.
   - **Step 4**: Location Selection Engine:
     - 📍 **GPS Auto-Detect**: Geolocation browser API.
     - 🗺️ **Interactive Map**: OpenStreetMap / Leaflet draggable marker & click-to-pin.
     - 🏠 **Manual Address**: House/Flat, Street/Area, Landmark, City, State, PIN.
   - **Step 5**: Review Summary Card & **CONFIRM APPOINTMENT**.
   - **Step 6**: Unique Appointment ID generation (e.g. `BES-2026-0005`) & live tracking link.

2. **Owner Dashboard (Shubham)**:
   - Live KPI stats (Total, Today, Pending, In Progress, Completed, Cancelled).
   - Real-time Technician status tracking (Aman Jumde & Nehal Jumde).
   - 1-Click Technician assignment dropdown.
   - Status transitions (`Pending` → `Accepted` → `Assigned` → `On the Way` → `In Progress` → `Completed` / `Cancelled`).
   - Customer GPS location coordinates & Open Map directions link.
   - CSV Export of all bookings.

3. **Technician Dashboard (Aman Jumde & Nehal Jumde)**:
   - Dedicated technician portal with fast toggle between Aman and Nehal views.
   - Urgency & Emergency badges.
   - Click-to-call customer button (`tel:...`).
   - **📍 Navigate to Customer**: Direct link opening Google Maps GPS navigation with exact coordinates.
   - Job lifecycle buttons: **Accept Job**, **Reject Job**, **Start Job (On the Way / In Progress)**, **Complete Job**.

4. **Interactive Customer Live Tracker**:
   - Real-time progress timeline stepper.
   - Technician contact and verified credential badge.

5. **Brand Identity**:
   - High-resolution vector BES logo with brand color palette: Dark Blue (`#0F2C59`), Red (`#DC2626`), Yellow (`#F59E0B`), and Pure White (`#FFFFFF`).

---

## Running the Application

To run the local server:
```bash
# In PowerShell:
& "C:\Users\HP\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
```
Then open `http://localhost:3000` in your web browser.

---

## Backend Architecture
- **Framework**: Python 3 + FastAPI
- **ORM**: SQLAlchemy
- **Supported Databases**: PostgreSQL, MySQL, SQLite
- **Path**: `backend/` (`main.py`, `models.py`, `schemas.py`, `database.py`)
