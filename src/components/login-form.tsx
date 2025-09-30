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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginFallback from "./LoginFallback";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

// ✅ Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLogin(true);
    setServerErrors([]);

    try {
      const res = await signIn("credentials", {
        redirect: false, // disable auto redirect
        identifier: values.email,
        password: values.password,
      });

      if (res?.ok) {
        console.log("Login successful:", res);

        setIsLoginSuccess(true);

        setTimeout(() => {
          setIsLogin(false);
          router.refresh(); // update session state
        }, 1000);

        // redirect after login
        router.push("/home");
      } else {
        setServerErrors([res?.error || "Login failed"]);
        setIsLogin(false);
      }
    } catch (err) {
      console.error(err);
      setServerErrors(["An unexpected error occurred"]);
      setIsLogin(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("GitHub login failed:", err);
    }
  };

  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean | undefined>(
    undefined
  );

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
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Enter your credentials below to continue
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
                        className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all py-2"
                        disabled={isLogin}
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-lg font-medium">
                        Password
                      </FormLabel>
                      <a
                        href="#"
                        className="text-lg text-blue-500 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="!text-lg rounded-xl border-input focus:ring-2 focus:ring-blue-500 transition-all py-2"
                        disabled={isLogin}
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
                  disabled={isLogin}
                >
                  {isLogin ? "Logging in..." : "Login"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="text-lg w-full rounded-xl border-input text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium flex items-center gap-2"
                  onClick={handleGitHubSignIn}
                  disabled={isLogin}
                >
                  <FaGithub />
                  Continue with GitHub
                </Button>
              </div>

              {/* Footer */}
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
          </Form>
        </CardContent>
      </Card>

      {/* Login Fallback */}
      {isLogin && (
        <LoginFallback
          email={form.getValues("email")}
          isLoginSuccess={isLoginSuccess ?? false}
        />
      )}
    </div>
  );
}
