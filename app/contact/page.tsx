"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Get in touch</h1>
      <p className="mt-2 text-ink/70">Questions, feedback, or bug reports — send them over.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-card border border-ink/15 bg-card px-4 py-2.5 text-sm focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-card border border-ink/15 bg-card px-4 py-2.5 text-sm focus:outline-none"
          />
          <textarea
            required
            rows={5}
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-card border border-ink/15 bg-card px-4 py-2.5 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-paprika py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
          >
            Send message
          </button>
        </form>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-card border border-ink/10 bg-card p-4">
            <Mail size={18} className="text-herb dark:text-saffron" />
            <span className="text-sm text-ink/80">hello@mealmind.ai</span>
          </div>
          <div className="flex items-center gap-3 rounded-card border border-ink/10 bg-card p-4">
            <MapPin size={18} className="text-herb dark:text-saffron" />
            <span className="text-sm text-ink/80">Bogura, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3 rounded-card border border-ink/10 bg-card p-4">
            <Github size={18} className="text-herb dark:text-saffron" />
            <a href="https://github.com/tanzid-48" target="_blank" rel="noreferrer" className="text-sm text-ink/80 hover:underline">
              github.com/tanzid-48
            </a>
          </div>
          <div className="flex items-center gap-3 rounded-card border border-ink/10 bg-card p-4">
            <Linkedin size={18} className="text-herb dark:text-saffron" />
            <a href="https://linkedin.com/in/tanzidmondol" target="_blank" rel="noreferrer" className="text-sm text-ink/80 hover:underline">
              linkedin.com/in/tanzidmondol
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
