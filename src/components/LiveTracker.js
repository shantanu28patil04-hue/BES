// Customer Live Tracker Component
import { STATUS_STEPS } from '../data/mockData.js';
import { renderBrandLogo } from './BrandLogo.js';

export function renderLiveTracker(state) {
  const appointments = state.appointments || [];
  const searchId = state.trackerSearchId || (state.latestAppointment ? state.latestAppointment.appointment_id : (appointments[0] ? appointments[0].appointment_id : ''));
  const currentJob = appointments.find(a => a.appointment_id.toUpperCase() === searchId.toUpperCase()) || appointments[0];

  const getStepIndex = (status) => {
    const map = {
      'Pending': 0,
      'Accepted': 1,
      'Assigned': 2,
      'On the Way': 3,
      'In Progress': 4,
      'Completed': 5,
      'Cancelled': -1
    };
    return map[status] !== undefined ? map[status] : 0;
  };

  const currentStepIdx = currentJob ? getStepIndex(currentJob.status) : 0;

  return `
    <div class="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <!-- Section Title -->
      <div class="text-center space-y-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <span>📍 Live Status Tracker</span>
        </span>
        <h2 class="text-3xl sm:text-4xl font-black text-[#0F2C59]">
          Track Your Service Appointment
        </h2>
        <p class="text-xs sm:text-sm text-slate-600">
          Enter your Booking ID to view real-time technician assignment and visit status.
        </p>
      </div>

      <!-- Search Booking ID Box -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm max-w-xl mx-auto">
        <div class="flex items-center gap-2">
          <input 
            type="text" 
            id="tracker-input-id" 
            value="${searchId}"
            placeholder="Enter ID: e.g. BES-2026-0001" 
            class="flex-1 p-3.5 rounded-2xl border border-slate-300 font-mono font-bold text-sm text-slate-900 focus:ring-2 focus:ring-[#0F2C59] focus:outline-none uppercase"
          />
          <button id="btn-track-submit" class="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-md transition-all">
            Track →
          </button>
        </div>
      </div>

      <!-- Active Job Status Card -->
      ${currentJob ? `
        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          <!-- Card Top Bar -->
          <div class="bg-gradient-to-r from-[#0F2C59] to-[#0A192F] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="text-xs uppercase font-bold text-amber-300 tracking-wider">Appointment Status</span>
              <h3 class="text-2xl font-black text-white mt-0.5">
                ${currentJob.appliance_type || currentJob.service_type}
              </h3>
              <div class="font-mono text-xs text-slate-300 mt-1">ID: ${currentJob.appointment_id}</div>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                currentJob.status === 'Completed' ? 'bg-emerald-500 text-white' :
                currentJob.status === 'Cancelled' ? 'bg-rose-500 text-white' :
                'bg-amber-400 text-slate-950 animate-pulse'
              }">
                ${currentJob.status}
              </span>
            </div>
          </div>

          <!-- Visual Progress Stepper -->
          <div class="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 text-center sm:text-left">
              Service Lifecycle Timeline
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-6 gap-4 relative">
              ${STATUS_STEPS.map((step, idx) => {
                const isPassed = currentStepIdx > idx;
                const isCurrent = currentStepIdx === idx;
                return `
                  <div class="flex flex-col items-center text-center">
                    <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${
                      isPassed ? 'bg-emerald-600 text-white shadow-sm' :
                      isCurrent ? 'bg-[#0F2C59] text-amber-300 ring-4 ring-blue-300 shadow-md scale-110' :
                      'bg-white text-slate-400 border border-slate-300'
                    }">
                      ${isPassed ? '✓' : (idx + 1)}
                    </div>
                    <span class="text-xs font-black mt-2 ${isCurrent ? 'text-[#0F2C59]' : 'text-slate-700'}">
                      ${step.label}
                    </span>
                    <span class="text-[10px] text-slate-500 mt-0.5 leading-tight hidden sm:block">
                      ${step.desc}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Job Information & Technician Details -->
          <div class="p-6 sm:p-8 space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Left: Customer Details -->
              <div class="space-y-4">
                <h4 class="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Customer &amp; Schedule
                </h4>

                <div class="space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-500">Customer Name:</span>
                    <strong class="text-slate-900">${currentJob.customer_name}</strong>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-slate-500">Scheduled Date:</span>
                    <strong class="text-slate-900">${currentJob.appointment_date}</strong>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-slate-500">Time Window:</span>
                    <strong class="text-slate-900">${currentJob.appointment_time}</strong>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-slate-500">Emergency Status:</span>
                    <strong class="${currentJob.emergency ? 'text-red-600 font-black' : 'text-slate-800'}">
                      ${currentJob.emergency ? '🚨 YES (Urgent)' : 'Standard'}
                    </strong>
                  </div>

                  <div class="pt-2 border-t border-slate-100">
                    <span class="text-slate-500 block mb-1">Service Address:</span>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                      📍 ${currentJob.address}, Landmark: ${currentJob.landmark || 'N/A'}, ${currentJob.city} - ${currentJob.pincode}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Assigned Technician -->
              <div class="space-y-4">
                <h4 class="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Assigned BES Technician
                </h4>

                ${currentJob.assigned_worker ? `
                  <div class="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-[#0F2C59] text-white flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
                      ${currentJob.assigned_worker.includes('Aman') ? '⚡' : '❄️'}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <h5 class="text-base font-black text-slate-900">${currentJob.assigned_worker}</h5>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
                      </div>
                      <p class="text-xs text-blue-800 font-semibold">Electrician / Service Technician</p>
                      
                      <div class="mt-3 flex items-center gap-2">
                        <a href="tel:+919876543210" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors">
                          📞 Call Technician
                        </a>
                      </div>
                    </div>
                  </div>
                ` : `
                  <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
                    <span class="text-3xl">⏳</span>
                    <h5 class="text-sm font-bold text-amber-900">Awaiting Technician Assignment</h5>
                    <p class="text-xs text-amber-800">
                      Owner <strong>Shubham</strong> is reviewing your booking and will assign <strong>Aman Jumde</strong> or <strong>Nehal Jumde</strong> shortly.
                    </p>
                  </div>
                `}
              </div>

            </div>

          </div>

        </div>
      ` : `
        <div class="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <span class="text-4xl">🔎</span>
          <h3 class="text-lg font-bold text-slate-800 mt-2">No appointment found with ID: "${searchId}"</h3>
          <p class="text-xs text-slate-500 mt-1">Please verify the booking ID or schedule a new service.</p>
        </div>
      `}

    </div>
  `;
}
