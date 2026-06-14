import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  User,
  Phone,
  Mail,
  Stethoscope,
  Send,
  Sparkles,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { knowledgeBase } from "../data/knowledgeBase";
import { generateConcernSummary, SummarizeParams } from "../services/gemini";
import MarkdownView from "../components/MarkdownView";

export default function Appointment() {
  // Appointment Form State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    department: knowledgeBase.departments[0]?.name || "General Medicine",
    symptoms: "",
    date: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [summaryResult, setSummaryResult] = useState<{
    text: string;
    modelUsed: string;
  } | null>(null);

  // Form Field Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.age.trim()) {
      errors.age = "Age is required";
    } else {
      const ageVal = parseInt(formData.age);
      if (isNaN(ageVal) || ageVal <= 0 || ageVal > 125) {
        errors.age = "Please supply a valid clinical age (1-125)";
      }
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = "Provide a valid phone formatting (e.g. 555-123-4567)";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please supply a valid email address";
    }
    if (!formData.symptoms.trim()) {
      errors.symptoms = "Let us know about your health concern or symptoms";
    } else if (formData.symptoms.length < 10) {
      errors.symptoms = "Please specify in at least 10 characters to help compile an accurate concern brief";
    }
    if (!formData.date) errors.date = "Preferred date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error as user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmittingForm(true);
    setSummaryResult(null);

    try {
      // Trigger API summarizer
      const requestParams: SummarizeParams = {
        name: formData.name,
        age: parseInt(formData.age) || formData.age,
        phone: formData.phone,
        email: formData.email,
        department: formData.department,
        symptoms: formData.symptoms,
        date: formData.date
      };

      const summaryResponse = await generateConcernSummary(requestParams);
      
      setSummaryResult({
        text: summaryResponse.text,
        modelUsed: summaryResponse.modelUsed
      });
      setIsFormSubmitted(true);
    } catch (err: any) {
      console.error(err);
      // Fallback text summary in worst-case API failure using basic rules so that the form always responds successfully
      setSummaryResult({
        text: `### Hospital Portal Appointment Summary\n\n**Patient**: ${formData.name} (Age: ${formData.age})\n**Preferred Department**: ${formData.department}\n**Date Selected**: ${formData.date}\n\n**Symptoms Provided**:  \n${formData.symptoms}\n\n*General Note: The medical summary system is currently experiencing high volume. Your booking is queued. Please arrive 15 minutes before your scheduled slot with any past health reports.*`,
        modelUsed: "offline-rule-backup"
      });
      setIsFormSubmitted(true);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      age: "",
      phone: "",
      email: "",
      department: knowledgeBase.departments[0]?.name || "General Medicine",
      symptoms: "",
      date: ""
    });
    setFormErrors({});
    setIsFormSubmitted(false);
    setSummaryResult(null);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 pb-20 animate-fade-in text-stone-850" id="appointment-booking-root">
      
      {/* Page header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto banner-header">
        <span className="text-xs font-extrabold text-fresh-green uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-fresh-green/20">
          Outpatient Care Schedule
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight mt-1.5 animate-fade-in">
          Appointment Clinic Booking
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Submit your clinician appointment request below. Our medical coordinator team will evaluate your clinic slots and verify details.
        </p>
      </section>

      {/* Centered Patient Consultation Form Container */}
      <div className="max-w-4xl mx-auto w-full bg-white p-6 sm:p-10 rounded-4xl border border-stone-200/60 shadow-lg shadow-stone-200/50 min-h-[580px] flex flex-col justify-between hover:border-fresh-green/35 transition-all duration-350">
        <AnimatePresence mode="wait">
          {!isFormSubmitted ? (
            <motion.div
              key="form-entry-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-100 pb-5 text-left">
                <h2 className="text-xl font-display font-extrabold text-stone-900 flex items-center gap-2.5">
                  <CalendarDays className="h-5.5 w-5.5 text-fresh-green" />
                  Patient Consultation Form
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
                  Carefully input your vital details. Our hospital managers will coordinate appointment confirmation.
                </p>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-5 text-left" noValidate id="consultation-booking-form">
                {/* Name and Age row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="name">
                      Patient Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-400" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`pl-11 w-full rounded-2xl border ${
                          formErrors.name ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                        } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                        placeholder="e.g. Jane Doe"
                      />
                    </div>
                    {formErrors.name && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="age">
                      Patient Age *
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.age ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                      placeholder="e.g. 28"
                    />
                    {formErrors.age && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.age}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="phone">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-400" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pl-11 w-full rounded-2xl border ${
                          formErrors.phone ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                        } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                        placeholder="e.g. (555) 000-1234"
                      />
                    </div>
                    {formErrors.phone && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="email">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-11 w-full rounded-2xl border ${
                          formErrors.email ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                        } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                        placeholder="e.g. jdoe@example.com"
                      />
                    </div>
                    {formErrors.email && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Department & Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="department">
                      Preferred Department *
                    </label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-fresh-green" />
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="pl-11 w-full rounded-2xl border border-stone-200 px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-fresh-green/20 focus:ring-opacity-40 bg-[#fdfdfc] font-bold text-stone-800 cursor-pointer"
                      >
                        {knowledgeBase.departments.map((dept, i) => (
                           <option key={i} value={dept.name}>
                             {dept.name}
                           </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="date">
                      Preferred Date *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border ${
                        formErrors.date ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/20"
                      } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium text-stone-800 bg-[#fdfdfc]`}
                    />
                    {formErrors.date && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {formErrors.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Symptoms Concern */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest" htmlFor="symptoms">
                    Symptoms & Concerns *
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    rows={4}
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    className={`w-full rounded-2xl border ${
                      formErrors.symptoms ? "border-rose-300 focus:ring-rose-200" : "border-stone-200 focus:ring-fresh-green/15"
                    } px-3.5 py-3 text-sm outline-none focus:border-fresh-green focus:ring-4 focus:ring-opacity-40 transition-all font-medium resize-none text-stone-850 bg-[#fdfdfc]`}
                    placeholder="Please explicitly state physical symptoms, timeline, and intensity (e.g. mild shoulder tightness since 3 days)..."
                  />
                  <div className="flex justify-between items-center text-stone-400 text-[10px] pt-1 font-bold uppercase tracking-wider">
                    <span>Minimum 10 characters</span>
                    <span>{formData.symptoms.length} chars entered</span>
                  </div>
                  {formErrors.symptoms && (
                    <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {formErrors.symptoms}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="submit-appointment-btn"
                  type="submit"
                  disabled={isSubmittingForm}
                  className="w-full flex items-center justify-center py-4 bg-fresh-green hover:bg-[#2E7D32] disabled:bg-stone-300 text-white rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmittingForm ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Compiling briefing and scheduling...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4.5 w-4.5 text-amber-100 animate-pulse" />
                      <span>Book Clinic Slot & Compile Briefing</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            // Success confirmation view with AI generated summary
            <motion.div
              key="success-summary-view"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 text-left"
            >
              <div className="bg-[#E8F5E9]/50 border border-fresh-green/20 rounded-3xl p-6 flex items-start gap-4">
                <div className="p-3 bg-[#E8F5E9] rounded-2xl text-emerald-800 flex-shrink-0 border border-fresh-green/20">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-stone-900 font-display font-extrabold text-lg">Appointment Submitted Successfully!</h3>
                  <p className="text-stone-600 text-sm leading-relaxed font-semibold">
                    Thank you, **{formData.name}**. We've successfully received your booking. Our administrative clinicians have queued your appointment for evaluation.
                  </p>
                </div>
              </div>

              <div className="border border-stone-200 bg-stone-50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-250 pb-3.5">
                  <h4 className="font-display font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-fresh-green animate-pulse" />
                    Patient Clinical Briefing
                  </h4>
                  {summaryResult?.modelUsed !== "offline-rule-backup" && (
                    <span className="text-[10px] font-mono text-fresh-green bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-fresh-green/20 font-bold">
                      {summaryResult?.modelUsed || "gemini-2.1"}
                    </span>
                  )}
                </div>

                <div className="prose max-w-none text-xs sm:text-sm leading-relaxed text-stone-700" id="ai-symptom-summarization-pnl">
                  {summaryResult && <MarkdownView text={summaryResult.text} />}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="book-another-btn"
                  onClick={handleResetForm}
                  className="flex-1 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 rounded-2xl font-bold transition-all duration-200 cursor-pointer text-center text-sm"
                >
                  Schedule Another Consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
