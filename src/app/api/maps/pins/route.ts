import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();

    const pin = await payload.create({
      collection: 'map-pins',
      data: body,
    });

    return Response.json(pin);
  } catch (error) {
    return new Response('Error Creating Map Pin', { status: 500 });
  }
}
