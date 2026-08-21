// Hero Section Component
import { renderBrandLogo } from './BrandLogo.js';

export function renderHero() {
  return `
    <section id="home" class="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0F2C59] to-[#0A192F] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      
      <!-- Background Ambient Glow & Tech Grid -->
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Copy & Actions -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <!-- Trust Badge Pill -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 shadow-sm animate-float">
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Trusted Doorstep Engineering &amp; Repair Services</span>
            </div>

            <!-- Main Heading -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">Electrician</span> &amp; <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">Home Appliance Repair</span> at Your Doorstep
            </h1>

            <!-- Subtitle -->
            <p class="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Book a trusted BES technician for electrical work and home appliance repair services. Fast doorstep visit, GPS location booking, and verified experts.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button class="btn-book-now w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] shadow-xl hover:shadow-red-600/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                <span class="text-xl">📅</span>
                <span>Book Appointment</span>
                <svg class="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>

              <a href="#services" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-base text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md hover:text-white transition-all duration-200">
                <span class="text-xl">🔧</span>
                <span>View Services</span>
              </a>
            </div>

            <!-- Key Feature Badges Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div class="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5 text-left">
                <span class="text-xl">⚡</span>
                <div>
                  <div class="text-xs font-bold text-white leading-tight">Fast Service</div>
                  <div class="text-[10px] text-slate-400">Quick response</div>
                </div>
              </div>

              <div class="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5 text-left">
                <span class="text-xl">📍</span>
                <div>
                  <div class="text-xs font-bold text-white leading-tight">GPS Booking</div>
                  <div class="text-[10px] text-slate-400">Pinpoint address</div>
                </div>
              </div>

              <div class="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5 text-left">
                <span class="text-xl">🔧</span>
                <div>
                  <div class="text-xs font-bold text-white leading-tight">Skilled Techs</div>
                  <div class="text-[10px] text-slate-400">Aman &amp; Nehal</div>
                </div>
              </div>

              <div class="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5 text-left">
                <span class="text-xl">🏠</span>
                <div>
                  <div class="text-xs font-bold text-white leading-tight">Doorstep</div>
                  <div class="text-[10px] text-slate-400">At your home</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Visual Card & Interactive Quick Service Launcher -->
          <div class="lg:col-span-5 relative">
            
            <!-- Glassmorphism Card Frame -->
            <div class="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden">
              
              <!-- Subtle decorative lighting corner -->
              <div class="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl"></div>

              <!-- Brand Logo Card Header -->
              <div class="flex items-center justify-between pb-6 border-b border-white/15">
                <div>
                  ${renderBrandLogo({ size: 'md', variant: 'white' })}
                </div>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online Dispatch
                </span>
              </div>

              <!-- Service Illustration / Showcase Area -->
              <div class="py-6 space-y-4">
                <div class="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-between">
                  <span>Quick Service Select</span>
                  <span class="text-[10px] text-slate-300 font-normal">Click to book</span>
                </div>

                <!-- Interactive Quick Tiles -->
                <div class="grid grid-cols-2 gap-2.5">
                  <button data-quick-service="House Wiring" data-quick-category="Electrical" class="quick-service-tile text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:border-amber-400/50 group">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">🔌</span>
                      <span class="text-slate-400 group-hover:text-amber-300 transition-colors text-xs font-bold">Book →</span>
                    </div>
                    <div class="font-bold text-sm text-white mt-1.5">House Wiring</div>
                    <div class="text-[10px] text-slate-300">Concealed &amp; Open</div>
                  </button>

                  <button data-quick-service="Air Conditioner" data-quick-category="Appliance" class="quick-service-tile text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:border-amber-400/50 group">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">❄️</span>
                      <span class="text-slate-400 group-hover:text-amber-300 transition-colors text-xs font-bold">Book →</span>
                    </div>
                    <div class="font-bold text-sm text-white mt-1.5">AC Repair</div>
                    <div class="text-[10px] text-slate-300">Cooling &amp; Gas Refill</div>
                  </button>

                  <button data-quick-service="Refrigerator" data-quick-category="Appliance" class="quick-service-tile text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:border-amber-400/50 group">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">🧊</span>
                      <span class="text-slate-400 group-hover:text-amber-300 transition-colors text-xs font-bold">Book →</span>
                    </div>
                    <div class="font-bold text-sm text-white mt-1.5">Refrigerator</div>
                    <div class="text-[10px] text-slate-300">Single &amp; Double Door</div>
                  </button>

                  <button data-quick-service="Electrical Fault Repair" data-quick-category="Electrical" class="quick-service-tile text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:border-amber-400/50 group">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">⚡</span>
                      <span class="text-slate-400 group-hover:text-amber-300 transition-colors text-xs font-bold">Book →</span>
                    </div>
                    <div class="font-bold text-sm text-white mt-1.5">Fault &amp; MCB Fix</div>
                    <div class="text-[10px] text-slate-300">Emergency 24/7</div>
                  </button>
                </div>

                <!-- Emergency Banner -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-r from-red-600/30 to-amber-600/20 border border-red-500/30 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl animate-bounce">🚨</span>
                    <div>
                      <div class="text-xs font-bold text-white">Emergency Short Circuit / Spark?</div>
                      <div class="text-[10px] text-red-200">Immediate technician priority dispatch</div>
                    </div>
                  </div>
                  <button data-quick-service="Short-Circuit Inspection" data-quick-category="Electrical" data-emergency="true" class="quick-service-tile px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md">
                    Urgent
                  </button>
                </div>

              </div>

              <!-- Card Footer: Technician Live Status -->
              <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Technicians on duty: <strong class="text-white">Aman &amp; Nehal</strong></span>
                </div>
                <span class="text-amber-300 font-semibold">Ready to Visit</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  `;
}
