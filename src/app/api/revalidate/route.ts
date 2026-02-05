import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET(request: NextRequest) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: request.headers });

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  let path = url.searchParams.get('path') || '/';
  path = path.replaceAll('|', '/');

  revalidatePath(path);

  return new NextResponse('Revalidated');
}
