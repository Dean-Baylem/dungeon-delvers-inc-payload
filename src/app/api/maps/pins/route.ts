import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET(req: Request) {
  const payload = await getPayload({ config });
  const { searchParams } = new URL(req.url);
  const mapId = searchParams.get('mapId');

  try {
    const pins = await payload.find({
      collection: 'map-pins',
      limit: -1,
      where: {
        relatedMap: { equals: mapId },
      },
    });

    return Response.json(pins);
  } catch (error) {
    return new Response('Error Fetching Map Pins', { status: 500 });
  }
}

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
