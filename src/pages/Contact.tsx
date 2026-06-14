import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  CalendarCheck,
  Info
} from "lucide-react";
import { knowledgeBase } from "../data/knowledgeBase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Field Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Your Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please specify a valid email syntax";
    }
    if (!formData.message.trim()) {
      errors.message = "Write us a valid message or query";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 pb-20 animate-fade-in text-stone-850" id="contact-page-root">
      
      {/* Page Header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto banner-header">
        <span className="text-xs font-extrabold text-fresh-green uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-fresh-green/20">
          Inquiries Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight mt-1.5 animate-fade-in">
          Get in Touch With Us
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Do you have general, non-clinical questions about community events, our volunteer roster, or specialist schedules? Drop us a line below, or stop by during OPD hours.
        </p>
      </section>

      {/* Main split: Cards on left, Contact Form on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Contact particulars & Working hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Address & Contacts details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-md text-left space-y-6 hover:border-fresh-green/35 transition-colors">
            <h3 className="font-display font-extrabold text-lg text-stone-900 border-b border-stone-100 pb-3">
              Hospital Contact Directory
            </h3>

            <div className="space-y-4.5">
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-[#E8F5E9] rounded-xl text-fresh-green flex-shrink-0 border border-fresh-green/15 shadow-xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">Physical Address</h4>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    {knowledgeBase.contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-[#E8F5E9] rounded-xl text-fresh-green flex-shrink-0 border border-fresh-green/15 shadow-xs">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">Phone Line</h4>
                  <p className="text-stone-550 text-xs sm:text-sm mt-0.5 font-bold">
                    {knowledgeBase.contactInfo.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-[#E8F5E9] rounded-xl text-fresh-green flex-shrink-0 border border-fresh-green/15 shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">Email Coordination</h4>
                  <p className="text-stone-550 text-xs sm:text-sm mt-0.5 font-bold break-all">
                    {knowledgeBase.contactInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Warn block */}
            <div className="p-4 bg-[#FFF3E0] border border-orange-accent/25 rounded-2xl flex gap-3 text-left">
              <AlertCircle className="h-5 w-5 text-orange-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#E65100] text-xs uppercase tracking-wider">Health Emergency Hotline</h5>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed font-semibold">
                  This portal must never be used for severe medical emergencies. In clinical emergencies, call **911** or our hospital dispatch line immediately: <br />
                  <span className="font-extrabold text-stone-900 text-xs mt-1 block">{knowledgeBase.contactInfo.emergencyHotline}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Working hours cards */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-md text-left space-y-4 hover:border-orange-accent/35 transition-colors">
            <h3 className="font-display font-extrabold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-accent" />
              Operational Calendar
            </h3>
            
            <div className="space-y-4 pt-1">
              {knowledgeBase.workingHours.map((wh, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold text-stone-900">
                    <span className="font-display">{wh.days}</span>
                    <span className="text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-bold border border-fresh-green/20">
                      {wh.hours}
                    </span>
                  </div>
                  <p className="text-stone-400 text-[11px] sm:text-xs font-semibold leading-relaxed">{wh.notes}</p>
                  {idx < knowledgeBase.workingHours.length - 1 && (
                    <hr className="border-t border-stone-50 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Contact message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/60 shadow-md shadow-stone-200/50 min-h-[500px] flex flex-col justify-between hover:border-fresh-green/35 transition-colors duration-350">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form-entry"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-100 pb-5 text-left">
                  <h2 className="text-xl font-display font-extrabold text-stone-900 flex items-center gap-2.5">
                    <Mail className="h-5.5 w-5.5 text-fresh-green" />
                    Drop Us a Message
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
                    Do you have questions or want to collaborate with our outpatient NGO coordinators? Send a message and we'll reply shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate id="contact-inquiry-form">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="name">
                      fullName *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.name ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-850 bg-[#fdfdfc]`}
                      placeholder="e.g. Richard Lovelace"
                    />
                    {formErrors.name && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="email">
                      your Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.email ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-900 bg-[#fdfdfc]`}
                      placeholder="e.g. richard@lovelace.org"
                    />
                    {formErrors.email && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="message">
                      your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.message ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/15"
                      } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium resize-none text-stone-850 bg-[#fdfdfc]`}
                      placeholder="Type the full contents of your query here..."
                    />
                    {formErrors.message && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-4 bg-fresh-green hover:bg-[#2E7D32] disabled:bg-stone-300 text-white rounded-2xl font-bold transition-all duration-200 gap-2 cursor-pointer shadow-sm text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Transmitting query...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              // Success feedback layout
              <motion.div
                key="contact-success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="my-auto space-y-6 text-center py-10"
              >
                <div className="mx-auto p-4 bg-[#E8F5E9] text-fresh-green rounded-full w-16 h-16 flex items-center justify-center border border-fresh-green/20 shadow-sm animate-fade-in">
                  <CheckCircle2 className="h-10 w-10 text-fresh-green" />
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  <h3 className="text-2xl font-display font-extrabold text-stone-900 tracking-tight">Message Dispatched!</h3>
                  <p className="text-sm text-stone-600 leading-relaxed font-semibold">
                    Thank you, **{formData.name}**! Your non-clinical general inquiry has been received by our office team.
                  </p>
                  <p className="text-xs text-stone-500 bg-[#E8F5E9]/50 p-4 border border-fresh-green/20 rounded-2xl">
                    We will coordinate an answer back to your email at **{formData.email}** within 24 hours.
                  </p>
                </div>
                <button
                  id="reset-contact-btn"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 rounded-2xl font-bold transition-all duration-200 cursor-pointer text-sm"
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
