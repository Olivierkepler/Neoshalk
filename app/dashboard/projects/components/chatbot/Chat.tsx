"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot} from "lucide-react";
import Image from "next/image";

/** 🧠 Normalize uppercase replies into readable sentences */
function normalizeCase(text: string): string {
  if (!text) return text;
  if (/[a-z]/.test(text)) return text;
  return text
    .toLowerCase()
    .replace(/(^\w{1}|\.\s*\w{1}|\!\s*\w{1}|\?\s*\w{1})/g, (match) =>
      match.toUpperCase()
    );
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Smooth scroll to bottom whenever a new message is added ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** ✉️ Send a message and handle streaming or standard reply */
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const assistantIndex = messages.length + 1;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const res = await fetch("/dashboard/projects/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, stream: true }),
      });

      // --- Non-stream (JSON) fallback ---
      if (!res.body || res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        const reply = normalizeCase(data.reply || data.message || "No response.");
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[assistantIndex] = { role: "assistant", content: reply };
          return newMsgs;
        });
        setLoading(false);
        return;
      }

      // --- Streaming response handling ---
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[assistantIndex] = { role: "assistant", content: normalizeCase(buffer) };
          return newMsgs;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Sorry, something went wrong while generating the response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /** ⌨️ Handle Enter press (Shift+Enter = new line) */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-198 w-full  text-gray-800 dark:text-gray-100 relative transition-colors">
      {/* --- Scrollable Chat Area --- */}
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-36 custom-scrollbar">
        <div className="max-w-3xl mx-auto w-full space-y-4">
          {/* --- Empty state --- */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500 dark:text-gray-400 select-none">
              <Image src="/neoshark_no_bg.png" alt="Neoshark" width={100} height={100} className="opacity-90" />
              <p className="text-lg font-medium mt-3">How can I help you today?</p>
              <p className="text-sm opacity-80 mt-1">Ask me anything about your project or code.</p>
            </div>
          )}

          {/* --- Chat Messages --- */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex w-full ${msg.role === "user" ? "justify-start" : "justify-start"}`}>
              <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
             
                <div
                  className={`p-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words transition-all duration-200 ${
                    msg.role === "user"
                      ? "dark:text-white text-black border border-gray-300 dark:border-gray-700 rounded-sm"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.content ||
                    (msg.role === "assistant" &&
                      i === messages.length - 1 &&
                      loading && (
                        <span className="inline-block w-2 h-2 dark:text-white text-black rounded-full animate-pulse"></span>
                      ))}
                </div>
              </div>
            </div>
          ))}

          {/* --- Loading indicator --- */}
          {loading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
              <Bot size={14} className="dark:text-white text-black" />
              <span>Thinking...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* --- Sticky Input Bar --- */}
      <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#1c1c1f]/90 backdrop-blur-md py-4 px-6">
        <div className="max-w-3xl mx-auto w-full flex items-center bg-gray-100 dark:bg-[#2a2a2d] border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-gray-500/30 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm p-3 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className={`p-3 rounded-r-xl transition-all duration-200 ${
              loading || !input.trim()
                ? "text-gray-400 cursor-not-allowed"
                : "dark:text-white text-black hover:bg-gray-500/10 active:scale-95"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* --- Custom Scrollbar --- */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(120, 120, 120, 0.25);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 120, 120, 0.4);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(120, 120, 120, 0.25) transparent;
        }
      `}</style>
    </div>
  );
}
