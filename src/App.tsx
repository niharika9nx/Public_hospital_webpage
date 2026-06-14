import React, { useState, useEffect } from "react";
import { HeartPulse, Home as HomeIcon, CalendarRange, HeartHandshake, PhoneCall, ShieldAlert, Clock, Mail, Phone, MapPin } from "lucide-react";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";

type Tab = "home" | "booking" | "volunteer" | "contact";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            onNavigateToBooking={() => setActiveTab("booking")}
            onNavigateToVolunteer={() => setActiveTab("volunteer")}
          />
        );
      case "booking":
        return <Appointment />;
      case "volunteer":
        return <Volunteer />;
      case "contact":
        return <Contact />;
      default:
        return <Home onNavigateToBooking={() => setActiveTab("booking")} onNavigateToVolunteer={() => setActiveTab("volunteer")} />;
    }
  };

  return (
    <div id="healthcare-portal-app" className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased">
      
      {/* GLOBAL EMERGENCY ALERT BAR (ADVISORY) */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4 font-semibold text-center flex items-center justify-center gap-1.5 border-b border-emerald-950">
        <ShieldAlert className="h-4 w-4 text-emerald-300 animate-pulse flex-shrink-0" />
        <span>
          <strong>Medical Portal Advisory:</strong> For immediate trauma, urgent medical situations, or crisis assistance, please call 911 or visit the nearest emergency department.
        </span>
      </div>

      {/* STICKY HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo / Title brand */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="p-2 bg-emerald-600 rounded-xl text-white group-hover:bg-emerald-700 transition-colors shadow-sm">
              <HeartPulse className="h-5.5 w-5.5" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                CHSP Portal
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:block">
                Community Healthcare Support
              </p>
            </div>
          </div>

          {/* DESKTOP NAV TABS */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-routing-nav">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "home"
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "booking"
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <CalendarRange className="h-4 w-4" />
              Appointment & Copilot
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "volunteer"
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              Volunteer Program
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "contact"
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              Contact
            </button>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* MOBILE MENU EXTENSION */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-3 space-y-1 animate-fade-in text-left">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "home" ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "booking" ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CalendarRange className="h-4 w-4" />
              Appointment & Chatbot
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "volunteer" ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              Volunteer Program
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "contact" ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              Contact
            </button>
          </div>
        )}
      </header>

      {/* CENTRAL COMPONENT BODY SECTION */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderActiveComponent()}
      </main>

      {/* GLOBAL HIGH QUALITY FOOTER */}
      <footer className="bg-slate-900 text-slate-350 border-t border-slate-850/50 pt-16 pb-8 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Logo & Overview */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Community Healthcare Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              An outpatient portal dedicated to lowering barriers to high-quality care, resource coordination, and specialized volunteer collaboration.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Portal Navigation</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => setActiveTab("home")} className="text-left hover:text-white transition-colors cursor-pointer">
                Landing Page & Mission
              </button>
              <button onClick={() => setActiveTab("booking")} className="text-left hover:text-white transition-colors cursor-pointer">
                Clinics Scheduling & Copilot
              </button>
              <button onClick={() => setActiveTab("volunteer")} className="text-left hover:text-white transition-colors cursor-pointer">
                Volunteer Registration Form
              </button>
              <button onClick={() => setActiveTab("contact")} className="text-left hover:text-white transition-colors cursor-pointer">
                Get in Touch & OPD Hours
              </button>
            </div>
          </div>

          {/* Address & Hotline particulars */}
          <div className="md:col-span-5 space-y-4 text-xs">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">General Operational Coordinates</h4>
            
            <div className="space-y-2.5 leading-relaxed text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>104 Hope Care Boulevard, Medical District, Metropolis</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>support@communityhealthcareportal.org</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 321-4321</span>
              </div>
              <div className="flex items-start gap-2 text-rose-400">
                <ShieldAlert className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0 animate-pulse" />
                <span>Crisis Hotline: +1 (555) 911-3000 (Active 24/7)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center text-[10px] space-y-3">
          <p className="text-slate-500 max-w-4xl mx-auto leading-relaxed">
            <strong>Educational Portal Disclaimer:</strong> This portal is a mock prototype designed for educational demonstration purposes. Interactive chat is automated and does not replace professional medical advice, clinical diagnosis, or prescriptive therapy.
          </p>
          <p className="text-slate-600 font-semibold">
            &copy; 2026 Community Healthcare Support Portal.
          </p>
        </div>
      </footer>

    </div>
  );
}
