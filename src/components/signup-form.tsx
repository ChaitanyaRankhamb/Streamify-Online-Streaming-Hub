"use client"

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
import { validateRegister } from "@/models/signupSchema"
import RegisterFallback from "./SignupFallback"
import { FaGithub } from "react-icons/fa"

export interface FormData {
  username: string
  email: string
  password: string
}

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [errors, setErrors] = useState<string[]>([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget

    // Get values from the form
    const values: FormData = {
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    }

    // Frontend validation using Zod
    const result = validateRegister(values)
    if (!result.success) {
      setErrors(result.error.issues.map((err) => err.message))
      return
    }

    setErrors([])
    setFormData(values)
    setIsRegistering(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        const data = await res.json()
        console.log("Account Created successfully:", data)
        router.push("/login")
      } else {
        const errorData = await res.json().catch(() => ({}))
        const message = errorData.message || "Account creation failed"
        setErrors([message])
        setIsRegistering(false)
      }
    } catch (err) {
      setErrors(["An unexpected error occurred"])
      setIsRegistering(false)
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
            Create New Account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Enter your details below to get started
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
              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-lg font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  disabled={isRegistering}
                />
              </div>

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
                  className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  disabled={isRegistering}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-lg font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  disabled={isRegistering}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="text-lg w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 transition-all text-white font-medium"
                  disabled={isRegistering}
                >
                  {isRegistering ? "Registering..." : "Create Account"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="text-lg w-full rounded-xl border-input text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium"
                  disabled={isRegistering}
                >
                  <FaGithub />
                  Continue with GitHub
                </Button>
              </div>
            </div>

            {/* Footer Link */}
            <div className="mt-6 text-center text-lg text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                className="text-lg text-blue-500 hover:underline underline-offset-4 font-medium"
                onClick={() => router.push("/login")}
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Register Fallback */}
      {isRegistering && <RegisterFallback email={formData.email} />}
    </div>
  )
}
