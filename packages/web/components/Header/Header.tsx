import { AuthButton } from '@/components/AuthButton/AuthButton';
import { EnvVarWarning } from '@/components/EnvVarWarning/EnvVarWarning';
import { ThemeAwareLogo } from '@/components/ThemeAwareLogo/ThemeAwareLogo';
import { hasEnvVars } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={'/'} className="flex items-center">
            <ThemeAwareLogo
              variant="rectangle"
              width={150}
              height={40}
              className="h-8 w-auto"
              alt="Quickstarter 1 Logo"
            />
          </Link>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
