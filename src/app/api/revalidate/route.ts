import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await fetch(`/api/worlds/me`, {
    credentials: 'include',
  });

  if (!res.ok) return;

  const data = await res.json();
  if (data.user === null) return;

  const url = new URL(request.url);
  let path = url.searchParams.get('path') || '/';
  path.replaceAll('|', '/');
  revalidatePath(path);
  return new NextResponse('Revalidated');
}
