"use client";
import React, { useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";

export const GlobalAIBuddy = () => {
  const [isOpen, setIsOpen] = useState(false);

  // manual chat state
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;
const userMessage = {
  role: "user",
  content: input,
};

    const updatedMessages = [...messages, userMessage];
    const cleanMessages = updatedMessages
  .filter((m) => m?.role && typeof m?.content === "string" && m.content.trim() !== "")
  .map((m) => ({
    role: m.role,
    content: m.content.trim(),
  }));

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/study-buddy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: cleanMessages,
        }),
      });

  const data = await res.json();
console.log("AI RESPONSE:", data);

setMessages((prev) => [
  ...prev,
  { role: "assistant", content: "Hello, how is your learning going? I am a bit busy right now, but you can take help from your teacher." },
]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[9999] bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <div className="relative">
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </div>

        <span className="absolute right-16 bg-white text-indigo-600 px-3 py-1 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-indigo-50">
          Need help? Ask Buddy!
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white w-full max-w-2xl h-[80vh] md:h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/20">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-700 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Bot size={24} />
                </div>

                <div>
                  <h3 className="font-black text-lg flex items-center gap-2">
                    Learn Hub AI{" "}
                    <Sparkles size={16} className="text-yellow-300" />
                  </h3>
                  <p className="text-xs text-indigo-100">
                    Your 24/7 Smart Study Partner
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 animate-bounce">
                    <Bot size={40} />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-800">
                      Assalamualikum!
                    </h4>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      I'm your AI Study Buddy. I can explain lessons, solve
                      problems, or chat with you!
                    </p>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white border text-indigo-600"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border rounded-tl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-indigo-600 text-xs">
                  <Loader2 className="animate-spin" size={14} />
                  Buddy is thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t bg-white">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full p-3 rounded-xl bg-slate-100 outline-none"
                />

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 rounded-xl"
                >
                  <Send size={18} />
                </button>
              </form>

              <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-bold">
                Powered by Learn Hub AI Core
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};