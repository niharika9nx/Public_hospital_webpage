import React, { useState } from "react";
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
  ShieldAlert,
  ArrowRight
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
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate minor network delay for feedback realism
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

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="volunteer-registration-root">
      {/* Page header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto banner-header">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Join Our Volunteer Network
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Our caregivers benefit immensely from community aid. Partner with us, dedicate some hours, discover rich clinical logistics experience, and support patients on their path to recovery.
        </p>
      </section>

      {/* Main responsive split: Informational Program details on left, Form on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Volunteer Info & Details Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 p-6 sm:p-8 rounded-3xl text-white text-left space-y-6 border border-emerald-950 shadow-sm">
            <div className="p-3 bg-white/10 rounded-2xl w-fit">
              <Users className="h-6 w-6 text-emerald-200" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-xl tracking-tight">Program Overview</h3>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {knowledgeBase.volunteerInfo.overview}
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex gap-3 text-left">
                <Clock className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white">Minimum Commitment</h4>
                  <p className="text-emerald-250 text-xs mt-0.5">{knowledgeBase.volunteerInfo.commitment}</p>
                </div>
              </div>

              <div className="flex gap-3 text-left">
                <Award className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white">Core Program Benefits</h4>
                  <p className="text-emerald-250 text-xs mt-0.5">Clinic exposure, certified service hours, and complimentary checkups.</p>
                </div>
              </div>
            </div>
          </div>

          {/* List of Skills & Benefits using structured data */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 text-left space-y-6">
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-base">Key Skills Encouraged:</h4>
              <ul className="space-y-2">
                {knowledgeBase.volunteerInfo.skillsNeeded.map((skill, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                    <Bookmark className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-t border-slate-100" />

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-base">Incentives & Career Perks:</h4>
              <ul className="space-y-2">
                {knowledgeBase.volunteerInfo.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                    <Heart className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Volunteer Registration Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="volunteer-form-entry"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4 text-left">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Heart className="h-5.5 w-5.5 text-emerald-600" />
                    Volunteer Registration
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Please submit your coordinates below to join Metropolis' largest healthcare support collective.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate id="volunteer-registration-form">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="name">
                      your Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${
                        formErrors.name ? "border-rose-300 focus:ring-rose-250" : "border-slate-200 focus:ring-emerald-250"
                      } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                      placeholder="e.g. Arthur Pendragon"
                    />
                    {formErrors.name && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone dual field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border ${
                          formErrors.email ? "border-rose-300 focus:ring-rose-250" : "border-slate-200 focus:ring-emerald-250"
                        } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                        placeholder="e.g. arthur@camelot.com"
                      />
                      {formErrors.email && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border ${
                          formErrors.phone ? "border-rose-300 focus:ring-rose-250" : "border-slate-200 focus:ring-emerald-250"
                        } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                        placeholder="e.g. (555) 777-8899"
                      />
                      {formErrors.phone && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills summary input */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="skills">
                      Relevant Skills or Areas of Interest *
                    </label>
                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${
                        formErrors.skills ? "border-rose-300 focus:ring-rose-250" : "border-slate-200 focus:ring-emerald-250"
                      } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                      placeholder="e.g. Patient guiding, translation (Spanish), administrative filing..."
                    />
                    {formErrors.skills && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.skills}
                      </span>
                    )}
                  </div>

                  {/* Availability selection */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="availability">
                      Your General Schedule Availability *
                    </label>
                    <input
                      id="availability"
                      name="availability"
                      type="text"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${
                        formErrors.availability ? "border-rose-300 focus:ring-rose-250" : "border-slate-200 focus:ring-emerald-250"
                      } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                      placeholder="e.g. Tuesday & Thursday afternoons (1pm - 5pm)"
                    />
                    {formErrors.availability && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.availability}
                      </span>
                    )}
                  </div>

                  {/* Motivation textbox */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="motivation">
                      What is your motivation to volunteer? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={4}
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${
                        formErrors.motivation ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                      } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium resize-none`}
                      placeholder="Please explain why you wish to join our clinical companionship and support team..."
                    />
                    {formErrors.motivation && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
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
                    className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-350 text-white rounded-xl font-bold shadow-sm hover:shadow transition-all duration-200 gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Submitting registration...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Register as a Community Volunteer</span>
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
                <div className="mx-auto p-4 bg-emerald-50 text-emerald-600 rounded-full w-16 h-16 flex items-center justify-center border border-emerald-100 shadow-sm">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Registration Complete!</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Thank you so much, **{formData.name}**! Your kind application to become a volunteer at the Community Healthcare Support Portal has been logged.
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    Our community coordinators will review your skills and selected schedule availability. You will get a follow-up email at **{formData.email}** within 2 or 3 business days with onboarding steps.
                  </p>
                </div>
                <button
                  id="reset-volunteer-btn"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-bold transition-all duration-200 cursor-pointer"
                >
                  Return to Form
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
