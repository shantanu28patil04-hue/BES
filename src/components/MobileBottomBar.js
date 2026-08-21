// Mobile Sticky Bottom Action Bar
import { BUSINESS_INFO } from '../data/mockData.js';

export function renderMobileBottomBar() {
  return `
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
      <div class="grid grid-cols-3 gap-2">
        
        <!-- 1. Call Button -->
        <a href="tel:${BUSINESS_INFO.contact.phonePlaceholder}" class="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 transition-colors">
          <span class="text-lg leading-none">📞</span>
          <span class="text-[10.5px] font-bold mt-1">Call</span>
        </a>

        <!-- 2. Location Button -->
        <a href="#contact" class="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 transition-colors">
          <span class="text-lg leading-none">📍</span>
          <span class="text-[10.5px] font-bold mt-1">Location</span>
        </a>

        <!-- 3. Book Appointment CTA Button -->
        <button class="btn-book-now flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#DC2626] active:scale-95 text-white shadow-md transition-all">
          <span class="text-lg leading-none">📅</span>
          <span class="text-[10.5px] font-black mt-1">Book</span>
        </button>

      </div>
    </div>
  `;
}
