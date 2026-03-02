import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = user.id;

  const allCharacters = await payload.find({
    collection: 'characters',
    where: {
      player: { equals: userId },
    },
  });

  const characterData = allCharacters.docs.map((char) => ({
    id: char.id,
    name: char.name,
  }));

  return Response.json(characterData);
}
