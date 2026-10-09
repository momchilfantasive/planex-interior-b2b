import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Missing SANITY_REVALIDATE_SECRET' }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  if (!body?._type || body._type === 'portfolioProject') {
    revalidateTag('portfolio', 'max');
    revalidatePath('/portfolio');
  }

  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
