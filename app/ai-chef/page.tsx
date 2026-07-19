"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { ChefHat, Send, Sparkles, RotateCcw } from "lucide-react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { api } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const suggestedPrompts = [
  "What can I substitute for eggs?",
  "How do I know when chicken is fully cooked?",
  "Give me a quick 15-minute dinner idea",
];

interface StoredMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AIChefPage() {
  const { session, isPending } = useProtectedRoute();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, append, isLoading, setMessages } =
    useChat({
      api: `${API_URL}/api/ai/chat`,
      body: { sessionId },
      credentials: "include",
    });

  // One continuous conversation per logged-in user, persisted across visits.
  useEffect(() => {
    if (session?.user?.id) {
      setSessionId(`chef-${session.user.id}`);
    }
  }, [session]);

  // Load previous messages for this session once, on first load.
  useEffect(() => {
    if (!sessionId || historyLoaded) return;
    api
      .getChatHistory(sessionId)
      .then((data) => {
        const history = data as StoredMessage[];
        if (history.length > 0) {
          setMessages(
            history.map((m, i) => ({
              id: `history-${i}`,
              role: m.role,
              content: m.content,
            }))
          );
        }
      })
      .finally(() => setHistoryLoaded(true));
  }, [sessionId, historyLoaded, setMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startNewChat = () => {
    setMessages([]);
    setSessionId(`chef-${session?.user?.id}-${Date.now()}`);
  };

  if (isPending || !session) {
    return <div className="mx-auto max-w-2xl px-6 py-20 text-center text-ink/50">Checking session...</div>;
  }

  return (
    <section className="mx-auto flex h-[calc(100dvh-160px)] max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-herb dark:text-saffron">
          <ChefHat size={22} />
          <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">AI Chef Assistant</h1>
        </div>
        {messages.length > 0 && (
          <button
            onClick={startNewChat}
            className="flex items-center gap-1 rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/60 hover:border-herb/40"
          >
            <RotateCcw size={12} /> New chat
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-ink/60">
        Ask about substitutions, technique, timing, or anything mid-cook.
      </p>

      {/* Messages */}
      <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
        {historyLoaded && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <Sparkles size={28} className="text-saffron" />
            <p className="text-sm text-ink/50">Ask me anything about cooking</p>
            <div className="flex flex-col gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => append({ role: "user", content: p })}
                  className="rounded-full border border-ink/15 bg-card px-4 py-2 text-xs text-ink/70 hover:border-herb/40"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-card px-4 py-2.5 text-sm sm:max-w-[80%] ${
                m.role === "user"
                  ? "bg-herb text-white dark:bg-saffron dark:text-ink"
                  : "border border-ink/10 bg-card text-ink"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-card border border-ink/10 bg-card px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Follow-up suggestions after a response */}
      {messages.length > 0 && !isLoading && (
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedPrompts.slice(0, 2).map((p) => (
            <button
              key={p}
              onClick={() => append({ role: "user", content: p })}
              className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/60 hover:border-herb/40"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full border border-ink/15 bg-card px-2 py-1.5">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask the AI chef..."
          className="w-full bg-transparent px-3 text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paprika text-white disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </form>
    </section>
  );
}
