import { notFound } from 'next/navigation';
import singleQuery from '@/lib/query/singleQuery';
import { Character } from '@/payload-types';
import isLoggedIn from '@/lib/auth/isLoggedIn';
import SinglePage from '@/components/layout/page/SinglePage';

export default async function SingleCharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data: Character = await singleQuery({
    collection: 'characters',
    slug,
  });

  if (!data) notFound();

  const user = await isLoggedIn();

  const characterPlayer = typeof data.player === 'object' ? data.player : null;

  const isPlayer =
    user &&
    user.collection === 'players' &&
    user.id &&
    characterPlayer &&
    characterPlayer.id === user.id;

  return (
    <SinglePage
      title={data.name}
      subtitle="Character Biography"
      content={undefined}
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
    >
      <p>Contents for character goes here</p>
    </SinglePage>
  );
}
