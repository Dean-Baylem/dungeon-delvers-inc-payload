import { getPayload } from 'payload';
import config from '@payload-config';
import { revalidatePath } from 'next/cache';

export async function PATCH(req: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { characterId, content, charPath, type } = body;

  const character = await payload.findByID({
    collection: 'characters',
    id: characterId,
  });

  if (!character) {
    return new Response('Not Found', { status: 404 });
  }

  const playerId =
    typeof character.player === 'object' && character.player
      ? character.player.id
      : character.player;

  if (playerId !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  const updated = await payload.update({
    collection: 'characters',
    id: characterId,
    data: type === 'public' ? { content: content } : { privateContent: content },
  });

  revalidatePath(charPath);

  return Response.json(updated);
}
