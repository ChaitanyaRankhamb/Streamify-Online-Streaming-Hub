import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'

function RegisterFallback({ email }: { email: string }) {
  return (
    <section className='dark:bg-neutral-800 bg-white/90 backdrop-blur-md fixed inset-0 z-50 flex justify-center'>
      <Card className="mt-12 w-auto h-[200px] flex flex-col gap-4 px-12">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 ">
          AuthX
        </Link>
        <div className="flex flex-col items-center justify-center h-[80px] gap-2">
          <p className='text-muted-foreground text-lg'>Please wait</p>
          <p className='text-muted-foreground text-lg'><strong>{email}</strong> creating account....</p>
        </div>
      </Card>
    </section>
  )
}

export default RegisterFallback