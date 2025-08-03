import Link from "next/link";

import { AuthButton } from "@/components/AuthButton";
import { DeployButton } from "@/components/DeployButton";
import { Hero } from "@/components/Hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
          <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
            <div className="flex items-center gap-5 font-semibold">
              <Link href={"/"}>Quickstarter 1</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            <AuthButton />
          </div>
        </nav>
        <div className="flex max-w-5xl flex-1 flex-col gap-20 p-5">
          <Hero />
          <main className="flex flex-1 flex-col gap-6 px-4">
            <h2 className="mb-4 text-xl font-medium">Next steps</h2>
            <SignUpUserSteps />
          </main>
        </div>

        <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
          <p>
            Powered by{" "}
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
        </footer>
      </div>
    </main>
  );
}
