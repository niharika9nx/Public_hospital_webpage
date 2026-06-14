import React, { useState, useEffect } from "react";
import {
  HeartPulse,
  Home as HomeIcon,
  CalendarRange,
  HeartHandshake,
  PhoneCall,
  ShieldAlert,
  Clock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import GlobalChatbot from "./components/GlobalChatbot";
import brandLogo from "../community_health_care.png";

type Tab = "home" | "booking" | "volunteer" | "contact";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll transparency detector for premium navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        return (
          <Home
            onNavigateToBooking={() => setActiveTab("booking")}
            onNavigateToVolunteer={() => setActiveTab("volunteer")}
          />
        );
    }
  };

  return (
    <div
      id="healthcare-portal-app"
      className="min-h-screen bg-bg-app flex flex-col font-sans text-stone-850 antialiased"
    >
      
      {/* GLOBAL DISASTER/CRITICAL HEALTH ADVISORY (CRITICAL GROUNDED MED WARNING) */}
      <div className="bg-gradient-to-r from-soft-teal to-fresh-green text-white text-xs pt-6.5 pb-5 px-6 sm:px-8 font-bold text-center flex items-center justify-center gap-2.5 border-b border-fresh-green/20">
        <ShieldAlert className="h-5 w-5 text-amber-brand animate-pulse flex-shrink-0" />
        <span className="leading-relaxed">
          <strong>Medical Portal Advisory:</strong> For immediate critical trauma, clinical emergency care, or extreme distress, call 911 immediately or visit the nearest physical emergency clinic slot.
        </span>
      </div>

      {/* STICKY TRANSITING HEADER NAVIGATION */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-stone-200/50"
            : "bg-white/95 backdrop-blur-md py-5 border-b border-stone-200/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Title brand */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="h-11 w-11 bg-white rounded-2xl overflow-hidden shadow-xs flex items-center justify-center p-1 border border-stone-200 group-hover:border-fresh-green transition-colors">
              <img
                src={brandLogo}
                alt="CHSP Logo"
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="font-display font-extrabold text-stone-900 group-hover:text-fresh-green transition-colors text-base tracking-tight leading-none block">
                CHSP Portal
              </span>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1 hidden sm:block">
                Community Outpatient Support
              </p>
            </div>
          </div>

          {/* DESKTOP NAV TABS (AMBER & FRESH GREEN THEMED ACCENT STYLING) */}
          <nav className="hidden md:flex items-center gap-1.5" id="desktop-routing-nav">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "home"
                  ? "bg-fresh-green/10 text-emerald-800 border border-fresh-green/20 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/40"
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "booking"
                  ? "bg-fresh-green/10 text-emerald-800 border border-fresh-green/20 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/40"
              }`}
            >
              <CalendarRange className="h-4 w-4" />
              <span>OPD Consultation</span>
            </button>
            
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "volunteer"
                  ? "bg-fresh-green/10 text-emerald-800 border border-fresh-green/20 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/40"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Volunteer Intake</span>
            </button>
            
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "contact"
                  ? "bg-fresh-green/10 text-emerald-800 border border-fresh-green/20 shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/40"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>Contact Coordinates</span>
            </button>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none cursor-pointer"
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
          <div className="md:hidden bg-white border-b border-stone-200/50 px-4 py-3 space-y-1 animate-fade-in text-left shadow-md">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "home" ? "bg-fresh-green/10 text-emerald-800 font-extrabold" : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "booking" ? "bg-fresh-green/10 text-emerald-800 font-extrabold" : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              <CalendarRange className="h-4 w-4" />
              <span>OPD Consultation</span>
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "volunteer" ? "bg-fresh-green/10 text-emerald-800 font-extrabold" : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Volunteer Program</span>
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "contact" ? "bg-fresh-green/10 text-emerald-800 font-extrabold" : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>Contact Addresses</span>
            </button>
          </div>
        )}
      </header>

      {/* CENTRAL COMPONENT BODY SECTION WITH ENHANCED NEGATIVE SPACE */}
      <main className="flex-1 w-full">
        {renderActiveComponent()}
      </main>

      {/* GLOBAL COZY FOOTER (WARM SYSTEM) */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-stone-800">
          
          {/* Logo & Overview */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 bg-white rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-stone-800">
                <img
                  src={brandLogo}
                  alt="CHSP Logo"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-extrabold text-[#fcfaf7] text-base tracking-tight leading-none block">
                Community Healthcare Portal
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-medium">
              A community outpatient portal dedicated to lowering administrative barriers to clinics, coordinating helper rosters, and delivering local search assistance inside Metropolis.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-widest text-stone-300">
              Portal Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-stone-400 font-semibold">
              <button
                onClick={() => setActiveTab("home")}
                className="text-left hover:text-fresh-green transition-colors cursor-pointer"
              >
                Home Overview & Staff
              </button>
              <button
                onClick={() => setActiveTab("booking")}
                className="text-left hover:text-fresh-green transition-colors cursor-pointer"
              >
                OPD Scheduling & Consultation
              </button>
              <button
                onClick={() => setActiveTab("volunteer")}
                className="text-left hover:text-fresh-green transition-colors cursor-pointer"
              >
                Volunteer Registration Form
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className="text-left hover:text-fresh-green transition-colors cursor-pointer"
              >
                OPD Hours & Map Destination
              </button>
            </div>
          </div>

          {/* Address & Hotline particulars */}
          <div className="md:col-span-5 space-y-4 text-xs">
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-widest text-orange-accent">
              General Operational Coordinates
            </h4>
            
            <div className="space-y-3 leading-relaxed text-stone-400 font-semibold">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-brand mt-0.5 flex-shrink-0" />
                <span>104 Hope Care Boulevard, Medical District, Metropolis</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-amber-brand mt-0.5 flex-shrink-0" />
                <span className="break-all">support@communityhealthcareportal.org</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-amber-brand mt-0.5 flex-shrink-0" />
                <span>+1 (555) 321-4321</span>
              </div>
              <div className="flex items-start gap-2.5 text-orange-accent font-bold border-t border-stone-800/40 pt-2">
                <ShieldAlert className="h-5 w-5 text-orange-accent mt-0.5 flex-shrink-0 animate-pulse" />
                <span>Crisis Hotline: +1 (555) 911-3000 (Active 24 Hours)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center text-[10px] space-y-3.5 leading-relaxed text-stone-500 font-medium">
          <p className="max-w-4xl mx-auto">
            <strong>Educational Portal Disclaimer:</strong> This portal constitutes an educational demonstration model and does not create an active medical treatment path, custom drugs prescription, or clinical assessment. Information retrieved is automated using offline rules or state-of-the-art RAG technology.
          </p>
          <p className="text-stone-600 font-bold">
            &copy; 2026 Community Healthcare Support Portal. All services vetted.
          </p>
        </div>
      </footer>
      <GlobalChatbot />
    </div>
  );
}
