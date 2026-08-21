// Login / Sign In Modal Component supporting Customer, Technician & Admin Owner Roles
import { renderBrandLogo } from './BrandLogo.js';

export function renderLoginModal(state) {
  const isVisible = state.isLoginOpen;
  if (!isVisible) return '';

  return `
    <div id="login-modal-overlay" class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div class="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#0A192F] text-white p-6 flex items-center justify-between border-b border-blue-900/50">
          <div class="flex items-center gap-2">
            ${renderBrandLogo({ size: 'sm', variant: 'white' })}
          </div>
          <button id="close-login-modal" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors focus:outline-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-6">
          <div class="text-center space-y-1">
            <h3 class="text-xl font-black text-slate-900">Sign In to BES Portal</h3>
            <p class="text-xs text-slate-500">Access your appointments, jobs or admin panel.</p>
          </div>

          <!-- Quick Selector Tabs (Roles) -->
          <div class="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-center">
            <button type="button" data-login-role="customer" id="tab-login-customer" class="login-role-tab-btn py-2 px-1 rounded-xl text-[11px] font-bold bg-[#0F2C59] text-white shadow-sm transition-all">
              👤 User
            </button>
            <button type="button" data-login-role="tech" id="tab-login-tech" class="login-role-tab-btn py-2 px-1 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-900 transition-all">
              ⚡ Technician
            </button>
            <button type="button" data-login-role="admin" id="tab-login-admin" class="login-role-tab-btn py-2 px-1 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-900 transition-all">
              👑 Admin
            </button>
          </div>

          <!-- Dynamic Role Form Content -->
          <div id="login-form-fields" class="space-y-4">
            <!-- Rendered dynamically below or in app.js. Defaults to Customer -->
            ${renderLoginFormFields('customer')}
          </div>

          <!-- Submit Button -->
          <button id="btn-login-submit" class="w-full py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#DC2626] hover:from-[#0A192F] hover:to-[#B91C1C] shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2">
            <span>Sign In Securely</span>
            <span>→</span>
          </button>
        </div>

        <!-- Footer / Switch to Signup -->
        <div class="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500">
          Demo Testing? Click credentials above to auto-fill.
        </div>

      </div>
    </div>
  `;
}

export function renderLoginFormFields(role) {
  if (role === 'customer') {
    return `
      <div class="space-y-3" animate-in fade-in>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Mobile Number or Email *</label>
          <input 
            type="text" 
            id="login-input-username" 
            placeholder="e.g. +91 98111 22334" 
            value="customer@example.com"
            class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Password *</label>
          <input 
            type="password" 
            id="login-input-password" 
            placeholder="••••••••" 
            value="customer123"
            class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
        </div>
        <div class="text-[11px] text-[#DC2626] font-bold">
          Pre-filled user/customer credentials loaded for testing.
        </div>
      </div>
    `;
  } else if (role === 'tech') {
    return `
      <div class="space-y-3" animate-in fade-in>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Select Technician Account *</label>
          <select id="login-tech-selector" class="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none">
            <option value="aman">⚡ Aman Jumde (Electrician)</option>
            <option value="nehal">❄️ Nehal Jumde (Electrician/Appliance)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Password *</label>
          <input 
            type="password" 
            id="login-input-password" 
            value="tech123"
            placeholder="••••••••" 
            class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>
    `;
  } else if (role === 'admin') {
    return `
      <div class="space-y-3" animate-in fade-in>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Admin Email *</label>
          <input 
            type="text" 
            id="login-input-username" 
            value="shubham@bes-services.com"
            placeholder="admin@bes-services.com" 
            class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Password *</label>
          <input 
            type="password" 
            id="login-input-password" 
            value="admin123"
            placeholder="••••••••" 
            class="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#0F2C59] focus:outline-none"
          />
        </div>
        <div class="text-[11px] text-amber-600 font-bold">
          Pre-filled owner/admin credentials for Shubham loaded.
        </div>
      </div>
    `;
  }
  return '';
}
