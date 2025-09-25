"use client"

import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { validateLogin } from "@/models/loginSchema"
import LoginFallback from "./LoginFallback"
import GitHub from "next-auth/providers/github"

export interface FormData {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [errors, setErrors] = useState<string[]>([])
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Get form values
    const values: FormData = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    }

    // Frontend validation
    const result = validateLogin(values)
    if (!result.success) {
      setErrors(result.error.issues.map((err) => err.message))
      return
    }

    setErrors([])
    setFormData(values)
    setIsLogin(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        const data = await res.json()
        console.log("Login successful:", data);

        // Redirect to dashboard page
        router.push("/api/dashboard");
      } else {
        const errorData = await res.json().catch(() => ({}))
        setErrors([errorData.message || "Login failed"]);
        setIsLogin(false)
      }
    } catch {
      setErrors(["An unexpected error occurred"])
      setIsLogin(false)
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-6 font-[Poppins] text-foreground", className)}
      {...props}
    >
      <Card className="w-[420px] border border-border bg-card/80 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Enter your credentials below to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Display Errors */}
          {errors.length > 0 && (
            <div className="mb-4 text-red-500 space-y-1">
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all py-2"
                  required
                  disabled={isLogin}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-lg font-medium">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-lg text-blue-500 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all py-2"
                  required
                  disabled={isLogin}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="text-lg w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 transition-all text-white font-medium"
                  disabled={isLogin}
                >
                  {isLogin ? "Logging in..." : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-lg w-full rounded-xl border-input text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium"
                  disabled={isLogin}
                >
                  <FaGithub />
                  Continue with GitHub
                </Button>
              </div>
            </div>

            {/* Footer Link */}
            <div className="mt-6 text-center text-lg text-muted-foreground">
              Don’t have an account?{" "}
              <a
                href="#"
                className="text-lg text-blue-500 hover:underline underline-offset-4 font-medium"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Login Fallback */}
      {isLogin && <LoginFallback email={formData.email} />}
    </div>
  )
}
