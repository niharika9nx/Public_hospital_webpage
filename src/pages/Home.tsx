import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Award,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bookmark
} from "lucide-react";
import { knowledgeBase } from "../data/knowledgeBase";

const CAROUSEL_SLIDES = [
  {
    topic: "Compassionate Patient Care",
    title: "Care That Begins with Listening",
    description: "Our health center places human empathy at the heart of therapy. We listen closely to your operational needs and provide comprehensive outpatient navigation to walk with you toward absolute wellness.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    tagline: "Dedicated to Comfort & Recovery",
    accentColor: "from-amber-brand to-orange-accent",
    bgColor: "bg-bg-warm"
  },
  {
    topic: "Advanced Medical Facilities",
    title: "Precision Technology, Welcoming Atmosphere",
    description: "Combining advanced testing metrics with custom procedural labs to deliver fast diagnostic feedback. Your safety and healthcare progression remain housed under peerless clinical space.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    tagline: "Modern Diagnostic & Lab Systems",
    accentColor: "from-fresh-green to-soft-teal",
    bgColor: "bg-bg-fresh"
  },
  {
    topic: "Community Outreach Programs",
    title: "Extending Care Beyond Hospital Walls",
    description: "We lead local health seminars, specialized pediatric aid screenings, and geriatric support walks across Metropolis. Bridging clinical experts and volunteers into a unified network.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    tagline: "Connecting Neighborhoods, Fostering Health",
    accentColor: "from-orange-accent to-amber-brand",
    bgColor: "bg-bg-sage"
  },
  {
    topic: "Experienced Professional Staff",
    title: "Board-Certified Leaders Guided by Excellence",
    description: "Our department heads are celebrated clinical experts, bringing decades of academic and procedural knowledge. Backed daily by a community NGO coordinate team.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    tagline: "Meet Our Dedicated Department Heads",
    accentColor: "from-fresh-green to-amber-brand",
    bgColor: "bg-bg-cool"
  }
];

interface HomeProps {
  onNavigateToBooking: () => void;
  onNavigateToVolunteer: () => void;
}

