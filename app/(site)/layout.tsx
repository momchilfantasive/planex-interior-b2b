import { SiteMotion } from '../components/SiteMotion';
import 'lenis/dist/lenis.css';
import '../globals.css';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}<SiteMotion /></>;
}
