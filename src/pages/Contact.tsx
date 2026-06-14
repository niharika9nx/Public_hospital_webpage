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
    <div className="space-y-12 pb-16 animate-fade-in" id="contact-page-root">
      {/* Page Header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto banner-header">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch With Us
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Do you have general, non-clinical questions about community events, our volunteer roster, or specialist schedules? Drop us a line below, or stop by during OPD hours.
        </p>
      </section>

      {/* Main split: Cards on left, Contact Form on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Contact particulars & Working hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Address & Contacts details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm text-left space-y-6">
            <h3 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Hospital Contact Directory
            </h3>

            <div className="space-y-4.5">
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Physical Address</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    {knowledgeBase.contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Phone Line</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium">
                    {knowledgeBase.contactInfo.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Email Coordination</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium break-all">
                    {knowledgeBase.contactInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Warn block */}
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-left">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-amber-900 text-xs">Health Emergency Hotline</h5>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-normal">
                  Our web channels must never be used for severe trauma or distress. In clinical emergencies, call **911** or our hospital dispatch line: <br />
                  <span className="font-bold text-amber-950 text-xs">{knowledgeBase.contactInfo.emergencyHotline}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Working hours cards */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm text-left space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-600" />
              Operational Calendar
            </h3>
            
            <div className="space-y-3 pt-1">
              {knowledgeBase.workingHours.map((wh, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800">
                    <span>{wh.days}</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] sm:text-xs">
                      {wh.hours}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] sm:text-xs">{wh.notes}</p>
                  {idx < knowledgeBase.workingHours.length - 1 && (
                    <hr className="border-t border-slate-50 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Contact message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form-entry"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4 text-left">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="h-5.5 w-5.5 text-emerald-600" />
                    Drop Us a Message
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                    Do you have questions or want to collaborate with our NGO? Send a message and we'll reply shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate id="contact-inquiry-form">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="name">
                      fullName *
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
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                      your Email Address *
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
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="message">
                      your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${
                        formErrors.message ? "border-rose-300 focus:ring-rose-250" : "border-slate-200 focus:ring-emerald-250"
                      } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium resize-none`}
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
                    className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-350 text-white rounded-xl font-bold shadow-sm hover:shadow transition-all duration-200 gap-2 cursor-pointer"
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
                        <Send className="h-4 w-4" />
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
                <div className="mx-auto p-4 bg-emerald-50 text-emerald-600 rounded-full w-16 h-16 flex items-center justify-center border border-emerald-100 shadow-sm animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Message Dispatched!</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Thank you, **{formData.name}**! Your non-clinical general inquiry has been received by our office team.
                  </p>
                  <p className="text-xs text-slate-400">
                    We will coordinate an answer back to your email at **{formData.email}** within 24 hours.
                  </p>
                </div>
                <button
                  id="reset-contact-btn"
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
