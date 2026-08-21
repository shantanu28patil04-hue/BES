// About Us Component - Team & Mission
import { BUSINESS_INFO } from '../data/mockData.js';
import { renderBrandLogo } from './BrandLogo.js';

export function renderAboutUs() {
  return `
    <section id="about" class="py-20 bg-slate-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
            Who We Are
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2C59] tracking-tight">
            About BES
          </h2>
          <p class="text-base sm:text-lg text-slate-600">
            BES – Best Engineering Services provides electrician and home appliance repair services with a convenient doorstep appointment system.
          </p>
        </div>

        <!-- Main About Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <!-- Left Column: Story & Core Values -->
          <div class="lg:col-span-6 space-y-6">
            <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div class="mb-4">
                ${renderBrandLogo({ size: 'md', variant: 'full' })}
              </div>
              <h3 class="text-2xl font-black text-slate-900">
                Precision Engineering for Your Home &amp; Appliances
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                Founded with a vision to streamline home repairs, BES – Best Engineering Services bridges the gap between homeowners and skilled technicians. We combine electrical expertise with modern location-based scheduling so you never have to wait blindly for a repairman.
              </p>
              <p class="text-sm text-slate-600 leading-relaxed">
                From emergency short-circuit fault diagnostics to advanced inverter setups and multi-brand appliance servicing, our team operates with strict safety compliance, genuine component fittings, and transparent work reporting.
              </p>

              <!-- Highlights row -->
              <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xl font-bold text-[#0F2C59]">Doorstep</div>
                  <div class="text-xs text-slate-500">Service at your location</div>
                </div>
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xl font-bold text-[#DC2626]">Safety First</div>
                  <div class="text-xs text-slate-500">Standardized protocol</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Owner Card (Shubham) -->
          <div class="lg:col-span-6">
            <div class="bg-gradient-to-br from-[#0F2C59] to-[#0A192F] text-white rounded-3xl p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
              
              <!-- Subtle decorative badge -->
              <div class="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
                Leadership
              </div>

              <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <!-- Owner Avatar -->
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 p-1 flex-shrink-0 shadow-lg">
                  <div class="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-4xl">
                    👨‍💼
                  </div>
                </div>

                <!-- Details -->
                <div class="text-center sm:text-left space-y-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Business Owner &amp; Lead</span>
                  <h4 class="text-2xl font-black text-white">${BUSINESS_INFO.owner.name}</h4>
                  <p class="text-xs sm:text-sm text-slate-300">
                    Overseeing quality assurance, customer dispatch, and technical service delivery across all residential and commercial appointments.
                  </p>
                  
                  <!-- Contact placeholder -->
                  <div class="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10">
                      📞 <span>Contact via Admin</span>
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10">
                      📍 <span>Central Dispatch Hub</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Owner commitment quote -->
              <div class="mt-6 pt-6 border-t border-white/10 text-xs italic text-slate-300 flex items-center gap-3">
                <span class="text-amber-400 text-xl font-serif">“</span>
                <span>Our commitment is reliable electrical safety, honest diagnostics, and hassle-free doorstep repair for every household.</span>
              </div>

            </div>
          </div>

        </div>

        <!-- Service Technicians Section -->
        <div class="space-y-6">
          <div class="text-center max-w-2xl mx-auto">
            <span class="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Our Field Experts</span>
            <h3 class="text-2xl sm:text-3xl font-black text-[#0F2C59] mt-1">Service Technicians</h3>
            <p class="text-sm text-slate-600">The skilled professionals dispatched to your location for electrical and appliance repairs.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            <!-- Aman Jumde -->
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div class="w-20 h-20 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
                ⚡
              </div>
              <div class="text-center sm:text-left space-y-1.5 flex-1">
                <div class="flex items-center justify-center sm:justify-between">
                  <h4 class="text-xl font-black text-slate-900">Aman Jumde</h4>
                  <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
                </div>
                <div class="text-xs font-bold text-blue-700 uppercase tracking-wide">Electrician / Service Technician</div>
                <p class="text-xs text-slate-600 pt-1">
                  Expertise in house wiring, short-circuit troubleshooting, switch/socket replacements, MCB boards, and heavy appliance repair.
                </p>
                <div class="pt-2 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 font-semibold">
                  <span>🛠️ Certified Technician</span>
                  <span>•</span>
                  <span>📍 GPS Field Unit</span>
                </div>
              </div>
            </div>

            <!-- Nehal Jumde -->
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div class="w-20 h-20 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
                ❄️
              </div>
              <div class="text-center sm:text-left space-y-1.5 flex-1">
                <div class="flex items-center justify-center sm:justify-between">
                  <h4 class="text-xl font-black text-slate-900">Nehal Jumde</h4>
                  <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
                </div>
                <div class="text-xs font-bold text-[#DC2626] uppercase tracking-wide">Electrician / Service Technician</div>
                <p class="text-xs text-slate-600 pt-1">
                  Specialized in air conditioners, refrigerators, washing machines, microwave ovens, geysers, and domestic electronics.
                </p>
                <div class="pt-2 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 font-semibold">
                  <span>🛠️ Certified Technician</span>
                  <span>•</span>
                  <span>📍 GPS Field Unit</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `;
}
