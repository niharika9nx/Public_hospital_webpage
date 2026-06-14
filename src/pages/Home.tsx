import { HeartPulse, Activity, Stethoscope, Award, Users, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { knowledgeBase } from "../data/knowledgeBase";

interface HomeProps {
  onNavigateToBooking: () => void;
  onNavigateToVolunteer: () => void;
}

export default function Home({ onNavigateToBooking, onNavigateToVolunteer }: HomeProps) {
  // Map icons from knowledgeBase strings to proper Lucide React elements
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="h-6 w-6 text-emerald-600" />;
      case "Activity":
        return <Activity className="h-6 w-6 text-emerald-600" />;
      case "Stethoscope":
        return <Stethoscope className="h-6 w-6 text-emerald-600" />;
      case "Award":
        return <Award className="h-6 w-6 text-emerald-600" />;
      default:
        return <HeartPulse className="h-6 w-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in" id="home-page-container">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white rounded-3xl overflow-hidden px-6 py-12 md:px-12 md:py-20 border border-emerald-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full text-emerald-800 text-xs font-medium tracking-wide">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Empowering Community Health & Support
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Compassionate Care, <br />
              <span className="text-emerald-700">Right in Your Neighborhood</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Welcome to the Community Healthcare Support Portal. We bridge professional clinical services, active volunteer networks, and supportive patient resources to build a healthier tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-book-btn"
                onClick={onNavigateToBooking}
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-sm transition-all duration-200 gap-2 group cursor-pointer"
              >
                Book An Appointment
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-join-btn"
                onClick={onNavigateToVolunteer}
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-medium transition-all duration-200 cursor-pointer"
              >
                Become a Volunteer
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative behind elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-teal-200 rounded-full filter blur-3xl opacity-30"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white p-4">
                <img
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
                  alt="Healthcare professional smiling"
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />
                <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg border border-slate-50 flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 rounded-lg">
                    <Heart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Quality Rating</div>
                    <div className="text-sm font-extrabold text-slate-900">100% Patient Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about-us-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 p-2 bg-slate-50">
            <img
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600"
              alt="Medical team discussing case"
              className="w-full h-[360px] object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">About Our Portal</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Mission is to Empower Community Care
          </h3>
          <p className="text-slate-600 text-base leading-relaxed">
            {knowledgeBase.overview}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <Users className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Empathetic Caregivers</h4>
                <p className="text-xs text-slate-500 mt-1">Our certified clinicians list customized care protocols tailored to your specific conditions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Always-Available Support</h4>
                <p className="text-xs text-slate-500 mt-1">Instant portal answers regarding hours, specialties, or program processes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services-section" className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Our Services</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Clinical Resources Available
          </h3>
          <p className="text-slate-500 text-sm sm:text-base">
            We provide a broad range of general and specialty outpatient treatments designed to support family medicine and screening diagnostics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {knowledgeBase.services.map((svc, idx) => (
            <div
              key={idx}
              id={`service-card-${idx}`}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 text-left flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {getIcon(svc.icon)}
                </div>
                <h4 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors duration-200">
                  {svc.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {svc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FACILITIES SECTION */}
      <section id="facilities-section" className="space-y-10 bg-slate-50/80 p-8 rounded-3xl border border-slate-150/40">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Our Facilities</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            State-of-the-Art Medical Infrastructure
          </h3>
          <p className="text-slate-500 text-sm">
            Designed for patient safety, accurate laboratory metrics, and physical tranquility across Metropolis.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knowledgeBase.facilities.map((fac, idx) => (
            <div
              key={idx}
              id={`facility-card-${idx}`}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs text-left space-y-3 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-slate-950 text-lg">{fac.name}</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 rounded-lg text-teal-800 text-xs font-semibold border border-teal-100">
                  <MapPin className="h-3.5 w-3.5 text-teal-600" />
                  {fac.location}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {fac.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DOCTORS / HEALTHCARE TEAM SECTION */}
      <section id="medical-team-section" className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Our Specialized Doctors</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet the Department Heads
          </h3>
          <p className="text-slate-500 text-sm">
            Board-certified experts coordinating patient therapies, diagnosis metrics, and medical companionship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {knowledgeBase.departments.map((dept, idx) => (
            <div
              key={idx}
              id={`doctor-card-${idx}`}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs text-center space-y-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Doctor Placeholder Avatar depicting genuine professional style */}
                <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                  <Users className="h-10 w-10 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{dept.head}</h4>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{dept.name}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 italic line-clamp-3 bg-slate-50/50 p-2 rounded-lg">
                "{dept.description}"
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
