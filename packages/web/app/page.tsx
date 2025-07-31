import { AuthButton } from '@/components/auth-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import { Hero } from '@/components/hero';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ConnectSupabaseSteps } from '@/components/tutorial/connect-supabase-steps';
import { SignUpUserSteps } from '@/components/tutorial/sign-up-user-steps';
import { hasEnvVars } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={'/'} className="flex items-center">
                <Image
                  src="/logo-rectangle.png"
                  alt="Quickstarter Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>

        <footer className="w-full border-t bg-background/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-8 py-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/logo-square.png"
                    alt="Quickstarter Logo"
                    width={64}
                    height={64}
                    className="h-16 w-auto"
                  />
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <p>
                    Powered by{' '}
                    <a
                      href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                      target="_blank"
                      className="font-bold hover:underline"
                      rel="noreferrer"
                    >
                      Supabase
                    </a>
                  </p>
                  <ThemeSwitcher />
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground border-t pt-8">
                © {new Date().getFullYear()} Quickstarter. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
