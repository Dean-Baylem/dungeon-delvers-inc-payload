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

export async function PATCH(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const { pinLabel, pinType, summary, id } = body;

  const existingPin = await payload.findByID({
    collection: 'map-pins',
    id: id,
  });

  if (!existingPin) {
    return new Response('Pin not found', { status: 404 });
  }

  try {
    const updatedPin = await payload.update({
      collection: 'map-pins',
      id: id,
      data: {
        pinLabel: pinLabel,
        pinType: pinType,
        summary: summary,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return new Response('Error Updating Pin', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const { id } = body;

  const existingPin = await payload.findByID({
    collection: 'map-pins',
    id: id,
  });

  if (!existingPin) {
    return new Response('Pin not found', { status: 404 });
  }

  const authorId =
    typeof existingPin.author === 'object' ? existingPin?.author?.id : existingPin.author;

  if (authorId !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const deletedPin = await payload.delete({
      collection: 'map-pins',
      id: id,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return new Response('Error Deleting Pin', { status: 500 });
  }
}
