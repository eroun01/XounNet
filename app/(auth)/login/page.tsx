"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Wifi, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onLogin(values: LoginForm) {
    // Prevent any default form behavior
    event?.preventDefault();
    event?.stopPropagation();
    
    console.log('Login attempt with:', values);
    
    try {
      setLoading(true);
      setError(null);
      
      // Mock authentication for testing
      // TODO: Replace with actual API call when backend is available
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      console.log('Checking credentials:', values.email === "admin@xounnet.com", values.password === "password123");
      
      if (values.email === "admin@xounnet.com" && values.password === "password123") {
        // Mock successful login
        const mockAccessToken = "mock_access_token_" + Date.now();
        const mockRefreshToken = "mock_refresh_token_" + Date.now();
        localStorage.setItem("access_token", mockAccessToken);
        localStorage.setItem("refresh_token", mockRefreshToken);
        console.log('Login successful!');
        
        // Force immediate hard navigation
        window.location.replace("/");
        return; // Exit immediately
      } else {
        console.log('Login failed');
        setError("Invalid credentials. Use admin@xounnet.com / password123");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred. Please try again.");
    } finally {
      if (loading) setLoading(false);
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

      {/* Login form only - 2FA removed for mock auth */}
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

      <p className="text-surface-500 text-xs text-center mt-6">
        Demo credentials: <strong>admin@xounnet.com</strong> / <strong>password123</strong>
      </p>
    </div>
  );
}
