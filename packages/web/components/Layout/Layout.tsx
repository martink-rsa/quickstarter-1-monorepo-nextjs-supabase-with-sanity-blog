import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <Header />
        <div className="flex-1 w-full max-w-5xl px-5">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
