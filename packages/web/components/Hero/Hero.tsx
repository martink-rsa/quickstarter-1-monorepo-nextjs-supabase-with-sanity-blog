import { NextLogo } from '@/components/NextLogo/NextLogo';
import { SupabaseLogo } from '@/components/SupabaseLogo/SupabaseLogo';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
          Welcome to Quickstarter 1
        </h1>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
          The fastest way to build modern apps with{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-semibold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
          ,{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="font-semibold hover:underline"
            rel="noreferrer"
          >
            Next.js
          </a>
          , and{' '}
          <a
            href="https://sanity.io/"
            target="_blank"
            className="font-semibold hover:underline"
            rel="noreferrer"
          >
            Sanity
          </a>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/blog"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Explore Blog
          </Link>
          <a
            href="https://github.com/martink-rsa/quickstarter-1-monorepo-nextjs-supabase-with-sanity-blog/"
            target="_blank"
            rel="noreferrer"
            className="border border-border hover:bg-muted px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
