// Owner / Admin Dashboard Component (Owner: Shubham)
import { BUSINESS_INFO } from '../data/mockData.js';
import { renderBrandLogo } from './BrandLogo.js';

export function renderOwnerDashboard(state) {
  const appointments = state.appointments || [];
  const total = appointments.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.appointment_date === todayStr || a.created_at.startsWith(todayStr)).length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const inProgressCount = appointments.filter(a => a.status === 'In Progress' || a.status === 'On the Way').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  const filterStatus = state.ownerFilterStatus || 'all';
  const filterWorker = state.ownerFilterWorker || 'all';

  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = filterStatus === 'all' ? true : a.status === filterStatus;
    const matchesWorker = filterWorker === 'all' ? true :
      filterWorker === 'unassigned' ? !a.assigned_worker :
      a.assigned_worker === filterWorker;
    return matchesStatus && matchesWorker;
  });

  return `
    <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <!-- Dashboard Top Header Bar -->
      <div class="bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#0A192F] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-amber-400 p-1 flex-shrink-0 shadow-lg">
            <div class="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-3xl">
              👑
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-300">BES Operations Portal</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">Live Dispatch</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-white">Owner Dashboard — Shubham</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-0.5">Manage incoming bookings, technician dispatching, customer locations &amp; job lifecycles.</p>
          </div>
        </div>

        <!-- Quick Top Actions -->
        <div class="flex items-center gap-3">
          <button id="btn-export-jobs" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors">
            📥 Export CSV
          </button>
          <button class="btn-book-now px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-xs font-bold text-white shadow-md transition-colors">
            + New Appointment
          </button>
        </div>
      </div>

      <!-- Key KPI Stats Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Total Bookings</div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${total}</div>
          <div class="text-[10px] text-slate-400 mt-1">All time record</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-700">Today's Jobs</div>
          <div class="text-2xl sm:text-3xl font-black text-blue-900 mt-1">${todayCount}</div>
          <div class="text-[10px] text-blue-600 mt-1">Scheduled for today</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-sm bg-amber-50/30">
          <div class="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center justify-between">
            <span>Pending</span>
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-amber-900 mt-1">${pendingCount}</div>
          <div class="text-[10px] text-amber-700 mt-1">Needs assignment</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-purple-700">Active &amp; Moving</div>
          <div class="text-2xl sm:text-3xl font-black text-purple-900 mt-1">${inProgressCount}</div>
          <div class="text-[10px] text-purple-600 mt-1">On the way / Working</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-700">Completed</div>
          <div class="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">${completedCount}</div>
          <div class="text-[10px] text-emerald-600 mt-1">Successfully resolved</div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-rose-700">Cancelled</div>
          <div class="text-2xl sm:text-3xl font-black text-rose-900 mt-1">${cancelledCount}</div>
          <div class="text-[10px] text-rose-500 mt-1">Archived / Cancelled</div>
        </div>

      </div>

      <!-- Technicians Status & Workload Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Aman Jumde Status Card -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center text-2xl font-black">
              ⚡
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-lg font-black text-slate-900">Aman Jumde</h4>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Available</span>
              </div>
              <p class="text-xs text-slate-500">Electrician / Heavy Appliance Specialist</p>
              <div class="flex items-center gap-3 text-xs text-slate-700 mt-1">
                <span>Active Jobs: <strong class="text-blue-700">${appointments.filter(a => a.assigned_worker === 'Aman Jumde' && a.status !== 'Completed' && a.status !== 'Cancelled').length}</strong></span>
                <span>•</span>
                <span>Completed: <strong class="text-emerald-700">${appointments.filter(a => a.assigned_worker === 'Aman Jumde' && a.status === 'Completed').length}</strong></span>
              </div>
            </div>
          </div>

          <button data-switch-tech="Aman Jumde" class="btn-switch-tech px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors">
            View Aman's App →
          </button>
        </div>

        <!-- Nehal Jumde Status Card -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-2xl font-black">
              ❄️
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-lg font-black text-slate-900">Nehal Jumde</h4>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Available</span>
              </div>
              <p class="text-xs text-slate-500">Electrician / AC &amp; Fridge Specialist</p>
              <div class="flex items-center gap-3 text-xs text-slate-700 mt-1">
                <span>Active Jobs: <strong class="text-red-700">${appointments.filter(a => a.assigned_worker === 'Nehal Jumde' && a.status !== 'Completed' && a.status !== 'Cancelled').length}</strong></span>
                <span>•</span>
                <span>Completed: <strong class="text-emerald-700">${appointments.filter(a => a.assigned_worker === 'Nehal Jumde' && a.status === 'Completed').length}</strong></span>
              </div>
            </div>
          </div>

          <button data-switch-tech="Nehal Jumde" class="btn-switch-tech px-3.5 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors">
            View Nehal's App →
          </button>
        </div>

      </div>

      <!-- Appointments Management Table Card -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        <!-- Table Control Header -->
        <div class="p-5 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-black text-slate-900">Appointment Management &amp; Dispatch Queue</h3>
            <p class="text-xs text-slate-500">Assign technicians, update service statuses, and inspect customer GPS coordinates.</p>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Filter by Status -->
            <select id="owner-filter-status" class="p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0F2C59] focus:outline-none">
              <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="Pending" ${filterStatus === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Accepted" ${filterStatus === 'Accepted' ? 'selected' : ''}>Accepted</option>
              <option value="Assigned" ${filterStatus === 'Assigned' ? 'selected' : ''}>Assigned</option>
              <option value="On the Way" ${filterStatus === 'On the Way' ? 'selected' : ''}>On the Way</option>
              <option value="In Progress" ${filterStatus === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Completed" ${filterStatus === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${filterStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>

            <!-- Filter by Worker -->
            <select id="owner-filter-worker" class="p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0F2C59] focus:outline-none">
              <option value="all" ${filterWorker === 'all' ? 'selected' : ''}>All Technicians</option>
              <option value="unassigned" ${filterWorker === 'unassigned' ? 'selected' : ''}>Unassigned (Pending)</option>
              <option value="Aman Jumde" ${filterWorker === 'Aman Jumde' ? 'selected' : ''}>Aman Jumde</option>
              <option value="Nehal Jumde" ${filterWorker === 'Nehal Jumde' ? 'selected' : ''}>Nehal Jumde</option>
            </select>
          </div>
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-black tracking-wider text-[10.5px]">
              <tr>
                <th class="px-5 py-3.5">Booking ID</th>
                <th class="px-5 py-3.5">Customer &amp; Phone</th>
                <th class="px-5 py-3.5">Service &amp; Problem</th>
                <th class="px-5 py-3.5">Date &amp; Slot</th>
                <th class="px-5 py-3.5">Customer Location</th>
                <th class="px-5 py-3.5">Assigned Tech</th>
                <th class="px-5 py-3.5">Status</th>
                <th class="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${filteredAppointments.length === 0 ? `
                <tr>
                  <td colspan="8" class="text-center py-12 text-slate-400">
                    No appointments match the selected filter criteria.
                  </td>
                </tr>
              ` : filteredAppointments.map(app => {
                const statusColors = {
                  'Pending': 'bg-amber-100 text-amber-900 border-amber-300',
                  'Accepted': 'bg-blue-100 text-blue-900 border-blue-300',
                  'Assigned': 'bg-indigo-100 text-indigo-900 border-indigo-300',
                  'On the Way': 'bg-purple-100 text-purple-900 border-purple-300',
                  'In Progress': 'bg-yellow-100 text-yellow-900 border-yellow-300',
                  'Completed': 'bg-emerald-100 text-emerald-900 border-emerald-300',
                  'Cancelled': 'bg-rose-100 text-rose-900 border-rose-300'
                };

                return `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    
                    <!-- ID & Emergency -->
                    <td class="px-5 py-4 whitespace-nowrap">
                      <div class="font-black text-slate-900 font-mono">${app.appointment_id}</div>
                      ${app.emergency ? `
                        <span class="inline-block mt-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-black uppercase">
                          🚨 Emergency
                        </span>
                      ` : ''}
                    </td>

                    <!-- Customer & Phone -->
                    <td class="px-5 py-4">
                      <div class="font-bold text-slate-900">${app.customer_name}</div>
                      <a href="tel:${app.mobile_number}" class="text-blue-700 hover:underline font-mono text-[11px] block mt-0.5">
                        📞 ${app.mobile_number}
                      </a>
                    </td>

                    <!-- Service & Problem -->
                    <td class="px-5 py-4 max-w-xs">
                      <div class="font-bold text-slate-800">${app.appliance_type || app.service_type}</div>
                      <p class="text-[11px] text-slate-500 truncate mt-0.5" title="${app.problem_description}">
                        ${app.problem_description}
                      </p>
                    </td>

                    <!-- Date & Slot -->
                    <td class="px-5 py-4 whitespace-nowrap">
                      <div class="font-semibold text-slate-900">${app.appointment_date}</div>
                      <div class="text-[11px] text-slate-500">${app.appointment_time}</div>
                    </td>

                    <!-- Location with Map preview button -->
                    <td class="px-5 py-4 max-w-xs">
                      <div class="font-semibold text-slate-800 truncate">${app.address}</div>
                      <div class="text-[10px] text-slate-500 truncate">${app.city} (${app.pincode})</div>
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=${app.latitude || 28.6139},${app.longitude || 77.2090}" 
                        target="_blank" 
                        class="inline-flex items-center gap-1 text-[11px] font-bold text-[#DC2626] hover:underline mt-1">
                        <span>📍 Open Map</span>
                        <span class="font-mono text-[10px]">(${Number(app.latitude || 28.61).toFixed(2)}, ${Number(app.longitude || 77.20).toFixed(2)})</span>
                      </a>
                    </td>

                    <!-- Assigned Worker Dropdown -->
                    <td class="px-5 py-4 whitespace-nowrap">
                      <select 
                        data-appointment-id="${app.appointment_id}" 
                        class="admin-assign-worker-select p-2 rounded-lg border border-slate-300 font-bold text-xs ${
                          app.assigned_worker ? 'bg-blue-50 text-blue-900' : 'bg-amber-50 text-amber-900 border-amber-300'
                        }">
                        <option value="" ${!app.assigned_worker ? 'selected' : ''}>-- Unassigned --</option>
                        <option value="Aman Jumde" ${app.assigned_worker === 'Aman Jumde' ? 'selected' : ''}>⚡ Aman Jumde</option>
                        <option value="Nehal Jumde" ${app.assigned_worker === 'Nehal Jumde' ? 'selected' : ''}>❄️ Nehal Jumde</option>
                      </select>
                    </td>

                    <!-- Status Dropdown -->
                    <td class="px-5 py-4 whitespace-nowrap">
                      <select 
                        data-appointment-id="${app.appointment_id}" 
                        class="admin-change-status-select p-2 rounded-lg border font-bold text-xs ${statusColors[app.status] || 'bg-slate-100'}">
                        <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                        <option value="Assigned" ${app.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
                        <option value="On the Way" ${app.status === 'On the Way' ? 'selected' : ''}>On the Way</option>
                        <option value="In Progress" ${app.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${app.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${app.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                      </select>
                    </td>

                    <!-- Actions -->
                    <td class="px-5 py-4 text-right whitespace-nowrap">
                      <button 
                        data-action="inspect" 
                        data-appointment-id="${app.appointment_id}" 
                        class="btn-inspect-job px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors">
                        Details
                      </button>
                    </td>

                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  `;
}
