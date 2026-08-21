// BES Web Application Core Engine & Reactive State Store
import { INITIAL_APPOINTMENTS, BUSINESS_INFO } from './data/mockData.js';
import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderServices } from './components/Services.js';
import { renderHowItWorks } from './components/HowItWorks.js';
import { renderWhyChooseUs } from './components/WhyChooseUs.js';
import { renderAboutUs } from './components/AboutUs.js';
import { renderContactUs } from './components/ContactUs.js';
import { renderAppointmentModal } from './components/AppointmentModal.js';
import { renderLoginModal, renderLoginFormFields } from './components/LoginModal.js';
import { renderOwnerDashboard } from './components/OwnerDashboard.js';
import { renderTechnicianDashboard } from './components/TechnicianDashboard.js';
import { renderLiveTracker } from './components/LiveTracker.js';
import { renderFooter } from './components/Footer.js';
import { renderMobileBottomBar } from './components/MobileBottomBar.js';

class BESApp {
  constructor() {
    this.storageKey = 'bes_app_state_v1';
    this.mapInstance = null;
    this.mapMarker = null;

    // Load or initialize state
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.state = JSON.parse(saved);
      } catch (e) {
        this.state = this.getInitialState();
      }
    } else {
      this.state = this.getInitialState();
    }

    // Default runtime variables
    this.state.isBookingOpen = false;
    this.state.isLoginOpen = false;
    this.state.loginRole = 'customer';
    this.state.bookingStep = 1;
    this.state.locationOption = 'gps';
    this.state.servicesTab = 'all';
    this.state.servicesSearch = '';
    this.state.currentRole = this.state.currentRole || 'customer';
    this.state.currentTechWorker = this.state.currentTechWorker || 'Aman Jumde';
    this.state.currentUser = this.state.currentUser || null;

    this.init();
  }

  getInitialState() {
    return {
      currentRole: 'customer', // 'customer' | 'owner' | 'tech-aman' | 'tech-nehal' | 'tracker'
      currentTechWorker: 'Aman Jumde',
      techFilterTab: 'all',
      ownerFilterStatus: 'all',
      ownerFilterWorker: 'all',
      appointments: [...INITIAL_APPOINTMENTS],
      isBookingOpen: false,
      isLoginOpen: false,
      loginRole: 'customer',
      currentUser: null,
      bookingStep: 1,
      locationOption: 'gps',
      bookingForm: {
        service_type: 'Electrical',
        appliance_type: 'House Wiring',
        problem_description: '',
        customer_name: '',
        mobile_number: '',
        email: '',
        appointment_date: new Date().toISOString().split('T')[0],
        appointment_time: '10:00 AM - 12:00 PM',
        emergency: false,
        latitude: 28.6139,
        longitude: 77.2090,
        address: '',
        landmark: '',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      latestAppointment: null,
      trackerSearchId: 'BES-2026-0001'
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        currentRole: this.state.currentRole,
        currentTechWorker: this.state.currentTechWorker,
        appointments: this.state.appointments,
        trackerSearchId: this.state.trackerSearchId,
        latestAppointment: this.state.latestAppointment,
        currentUser: this.state.currentUser
      }));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-600 border-emerald-500 text-white',
      error: 'bg-rose-600 border-rose-500 text-white',
      info: 'bg-[#0F2C59] border-blue-500 text-white',
      warning: 'bg-amber-500 border-amber-400 text-slate-950'
    };

    toast.className = `fixed bottom-20 right-4 z-50 p-4 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-sm ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : '⚡'}</span>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let mainContentHtml = '';

    if (this.state.currentRole === 'customer') {
      mainContentHtml = `
        <main>
          ${renderHero()}
          ${renderServices(this.state.servicesTab, this.state.servicesSearch)}
          ${renderHowItWorks()}
          ${renderWhyChooseUs()}
          ${renderAboutUs()}
          ${renderContactUs()}
        </main>
      `;
    } else if (this.state.currentRole === 'owner') {
      mainContentHtml = `
        <main class="min-h-screen bg-slate-100/70 pb-20">
          ${renderOwnerDashboard(this.state)}
        </main>
      `;
    } else if (this.state.currentRole === 'tech-aman' || this.state.currentRole === 'tech-nehal') {
      mainContentHtml = `
        <main class="min-h-screen bg-slate-100/70 pb-20">
          ${renderTechnicianDashboard(this.state)}
        </main>
      `;
    } else if (this.state.currentRole === 'tracker') {
      mainContentHtml = `
        <main class="min-h-screen bg-slate-50 pb-20">
          ${renderLiveTracker(this.state)}
        </main>
      `;
    }

    appEl.innerHTML = `
      ${renderNavbar(this.state)}
      ${mainContentHtml}
      ${renderFooter()}
      ${renderMobileBottomBar()}
      ${renderAppointmentModal(this.state)}
      ${renderLoginModal(this.state)}
    `;

    // Re-initialize map if booking step 4 with 'map' tab is active
    if (this.state.isBookingOpen && this.state.bookingStep === 4 && this.state.locationOption === 'map') {
      setTimeout(() => this.initLeafletMap(), 100);
    }
  }

  initLeafletMap() {
    const container = document.getElementById('booking-map-container');
    if (!container || typeof L === 'undefined') return;

    const lat = this.state.bookingForm.latitude || 28.6139;
    const lng = this.state.bookingForm.longitude || 77.2090;

    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    this.mapInstance = L.map('booking-map-container').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapInstance);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="background:#DC2626; color:white; width:36px; height:36px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3); border:2px solid white;">
          <span style="transform:rotate(45deg); font-weight:bold; font-size:14px;">📍</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    });

    this.mapMarker = L.marker([lat, lng], {
      draggable: true,
      icon: customIcon
    }).addTo(this.mapInstance);

    this.mapMarker.bindPopup('<b>Customer Service Location</b><br>Drag pin or click map to move').openPopup();

    this.mapMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      this.updateCoordinates(pos.lat, pos.lng);
    });

    this.mapInstance.on('click', (e) => {
      this.mapMarker.setLatLng(e.latlng);
      this.updateCoordinates(e.latlng.lat, e.latlng.lng);
    });
  }

  updateCoordinates(lat, lng) {
    this.state.bookingForm.latitude = lat;
    this.state.bookingForm.longitude = lng;
    this.render();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      // Role Switcher Top Buttons
      const roleBtn = e.target.closest('.role-btn');
      if (roleBtn) {
        const role = roleBtn.dataset.role;
        this.setRole(role);
        return;
      }

      // Open Login Modal
      const loginBtn = e.target.closest('#btn-navbar-login, #btn-navbar-login-mobile, #btn-navbar-login-drawer');
      if (loginBtn) {
        this.state.isLoginOpen = true;
        this.state.loginRole = 'customer';
        this.render();
        return;
      }

      // Close Login Modal
      const closeLogin = e.target.closest('#close-login-modal');
      if (closeLogin) {
        this.state.isLoginOpen = false;
        this.render();
        return;
      }

      // Login Role Tab Switcher inside Modal
      const loginTab = e.target.closest('.login-role-tab-btn');
      if (loginTab) {
        const role = loginTab.dataset.loginRole;
        this.state.loginRole = role;
        document.querySelectorAll('.login-role-tab-btn').forEach(btn => {
          btn.classList.remove('bg-[#0F2C59]', 'text-white');
          btn.classList.add('text-slate-700');
        });
        loginTab.classList.add('bg-[#0F2C59]', 'text-white');
        loginTab.classList.remove('text-slate-700');
        
        const fields = document.getElementById('login-form-fields');
        if (fields) {
          fields.innerHTML = renderLoginFormFields(role);
        }
        return;
      }

      // Submit Login Action
      const loginSubmit = e.target.closest('#btn-login-submit');
      if (loginSubmit) {
        this.handleAuthLogin();
        return;
      }

      // Logout Action
      const logoutBtn = e.target.closest('#btn-navbar-logout, #btn-navbar-logout-mobile');
      if (logoutBtn) {
        this.handleAuthLogout();
        return;
      }

      // Open Booking Modal Trigger Buttons
      const bookBtn = e.target.closest('.btn-book-now');
      if (bookBtn) {
        this.openBookingModal();
        return;
      }

      // Service Card "Book Now" Button (pre-populates form)
      const serviceBookBtn = e.target.closest('.service-book-btn');
      if (serviceBookBtn) {
        const title = serviceBookBtn.dataset.serviceTitle;
        const category = serviceBookBtn.dataset.serviceCategory || 'Electrical';
        this.state.bookingForm.service_type = category;
        this.state.bookingForm.appliance_type = title;
        this.openBookingModal();
        return;
      }

      // Quick Service Tile from Hero
      const quickTile = e.target.closest('.quick-service-tile');
      if (quickTile) {
        const title = quickTile.dataset.quickService;
        const category = quickTile.dataset.quickCategory || 'Electrical';
        const isEmergency = quickTile.dataset.emergency === 'true';
        this.state.bookingForm.service_type = category;
        this.state.bookingForm.appliance_type = title;
        if (isEmergency) this.state.bookingForm.emergency = true;
        this.openBookingModal();
        return;
      }

      // Close Booking Modal
      const closeBtn = e.target.closest('#close-booking-modal');
      if (closeBtn) {
        this.closeBookingModal();
        return;
      }

      // Service Category Tabs in "What We Do"
      const serviceTabBtn = e.target.closest('.service-tab-btn');
      if (serviceTabBtn) {
        this.state.servicesTab = serviceTabBtn.dataset.tab;
        this.render();
        return;
      }

      // Clear search
      const clearSearch = e.target.closest('#clear-search-btn');
      if (clearSearch) {
        this.state.servicesSearch = '';
        this.render();
        return;
      }

      // Mobile Menu Toggle
      const mobileToggle = e.target.closest('#mobile-menu-toggle');
      if (mobileToggle) {
        const menu = document.getElementById('mobile-menu');
        const hambIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');
        if (menu) {
          menu.classList.toggle('hidden');
          if (hambIcon) hambIcon.classList.toggle('hidden');
          if (closeIcon) closeIcon.classList.toggle('hidden');
        }
        return;
      }

      // Mobile menu links close menu
      const mobileLink = e.target.closest('.mobile-nav-link');
      if (mobileLink) {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.add('hidden');
      }

      // Wizard Navigation Buttons
      const wizardPrev = e.target.closest('#wizard-prev-btn');
      if (wizardPrev) {
        this.prevBookingStep();
        return;
      }

      const wizardNext = e.target.closest('#wizard-next-btn');
      if (wizardNext) {
        this.nextBookingStep();
        return;
      }

      const wizardSubmit = e.target.closest('#wizard-submit-btn');
      if (wizardSubmit) {
        this.submitAppointment();
        return;
      }

      // Form Step 1 Category toggle button
      const formCatBtn = e.target.closest('.form-select-btn');
      if (formCatBtn) {
        const val = formCatBtn.dataset.value;
        this.state.bookingForm.service_type = val;
        this.state.bookingForm.appliance_type = val === 'Electrical' ? 'House Wiring' : 'Refrigerator';
        this.render();
        return;
      }

      // Time Slot Selector
      const timeSlotBtn = e.target.closest('.time-slot-btn');
      if (timeSlotBtn) {
        this.state.bookingForm.appointment_time = timeSlotBtn.dataset.slot;
        this.render();
        return;
      }

      // Location Option Tabs (GPS, Map, Manual)
      const locTabBtn = e.target.closest('.loc-tab-btn');
      if (locTabBtn) {
        this.state.locationOption = locTabBtn.dataset.locTab;
        this.render();
        return;
      }

      // GPS Auto-Detect Button
      const fetchGpsBtn = e.target.closest('#btn-fetch-gps');
      if (fetchGpsBtn) {
        this.handleGpsDetect();
        return;
      }

      // View Tracker button from success screen
      const viewTrackerBtn = e.target.closest('#btn-view-tracker');
      if (viewTrackerBtn) {
        this.closeBookingModal();
        this.setRole('tracker');
        return;
      }

      // View in Owner Admin demo button
      const viewOwnerBtn = e.target.closest('#btn-view-owner-demo');
      if (viewOwnerBtn) {
        this.closeBookingModal();
        this.setRole('owner');
        return;
      }

      // Technician tab filters in Tech Dashboard
      const techTabBtn = e.target.closest('.tech-tab-btn');
      if (techTabBtn) {
        this.state.techFilterTab = techTabBtn.dataset.techTab;
        this.render();
        return;
      }

      // Technician switch view button in Tech Dashboard
      const techSwitchBtn = e.target.closest('.tech-switch-btn');
      if (techSwitchBtn) {
        const worker = techSwitchBtn.dataset.techSwitch;
        this.state.currentTechWorker = worker;
        this.render();
        return;
      }

      // Owner switch tech button
      const switchTechFromOwner = e.target.closest('.btn-switch-tech');
      if (switchTechFromOwner) {
        const worker = switchTechFromOwner.dataset.switchTech;
        this.state.currentTechWorker = worker;
        this.state.currentRole = worker.includes('Aman') ? 'tech-aman' : 'tech-nehal';
        this.render();
        return;
      }

      // Technician Action Buttons (Accept, Reject, Start, Complete)
      const techActionBtn = e.target.closest('.btn-job-action');
      if (techActionBtn) {
        const action = techActionBtn.dataset.techAction;
        const jobId = techActionBtn.dataset.jobId;
        this.handleTechnicianAction(jobId, action);
        return;
      }

      // Tracker Search Submit Button
      const trackSubmitBtn = e.target.closest('#btn-track-submit');
      if (trackSubmitBtn) {
        const input = document.getElementById('tracker-input-id');
        if (input && input.value.trim()) {
          this.state.trackerSearchId = input.value.trim();
          this.render();
        }
        return;
      }

      // Export CSV
      const exportBtn = e.target.closest('#btn-export-jobs');
      if (exportBtn) {
        this.exportAppointmentsCsv();
        return;
      }

      // Inspect job modal
      const inspectBtn = e.target.closest('.btn-inspect-job');
      if (inspectBtn) {
        const appId = inspectBtn.dataset.appointmentId;
        const job = this.state.appointments.find(a => a.appointment_id === appId);
        if (job) {
          alert(`Job Details:\nID: ${job.appointment_id}\nCustomer: ${job.customer_name} (${job.mobile_number})\nService: ${job.service_type} - ${job.appliance_type}\nProblem: ${job.problem_description}\nAddress: ${job.address}, ${job.city}\nCoordinates: ${job.latitude}, ${job.longitude}\nStatus: ${job.status}\nAssigned: ${job.assigned_worker || 'Unassigned'}`);
        }
        return;
      }
    });

    // Handle Input Changes
    document.addEventListener('input', (e) => {
      // Service search
      if (e.target.id === 'service-search-input') {
        this.state.servicesSearch = e.target.value;
        this.render();
      }

      // Booking form inputs
      if (e.target.id === 'input-problem-desc') {
        this.state.bookingForm.problem_description = e.target.value;
      }
      if (e.target.id === 'input-customer-name') {
        this.state.bookingForm.customer_name = e.target.value;
      }
      if (e.target.id === 'input-mobile-number') {
        this.state.bookingForm.mobile_number = e.target.value;
      }
      if (e.target.id === 'input-email') {
        this.state.bookingForm.email = e.target.value;
      }
      if (e.target.id === 'input-appointment-date') {
        this.state.bookingForm.appointment_date = e.target.value;
      }
      if (e.target.id === 'input-address-house') {
        this.state.bookingForm.address = e.target.value;
      }
      if (e.target.id === 'input-address-landmark') {
        this.state.bookingForm.landmark = e.target.value;
      }
      if (e.target.id === 'input-address-city') {
        this.state.bookingForm.city = e.target.value;
      }
      if (e.target.id === 'input-address-pincode') {
        this.state.bookingForm.pincode = e.target.value;
      }
    });

    // Handle Select/Dropdown Changes
    document.addEventListener('change', (e) => {
      // Appliance selector in booking form
      if (e.target.id === 'input-appliance-type') {
        this.state.bookingForm.appliance_type = e.target.value;
      }

      // Emergency checkbox toggle
      if (e.target.id === 'input-emergency-toggle') {
        this.state.bookingForm.emergency = e.target.checked;
        this.render();
      }

      // Owner filter by status
      if (e.target.id === 'owner-filter-status') {
        this.state.ownerFilterStatus = e.target.value;
        this.render();
      }

      // Owner filter by worker
      if (e.target.id === 'owner-filter-worker') {
        this.state.ownerFilterWorker = e.target.value;
        this.render();
      }

      // Admin assign technician dropdown
      if (e.target.classList.contains('admin-assign-worker-select')) {
        const appId = e.target.dataset.appointmentId;
        const worker = e.target.value;
        this.assignTechnician(appId, worker);
      }

      // Admin change status dropdown
      if (e.target.classList.contains('admin-change-status-select')) {
        const appId = e.target.dataset.appointmentId;
        const newStatus = e.target.value;
        this.updateAppointmentStatus(appId, newStatus);
      }
    });
  }

  setRole(role) {
    this.state.currentRole = role;
    if (role === 'tech-aman') this.state.currentTechWorker = 'Aman Jumde';
    if (role === 'tech-nehal') this.state.currentTechWorker = 'Nehal Jumde';
    this.saveState();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.showToast(`Switched to ${role.toUpperCase()} View`, 'info');
  }

  openBookingModal() {
    this.state.isBookingOpen = true;
    this.state.bookingStep = 1;
    this.render();
  }

  closeBookingModal() {
    this.state.isBookingOpen = false;
    this.render();
  }

  nextBookingStep() {
    const step = this.state.bookingStep;
    const form = this.state.bookingForm;

    // Validation
    if (step === 1) {
      if (!form.problem_description.trim()) {
        this.showToast('Please describe your electrical or appliance problem.', 'warning');
        return;
      }
    } else if (step === 2) {
      if (!form.customer_name.trim()) {
        this.showToast('Please enter your full name.', 'warning');
        return;
      }
      if (!form.mobile_number.trim() || form.mobile_number.length < 8) {
        this.showToast('Please enter a valid mobile number for technician contact.', 'warning');
        return;
      }
    } else if (step === 3) {
      if (!form.appointment_date) {
        this.showToast('Please pick an appointment date.', 'warning');
        return;
      }
    } else if (step === 4) {
      if (!form.address.trim()) {
        this.showToast('Please enter your house / flat / street address.', 'warning');
        return;
      }
    }

    if (this.state.bookingStep < 5) {
      this.state.bookingStep += 1;
      this.render();
    }
  }

  prevBookingStep() {
    if (this.state.bookingStep > 1) {
      this.state.bookingStep -= 1;
      this.render();
    }
  }

  handleGpsDetect() {
    if ('geolocation' in navigator) {
      this.showToast('Acquiring GPS location...', 'info');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.state.bookingForm.latitude = pos.coords.latitude;
          this.state.bookingForm.longitude = pos.coords.longitude;
          if (!this.state.bookingForm.address) {
            this.state.bookingForm.address = 'GPS Detected Residence';
            this.state.bookingForm.landmark = 'Device Geolocation Point';
          }
          this.showToast('GPS coordinates locked successfully!', 'success');
          this.render();
        },
        (err) => {
          console.warn('Geolocation error:', err);
          this.state.bookingForm.latitude = 28.6139;
          this.state.bookingForm.longitude = 77.2090;
          this.showToast('Location permission not granted. Default city coordinates applied.', 'warning');
          this.render();
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      this.showToast('Geolocation is not supported by your browser.', 'warning');
    }
  }

  submitAppointment() {
    const form = this.state.bookingForm;
    
    // Generate unique sequential Appointment ID: BES-2026-XXXX
    const nextSeq = (this.state.appointments.length + 1).toString().padStart(4, '0');
    const newId = `BES-2026-${nextSeq}`;

    const newAppointment = {
      appointment_id: newId,
      customer_name: form.customer_name,
      mobile_number: form.mobile_number,
      email: form.email || 'customer@example.com',
      service_type: form.service_type,
      appliance_type: form.appliance_type,
      problem_description: form.problem_description,
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      emergency: form.emergency,
      latitude: form.latitude || 28.6139,
      longitude: form.longitude || 77.2090,
      address: form.address,
      landmark: form.landmark || '',
      city: form.city || 'New Delhi',
      state: form.state || 'Delhi',
      pincode: form.pincode || '110001',
      assigned_worker: null,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    // Prepend to appointments list
    this.state.appointments.unshift(newAppointment);
    this.state.latestAppointment = newAppointment;
    this.state.trackerSearchId = newId;
    this.state.bookingStep = 6; // Move to Success Screen

    this.saveState();
    this.render();
    this.showToast(`Appointment ${newId} Booked Successfully!`, 'success');
  }

  assignTechnician(appointmentId, workerName) {
    const app = this.state.appointments.find(a => a.appointment_id === appointmentId);
    if (!app) return;

    app.assigned_worker = workerName ? workerName : null;
    if (workerName && app.status === 'Pending') {
      app.status = 'Assigned';
    } else if (!workerName && app.status === 'Assigned') {
      app.status = 'Pending';
    }

    this.saveState();
    this.render();
    this.showToast(workerName ? `Assigned ${workerName} to ${appointmentId}` : `Unassigned ${appointmentId}`, 'success');
  }

  updateAppointmentStatus(appointmentId, newStatus) {
    const app = this.state.appointments.find(a => a.appointment_id === appointmentId);
    if (!app) return;

    app.status = newStatus;
    this.saveState();
    this.render();
    this.showToast(`Updated ${appointmentId} status to "${newStatus}"`, 'info');
  }

  handleTechnicianAction(jobId, action) {
    const job = this.state.appointments.find(a => a.appointment_id === jobId);
    if (!job) return;

    if (action === 'accept') {
      job.status = 'Accepted';
      this.showToast(`Job ${jobId} Accepted!`, 'success');
    } else if (action === 'reject') {
      job.assigned_worker = null;
      job.status = 'Pending';
      this.showToast(`Job ${jobId} Rejected and returned to Owner queue.`, 'warning');
    } else if (action === 'start') {
      job.status = 'On the Way';
      this.showToast(`Status updated to "On the Way" for ${jobId}`, 'info');
    } else if (action === 'in_progress') {
      job.status = 'In Progress';
      this.showToast(`Status updated to "In Progress" for ${jobId}`, 'info');
    } else if (action === 'complete') {
      job.status = 'Completed';
      this.showToast(`Job ${jobId} Marked as Completed! Great work!`, 'success');
    }

    this.saveState();
    this.render();
  }

  exportAppointmentsCsv() {
    const headers = ["Appointment ID,Customer Name,Mobile,Service,Appliance,Problem,Date,Time,Status,Worker,Address,City,Latitude,Longitude,Emergency"];
    const rows = this.state.appointments.map(a => 
      `"${a.appointment_id}","${a.customer_name}","${a.mobile_number}","${a.service_type}","${a.appliance_type}","${a.problem_description.replace(/"/g, '""')}","${a.appointment_date}","${a.appointment_time}","${a.status}","${a.assigned_worker || 'None'}","${a.address.replace(/"/g, '""')}","${a.city}","${a.latitude}","${a.longitude}","${a.emergency ? 'YES' : 'NO'}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BES_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.showToast('Exported appointments to CSV', 'success');
  }

  handleAuthLogin() {
    const role = this.state.loginRole;
    if (role === 'customer') {
      this.state.currentUser = {
        name: 'Demo Customer',
        role: 'customer',
        email: 'customer@example.com'
      };
      this.setRole('customer');
    } else if (role === 'tech') {
      const techSel = document.getElementById('login-tech-selector');
      const val = techSel ? techSel.value : 'aman';
      if (val === 'aman') {
        this.state.currentUser = {
          name: 'Aman Jumde',
          role: 'technician',
          email: 'aman@bes-services.com'
        };
        this.setRole('tech-aman');
      } else {
        this.state.currentUser = {
          name: 'Nehal Jumde',
          role: 'technician',
          email: 'nehal@bes-services.com'
        };
        this.setRole('tech-nehal');
      }
    } else if (role === 'admin') {
      this.state.currentUser = {
        name: 'Shubham',
        role: 'admin',
        email: 'shubham@bes-services.com'
      };
      this.setRole('owner');
    }

    this.state.isLoginOpen = false;
    this.saveState();
    this.render();
    this.showToast(`Logged in successfully as ${this.state.currentUser.name}!`, 'success');
  }

  handleAuthLogout() {
    const prevName = this.state.currentUser ? this.state.currentUser.name : '';
    this.state.currentUser = null;
    this.setRole('customer');
    this.saveState();
    this.render();
    this.showToast(`Signed out ${prevName}`, 'info');
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.besApp = new BESApp();
});
