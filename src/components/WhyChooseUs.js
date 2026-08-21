// Why Choose BES Component - 8 Core Pillars (Strictly no unsupported claims)

export function renderWhyChooseUs() {
  const benefits = [
    {
      icon: "⚡",
      title: "Fast Service",
      desc: "Prompt technician response and quick dispatch for electrical issues and urgent repairs."
    },
    {
      icon: "🔧",
      title: "Skilled Technicians",
      desc: "Certified electrical technicians equipped with professional diagnostic tools."
    },
    {
      icon: "🏠",
      title: "Doorstep Service",
      desc: "No need to transport heavy appliances; all repairs and wiring work are done right at your home."
    },
    {
      icon: "📍",
      title: "Location-Based Booking",
      desc: "Accurate GPS and interactive map pin placement ensures the technician reaches your exact doorstep."
    },
    {
      icon: "🛠️",
      title: "Multiple Appliance Repairs",
      desc: "One-stop service for refrigerators, washing machines, ACs, TVs, geysers, fans, and more."
    },
    {
      icon: "📅",
      title: "Easy Appointment Booking",
      desc: "Simple, flexible scheduling allowing you to pick your preferred date and time slot."
    },
    {
      icon: "💯",
      title: "Quality Service",
      desc: "High workmanship standards, safety-first electrical compliance, and genuine replacement parts."
    },
    {
      icon: "📞",
      title: "Easy Customer Support",
      desc: "Direct communication with our team and technicians before, during, and after your service visit."
    }
  ];

  return `
    <section class="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      <!-- Subtle background radial gradient -->
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            Our Advantages
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why Choose BES?
          </h2>
          <p class="text-base sm:text-lg text-slate-300">
            Engineered for reliability, safety, and transparent home electrical services.
          </p>
        </div>

        <!-- 8 Benefit Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${benefits.map((b, idx) => `
            <div class="bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-3xl p-6 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ${b.icon}
                </div>
                <h3 class="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  ${b.title}
                </h3>
                <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  ${b.desc}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-400 font-semibold">
                <span>BES Standard</span>
                <span>✓</span>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </section>
  `;
}
