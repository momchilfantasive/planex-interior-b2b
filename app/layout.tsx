import type { Metadata } from 'next';
import { SiteMotion } from './components/SiteMotion';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Планекс Интериор | Интериорни решения за жилища и бизнес пространства',
  description: 'Цялостно завършване, ремонт и обзавеждане на жилища, офиси и търговски площи.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>{children}<SiteMotion /></body>
    </html>
  );
}
