"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Wifi, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api/client";
import type { Metadata } from "next";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const twoFaSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type LoginForm = z.infer<typeof loginSchema>;
type TwoFaForm = z.infer<typeof twoFaSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempToken, setTempToken] = useState("");

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const twoFaForm = useForm<TwoFaForm>({ resolver: zodResolver(twoFaSchema) });

  async function onLogin(values: LoginForm) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post("/auth/login", values);
      if (data.requires2FA) {
        setTempToken(data.tempToken);
        setStep("2fa");
      } else {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        router.replace("/");
      }
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function on2FA(values: TwoFaForm) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post("/auth/2fa/verify", {
        tempToken,
        code: values.code,
      });
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      router.replace("/");
    } catch {
      setError("Invalid 2FA code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface-800 rounded-2xl border border-surface-700 p-8 shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Wifi className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-none">XounNet</h1>
          <p className="text-surface-400 text-xs">ISP OS</p>
        </div>
      </div>

      {step === "credentials" ? (
        <>
          <div className="mb-6">
            <h2 className="text-white text-2xl font-semibold">Welcome back</h2>
            <p className="text-surface-400 text-sm mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">
                Email address
              </label>
              <input
                {...loginForm.register("email")}
                type="email"
                autoComplete="email"
                placeholder="admin@xounnet.com"
                className={cn(
                  "w-full bg-surface-700 border rounded-lg px-3.5 py-2.5 text-white placeholder-surface-500",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition",
                  loginForm.formState.errors.email
                    ? "border-danger"
                    : "border-surface-600"
                )}
              />
              {loginForm.formState.errors.email && (
                <p className="text-danger text-xs mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  {...loginForm.register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full bg-surface-700 border rounded-lg px-3.5 py-2.5 text-white placeholder-surface-500 pr-10",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition",
                    loginForm.formState.errors.password
                      ? "border-danger"
                      : "border-surface-600"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-danger text-xs mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-lg px-3 py-2.5">
                <p className="text-danger text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover",
                "text-white font-semibold rounded-lg py-2.5 transition",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-white text-2xl font-semibold text-center">
              Two-factor auth
            </h2>
            <p className="text-surface-400 text-sm mt-1 text-center">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <form onSubmit={twoFaForm.handleSubmit(on2FA)} className="space-y-4">
            <input
              {...twoFaForm.register("code")}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              className={cn(
                "w-full bg-surface-700 border rounded-lg px-3.5 py-3 text-white text-center text-2xl tracking-widest",
                "placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary",
                "focus:border-transparent transition",
                twoFaForm.formState.errors.code ? "border-danger" : "border-surface-600"
              )}
            />
            {twoFaForm.formState.errors.code && (
              <p className="text-danger text-xs text-center">
                {twoFaForm.formState.errors.code.message}
              </p>
            )}

            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-lg px-3 py-2.5">
                <p className="text-danger text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover",
                "text-white font-semibold rounded-lg py-2.5 transition",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Verifying…" : "Verify"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("credentials"); setError(null); }}
              className="w-full text-surface-400 hover:text-surface-200 text-sm transition"
            >
              ← Back to login
            </button>
          </form>
        </>
      )}

      <p className="text-surface-500 text-xs text-center mt-6">
        XounNet ISP OS v1.0 · Secure login
      </p>
    </div>
  );
}
