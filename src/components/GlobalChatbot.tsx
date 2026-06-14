import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Send,
  X,
  MessageSquare,
  HelpCircle,
  Clock,
  Info,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  ShieldAlert
} from "lucide-react";
import { sendChatMessage, ChatMessage } from "../services/gemini";
import MarkdownView from "./MarkdownView";

export default function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Try to load historical chats from session storage to maintain conversation across pages
    try {
      const saved = sessionStorage.getItem("chsp_chat_history");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read chat history from session storage", e);
    }
    return [
      {
        role: "model",
        text: "Hello! I am your CHSP Support Assistant. Ask me anything about our available hospital services, outpatient clinics, physical locations, contact coordinates, how to file an official complaint, or our volunteer program!"
      }
    ];
  });
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const endRef = useRef<HTMLDivElement>(null);

  // Sync scroll on message update
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Persist messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem("chsp_chat_history", JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not write chat history to session storage", e);
    }
  }, [messages]);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    const userMessage: ChatMessage = { role: "user", text: query };
    const updated = [...messages, userMessage];
    
    setMessages(updated);
    setInputVal("");
    setIsLoading(true);
    setErrorText(null);

    try {
      const response = await sendChatMessage(query, messages);
      setMessages((prev) => [...prev, { role: "model", text: response.text }]);
    } catch (err: any) {
      setErrorText(err.message || "Failed to reach assistant. Please try checking your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuiz = async (qText: string) => {
    setIsLoading(true);
    setErrorText(null);
    const userMessage: ChatMessage = { role: "user", text: qText };
    const updated = [...messages, userMessage];
    setMessages(updated);

    try {
      const response = await sendChatMessage(qText, messages);
      setMessages((prev) => [...prev, { role: "model", text: response.text }]);
    } catch (err: any) {
      setErrorText(err.message || "Failed to execute query.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowNotificationBadge(false);
    }
  };

  const quickPrompts = [
    { label: "🏥 Available Outpatient Services", query: "What outpatient medical services and departments are available?" },
    { label: "📞 Hospital Phone & Address", query: "What are your telephone numbers, email address, physical location, and hours?" },
    { label: "⚠️ Where to report a complaint?", query: "How and where do I report a complaint or submit feedback?" },
    { label: "🤝 Volunteering details", query: "Can you explain the volunteer program commitments, benefits, and how to apply?" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="global-chatbot-fixed-root">
      <AnimatePresence>
        {/* Floating Chat Section Popup */}
        {isOpen && (
          <motion.div
            key="chat-popup-card"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[500px] max-w-[520px] h-[680px] max-h-[calc(100vh-100px)] min-h-[400px] bg-white border border-stone-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between mb-4 transform origin-bottom-right"
          >
            {/* Header branding */}
            <div className="bg-gradient-to-r from-stone-850 to-stone-950 px-5 py-4 border-b border-stone-900 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-fresh-green/10 rounded-xl border border-fresh-green/20">
                  <Bot className="h-5.5 w-5.5 text-fresh-green" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-bold text-sm tracking-tight text-white">
                    CHSP Care Assistant
                  </h3>
                  <p className="text-[10px] text-amber-brand font-semibold flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>Grounded Support Service</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleToggleOpen}
                className="p-1 px-1.5 bg-stone-800 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Minimize Chat"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Advisory alert bar */}
            <div className="p-3 bg-stone-50 text-left border-b border-stone-200/40">
              <p className="text-[11px] text-stone-600 leading-normal flex items-start gap-1.5 font-semibold">
                <Info className="h-4.5 w-4.5 text-amber-brand flex-shrink-0 mt-0.5" />
                <span>
                  Provide administrative support only. No medical evaluations. Report medical emergencies directly to 911 or call (+1-555-911-3000).
                </span>
              </p>
            </div>

            {/* Chats history panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fdfdfb]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-fresh-green text-white rounded-tr-none font-semibold shadow-xs"
                        : "bg-white text-stone-800 border border-stone-200/50 rounded-tl-none font-medium shadow-2xs pr-3 text-left"
                    }`}
                  >
                    {m.role === "model" ? (
                      <MarkdownView text={m.text} />
                    ) : (
                      <p>{m.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-none pr-5 pl-4 py-3 border border-stone-200 shadow-2xs flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] text-stone-500 font-bold">Consulting CHSP Handbook...</span>
                  </div>
                </div>
              )}

              {errorText && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs flex items-start gap-2 text-left font-semibold">
                  <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>{errorText}</div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Fast grounding pre-selections drawer */}
            <div className="p-3 bg-white border-t border-stone-200/40 text-left">
              <span className="text-[10px] uppercase font-bold text-stone-450 flex items-center gap-1.5 mb-1.5">
                <HelpCircle className="h-3 w-3 text-fresh-green" />
                Suggested RAG queries
              </span>
              <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto">
                {quickPrompts.map((p, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleQuickQuiz(p.query)}
                    disabled={isLoading}
                    className="text-[11px] text-left font-bold text-stone-700 bg-stone-50 hover:bg-fresh-green/10 hover:text-fresh-green border border-stone-200/60 rounded-lg p-2.5 transition-all cursor-pointer truncate"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input submission footer */}
            <form onSubmit={handleMessageSubmit} className="p-3 border-t border-stone-200/40 bg-[#faf9f6] flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isLoading}
                placeholder="Ask hours, complaint desk, specialist info..."
                className="flex-1 rounded-2xl border border-stone-200 px-4 py-3 text-xs sm:text-sm bg-white outline-none focus:border-fresh-green focus:ring-4 focus:ring-fresh-green/20 focus:ring-opacity-40 transition-all font-medium text-stone-800"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="p-3.5 bg-fresh-green hover:bg-[#2E7D32] disabled:bg-stone-300 text-white rounded-2xl transition-all duration-200 cursor-pointer flex-shrink-0 shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Interactive Button */}
      <motion.button
        id="global-floating-robot-btn"
        onClick={handleToggleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-4 bg-fresh-green hover:bg-[#2E7D32] text-white rounded-full shadow-2xl transition-all flex items-center justify-center cursor-pointer border-2 border-emerald-100 group"
        aria-label="Toggle Portal Assistant"
      >
        <Bot className="h-7 w-7 text-white" />
        
        {/* Pulsing visual halo to alert the user */}
        <span className="absolute -inset-0.5 rounded-full border-2 border-emerald-400 opacity-20 group-hover:scale-110 transition-transform duration-350"></span>

        {/* Small warning beacon */}
        <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>

        {/* Floating badge for first time */}
        {showNotificationBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute right-14 bg-stone-900 border border-fresh-green/20 text-white text-[10px] sm:text-xs font-bold py-1.5 px-3 rounded-xl whitespace-nowrap shadow-md pointer-events-none"
          >
            Ask general questions, contacts, volunteering & complaints!
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
