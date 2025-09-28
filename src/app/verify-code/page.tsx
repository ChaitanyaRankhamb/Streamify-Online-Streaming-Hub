"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

// ✅ Zod schema for 6-digit code
const verifySchema = z.object({
  code: z.string().length(6, {
    message: "Verification code must be exactly 6 digits",
  }),
})

type VerifySchema = z.infer<typeof verifySchema>

export default function VerifyCodeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("verify-token") // secure verification token
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  })

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        Invalid verification link.
      </div>
    )
  }

  async function onSubmit(values: VerifySchema) {
    setServerError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, code: values.code }),
      })

      if (res.ok) {
        router.push("/login") // redirect after successful verification
      } else {
        const data = await res.json()
        setServerError(data.message || "Invalid verification code")
      }
    } catch (err) {
      setServerError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[420px] mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Verify Your Email
      </h1>
      <p className="text-center text-muted-foreground mb-6">
        Enter the 6-digit code sent to your email.
      </p>

      {serverError && (
        <p className="mb-4 text-red-500 text-center">{serverError}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    className="text-center tracking-widest text-lg rounded-xl"
                  />
                </FormControl>
                <FormDescription>
                  Please enter the 6-digit code we emailed you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white font-medium"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
