// Footer Component for BES – Best Engineering Services
import { BUSINESS_INFO } from '../data/mockData.js';
import { renderBrandLogo } from './BrandLogo.js';

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="bg-slate-950 text-slate-300 pt-16 pb-24 lg:pb-16 border-t border-slate-800 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          <!-- Brand Column -->
          <div class="lg:col-span-5 space-y-4">
            ${renderBrandLogo({ size: 'md', variant: 'white' })}
            
            <p class="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional doorstep electrician work and certified home appliance repair services. Fast location-based dispatch and safety standard compliance.
            </p>

            <div class="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 font-semibold">
                <span>👑 Owner: ${BUSINESS_INFO.owner.name}</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 font-semibold">
                <span>⚡ Certified Field Techs</span>
              </span>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="#home" class="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#services" class="hover:text-amber-400 transition-colors">Services ("What We Do")</a></li>
              <li><a href="#how-it-works" class="hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#about" class="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#contact" class="hover:text-amber-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <!-- Services List Column -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-white">Popular Repairs</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>House Wiring &amp; Faults</li>
              <li>Air Conditioner Service</li>
              <li>Refrigerator Repair</li>
              <li>Washing Machine Repair</li>
              <li>Inverter &amp; Battery Wiring</li>
              <li>Geyser / Water Heater</li>
            </ul>
          </div>

          <!-- Contact / Dispatch Info -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-white">Direct Assistance</h4>
            <div class="space-y-2 text-xs text-slate-400">
              <div class="flex items-center gap-2">
                <span>📞</span>
                <span class="font-mono text-white">${BUSINESS_INFO.contact.phonePlaceholder}</span>
              </div>
              <div class="flex items-center gap-2">
                <span>💬</span>
                <span class="font-mono text-white">WhatsApp Support</span>
              </div>
              <div class="flex items-center gap-2">
                <span>📍</span>
                <span>${BUSINESS_INFO.contact.addressPlaceholder}</span>
              </div>
              <div class="flex items-center gap-2">
                <span>⏰</span>
                <span class="text-amber-400 font-semibold">${BUSINESS_INFO.contact.serviceHours}</span>
              </div>
            </div>

            <div class="pt-2">
              <button class="btn-book-now w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#DC2626] hover:bg-red-700 shadow-md transition-colors">
                Book Technician Visit →
              </button>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; ${currentYear} <strong>BES – Best Engineering Services</strong>. All Rights Reserved.
          </div>
          <div class="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Owner: Shubham</span>
            <span>•</span>
            <span>Technicians: Aman Jumde &amp; Nehal Jumde</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
