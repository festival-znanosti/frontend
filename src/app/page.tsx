import Link from 'next/link'

import { ThemeToggle } from '@/components/ui/ThemeToggler'

export default function Home() {
  return (
    <>
      <h1 className="text-4xl w-full bg-blue-700 p-3 flex justify-center">Smisli neki brutalan landing page</h1>
      <ThemeToggle />
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white dark:bg-gray-800 px-8 text-sm font-medium shadow-sm transition-colors text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800  dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
      >
        Register
      </Link>
    </>
  )
}
