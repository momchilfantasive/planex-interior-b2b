import type { Metadata, Viewport } from 'next';
import { NextStudio, metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';
import config from '@/sanity.config';
import { isSanityConfigured } from '@/sanity/env';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Studio | Планекс Интериор',
};

export const viewport: Viewport = studioViewport;

function StudioSetupMessage() {
  return (
    <main style={{ maxWidth: 640, margin: '12vh auto', padding: '0 24px', fontFamily: 'Arial, sans-serif', color: '#35414b' }}>
      <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>Sanity Studio още не е свързано</h1>
      <p>Попълнете <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> и <code>NEXT_PUBLIC_SANITY_DATASET</code> в <code>.env.local</code> и в Vercel, след което рестартирайте сървъра.</p>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured()) return <StudioSetupMessage />;
  return <NextStudio config={config} />;
}
