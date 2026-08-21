// How It Works Component - 4 Step Booking Journey

export function renderHowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Select Service",
      desc: "Choose electrician or appliance repair service from our comprehensive catalog.",
      icon: "⚡",
      badge: "Step 1",
      color: "from-blue-600 to-indigo-600"
    },
    {
      num: "02",
      title: "Book Appointment",
      desc: "Select date and preferred time slot that matches your convenience.",
      icon: "📅",
      badge: "Step 2",
      color: "from-indigo-600 to-purple-600"
    },
    {
      num: "03",
      title: "Share Location",
      desc: "Use GPS auto-detect, place a map pin or enter your address manually.",
      icon: "📍",
      badge: "Step 3",
      color: "from-red-600 to-rose-600"
    },
    {
      num: "04",
      title: "Technician Visit",
      desc: "BES technician visits your doorstep with proper tools and completes the job.",
      icon: "🛠️",
      badge: "Step 4",
      color: "from-amber-500 to-yellow-600"
    }
  ];

  return `
    <section id="how-it-works" class="py-20 bg-white relative overflow-hidden">
      
      <!-- Background subtle graphics -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold uppercase tracking-wider">
            Simple Process
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2C59] tracking-tight">
            How It Works
          </h2>
          <p class="text-base sm:text-lg text-slate-600">
            Booking a professional technician with BES is fast, seamless, and location-accurate.
          </p>
        </div>

        <!-- 4 Step Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          <!-- Connector line for desktop -->
          <div class="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 -translate-y-8 z-0 opacity-20"></div>

          ${steps.map((step, idx) => `
            <div class="relative z-10 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#0F2C59] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              
              <!-- Top Row: Number & Icon -->
              <div>
                <div class="flex items-center justify-between mb-6">
                  <span class="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.color}">
                    ${step.num}
                  </span>
                  
                  <div class="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    ${step.icon}
                  </div>
                </div>

                <span class="inline-block px-2.5 py-0.5 rounded-md bg-white text-slate-700 font-bold text-[11px] uppercase tracking-wider border border-slate-200 mb-2">
                  ${step.badge}
                </span>

                <h3 class="text-xl font-black text-slate-900 group-hover:text-[#0F2C59] transition-colors">
                  ${step.title}
                </h3>

                <p class="text-sm text-slate-600 mt-2 leading-relaxed">
                  ${step.desc}
                </p>
              </div>

              <!-- Bottom Indicator -->
              <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-[#0F2C59]">
                <span>Doorstep Execution</span>
                <span>✓</span>
              </div>

            </div>
          `).join('')}

        </div>

        <!-- CTA Trigger -->
        <div class="mt-14 text-center">
          <button class="btn-book-now inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-lg hover:shadow-blue-900/25 transition-all transform hover:-translate-y-0.5">
            <span>📅 Start Your Booking Now</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  `;
}
