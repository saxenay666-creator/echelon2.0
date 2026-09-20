import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Sparkles, HelpCircle, Lightbulb, ArrowUpRight, MessageSquare } from 'lucide-react';

export const AIChatbot = ({ setActivePage }) => {
  const { isChatbotOpen, setIsChatbotOpen, chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What can I do on the ECHELON website?",
    "How does the 6-stage innovation loop work?",
    "How do I submit and track a problem?",
    "How to get Ration Card or update Aadhaar?",
    "Garbage pickup not arriving in my ward",
    "Transformer burnt / rural power cut helpline",
    "How does student-to-industry prototype matching work?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatbotOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatbotOpen, isTyping]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;
    setInputText('');
    setIsTyping(true);
    sendChatMessage(textToSend);

    setTimeout(() => {
      setIsTyping(false);
    }, 700);
  };

  if (!isChatbotOpen) {
    return (
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-orange-400 via-rose-400 to-cyan-400 text-white shadow-xl shadow-rose-300/40 hover:shadow-rose-400/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border border-white"
        title="Open AI Civic Assistant"
      >
        <Bot className="w-6 h-6 animate-bounce" />
        <span className="hidden sm:inline font-black text-sm pr-1 text-slate-900">AI Civic Sahayak</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute top-2 right-2 ring-2 ring-white"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-orange-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Header in Soft Pastel Peach-Rose Gradient */}
      <div className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 px-5 py-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5 text-white">
              ECHELON AI Assistant
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            </h3>
            <p className="text-[11px] text-rose-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> Multilingual Civic & R&D Guidance
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsChatbotOpen(false)}
          className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Info Notice Banner */}
      <div className="bg-orange-50 border-b border-orange-100 px-4 py-2 text-[11px] text-orange-950 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-orange-800 font-semibold">
          <Lightbulb className="w-3.5 h-3.5 shrink-0 text-orange-600" />
          Ask in Hindi, English, Bengali, Marathi, or Jharkhand languages.
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-br-none font-medium'
                  : 'bg-white text-slate-800 border border-orange-100 rounded-bl-none shadow-xs'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Assistant</span>
                </div>
              )}
              <p className="whitespace-pre-line">{msg.text}</p>
              <span
                className={`text-[9px] block mt-1 font-semibold ${
                  msg.sender === 'user' ? 'text-rose-100 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-slate-400 font-medium ml-1">AI analyzing query...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 no-scrollbar">
        {quickPrompts.slice(0, 4).map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-900 transition-colors shrink-0 flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span className="truncate max-w-[170px]">{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI anything (schemes, issues, prototypes)..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white transition-all font-medium"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white disabled:opacity-40 hover:from-orange-600 hover:to-rose-600 transition-all shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
