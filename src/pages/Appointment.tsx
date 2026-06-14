import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  User,
  Phone,
  Mail,
  Stethoscope,
  Send,
  Sparkles,
  Bot,
  UserCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Info
} from "lucide-react";
import { knowledgeBase } from "../data/knowledgeBase";
import { sendChatMessage, generateConcernSummary, ChatMessage, SummarizeParams } from "../services/gemini";
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

  // Chatbot State
  const [chatbotInput, setChatbotInput] = useState("");
  const [chats, setChats] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello! I am the Portal Support Assistant. Feel free to ask about our available medical departments, outpatient hours, facility locations, patient services, or our volunteer network!"
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

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

  // Chatbot logic
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = chatbotInput.trim();
    if (!query) return;

    // Append user message
    const updatedChats = [...chats, { role: "user" as const, text: query }];
    setChats(updatedChats);
    setChatbotInput("");
    setIsChatLoading(true);
    setChatError(null);

    try {
      const response = await sendChatMessage(query, chats);
      setChats((prev) => [...prev, { role: "model", text: response.text }]);
    } catch (err: any) {
      setChatError(err.message || "Failed to contact hospital assistant. Please try again.");
    } finally {
      setIsChatLoading(false);
    }
  };

  // Quick Questions handler for instant interactive grounding
  const handleQuickQuestionClick = async (question: string) => {
    setChatbotInput("");
    setIsChatLoading(true);
    setChatError(null);

    // Append user question
    const updatedChats = [...chats, { role: "user" as const, text: question }];
    setChats(updatedChats);

    try {
      const response = await sendChatMessage(question, chats);
      setChats((prev) => [...prev, { role: "model", text: response.text }]);
    } catch (err: any) {
      setChatError(err.message || "Failed to contact assistant.");
    } finally {
      setIsChatLoading(false);
    }
  };

  const suggestPrompts = [
    "What are your outpatient (OPD) working hours?",
    "Show me the available hospital departments & specialists",
    "Where is the Patient Serenity Lounge located?",
    "Tell me about the volunteer program commitment and benefits."
  ];

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="appointment-booking-root">
      {/* Page header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto banner-header">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Appointment Clinic & Support Assistant
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Submit your clinician appointment request below. While finalizing your details, feel free to ask our Portal Support Assistant questions about our offices, clinics, or operational hours.
        </p>
      </section>

      {/* Main layout splitting Booking form and Chatbot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Booking Form or Success Summary (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[600px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isFormSubmitted ? (
              <motion.div
                key="form-entry-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4 text-left">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CalendarDays className="h-5.5 w-5.5 text-emerald-600" />
                    Patient Consultation Form
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Carefully input your vital details. Our hospital managers will coordinate appointment confirmation.
                  </p>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-5 text-left" noValidate id="consultation-booking-form">
                  {/* Name and Age row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="name">
                        Patient Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`pl-10 w-full rounded-xl border ${
                            formErrors.name ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                          } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                          placeholder="e.g. Jane Doe"
                        />
                      </div>
                      {formErrors.name && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="age">
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
                        className={`w-full rounded-xl border ${
                          formErrors.age ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                        } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                        placeholder="e.g. 28"
                      />
                      {formErrors.age && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.age}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="phone">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`pl-10 w-full rounded-xl border ${
                            formErrors.phone ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                          } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                          placeholder="e.g. (555) 000-1234"
                        />
                      </div>
                      {formErrors.phone && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.phone}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`pl-10 w-full rounded-xl border ${
                            formErrors.email ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                          } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                          placeholder="e.g. jdoe@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Department & Date Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="department">
                        Preferred Medical Department *
                      </label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-emerald-600" />
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-200 focus:ring-opacity-40 bg-white font-medium"
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
                      <label className="block text-sm font-semibold text-slate-700" htmlFor="date">
                        Preferred Appointment Date *
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border ${
                          formErrors.date ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                        } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium`}
                      />
                      {formErrors.date && (
                        <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Symptoms Concern */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="symptoms">
                      Symptoms & Health Concerns *
                    </label>
                    <textarea
                      id="symptoms"
                      name="symptoms"
                      rows={4}
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${
                        formErrors.symptoms ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
                      } px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-opacity-40 transition-all font-medium resize-none`}
                      placeholder="Please explicitly state physical symptoms, timeline, and intensity (e.g. mild shoulder tightness since 3 days after sleeping wrong)..."
                    />
                    <div className="flex justify-between items-center text-slate-400 text-xs pt-1">
                      <span>Minimum 10 characters</span>
                      <span>{formData.symptoms.length} chars entered</span>
                    </div>
                    {formErrors.symptoms && (
                      <span className="text-rose-500 text-xs font-semibold flex items-center gap-1">
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
                    className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-350 text-white rounded-xl font-bold shadow-sm hover:shadow transition-all duration-200 gap-2 cursor-pointer"
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
                        <Sparkles className="h-4.5 w-4.5 text-emerald-200" />
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
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700 flex-shrink-0">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-emerald-950 font-extrabold text-lg">Appointment Submitted Successfully!</h3>
                    <p className="text-emerald-800 text-sm leading-relaxed">
                      Thank you, **{formData.name}**. We've successfully received your booking. Our administrative clinicians have queued your appointment for evaluation.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-emerald-600" />
                      Patient Clinical Briefing
                    </h4>
                    {summaryResult?.modelUsed !== "offline-rule-backup" && (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
                        {summaryResult?.modelUsed || "gemini-2.5"}
                      </span>
                    )}
                  </div>

                  <div className="prose max-w-none text-sm leading-relaxed" id="ai-symptom-summarization-pnl">
                    {summaryResult && <MarkdownView text={summaryResult.text} />}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    id="book-another-btn"
                    onClick={handleResetForm}
                    className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-bold transition-all duration-200 cursor-pointer text-center"
                  >
                    Schedule Another Consultation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Chatbot widget (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 shadow-sm rounded-3xl min-h-[600px] flex flex-col justify-between overflow-hidden">
          
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 px-5 py-4 border-b border-emerald-900/10 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/10 rounded-xl">
                <Bot className="h-5.5 w-5.5 text-emerald-200" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm tracking-tight">Portal Support Assistant</h3>
                <p className="text-[10px] text-emerald-200/90 font-medium">Portal Search Assistant</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-900/30 rounded-full text-[10px] text-emerald-250 font-bold border border-emerald-700">
              ● Online
            </span>
          </div>

          <div className="p-4 bg-emerald-50/40 text-left border-b border-emerald-150/40">
            <p className="text-[11px] text-emerald-900 leading-tight flex items-start gap-1.5 font-medium">
              <Info className="h-3.5 w-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> This assistant is programmed to answer general inquiries regarding hospital services, hours, locations, and procedures. It does not provide medical diagnoses or treatment prescriptions.
              </span>
            </p>
          </div>

          {/* Chat History Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] min-h-[280px] bg-slate-50/40 text-left">
            <AnimatePresence initial={false}>
              {chats.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-800 text-white shadow-xs rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-150 shadow-xs rounded-tl-none pr-3"
                    }`}
                  >
                    {msg.role === "model" ? (
                      <div className="prose text-xs sm:text-sm">
                        <MarkdownView text={msg.text} />
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {isChatLoading && (
                <motion.div
                  key="chat-loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl rounded-tl-none pr-5 pl-4 py-3 border border-slate-150 shadow-xs flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Assistant is retrieving information...</span>
                  </div>
                </motion.div>
              )}

              {chatError && (
                <motion.div
                  key="chat-error-log"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs flex items-start gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>{chatError}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messageEndRef} />
          </div>

          {/* Quick Grounded Prompts selection box */}
          <div className="p-3 bg-white border-t border-slate-100 text-left space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              Suggested Knowledge Queries:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pt-0.5">
              {suggestPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestionClick(q)}
                  disabled={isChatLoading}
                  className="text-[10px] sm:text-xs text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-100 hover:border-emerald-600 rounded-lg px-2.5 py-1.5 transition-all text-left font-semibold active:scale-95 duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat input box */}
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
            <input
              type="text"
              value={chatbotInput}
              onChange={(e) => setChatbotInput(e.target.value)}
              disabled={isChatLoading}
              placeholder="Ask hours, departments, volunteering details..."
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm bg-white outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-250 focus:ring-opacity-40 transition-all font-medium"
            />
            <button
              id="send-chat-message-btn"
              type="submit"
              disabled={isChatLoading || !chatbotInput.trim()}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-350 text-white rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0 shadow-xs"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
