// Technician Dashboard Component for Aman Jumde & Nehal Jumde
import { renderBrandLogo } from './BrandLogo.js';

export function renderTechnicianDashboard(state) {
  const currentWorker = state.currentTechWorker || 'Aman Jumde'; // 'Aman Jumde' | 'Nehal Jumde'
  const appointments = state.appointments || [];

  // Filter jobs assigned to this technician OR unassigned pending jobs available for claiming
  const myJobs = appointments.filter(a => a.assigned_worker === currentWorker);
  const unassignedJobs = appointments.filter(a => !a.assigned_worker && (a.status === 'Pending' || a.status === 'Accepted'));

  const activeTab = state.techFilterTab || 'all'; // 'all' | 'new' | 'active' | 'completed'

  const displayedJobs = myJobs.filter(job => {
    if (activeTab === 'new') return job.status === 'Assigned' || job.status === 'Accepted';
    if (activeTab === 'active') return job.status === 'On the Way' || job.status === 'In Progress';
    if (activeTab === 'completed') return job.status === 'Completed';
    return true;
  });

  const isAman = currentWorker === 'Aman Jumde';

  return `
    <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <!-- Top Technician Banner -->
      <div class="bg-gradient-to-r ${isAman ? 'from-[#0F2C59] via-blue-900 to-indigo-950' : 'from-[#7F1D1D] via-red-900 to-slate-950'} text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div class="flex items-center gap-5">
          <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl ${isAman ? 'bg-blue-500' : 'bg-red-500'} p-1 flex-shrink-0 shadow-xl">
            <div class="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-4xl">
              ${isAman ? '⚡' : '❄️'}
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                ● On Duty / Field Active
              </span>
              <span class="text-xs text-amber-300 font-bold">BES Technician Portal</span>
            </div>
            
            <h2 class="text-2xl sm:text-3xl font-black text-white mt-1">
              ${currentWorker}
            </h2>
            <p class="text-xs sm:text-sm text-slate-300">
              ${isAman ? 'Electrician / Heavy Appliance Service Technician' : 'Electrician / AC & Refrigerator Service Technician'}
            </p>
          </div>
        </div>

        <!-- Worker Switcher Buttons -->
        <div class="flex items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10">
          <button data-tech-switch="Aman Jumde" class="tech-switch-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isAman ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
          }">
            ⚡ Aman's View
          </button>
          
          <button data-tech-switch="Nehal Jumde" class="tech-switch-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            !isAman ? 'bg-red-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
          }">
            ❄️ Nehal's View
          </button>
        </div>

      </div>

      <!-- Quick KPI Counters -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-500">My Total Jobs</div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${myJobs.length}</div>
          <div class="text-[10px] text-slate-400">Assigned to you</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-700">New / Pending</div>
          <div class="text-2xl sm:text-3xl font-black text-blue-900 mt-1">
            ${myJobs.filter(j => j.status === 'Assigned' || j.status === 'Accepted').length}
          </div>
          <div class="text-[10px] text-blue-600">Awaiting action</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-purple-200 bg-purple-50/30 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-purple-700">In Progress</div>
          <div class="text-2xl sm:text-3xl font-black text-purple-900 mt-1">
            ${myJobs.filter(j => j.status === 'On the Way' || j.status === 'In Progress').length}
          </div>
          <div class="text-[10px] text-purple-600">Currently active</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-emerald-200 bg-emerald-50/30 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-700">Completed</div>
          <div class="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">
            ${myJobs.filter(j => j.status === 'Completed').length}
          </div>
          <div class="text-[10px] text-emerald-600">Finished jobs</div>
        </div>

      </div>

      <!-- Tab Navigation for Technician -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2 overflow-x-auto">
          <button data-tech-tab="all" class="tech-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all' ? 'bg-[#0F2C59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }">
            All Assigned (${myJobs.length})
          </button>
          <button data-tech-tab="new" class="tech-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'new' ? 'bg-[#0F2C59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }">
            New / Assigned (${myJobs.filter(j => j.status === 'Assigned' || j.status === 'Accepted').length})
          </button>
          <button data-tech-tab="active" class="tech-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'active' ? 'bg-[#0F2C59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }">
            In Progress (${myJobs.filter(j => j.status === 'On the Way' || j.status === 'In Progress').length})
          </button>
          <button data-tech-tab="completed" class="tech-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'completed' ? 'bg-[#0F2C59] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }">
            Completed (${myJobs.filter(j => j.status === 'Completed').length})
          </button>
        </div>

        <span class="text-xs text-slate-500 hidden sm:inline">Real-time Job Dispatch</span>
      </div>

      <!-- Technician Job Cards Grid -->
      ${displayedJobs.length === 0 ? `
        <div class="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <span class="text-4xl">🛠️</span>
          <h3 class="text-lg font-bold text-slate-800 mt-2">No jobs currently in this queue</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1">When owner Shubham assigns jobs or when customers book, they will appear here instantly.</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${displayedJobs.map(job => {
            const isCompleted = job.status === 'Completed';
            const isOnWay = job.status === 'On the Way';
            const isInProgress = job.status === 'In Progress';
            const isAssigned = job.status === 'Assigned';
            const isAccepted = job.status === 'Accepted';

            return `
              <div class="bg-white rounded-3xl p-6 sm:p-7 border-2 ${
                job.emergency ? 'border-red-300 shadow-red-500/10' : 'border-slate-200'
              } shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5">
                
                <!-- Card Header -->
                <div>
                  <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <span class="font-mono text-xs font-bold text-slate-400">ID: ${job.appointment_id}</span>
                      <h3 class="text-xl font-black text-slate-900 mt-0.5">
                        ${job.appliance_type || job.service_type}
                      </h3>
                    </div>

                    <div class="flex flex-col items-end gap-1">
                      <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        job.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        job.status === 'On the Way' ? 'bg-purple-100 text-purple-800' :
                        job.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                        'bg-indigo-100 text-indigo-800'
                      }">
                        ${job.status}
                      </span>

                      ${job.emergency ? `
                        <span class="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                          🚨 Emergency
                        </span>
                      ` : ''}
                    </div>
                  </div>

                  <!-- Customer Contact & Problem Details -->
                  <div class="space-y-3 pt-3">
                    
                    <!-- Customer Name & Phone -->
                    <div class="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div>
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Customer</span>
                        <strong class="text-slate-900 text-sm">${job.customer_name}</strong>
                      </div>
                      <a href="tel:${job.mobile_number}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors">
                        <span>📞 Call Customer</span>
                      </a>
                    </div>

                    <!-- Problem Description -->
                    <div class="text-xs">
                      <span class="text-slate-400 block text-[10px] uppercase font-bold">Reported Problem</span>
                      <p class="text-slate-800 font-semibold bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 mt-1">
                        "${job.problem_description}"
                      </p>
                    </div>

                    <!-- Date & Time Slot -->
                    <div class="grid grid-cols-2 gap-2 text-xs">
                      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Date</span>
                        <strong class="text-slate-800">${job.appointment_date}</strong>
                      </div>

                      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Time Window</span>
                        <strong class="text-slate-800">${job.appointment_time}</strong>
                      </div>
                    </div>

                    <!-- Location & GPS Navigation Block -->
                    <div class="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <span class="text-blue-900 font-bold text-xs block">📍 Customer Location:</span>
                          <p class="text-xs text-slate-800 font-medium mt-0.5">
                            ${job.address}, Landmark: ${job.landmark || 'N/A'}, ${job.city} - ${job.pincode}
                          </p>
                        </div>
                      </div>

                      <!-- Navigate to Customer Button (REQUIRED) -->
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=${job.latitude || 28.6139},${job.longitude || 77.2090}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 shadow-md transition-all">
                        <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Navigate to Customer (Open Map)</span>
                        <span class="font-mono text-[10px] opacity-80">(${Number(job.latitude || 28.61).toFixed(2)}, ${Number(job.longitude || 77.20).toFixed(2)})</span>
                      </a>
                    </div>

                  </div>
                </div>

                <!-- Technician Action Buttons (Required) -->
                <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  
                  ${isAssigned ? `
                    <button 
                      data-tech-action="accept" 
                      data-job-id="${job.appointment_id}"
                      class="btn-job-action flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all">
                      Accept Job ✓
                    </button>
                    <button 
                      data-tech-action="reject" 
                      data-job-id="${job.appointment_id}"
                      class="btn-job-action py-2.5 px-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs transition-all">
                      Reject
                    </button>
                  ` : ''}

                  ${isAccepted ? `
                    <button 
                      data-tech-action="start" 
                      data-job-id="${job.appointment_id}"
                      class="btn-job-action flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all">
                      Start Trip (On the Way) 🚀
                    </button>
                  ` : ''}

                  ${isOnWay ? `
                    <button 
                      data-tech-action="in_progress" 
                      data-job-id="${job.appointment_id}"
                      class="btn-job-action flex-1 py-2.5 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold text-xs shadow-md transition-all">
                      Reached Location (Start Work) 🛠️
                    </button>
                  ` : ''}

                  ${isInProgress ? `
                    <button 
                      data-tech-action="complete" 
                      data-job-id="${job.appointment_id}"
                      class="btn-job-action flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all">
                      Mark Completed &amp; Verified ✓
                    </button>
                  ` : ''}

                  ${isCompleted ? `
                    <div class="w-full text-center py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                      Job Completed Successfully ✓
                    </div>
                  ` : ''}

                </div>

              </div>
            `;
          }).join('')}
        </div>
      `}

    </div>
  `;
}
