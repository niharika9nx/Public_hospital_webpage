import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Award,
  Clock,
  Heart,
  Send,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { knowledgeBase } from "../data/knowledgeBase";

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    motivation: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quotes slideshow State
  const [activeQuote, setActiveQuote] = useState(0);
  const quotesList = [
    {
      text: "At the end of the day, it's not about what you have or even what you've accomplished. It's about who you've lifted up, who you've made better. It's about what you give back.",
      author: "Elena Vance",
      role: "Lead Outpatient Coordinator at MCC"
    },
    {
      text: "Volunteering with the Care Collective has completely rewritten my outlook on medicine. Guiding patients through their anxious moments in the serenity lounge is the most profound therapy I've ever experienced.",
      author: "Damián Reyes",
      role: "Active Lounge Companion (Volunteer since 2022)"
    },
    {
      text: "Strong, accessible healthcare is built by citizens who refuse to be mere spectators. Every hour you spend translating charts or welcoming a patient is a direct investment in community safety.",
      author: "Dr. Clara Winters, MD",
      role: "Chief MD & Volunteer Clinical Sponsor"
    }
  ];

  // Auto cycle quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotesList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Simple clean validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Your full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please provide a valid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = "Provide a valid phone formatting (e.g. 555-123-4567)";
    }
    if (!formData.skills.trim()) errors.skills = "Please mention at least one key skill";
    if (!formData.availability.trim()) errors.availability = "Please specify availability (e.g. Weekday mornings)";
    if (!formData.motivation.trim()) {
      errors.motivation = "Please tell us what motivates you to volunteer";
    } else if (formData.motivation.trim().length < 15) {
      errors.motivation = "Please state your motivation in at least 15 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to form if validation fails
      document.getElementById("volunteer-enrollment-form-card")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "",
      motivation: ""
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  const nextQuote = () => {
    setActiveQuote((prev) => (prev + 1) % quotesList.length);
  };

  const prevQuote = () => {
    setActiveQuote((prev) => (prev - 1 + quotesList.length) % quotesList.length);
  };
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 pb-20 animate-fade-in text-stone-850" id="volunteer-registration-root">
      
      {/* 1. PAGE HEADER */}
      <section className="text-center space-y-4 max-w-3xl mx-auto banner-header">
        <span className="text-xs font-extrabold text-fresh-green uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-fresh-green/20">
          Medical NGO Partnership
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight mt-1.5">
          Join Metropolis Care Collective
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Through our local NGO affiliate, volunteers support overburdened outpatient facilities, secure patient Serenity guidelines, and assist thousands of families in finding health and hope.
        </p>
      </section>

      {/* 2. THE STORY AND PHOTO COLLAGE COLLIDER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-stone-200/60 p-6 sm:p-10 rounded-4xl shadow-sm">
        
        {/* Left Hand: Our Story Narrative Section */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="p-3 bg-[#E8F5E9] rounded-2xl w-fit border border-fresh-green/15">
            <BookOpen className="h-6 w-6 text-fresh-green" />
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold text-fresh-green uppercase tracking-widest">Our Humble Beginnings</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
              A Story of Sidewalk Care
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Metropolis Care Collective (MCC) was founded in the freezing winter of 2018. When our public medical district experienced sudden, massive local operational delays, a group of eight off-duty nurses and neighborhood coordinators began distributing insulated medical kits, emergency blankets, and simple clinical outpatient brochures under a green sidewalk canopy.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              That simple street-side shelter quickly evolved. Working in direct synergy with the CHSP portal, MCC has matured into a vital healthcare support NGO. Over 420 passionate advocates currently devote their time—translating specialized files, guiding anxious patients through diagnostic wings, and arranging blood drive schedules. Together, we demonstrate that clinical excellence requires human-centered compassion.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 text-xs font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Certified service hours</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 text-xs font-bold">
              <Users className="h-4 w-4 text-emerald-600" />
              <span>420+ active helpers</span>
            </div>
          </div>
        </div>

        {/* Right Hand: Photo Bento Grid of the Medical NGO */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
              alt="Medical NGO Team Cooperation"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover rounded-3xl border border-stone-200 hover:scale-[1.02] transition-transform duration-300 shadow-sm"
              id="ngo-team-group-photo-1"
            />
          </div>
          <div className="col-span-6">
            <img
              src="https://images.unsplash.com/photo-1559087867-ce4c913d5553?auto=format&fit=crop&q=80&w=400"
              alt="Volunteer comforting patient"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover rounded-3xl border border-stone-200 hover:scale-[1.02] transition-transform duration-300 shadow-sm"
              id="ngo-team-group-photo-2"
            />
          </div>
          <div className="col-span-6">
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400"
              alt="Volunteers joining hands"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover rounded-3xl border border-stone-200 hover:scale-[1.02] transition-transform duration-300 shadow-sm"
              id="ngo-team-group-photo-3"
            />
          </div>
        </div>

      </section>

      {/* 3. HIGHLY HIGHLIGHTED ACTIVE QUOTES SLIDESHOW */}
      <section className="bg-gradient-to-br from-[#1b5e20] to-[#01579b] p-8 sm:p-12 rounded-4xl text-white shadow-xl text-center relative overflow-hidden" id="active-quotes-slideshow-section">
        {/* Background art deco circle */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-white/5 rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="p-3 bg-white/10 rounded-full border border-white/10 text-amber-brand animate-pulse">
              <Quote className="h-7 w-7" />
            </div>
          </div>

          <div className="min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <p className="text-base sm:text-xl font-display font-medium leading-relaxed italic text-emerald-50">
                  "{quotesList[activeQuote].text}"
                </p>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm sm:text-base text-amber-brand">
                    — {quotesList[activeQuote].author}
                  </h4>
                  <p className="text-xs text-emerald-100/90 font-bold">
                    {quotesList[activeQuote].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <button
              onClick={prevQuote}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer border border-white/5"
              aria-label="Previous quote"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Quick-dots indicator */}
            <div className="flex gap-2">
              {quotesList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveQuote(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeQuote === dotIdx ? "w-6 bg-amber-brand" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextQuote}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer border border-white/5"
              aria-label="Next quote"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. DETAILS Blueprint GRID (Skills + Benefits) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Skills Needed */}
        <div className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 text-left space-y-4.5 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <Award className="h-5.5 w-5.5 text-fresh-green" />
            <h3 className="font-display font-extrabold text-lg text-stone-900">Key Skills Encouraged</h3>
          </div>
          <p className="text-xs text-stone-500 font-semibold leading-relaxed">
            We require no prior clinical background. Our clinical sponsors train volunteers on-site for the following segments:
          </p>
          <ul className="space-y-3">
            {knowledgeBase.volunteerInfo.skillsNeeded.map((skill, idx) => (
              <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-stone-600 font-semibold">
                <Bookmark className="h-4.5 w-4.5 text-fresh-green flex-shrink-0 mt-0.5" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits & Commitment package */}
        <div className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 text-left space-y-4.5 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <Heart className="h-5.5 w-5.5 text-emerald-600" />
            <h3 className="font-display font-extrabold text-lg text-stone-900">Incentives & Schedule</h3>
          </div>
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Minimum Commitment</span>
            <p className="text-xs text-stone-800 font-bold leading-normal flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-fresh-green" />
              {knowledgeBase.volunteerInfo.commitment}
            </p>
          </div>
          <ul className="space-y-3 pt-1">
            {knowledgeBase.volunteerInfo.benefits.map((benefit, idx) => (
              <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-stone-600 font-semibold">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* 5. VOLUNTEER ENROLLMENT REGISTRATION FORM (Below story and quote slides) */}
      <section className="max-w-4xl mx-auto" id="volunteer-enrollment-form-card">
        <div className="bg-white p-6 sm:p-10 rounded-4xl border border-stone-200/60 shadow-lg shadow-stone-200/50 min-h-[500px] flex flex-col justify-between hover:border-fresh-green/35 transition-colors duration-350">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="volunteer-form-entry"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="border-b border-stone-100 pb-6 text-left">
                  <h2 className="text-2xl font-display font-extrabold text-stone-900 flex items-center gap-2.5">
                    <Heart className="h-6.5 w-6.5 text-fresh-green" />
                    Volunteer Registration Form
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
                    Please submit your coordinates below to join Metropolis' largest healthcare support collective.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate id="volunteer-registration-form">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="name">
                      your Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.name ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-4 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                      placeholder="e.g. Arthur Pendragon"
                    />
                    {formErrors.name && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone dual field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-2xl border ${
                          formErrors.email ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                        } px-4 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                        placeholder="e.g. arthur@camelot.com"
                      />
                      {formErrors.email && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full rounded-2xl border ${
                          formErrors.phone ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                        } px-4 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                        placeholder="e.g. (555) 777-8899"
                      />
                      {formErrors.phone && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills summary input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="skills">
                      Relevant Skills or Area Interests *
                    </label>
                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.skills ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-4 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-850 bg-[#fdfdfc]`}
                      placeholder="e.g. Patient guiding, Spanish translation, filing..."
                    />
                    {formErrors.skills && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.skills}
                      </span>
                    )}
                  </div>

                  {/* Availability selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="availability">
                      Your Schedule Availability *
                    </label>
                    <input
                      id="availability"
                      name="availability"
                      type="text"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.availability ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-4 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-850 bg-[#fdfdfc]`}
                      placeholder="e.g. Tuesday & Thursday afternoons (1pm - 5pm)"
                    />
                    {formErrors.availability && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.availability}
                      </span>
                    )}
                  </div>

                  {/* Motivation textbox */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="motivation">
                      What is your motivation to volunteer? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={5}
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.motivation ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/15"
                      } px-4 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium resize-none text-stone-850 bg-[#fdfdfc]`}
                      placeholder="Please explain why you wish to join our clinical companionship and support team..."
                    />
                    {formErrors.motivation && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.motivation}
                      </span>
                    )}
                  </div>

                  {/* Registration submit */}
                  <button
                    id="submit-volunteer-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-4 bg-fresh-green hover:bg-[#2E7D32] disabled:bg-stone-300 text-white rounded-2xl font-bold transition-all duration-200 gap-2 cursor-pointer shadow-md text-sm active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Transmitting enrollment coordinates...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>Submit Registration & Request Onboarding</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              // Success result view
              <motion.div
                key="volunteer-success-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="my-auto space-y-6 text-center py-10"
              >
                <div className="mx-auto p-4 bg-[#E8F5E9] text-[#2E7D32] rounded-full w-16 h-16 flex items-center justify-center border border-fresh-green/25 shadow-sm animate-fade-in">
                  <CheckCircle2 className="h-9 w-9 text-fresh-green" />
                </div>
                <div className="space-y-3 max-w-lg mx-auto">
                  <h3 className="text-2xl font-display font-extrabold text-stone-900 tracking-tight">Registration Logged!</h3>
                  <p className="text-sm text-stone-600 leading-relaxed font-semibold">
                    Thank you so much, **{formData.name}**! Your kind support coordinates have been saved inside the Care Collective records.
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed bg-[#E8F5E9]/30 p-5 rounded-2xl border border-fresh-green/15">
                    Our administrative supervisors will evaluate your motivation statement and selected schedule availability. We will follow up at **{formData.email}** within 2 or 3 business days with physical center onboarding coordinates.
                  </p>
                </div>
                <button
                  id="reset-volunteer-btn"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 rounded-2xl font-bold transition-all duration-200 cursor-pointer text-sm"
                >
                  Return to Form
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
