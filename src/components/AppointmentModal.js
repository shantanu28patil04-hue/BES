// Appointment Booking Modal & Multi-Step Wizard Component
import { ELECTRICAL_SERVICES, APPLIANCE_SERVICES } from '../data/mockData.js';
import { renderBrandLogo } from './BrandLogo.js';

export function renderAppointmentModal(state) {
  const isVisible = state.isBookingOpen;
  if (!isVisible) return '';

  const currentStep = state.bookingStep || 1; // 1: Service, 2: Customer, 3: Date/Time, 4: Location, 5: Review, 6: Success
  const formData = state.bookingForm || {};

  return `
    <div id="booking-modal-overlay" class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div class="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        <!-- Modal Header with BES Branding & Close Button -->
        <div class="bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#0A192F] text-white p-5 sm:p-6 flex items-center justify-between border-b border-blue-900/50 flex-shrink-0">
          <div class="flex items-center gap-3">
            ${renderBrandLogo({ size: 'sm', variant: 'white' })}
            <div class="hidden sm:block border-l border-white/20 pl-3">
              <h3 class="text-base font-black text-white">Doorstep Service Booking</h3>
              <p class="text-[11px] text-amber-300">Verified Technicians • GPS Location Precision</p>
            </div>
          </div>

          <button id="close-booking-modal" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Wizard Step Progress Bar (Steps 1 to 5) -->
        ${currentStep <= 5 ? `
          <div class="bg-slate-100 px-4 sm:px-6 py-3 border-b border-slate-200 flex-shrink-0">
            <div class="flex items-center justify-between max-w-xl mx-auto">
              ${[
                { num: 1, label: "Service" },
                { num: 2, label: "Details" },
                { num: 3, label: "Schedule" },
                { num: 4, label: "Location" },
                { num: 5, label: "Confirm" }
              ].map(s => {
                const isPassed = currentStep > s.num;
                const isCurrent = currentStep === s.num;
                return `
                  <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isPassed ? 'bg-emerald-600 text-white' :
                      isCurrent ? 'bg-[#0F2C59] text-white ring-4 ring-blue-200 scale-105' :
                      'bg-white text-slate-400 border border-slate-300'
                    }">
                      ${isPassed ? '✓' : s.num}
                    </div>
                    <span class="text-[10px] font-bold mt-1 ${isCurrent ? 'text-[#0F2C59]' : 'text-slate-500'}">
                      ${s.label}
                    </span>
                  </div>
                `;
              }).join(`
                <div class="flex-1 h-0.5 mx-1.5 bg-slate-300 relative -top-2">
                  <div class="h-full bg-emerald-600 transition-all duration-300" style="width: ${
                    currentStep === 1 ? '0%' :
                    currentStep === 2 ? '25%' :
                    currentStep === 3 ? '50%' :
                    currentStep === 4 ? '75%' : '100%'
                  }"></div>
                </div>
              `)}
            </div>
          </div>
        ` : ''}

        <!-- Wizard Scrollable Content Body -->
        <div class="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          ${renderStepContent(currentStep, formData, state)}
        </div>

        <!-- Wizard Footer Navigation Buttons -->
        ${currentStep <= 5 ? `
          <div class="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            ${currentStep > 1 ? `
              <button id="wizard-prev-btn" class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-all">
                ← Back
              </button>
            ` : `<div></div>`}

            <div class="flex items-center gap-3">
              ${currentStep < 5 ? `
                <button id="wizard-next-btn" class="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-md transition-all">
                  Next Step →
                </button>
              ` : `
                <button id="wizard-submit-btn" class="px-8 py-3 rounded-xl font-black text-sm text-white bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-red-600 hover:to-red-800 shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                  <span>CONFIRM APPOINTMENT</span>
                  <span>✓</span>
                </button>
              `}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function renderStepContent(step, formData, state) {
  switch(step) {
    case 1:
      return renderStep1(formData);
    case 2:
      return renderStep2(formData);
    case 3:
      return renderStep3(formData);
    case 4:
      return renderStep4(formData, state);
    case 5:
      return renderStep5(formData);
    case 6:
      return renderStep6(state);
    default:
      return renderStep1(formData);
  }
}

// Step 1: Service Information
function renderStep1(formData) {
  const category = formData.service_type || 'Electrical';
  const selectedAppliance = formData.appliance_type || (category === 'Electrical' ? ELECTRICAL_SERVICES[0].title : APPLIANCE_SERVICES[0].title);
  const isEmergency = formData.emergency === true || formData.emergency === 'true';

  return `
    <div class="space-y-6">
      <div class="border-b border-slate-100 pb-3">
        <h4 class="text-xl font-black text-slate-900">Step 1: Select Service &amp; Describe Problem</h4>
        <p class="text-xs text-slate-500 mt-1">Choose the service category and select the specific electrical fixture or home appliance.</p>
      </div>

      <!-- Service Category Toggle -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Service Type *</label>
        <div class="grid grid-cols-2 gap-3">
          <button type="button" data-field="service_type" data-value="Electrical" class="form-select-btn p-4 rounded-2xl border-2 text-left transition-all ${
            category === 'Electrical' ? 'border-[#0F2C59] bg-blue-50/70 text-[#0F2C59] font-bold shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
          }">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">⚡</span>
              <div>
                <div class="font-black text-sm">Electrical Service</div>
                <div class="text-[11px] opacity-75">Wiring, Faults, MCB, Switches, Fans</div>
              </div>
            </div>
          </button>

          <button type="button" data-field="service_type" data-value="Appliance" class="form-select-btn p-4 rounded-2xl border-2 text-left transition-all ${
            category === 'Appliance' ? 'border-[#DC2626] bg-red-50/70 text-[#DC2626] font-bold shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
          }">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">🧊</span>
              <div>
                <div class="font-black text-sm">Appliance Repair</div>
                <div class="text-[11px] opacity-75">Fridge, AC, Washing Machine, TV, Geyser</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Item Dropdown / Grid -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          ${category === 'Electrical' ? 'Select Electrical Work *' : 'Select Home Appliance *'}
        </label>
        <select id="input-appliance-type" class="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-[#0F2C59] focus:outline-none">
          ${
            category === 'Electrical'
              ? ELECTRICAL_SERVICES.map(s => `
                <option value="${s.title}" ${selectedAppliance === s.title ? 'selected' : ''}>
                  ⚡ ${s.title}
                </option>
              `).join('')
              : APPLIANCE_SERVICES.map(a => `
                <option value="${a.title}" ${selectedAppliance === a.title ? 'selected' : ''}>
                  🔧 ${a.title}
                </option>
              `).join('')
          }
        </select>
      </div>

      <!-- Describe Your Problem -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Describe Your Problem *</label>
          <span class="text-[11px] text-slate-400">Be as specific as possible</span>
        </div>
        <textarea 
          id="input-problem-desc" 
          rows="3" 
          placeholder="e.g. Split AC is not cooling properly and indoor unit is making a rattling noise. / Kitchen main switch tripped with spark."
          class="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
        >${formData.problem_description || ''}</textarea>
      </div>

      <!-- Emergency Service Toggle -->
      <div class="p-4 rounded-2xl border ${isEmergency ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200'} flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🚨</span>
          <div>
            <div class="text-sm font-bold ${isEmergency ? 'text-red-900' : 'text-slate-900'}">Emergency Service Required?</div>
            <div class="text-xs ${isEmergency ? 'text-red-700' : 'text-slate-500'}">Immediate priority dispatch for short circuits, sparks, and urgent power breakdown.</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="input-emergency-toggle" ${isEmergency ? 'checked' : ''} class="sr-only peer">
            <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
          <span class="text-xs font-black ${isEmergency ? 'text-red-600' : 'text-slate-500'}">
            ${isEmergency ? 'YES' : 'NO'}
          </span>
        </div>
      </div>

    </div>
  `;
}

// Step 2: Customer Information
function renderStep2(formData) {
  return `
    <div class="space-y-6">
      <div class="border-b border-slate-100 pb-3">
        <h4 class="text-xl font-black text-slate-900">Step 2: Customer Contact Information</h4>
        <p class="text-xs text-slate-500 mt-1">Provide your contact details so the BES technician can call before arrival.</p>
      </div>

      <!-- Full Name -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Full Name *</label>
        <div class="relative">
          <input 
            type="text" 
            id="input-customer-name" 
            value="${formData.customer_name || ''}"
            placeholder="e.g. Shubham Sharma"
            class="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
          <span class="absolute left-3.5 top-3.5 text-slate-400">👤</span>
        </div>
      </div>

      <!-- Mobile Number -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Mobile Number *</label>
        <div class="relative">
          <input 
            type="tel" 
            id="input-mobile-number" 
            value="${formData.mobile_number || ''}"
            placeholder="+91 98765 43210"
            class="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
          <span class="absolute left-3.5 top-3.5 text-slate-400">📱</span>
        </div>
        <p class="text-[11px] text-slate-500 mt-1">Technician will coordinate OTP and arrival via this number.</p>
      </div>

      <!-- Email Address -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email Address</label>
        <div class="relative">
          <input 
            type="email" 
            id="input-email" 
            value="${formData.email || ''}"
            placeholder="e.g. shubham@example.com"
            class="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
          <span class="absolute left-3.5 top-3.5 text-slate-400">✉️</span>
        </div>
      </div>
    </div>
  `;
}

// Step 3: Preferred Date & Time
function renderStep3(formData) {
  const today = new Date().toISOString().split('T')[0];
  const selectedDate = formData.appointment_date || today;
  const selectedTime = formData.appointment_time || "10:00 AM - 12:00 PM";

  const timeSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM"
  ];

  return `
    <div class="space-y-6">
      <div class="border-b border-slate-100 pb-3">
        <h4 class="text-xl font-black text-slate-900">Step 3: Appointment Date &amp; Time Slot</h4>
        <p class="text-xs text-slate-500 mt-1">Select your preferred date and convenient time window for technician visit.</p>
      </div>

      <!-- Date Selection -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Select Date *</label>
        <div class="relative max-w-sm">
          <input 
            type="date" 
            id="input-appointment-date" 
            min="${today}"
            value="${selectedDate}"
            class="w-full p-3.5 rounded-xl border border-slate-300 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
        </div>
      </div>

      <!-- Time Slots Grid -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Select Preferred Time Slot *</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          ${timeSlots.map(slot => `
            <button 
              type="button" 
              data-slot="${slot}"
              class="time-slot-btn p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                selectedTime === slot 
                  ? 'border-[#0F2C59] bg-[#0F2C59] text-white shadow-md' 
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }">
              ${slot}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
        <span>ℹ️</span>
        <span>BES technicians confirm arrival 30 minutes prior to the scheduled slot.</span>
      </div>
    </div>
  `;
}

// Step 4: Customer Location Engine (Three options as required)
function renderStep4(formData, state) {
  const locationOption = state.locationOption || 'gps'; // 'gps' | 'map' | 'manual'
  const lat = formData.latitude || 28.6139;
  const lng = formData.longitude || 77.2090;

  return `
    <div class="space-y-6">
      <div class="border-b border-slate-100 pb-3">
        <h4 class="text-xl font-black text-slate-900">Step 4: Customer Location</h4>
        <p class="text-xs text-slate-500 mt-1">Provide your exact home location so the technician can navigate seamlessly.</p>
      </div>

      <!-- Location Option 3 Tabs -->
      <div class="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
        <button type="button" data-loc-tab="gps" class="loc-tab-btn py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
          locationOption === 'gps' ? 'bg-[#0F2C59] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
        }">
          📍 GPS Auto-detect
        </button>

        <button type="button" data-loc-tab="map" class="loc-tab-btn py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
          locationOption === 'map' ? 'bg-[#0F2C59] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
        }">
          🗺️ Select on Map
        </button>

        <button type="button" data-loc-tab="manual" class="loc-tab-btn py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
          locationOption === 'manual' ? 'bg-[#0F2C59] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
        }">
          🏠 Manual Address
        </button>
      </div>

      <!-- Option 1: GPS Auto-Detect -->
      ${locationOption === 'gps' ? `
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-blue-100 text-[#0F2C59] flex items-center justify-center text-3xl mx-auto">
            📍
          </div>
          <h5 class="text-base font-black text-slate-900">Option 1 — Use Current Location</h5>
          <p class="text-xs text-slate-600 max-w-md mx-auto">
            Click below to share your current device location. This will automatically acquire your GPS coordinates for maximum technician navigation accuracy.
          </p>

          <button type="button" id="btn-fetch-gps" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 shadow-md transition-all active:scale-95">
            <span>📍 Use My Current Location</span>
          </button>

          ${formData.latitude ? `
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2">
              <span>✓ GPS Coordinates Acquired:</span>
              <span class="font-mono">${lat.toFixed(4)}, ${lng.toFixed(4)}</span>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <!-- Option 2: Select Location on Map -->
      ${locationOption === 'map' ? `
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-slate-600">
            <span class="font-bold">Option 2 — Select Location on Map</span>
            <span class="text-blue-700">Click or drag the red pin to your home location</span>
          </div>

          <div id="booking-map-container" class="w-full h-64 rounded-2xl border border-slate-300 overflow-hidden shadow-inner relative z-10">
            <!-- Map initialized via Leaflet in app.js -->
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span class="text-slate-500 font-semibold">Selected Map Pin:</span>
            <span class="font-mono font-bold text-slate-800">${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E</span>
          </div>
        </div>
      ` : ''}

      <!-- Option 3: Manual Address Form -->
      <div class="space-y-3 pt-2">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Address Details (Required for all options)</label>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input 
              type="text" 
              id="input-address-house" 
              value="${formData.address || ''}"
              placeholder="House / Flat Number &amp; Building *"
              class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
            />
          </div>

          <div>
            <input 
              type="text" 
              id="input-address-landmark" 
              value="${formData.landmark || ''}"
              placeholder="Landmark (e.g. Near Metro Gate / Temple)"
              class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
            />
          </div>

          <div>
            <input 
              type="text" 
              id="input-address-city" 
              value="${formData.city || 'New Delhi'}"
              placeholder="City *"
              class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
            />
          </div>

          <div>
            <input 
              type="text" 
              id="input-address-pincode" 
              value="${formData.pincode || '110001'}"
              placeholder="PIN Code *"
              class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Live Preview of Selected Location -->
      <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
        <span class="font-bold">📍 Verified Destination:</span>
        <span class="ml-1">${formData.address || 'Address pending'}, ${formData.city || 'City'} (PIN: ${formData.pincode || 'N/A'}) • Lat/Lng: ${lat.toFixed(4)}, ${lng.toFixed(4)}</span>
      </div>

    </div>
  `;
}

// Step 5: Summary Review before Confirmation
function renderStep5(formData) {
  return `
    <div class="space-y-6">
      <div class="border-b border-slate-100 pb-3 text-center sm:text-left">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Review &amp; Confirm</span>
        <h4 class="text-2xl font-black text-slate-900 mt-0.5">Appointment Summary</h4>
        <p class="text-xs text-slate-500">Please review all job details carefully before final confirmation.</p>
      </div>

      <!-- Receipt Card Frame -->
      <div class="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div class="text-xs text-slate-500 font-medium">Service Requested</div>
            <div class="text-base font-black text-[#0F2C59]">
              ${formData.service_type || 'Electrical'}: ${formData.appliance_type || 'General Service'}
            </div>
          </div>
          ${formData.emergency ? `
            <span class="px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-black animate-pulse">
              🚨 EMERGENCY
            </span>
          ` : `
            <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
              Standard Visit
            </span>
          `}
        </div>

        <!-- Summary Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span class="text-slate-400 block font-medium">Customer Name</span>
            <span class="font-bold text-slate-900 text-sm">${formData.customer_name || 'N/A'}</span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Contact Phone</span>
            <span class="font-bold text-slate-900 text-sm font-mono">${formData.mobile_number || 'N/A'}</span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Scheduled Date</span>
            <span class="font-bold text-slate-900 text-sm">${formData.appointment_date || 'Today'}</span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Time Window</span>
            <span class="font-bold text-slate-900 text-sm">${formData.appointment_time || 'Morning Slot'}</span>
          </div>
        </div>

        <!-- Problem Description -->
        <div class="pt-3 border-t border-slate-200">
          <span class="text-slate-400 block text-xs font-medium">Customer Problem Description</span>
          <p class="text-xs font-semibold text-slate-800 mt-1 italic bg-white p-3 rounded-xl border border-slate-200">
            "${formData.problem_description || 'No specific description provided'}"
          </p>
        </div>

        <!-- Location Box -->
        <div class="pt-3 border-t border-slate-200">
          <span class="text-slate-400 block text-xs font-medium">Service Doorstep Location</span>
          <div class="flex items-start gap-2 mt-1 text-xs font-semibold text-slate-900">
            <span class="text-red-600 text-sm">📍</span>
            <div>
              <span>${formData.address || 'Address'}, Landmark: ${formData.landmark || 'N/A'}, ${formData.city || 'City'} - ${formData.pincode || ''}</span>
              <div class="text-[11px] text-slate-500 font-mono mt-0.5">GPS: (${formData.latitude || 28.6139}, ${formData.longitude || 77.2090})</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Trust Note -->
      <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5">
        <span class="text-base">🛡️</span>
        <span>Once confirmed, BES admin will assign technician <strong>Aman Jumde</strong> or <strong>Nehal Jumde</strong> immediately.</span>
      </div>

    </div>
  `;
}

// Step 6: Confirmation Screen (Success)
function renderStep6(state) {
  const appointment = state.latestAppointment || {};

  return `
    <div class="text-center py-8 px-4 space-y-6 animate-in zoom-in-95 duration-200">
      
      <!-- Success Icon Animation -->
      <div class="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 border-4 border-emerald-200 flex items-center justify-center text-4xl mx-auto shadow-lg animate-bounce">
        ✓
      </div>

      <!-- Success Main Heading -->
      <div class="space-y-2 max-w-lg mx-auto">
        <h4 class="text-2xl sm:text-3xl font-black text-[#0F2C59]">
          Appointment Booked Successfully!
        </h4>
        <p class="text-sm text-slate-600">
          «Your service request has been received. A BES technician will contact you shortly.»
        </p>
      </div>

      <!-- Unique Appointment ID Badge -->
      <div class="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#0F2C59] to-[#0A192F] text-white shadow-xl border border-blue-800">
        <div class="text-[11px] uppercase tracking-wider text-amber-300 font-bold">Your Unique Booking ID</div>
        <div class="text-2xl sm:text-3xl font-black font-mono tracking-widest text-white mt-0.5">
          ${appointment.appointment_id || 'BES-2026-0005'}
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-md mx-auto">
        <button id="btn-view-tracker" class="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all">
          📍 Track Appointment Status
        </button>

        <button id="btn-view-owner-demo" class="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all">
          👑 View in Owner Admin →
        </button>
      </div>

    </div>
  `;
}
