"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Check,
  CheckCheck,
  Trash2,
  RotateCcw,
  Smile,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY } from "@/data/translations";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: "sent" | "delivered";
}

const EMOJI_LIST = [
  "👋",
  "🚀",
  "🤖",
  "💡",
  "⚡",
  "🔥",
  "✅",
  "💼",
  "📩",
  "🙌",
  "🎯",
  "✨",
];

export function AiChatbot() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].chatbot;

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, open, loading]);

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setShowEmojis(false);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddEmoji = (emoji: string) => {
    setInput((prev) => (prev + emoji).slice(0, 250));
    setShowEmojis(false);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim().slice(0, 250);
    if (!trimmed || loading) return;

    idCounterRef.current += 1;
    const userId = `u-${idCounterRef.current}`;
    const userMessage: Message = {
      id: userId,
      role: "user",
      content: trimmed,
      status: "sent",
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setShowEmojis(false);
    setLoading(true);

    try {
      const recaptchaToken = await getRecaptchaToken("chat");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
          lang,
          website: honeypot,
          recaptchaToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      setMessages((prev) => [
        ...prev.map((m) =>
          m.id === userId ? { ...m, status: "delivered" as const } : m
        ),
        {
          id: `a-${(idCounterRef.current += 1)}`,
          role: "assistant",
          content: data?.reply || data?.error || copy.errorReply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.map((m) =>
          m.id === userId ? { ...m, status: "delivered" as const } : m
        ),
        {
          id: `a-${(idCounterRef.current += 1)}`,
          role: "assistant",
          content: copy.errorReply,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={`overflow-hidden border border-purple-500/30 bg-white/95 dark:bg-[#0b0b10]/95 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.28)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.7)] flex flex-col transition-all duration-300 ${expanded
              ? "fixed inset-3 sm:inset-6 z-[9999] w-auto h-auto max-h-none rounded-3xl"
              : "mb-3 w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[82dvh] rounded-2xl"
              }`}
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-purple-600/15 via-violet-600/10 to-indigo-600/15 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.45)] shrink-0">
                  <Bot className="w-4 h-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#0b0b10]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight truncate">
                    {copy.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-700 dark:text-purple-300 truncate">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {copy.online}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="truncate">{copy.poweredBy}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  title={expanded ? "Restaurar tamaño" : "Agrandar a pantalla completa"}
                  aria-label={expanded ? "Restaurar tamaño" : "Agrandar a pantalla completa"}
                  onClick={() => setExpanded((prev) => !prev)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {expanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  title={copy.resetChat}
                  aria-label={copy.resetChat}
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Cerrar chat"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className={`p-4 flex-1 overflow-y-auto space-y-3 text-sm ${expanded ? "min-h-[380px]" : "min-h-[260px] max-h-[380px]"
                }`}
            >
              {/* Welcome message */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {copy.welcome}
                </div>
              </motion.div>

              {/* Quick prompts */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="flex flex-wrap gap-1.5 pl-9"
                >
                  {copy.quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="px-3 py-1.5 rounded-full text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-500/25 transition-colors text-left cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.2 }}
                    className={`group flex items-end gap-1.5 ${msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {msg.role === "user" && (
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(msg.id)}
                        title={copy.deleteMessage}
                        aria-label={copy.deleteMessage}
                        className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-rose-500 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm leading-relaxed ${msg.role === "user"
                        ? "rounded-br-sm bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                        : "rounded-bl-sm bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-200"
                        }`}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>

                      {msg.role === "user" && (
                        <div className="mt-1 flex items-center justify-end">
                          {msg.status === "delivered" ? (
                            <CheckCheck
                              className="w-3.5 h-3.5 text-sky-300"
                              aria-label="Recibido"
                            />
                          ) : (
                            <Check
                              className="w-3.5 h-3.5 text-purple-200"
                              aria-label="Enviado"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {msg.role === "assistant" && (
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(msg.id)}
                        title={copy.deleteMessage}
                        aria-label={copy.deleteMessage}
                        className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-rose-500 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Animated typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 pl-9"
                >
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-white/[0.06] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Emoji Picker Popover */}
            <AnimatePresence>
              {showEmojis && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="px-3 py-2 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111118] flex flex-wrap gap-1.5"
                >
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleAddEmoji(emoji)}
                      className="w-8 h-8 rounded-lg hover:bg-purple-500/15 flex items-center justify-center text-base transition-colors cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Experience Feedback Rating */}
            {messages.length > 0 && (
              <div className="px-4 py-2 bg-slate-50 dark:bg-white/[0.03] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
                <span>
                  {lang === "es"
                    ? "¿Cómo fue tu experiencia con el bot?"
                    : "How was your bot experience?"}
                </span>
                <div className="flex items-center gap-2">
                  {feedback ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {lang === "es" ? "¡Gracias por valorar!" : "Thanks for rating!"}
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setFeedback("up")}
                        title={lang === "es" ? "Buena experiencia" : "Good"}
                        className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedback("down")}
                        title={lang === "es" ? "Podría mejorar" : "Needs improvement"}
                        className="p-1 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] shrink-0 space-y-1.5"
            >
              {/* Anti-bot honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowEmojis((prev) => !prev)}
                  aria-label={copy.emojiLabel}
                  title={copy.emojiLabel}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${showEmojis
                    ? "bg-purple-500/15 text-purple-600 dark:text-purple-300"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10"
                    }`}
                >
                  <Smile className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  maxLength={250}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPaste={() => {
                    setPasted(true);
                    setTimeout(() => setPasted(false), 850);
                  }}
                  placeholder={copy.placeholder}
                  className={`flex-1 min-w-0 bg-white dark:bg-white/[0.05] border rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all ${pasted
                    ? "border-purple-500 ring-2 ring-purple-500/35"
                    : "border-slate-200 dark:border-white/10"
                    }`}
                />

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Enviar mensaje"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white disabled:opacity-40 hover:from-purple-500 hover:to-violet-500 transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="flex items-center justify-between px-1 text-[10px] font-mono text-slate-400">
                <span>Max 3/min • 10/{lang === "es" ? "día" : "day"}</span>
                <span className={input.length >= 230 ? "text-amber-500" : ""}>
                  {input.length}/250
                </span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={copy.title}
        className="group relative inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-[0_8px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_10px_38px_rgba(168,85,247,0.7)] border border-purple-400/30 transition-shadow cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-purple-700 animate-pulse" />
        </span>
        <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
          {copy.launcherCallout}
        </span>
      </motion.button>
    </div>
  );
}
