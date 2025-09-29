"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterFallback from "./SignupFallback";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

// ✅ Zod schema
const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters"),

  email: z.string().email("Invalid email format"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // ✅ handleSubmit
  async function onSubmit(values: FormData) {
    setIsRegistering(true);
    setServerErrors([]);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Account created successfully:");
  
        // Send verification email
        const emailResponse = await fetch("api/send/verification-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
            code: data.user.verificationCode,
            token: data.user.verificationToken,
          }),
        });

        // redirect to verification page to verify email
        if (emailResponse.ok) {
          console.log('Verification email sent to:', data.user.email);
          router.push(
            "/verify-code?verify-token=" + encodeURIComponent(data.user.verificationToken)
          );
        } else {
          setServerErrors(["Failed to send verification email. Please try again."]);
          setIsRegistering(false);
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || "Account creation failed";
        setServerErrors([message]);
        setIsRegistering(false);
      }
    } catch (err) {
      setServerErrors(["An unexpected error occurred"]);
      setIsRegistering(false);
    }
  }

  // ✅ GitHub signup
  const handleGitHubSignUp = async () => {
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("GitHub signup failed:", err);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 font-[Poppins] text-foreground",
        className
      )}
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
          {/* Server-side Errors */}
          {serverErrors.length > 0 && (
            <div className="mb-4 text-red-500 space-y-1">
              {serverErrors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all"
                        disabled={isRegistering}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all"
                        disabled={isRegistering}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all"
                        disabled={isRegistering}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  onClick={handleGitHubSignUp}
                  className="text-lg w-full rounded-xl border-input text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium"
                  disabled={isRegistering}
                >
                  <FaGithub />
                  Continue with GitHub
                </Button>
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
          </Form>
        </CardContent>
      </Card>

      {/* Register Fallback */}
      {isRegistering && <RegisterFallback email={form.getValues("email")} />}
    </div>
  );
}
