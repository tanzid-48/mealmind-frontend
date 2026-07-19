"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/ui/GoogleIcon";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message || "Could not create account.");
      toast.error(authError.message || "Could not create account.");
      return;
    }
    toast.success("Account created!");
    router.push("/");
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-card border border-ink/10 bg-card p-6 sm:p-8"
      >
        <div className="flex items-center justify-center gap-2 text-herb dark:text-saffron">
          <ChefHat size={26} />
          <span className="font-display text-xl font-semibold">MealMind</span>
        </div>
        <h1 className="mt-4 text-center font-display text-2xl font-semibold text-ink">
          Create your account
        </h1>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5">
            <User size={16} className="text-ink/40" />
            <input
              type="text"
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5">
            <Mail size={16} className="text-ink/40" />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5">
            <Lock size={16} className="text-ink/40" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-ink/40 hover:text-ink/70"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-sm text-paprika">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-paprika py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <button
          onClick={async () => {
            try {
              const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}/`,
              });
              if (error) toast.error(error.message || "Google sign-in failed. Please try again.");
            } catch (err) {
              toast.error("Could not reach the server. Check your connection and try again.");
            }
          }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 py-2.5 text-sm font-medium text-ink hover:bg-ink/5"
        >
          <GoogleIcon size={16} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-paprika hover:underline dark:text-saffron">
            Log in
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
