import { Logo } from "@/components/Logo";

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex items-center justify-center gap-8">
        <span className="h-6 rotate-45 border-l" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <Logo />
        </a>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
        Learn IT, Web Development and Building with AI for free at{" "}
        <a
          href="https://www.theroadtodev.com/?utm_source=quickstarter-repo&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          The Road To Dev
        </a>
        .
      </p>
      <div className="via-foreground/10 my-8 w-full bg-gradient-to-r from-transparent to-transparent p-[1px]" />
    </div>
  );
}
