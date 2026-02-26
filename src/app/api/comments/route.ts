import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const comment = await payload.create({
    collection: 'comments',
    data: body,
  });

  return Response.json(comment);
}
