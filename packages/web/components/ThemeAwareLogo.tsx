'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ThemeAwareLogoProps {
  variant: 'rectangle' | 'square';
  width: number;
  height: number;
  className?: string;
  alt?: string;
}

export function ThemeAwareLogo({
  variant,
  width,
  height,
  className,
  alt = 'Quickstarter Logo',
}: ThemeAwareLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show dark variant as default during server-side rendering (since most sites default to light theme)
  if (!mounted) {
    return (
      <Image
        src={`/logo-${variant}-dark.png`}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  const isDarkMode = resolvedTheme === 'dark';
  const logoSrc = `/logo-${variant}-${isDarkMode ? 'light' : 'dark'}.png`;

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
