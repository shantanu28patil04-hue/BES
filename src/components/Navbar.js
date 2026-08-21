// Navbar Component with Role Switcher & Mobile Menu
import { renderBrandLogo } from './BrandLogo.js';

export function renderNavbar(state, onRoleChange, onNavigate, onOpenBooking) {
  const currentRole = state.currentRole || 'customer';
  const pendingCount = state.appointments.filter(a => a.status === 'Pending').length;
  const inProgressCount = state.appointments.filter(a => a.status === 'In Progress' || a.status === 'On the Way').length;

  return `
    <!-- Top Demo / Persona Bar -->
    <aside aria-label="Portal Navigation" class="bg-[#0A192F] text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="font-semibold text-slate-300 hidden sm:inline">Active Portal View:</span>
          <span class="font-bold text-amber-400 uppercase tracking-wider text-[11px] sm:text-xs">
            ${
              currentRole === 'customer' ? '👤 Customer Portal' :
              currentRole === 'owner' ? '👑 Owner Admin (Shubham)' :
              currentRole === 'tech-aman' ? '⚡ Technician (Aman Jumde)' :
              currentRole === 'tech-nehal' ? '🔧 Technician (Nehal Jumde)' :
              '📍 Live Job Tracker'
            }
          </span>
        </div>

        <!-- Role Selector Buttons -->
        <div class="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <button data-role="customer" class="role-btn px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
            currentRole === 'customer' ? 'bg-[#DC2626] text-white shadow-sm font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }">
            Customer
          </button>
          
          <button data-role="owner" class="role-btn px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
            currentRole === 'owner' ? 'bg-[#0F2C59] text-amber-300 border border-amber-400/40 shadow-sm font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }">
            <span>Owner</span>
            ${pendingCount > 0 ? `<span class="bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full">${pendingCount}</span>` : ''}
          </button>

          <button data-role="tech-aman" class="role-btn px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
            currentRole === 'tech-aman' ? 'bg-blue-600 text-white shadow-sm font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }">
            <span>Aman (Tech)</span>
          </button>

          <button data-role="tech-nehal" class="role-btn px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
            currentRole === 'tech-nehal' ? 'bg-indigo-600 text-white shadow-sm font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }">
            <span>Nehal (Tech)</span>
          </button>

          <button data-role="tracker" class="role-btn px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
            currentRole === 'tracker' ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }">
            Track ID
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Navigation Bar -->
    <header class="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-8 z-40 shadow-sm transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo Link -->
          <a href="#home" class="nav-link flex items-center cursor-pointer transition-transform hover:scale-[1.01]" data-target="home">
            ${renderBrandLogo({ size: 'md', variant: 'full' })}
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-1 lg:gap-2">
            <a href="#home" data-target="home" class="nav-link px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-50 rounded-lg transition-colors">
              Home
            </a>
            <a href="#services" data-target="services" class="nav-link px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-50 rounded-lg transition-colors">
              Services
            </a>
            <a href="#how-it-works" data-target="how-it-works" class="nav-link px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-50 rounded-lg transition-colors">
              How It Works
            </a>
            <a href="#about" data-target="about" class="nav-link px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-50 rounded-lg transition-colors">
              About Us
            </a>
            <a href="#contact" data-target="contact" class="nav-link px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-50 rounded-lg transition-colors">
              Contact
            </a>
          </nav>

          <!-- Action Buttons -->
          <div class="hidden sm:flex items-center gap-3">
            <!-- 24/7 Helpline Pill -->
            <a href="tel:+919876543210" class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>24/7 Helpline: <strong class="text-[#0F2C59]">Call Now</strong></span>
            </a>

            <!-- Sign In / Profile Display -->
            <div id="navbar-auth-section" class="flex items-center gap-2">
              ${state.currentUser ? `
                <div class="flex items-center gap-2 bg-slate-100/80 border border-slate-200 px-3 py-1.5 rounded-xl">
                  <div class="text-left leading-none">
                    <span class="text-[9px] font-bold text-slate-400 block uppercase">Role: ${state.currentUser.role}</span>
                    <strong class="text-xs font-black text-[#0F2C59]">${state.currentUser.name}</strong>
                  </div>
                  <button id="btn-navbar-logout" class="text-[11px] font-bold text-red-600 hover:text-red-800 transition-colors pl-2 border-l border-slate-200">
                    Sign Out
                  </button>
                </div>
              ` : `
                <button id="btn-navbar-login" class="px-4.5 py-2.5 rounded-xl text-xs font-black border-2 border-[#0F2C59] text-[#0F2C59] hover:bg-slate-50 transition-all active:scale-95">
                  Sign In
                </button>
              `}
            </div>

            <!-- Prominent Appointment CTA -->
            <button id="nav-book-btn" class="btn-book-now inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#DC2626] hover:from-[#0A192F] hover:to-[#B91C1C] shadow-md hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150">
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"></line>
                <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"></line>
                <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"></line>
              </svg>
              <span>Book Appointment</span>
            </button>
          </div>

          <!-- Mobile Hamburger Toggle -->
          <div class="flex items-center gap-2 md:hidden">
            <button id="btn-navbar-login-mobile" class="px-2.5 py-1.5 rounded-lg text-xs font-black border border-[#0F2C59] text-[#0F2C59]">
              ${state.currentUser ? 'Profile' : 'Sign In'}
            </button>
            <button id="nav-book-btn-mobile" class="btn-book-now px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#DC2626] shadow-sm">
              Book
            </button>
            <button id="mobile-menu-toggle" aria-label="Open Menu" class="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]">
              <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-slate-100 bg-white/98 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
        <a href="#home" data-target="home" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100">
          <svg class="w-5 h-5 text-[#0F2C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Home
        </a>
        <a href="#services" data-target="services" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100">
          <svg class="w-5 h-5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Services ("What We Do")
        </a>
        <a href="#how-it-works" data-target="how-it-works" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100">
          <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          How It Works
        </a>
        <a href="#about" data-target="about" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          About Us (Shubham & Team)
        </a>
        <a href="#contact" data-target="contact" class="mobile-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100">
          <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          Contact Us
        </a>

        <div class="pt-2 border-t border-slate-100 space-y-2">
          ${state.currentUser ? `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span class="text-[9px] font-bold text-slate-400 block uppercase">Role: ${state.currentUser.role}</span>
                <strong class="text-xs font-black text-slate-800">${state.currentUser.name}</strong>
              </div>
              <button id="btn-navbar-logout-mobile" class="text-xs font-bold text-red-600">
                Sign Out
              </button>
            </div>
          ` : `
            <button id="btn-navbar-login-drawer" class="w-full py-2.5 px-4 rounded-xl text-xs font-black border border-slate-300 bg-white text-slate-800">
              Sign In to Account
            </button>
          `}

          <button class="btn-book-now w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#0F2C59] via-[#1E3A8A] to-[#DC2626] shadow-md flex items-center justify-center gap-2">
            <svg class="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"></line><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"></line><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"></line></svg>
            Book Appointment Now
          </button>
        </div>
      </div>
    </header>
  `;
}