export default function Home({ onNavigateToBooking, onNavigateToVolunteer }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval for slides
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="h-5.5 w-5.5 text-fresh-green group-hover:text-white" />;
      case "Activity":
        return <Activity className="h-5.5 w-5.5 text-soft-teal group-hover:text-white" />;
      case "Stethoscope":
        return <Stethoscope className="h-5.5 w-5.5 text-orange-accent group-hover:text-white" />;
      case "Award":
        return <Award className="h-5.5 w-5.5 text-amber-brand group-hover:text-white" />;
      default:
        return <HeartPulse className="h-5.5 w-5.5 text-[#34A853]" />;
    }
  };

  return (
    <div className="space-y-24 pb-20 animate-fade-in text-stone-850" id="home-page-container">
      
      {/* 1. HERO Carousel SECTION (EDGE-TO-EDGE FULL-WIDTH) */}
      <section
        id="hero-carousel-section"
        className="relative overflow-hidden bg-stone-950 h-[580px] sm:h-[640px] md:h-[700px] w-full shadow-2xl transition-all duration-350"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full-Space Background Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                referrerPolicy="no-referrer"
                src={CAROUSEL_SLIDES[currentSlide].image}
                alt={CAROUSEL_SLIDES[currentSlide].topic}
                className="w-full h-full object-cover select-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* High-quality gradients for superb readability with rich blur effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/45 via-stone-950/15 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent z-1" />

        {/* Floating Stats Badge (absolute position on top right layer) */}
        <div className="absolute top-6 right-8 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 select-none hidden sm:flex items-center gap-3 z-10 transition-all hover:bg-white/15">
          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-brand border border-emerald-500/20 animate-pulse">
            <Heart className="h-4 w-4 fill-amber-brand/20 text-amber-brand" />
          </div>
          <div className="text-left">
            <div className="text-[9px] text-stone-300 font-bold uppercase tracking-wider">Metropolis Core</div>
            <div className="text-xs font-extrabold text-white">Patient-Vetted Programs</div>
          </div>
        </div>

        {/* LEFT HOVERING AND CHANGING TEXT CONTENT PANEL WITH GLASS EFFECT */}
        <div className="absolute inset-y-0 left-0 z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16 text-left max-w-xl sm:max-w-2xl bg-gradient-to-r from-stone-950/70 via-stone-950/40 to-transparent backdrop-blur-[2px] hover:backdrop-blur-[4px] transition-all duration-300">
          
          {/* Top Tagline & Indicators */}
          <div className="space-y-4 mt-auto sm:mt-0">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-amber-brand text-xs font-semibold tracking-wide border border-white/10 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-brand animate-pulse" />
              <span>{CAROUSEL_SLIDES[currentSlide].topic}</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-4"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  {CAROUSEL_SLIDES[currentSlide].title}
                </h1>
                
                <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-brand mt-1">
                  {CAROUSEL_SLIDES[currentSlide].tagline}
                </p>
                
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-xl font-medium drop-shadow-xs">
                  {CAROUSEL_SLIDES[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Buttons & Navigation Controls inside Left Panel */}
          <div className="space-y-8 pt-6 sm:pt-0">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                id="hero-book-btn"
                onClick={onNavigateToBooking}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 gap-2 group cursor-pointer active:scale-[0.99]"
              >
                <span>Book Local Consultation</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                id="hero-join-btn"
                onClick={onNavigateToVolunteer}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/10 hover:bg-white/25 text-white border border-white/20 rounded-2xl font-extrabold text-sm transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-[1.01]"
              >
                Become a Volunteer
              </button>
            </div>

            {/* Dots & Nav controls combined */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex gap-2">
                {CAROUSEL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-350 cursor-pointer ${
                      currentSlide === idx ? "w-8 bg-amber-brand shadow-md" : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-white/20 cursor-pointer transition-colors backdrop-blur-xs"
                  aria-label="Prev Slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-white/20 cursor-pointer transition-colors backdrop-blur-xs"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTERING GRID WRAPPER FOR THE REMAINING HOME CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 2. ABOUT NGO & SERVICES INTRODUCTION (Section 1: Soft Off-White Surface #F8FAF7) */}
        <section id="about-us-section" className="bg-bg-fresh border border-stone-200/60 p-8 sm:p-14 rounded-4xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            
            {/* Soft fresh green background glow blob */}
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-soft-teal/10 rounded-full filter blur-2xl opacity-40"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-fresh-green/10 rounded-full filter blur-2xl opacity-40"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-md border border-stone-200/55 p-2.5 bg-white">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=700"
                alt="Medical professionals team coordinates"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-fresh-green uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-fresh-green/20">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight mt-1.5">
                Empowering Community Outpatient Care
              </h2>
            </div>

            <p className="text-stone-600 text-base leading-relaxed">
              {knowledgeBase.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="flex items-start gap-3.5 p-5 bg-white rounded-2xl border border-stone-200/60 shadow-xs hover:border-fresh-green/30 hover:scale-[1.01] transition-all">
                <Users className="h-5.5 w-5.5 text-amber-brand mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Empathetic Caregivers</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Certified practitioners providing clinical guidance tailored to your outpatient logistics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 bg-white rounded-2xl border border-stone-200/60 shadow-xs hover:border-soft-teal/30 hover:scale-[1.01] transition-all">
                <ShieldCheck className="h-5.5 w-5.5 text-soft-teal mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Always-Available Guides</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Consolidated hospital catalogs outlining schedule slots, physical layout rooms, and expert heads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES GRID SECTION (Section 2: Soft Warm Cream Surface #F9F8F4) */}
        <section id="services-section" className="space-y-12 bg-bg-warm border border-amber-brand/10 p-8 sm:p-14 rounded-4xl transition-all duration-300">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-amber-brand uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-brand/20">
              Outpatient Services
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
              Comprehensive Clinical Resources Available
            </h3>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed font-medium">
              We operate structured family medicine clinics, rapid testing labs, and coordinate patient physical recovery plans inside responsive departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {knowledgeBase.services.map((svc, idx) => (
              <div
                key={idx}
                id={`service-card-${idx}`}
                className="bg-white rounded-3xl border border-stone-200/60 p-7 shadow-xs hover:shadow-md hover:border-fresh-green transition-all duration-300 text-left flex flex-col justify-between group cursor-default hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className="p-3 bg-fresh-green/10 text-fresh-green rounded-2xl w-fit group-hover:bg-fresh-green group-hover:text-white transition-all duration-300 border border-fresh-green/15 shadow-xs">
                    {getIcon(svc.icon)}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-stone-900 text-lg group-hover:text-fresh-green transition-colors duration-200 flex items-center gap-1">
                      {svc.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-4 flex items-center justify-between text-xs font-bold text-stone-400 group-hover:text-fresh-green transition-colors">
                  <span>Outpatient Desk</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FACILITIES BLUEPRINT ROOMS (Section 3: Very Light Cool Surface #F7F9FC) */}
        <section id="facilities-section" className="space-y-12 bg-bg-cool p-8 sm:p-14 rounded-4xl border border-soft-teal/10 transition-all duration-300">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-soft-teal bg-[#E0F2F1] px-3.5 py-1 rounded-full border border-soft-teal/20">
              Physical Layout
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
              Our Strategic Outpatient Facilities
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-medium">
              Beautiful spaces designed for absolute quietude, procedural testing speed, and sterile consultation accuracy across high levels of community standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knowledgeBase.facilities.map((fac, idx) => (
              <div
                key={idx}
                id={`facility-card-${idx}`}
                className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-xs text-left space-y-3.5 hover:shadow-md hover:border-soft-teal/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <span className="font-display font-bold text-stone-900 text-lg">{fac.name}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-50 rounded-xl text-orange-accent text-xs font-bold border border-orange-accent/15">
                      <MapPin className="h-3.5 w-3.5 text-orange-accent" />
                      {fac.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">
                    {fac.description}
                  </p>
                </div>

                <div className="flex gap-4 items-center text-[10px] text-stone-400 font-bold uppercase tracking-wider pt-2">
                  <span className="flex items-center gap-1 text-[#2E7D32] bg-emerald-50/70 px-2.5 py-0.5 rounded border border-fresh-green/15">
                    <Clock className="w-3.5 h-3.5" />
                    Regular Outpatient Access
                  </span>
                  <span>Room Guide Included</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. EXPERIENCED OUTPATIENT CHIEFS (Section 4: Very Light Sage Surface #F6F8F5) */}
        <section id="medical-team-section" className="space-y-12 bg-bg-sage p-8 sm:p-14 rounded-4xl border border-fresh-green/10 transition-all duration-300">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-fresh-green uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-fresh-green/20">
              Professional Team
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
              Our Department Heads
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-medium">
              Empathetic outpatient expert coordinators steering professional departments and volunteering support sessions with complete safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {knowledgeBase.departments.map((dept, idx) => (
              <div
                key={idx}
                id={`doctor-card-${idx}`}
                className="bg-white rounded-3xl border border-stone-200/60 p-6 shadow-xs text-center space-y-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-fresh-green/30"
              >
                <div className="space-y-4">
                  {/* Visual Avatar with beautiful frame */}
                  <div className="relative mx-auto w-20 h-20">
                    <div className="w-full h-full bg-stone-50 rounded-full overflow-hidden border border-fresh-green/15 group-hover:border-fresh-green/45 transition-colors flex items-center justify-center">
                      {dept.image ? (
                        <img
                          referrerPolicy="no-referrer"
                          src={dept.image}
                          alt={dept.head}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <Users className="h-9 w-9 text-amber-brand group-hover:scale-105 transition-transform" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1.5 bg-fresh-green rounded-xl text-white border border-white shadow-xs z-10">
                      <HeartPulse className="h-3 w-3" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-display font-bold text-stone-900 text-base tracking-tight leading-tight">
                      {dept.head}
                    </h4>
                    <p className="text-[11px] font-extrabold text-fresh-green mt-1 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block border border-fresh-green/15">
                      {dept.name}
                    </p>
                  </div>
                </div>
                
                <div className="bg-stone-50 rounded-2xl border border-stone-200/45 p-5 text-center flex-1 flex items-center justify-center mt-3">
                  <p className="text-xs text-stone-600 italic leading-relaxed">
                    "{dept.description}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
