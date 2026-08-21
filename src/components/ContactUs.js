// Contact Us Component - Editable Placeholders & Quick Action Buttons
import { BUSINESS_INFO } from '../data/mockData.js';

export function renderContactUs() {
  const { contact } = BUSINESS_INFO;

  return `
    <section id="contact" class="py-20 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2C59] tracking-tight">
            Contact BES
          </h2>
          <p class="text-base sm:text-lg text-slate-600">
            Reach out directly for service inquiries, emergency repairs, or schedule your doorstep visit.
          </p>
        </div>

        <!-- 4 Primary Action Buttons Grid (Required) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-14">
          
          <!-- 1. Call Button -->
          <a href="tel:${contact.phonePlaceholder}" class="group bg-slate-50 hover:bg-[#0F2C59] rounded-3xl p-6 border border-slate-200 hover:border-[#0F2C59] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-blue-100 group-hover:bg-white/20 text-blue-900 group-hover:text-amber-300 flex items-center justify-center text-3xl mb-4 transition-colors">
              📞
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-300">Direct Voice</span>
            <h3 class="text-xl font-black text-slate-900 group-hover:text-white mt-1">Call</h3>
            <p class="text-xs text-slate-500 group-hover:text-slate-200 mt-2 font-mono">${contact.phonePlaceholder}</p>
            <span class="mt-4 px-4 py-1.5 rounded-xl bg-white group-hover:bg-amber-400 text-slate-900 font-bold text-xs shadow-sm transition-colors">
              Call Now →
            </span>
          </a>

          <!-- 2. WhatsApp Button -->
          <a href="https://wa.me/?text=Hello%20BES%2C%20I%20would%20like%20to%20book%20a%20service" target="_blank" rel="noopener noreferrer" class="group bg-slate-50 hover:bg-emerald-700 rounded-3xl p-6 border border-slate-200 hover:border-emerald-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-100 group-hover:bg-white/20 text-emerald-800 group-hover:text-white flex items-center justify-center text-3xl mb-4 transition-colors">
              💬
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-200">Instant Chat</span>
            <h3 class="text-xl font-black text-slate-900 group-hover:text-white mt-1">WhatsApp</h3>
            <p class="text-xs text-slate-500 group-hover:text-emerald-100 mt-2 font-mono">${contact.whatsappPlaceholder}</p>
            <span class="mt-4 px-4 py-1.5 rounded-xl bg-white group-hover:bg-white text-emerald-800 font-bold text-xs shadow-sm transition-colors">
              Chat on WhatsApp →
            </span>
          </a>

          <!-- 3. Book Appointment Button -->
          <button class="btn-book-now group bg-slate-50 hover:bg-[#DC2626] rounded-3xl p-6 border border-slate-200 hover:border-[#DC2626] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-red-100 group-hover:bg-white/20 text-red-700 group-hover:text-amber-300 flex items-center justify-center text-3xl mb-4 transition-colors">
              📅
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-200">Online Scheduler</span>
            <h3 class="text-xl font-black text-slate-900 group-hover:text-white mt-1">Book Appointment</h3>
            <p class="text-xs text-slate-500 group-hover:text-slate-100 mt-2">Pick date, time &amp; GPS location</p>
            <span class="mt-4 px-4 py-1.5 rounded-xl bg-white group-hover:bg-white text-[#DC2626] font-bold text-xs shadow-sm transition-colors">
              Book Online →
            </span>
          </button>

          <!-- 4. Service Location Button -->
          <a href="#service-map" id="service-loc-btn" class="group bg-slate-50 hover:bg-[#0A192F] rounded-3xl p-6 border border-slate-200 hover:border-[#0A192F] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-amber-100 group-hover:bg-white/20 text-amber-800 group-hover:text-amber-300 flex items-center justify-center text-3xl mb-4 transition-colors">
              📍
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-300">Coverage Hub</span>
            <h3 class="text-xl font-black text-slate-900 group-hover:text-white mt-1">Service Location</h3>
            <p class="text-xs text-slate-500 group-hover:text-slate-300 mt-2">${contact.addressPlaceholder}</p>
            <span class="mt-4 px-4 py-1.5 rounded-xl bg-white group-hover:bg-amber-400 text-slate-900 font-bold text-xs shadow-sm transition-colors">
              View Coverage →
            </span>
          </a>

        </div>

        <!-- Contact Information Details & Working Hours -->
        <div class="rounded-3xl bg-slate-100 p-8 border border-slate-200 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div class="space-y-1">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Service Hours</div>
            <div class="text-sm font-black text-slate-900">${contact.serviceHours}</div>
            <div class="text-xs text-slate-500">Emergency support active</div>
          </div>

          <div class="space-y-1">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Email Inquiry</div>
            <div class="text-sm font-black text-slate-900 font-mono">${contact.emailPlaceholder}</div>
            <div class="text-xs text-slate-500">Response within 2 hours</div>
          </div>

          <div class="space-y-1">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Central Center</div>
            <div class="text-sm font-black text-slate-900">${contact.addressPlaceholder}</div>
            <div class="text-xs text-slate-500">Doorstep dispatch across city</div>
          </div>

        </div>

      </div>
    </section>
  `;
}
