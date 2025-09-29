import React from 'react';
import { Card } from './ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

function LoginFallback({ email, isLoginSuccess }: { email: string; isLoginSuccess: boolean }) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <Card className="w-[420px] rounded-2xl border border-border bg-card/80 shadow-lg flex flex-col gap-4 p-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400 text-center"
        >
          Streamify - Online Streaming Hub
        </Link>

        <div className="flex items-center justify-center">
          {isLoginSuccess ? (
            <p className="text-lg text-green-500">Login successful!</p>
          ) : (
            <p className="text-lg text-red-500"></p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <p className="text-lg text-muted-foreground">Please wait</p>
          <p className="text-lg text-muted-foreground">
            <strong>{email}</strong> logging in...
          </p>
        </div>
      </Card>
    </section>
  );
}

export default LoginFallback;
