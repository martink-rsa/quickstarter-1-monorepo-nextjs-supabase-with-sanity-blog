import { ThemeAwareLogo } from '@/components/ThemeAwareLogo';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <ThemeAwareLogo
                variant="square"
                width={64}
                height={64}
                className="h-16 w-auto"
                alt="Quickstarter 1 Logo"
              />
            </div>
            <div className="flex items-center gap-6 text-xs">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t pt-8">
            © {new Date().getFullYear()} Quickstarter. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
