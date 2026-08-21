// Services Component - "What We Do"
import { ELECTRICAL_SERVICES, APPLIANCE_SERVICES } from '../data/mockData.js';

export function renderServices(activeTab = 'all', searchQuery = '') {
  const allServices = [
    ...ELECTRICAL_SERVICES.map(s => ({ ...s, isElectrical: true })),
    ...APPLIANCE_SERVICES.map(s => ({ ...s, isAppliance: true }))
  ];

  const filteredServices = allServices.filter(service => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'electrical' ? service.isElectrical :
      activeTab === 'appliance' ? service.isAppliance : true;

    const matchesSearch = searchQuery.trim() === '' ? true :
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getServiceEmoji = (title) => {
    const map = {
      "House Wiring": "🔌",
      "Electrical Fault Repair": "⚡",
      "Switch & Socket Repair": "🔘",
      "MCB / Fuse Repair": "🛡️",
      "Fan Installation & Repair": "💨",
      "Light / LED Installation": "💡",
      "Inverter Installation": "🔋",
      "Electrical Maintenance": "🛠️",
      "New Electrical Connection": "⚡",
      "Short-Circuit Inspection": "🚨",
      "Refrigerator": "🧊",
      "Washing Machine": "🧺",
      "Air Conditioner": "❄️",
      "Television": "📺",
      "Microwave Oven": "🍲",
      "Geyser / Water Heater": "🔥",
      "Cooler": "💨",
      "Mixer Grinder": "🌪️",
      "Ceiling Fan": "🌀",
      "Exhaust Fan": "🔄",
      "Water Pump": "💧",
      "Iron": "👔",
      "Other Home Appliances": "✨"
    };
    return map[title] || "🔧";
  };

  return `
    <section id="services" class="py-20 bg-slate-50 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <span>Our Expertise</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2C59] tracking-tight">
            What We Do
          </h2>
          <p class="text-base sm:text-lg text-slate-600">
            Professional doorstep electrical solutions and expert repair for all major home electrical appliances by certified BES technicians.
          </p>

          <!-- Search & Filter Controls -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <!-- Search input -->
            <div class="relative w-full sm:w-80">
              <input 
                type="text" 
                id="service-search-input" 
                value="${searchQuery}"
                placeholder="Search wiring, AC, fridge, MCB..." 
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59] focus:border-transparent shadow-sm"
              />
              <span class="absolute left-3.5 top-3 text-slate-400">🔍</span>
              ${searchQuery ? `<button id="clear-search-btn" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-sm">✕</button>` : ''}
            </div>

            <!-- Category Tabs -->
            <div class="flex items-center p-1 rounded-xl bg-slate-200/80 border border-slate-300 w-full sm:w-auto justify-center">
              <button data-tab="all" class="service-tab-btn px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-[#0F2C59] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }">
                All (${allServices.length})
              </button>
              <button data-tab="electrical" class="service-tab-btn px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'electrical' ? 'bg-[#0F2C59] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }">
                Electrical (${ELECTRICAL_SERVICES.length})
              </button>
              <button data-tab="appliance" class="service-tab-btn px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'appliance' ? 'bg-[#0F2C59] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }">
                Appliances (${APPLIANCE_SERVICES.length})
              </button>
            </div>
          </div>
        </div>

        <!-- Service Cards Grid -->
        ${filteredServices.length === 0 ? `
          <div class="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <span class="text-4xl">🔍</span>
            <h3 class="text-lg font-bold text-slate-800 mt-2">No matching services found</h3>
            <p class="text-sm text-slate-500 max-w-md mx-auto mt-1">Can't find what you are looking for? You can choose "Other Home Appliances" in the appointment form and describe your exact problem.</p>
            <button class="btn-book-now mt-4 px-6 py-2.5 rounded-xl bg-[#DC2626] text-white text-sm font-bold shadow-md hover:bg-red-700 transition-colors">
              Book Custom Service Now
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredServices.map(service => {
              const isApp = service.isAppliance;
              const emoji = getServiceEmoji(service.title);

              return `
                <div class="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                  
                  <!-- Top Accent Line -->
                  <div class="absolute top-0 left-0 right-0 h-1.5 ${isApp ? 'bg-gradient-to-r from-red-500 to-amber-500' : 'bg-gradient-to-r from-[#0F2C59] to-blue-600'}"></div>
                  
                  <div>
                    <!-- Header with Icon & Category Badge -->
                    <div class="flex items-start justify-between gap-4 mb-4">
                      <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${isApp ? 'bg-red-50 border border-red-100 text-red-600' : 'bg-blue-50 border border-blue-100 text-[#0F2C59]'} shadow-sm group-hover:scale-110 transition-transform">
                        ${emoji}
                      </div>

                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isApp ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-900'
                      }">
                        ${service.category}
                      </span>
                    </div>

                    <!-- Title -->
                    <h3 class="text-xl font-black text-slate-900 group-hover:text-[#0F2C59] transition-colors">
                      ${service.title}
                    </h3>

                    <!-- Description -->
                    <p class="text-sm text-slate-600 mt-2 leading-relaxed">
                      ${service.description}
                    </p>

                    <!-- Features or Common Issues Pills -->
                    ${service.features ? `
                      <div class="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                        ${service.features.map(f => `
                          <div class="flex items-center gap-2 text-xs text-slate-700">
                            <span class="text-emerald-600 font-bold">✓</span>
                            <span>${f}</span>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${service.commonIssues ? `
                      <div class="mt-4 pt-3 border-t border-slate-100">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Common Fixes:</div>
                        <div class="flex flex-wrap gap-1.5">
                          ${service.commonIssues.slice(0, 3).map(issue => `
                            <span class="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                              ${issue}
                            </span>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Card Footer with Book Now Button -->
                  <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div class="text-xs text-slate-500">
                      <span class="block font-semibold text-slate-800">Doorstep Visit</span>
                      <span>Verified Tech</span>
                    </div>

                    <button 
                      data-service-title="${service.title}"
                      data-service-category="${service.category}"
                      class="service-book-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-white ${
                        isApp ? 'bg-[#DC2626] hover:bg-red-700 shadow-red-500/20' : 'bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-blue-500/20'
                      } shadow-md transition-all active:scale-95">
                      <span>Book Now</span>
                      <span>→</span>
                    </button>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        `}

        <!-- Can't Find Your Appliance Banner -->
        <div class="mt-12 rounded-3xl bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#0A192F] p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4 text-center md:text-left">
            <div class="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-3xl flex-shrink-0">
              💡
            </div>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-white">Can't find your appliance or exact electrical problem?</h4>
              <p class="text-sm text-slate-300 mt-1">Select <strong>"Other Home Appliances"</strong> or <strong>"Electrical Fault Repair"</strong> and describe your problem. Our technicians will diagnose and fix it.</p>
            </div>
          </div>

          <button 
            data-service-title="Other Home Appliances" 
            data-service-category="Appliance"
            class="service-book-btn flex-shrink-0 px-6 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg transition-transform active:scale-95">
            Book Custom Service →
          </button>
        </div>

      </div>
    </section>
  `;
}
