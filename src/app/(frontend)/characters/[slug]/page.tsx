import { notFound } from 'next/navigation';
import singleQuery from '@/lib/query/singleQuery';
import { Character } from '@/payload-types';
import isLoggedIn from '@/lib/auth/isLoggedIn';
import Hero from '@/components/ui/hero/Hero';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import { gridOptions } from '@/lib/options/gridOptions';
import ReactMarkdown from 'react-markdown';
import '@/components/ui/RichText/richtext.css';
import CharacterPrivateSection from '@/components/layout/characterContent/CharacterPrivateSection';
import CharacterPublicSection from '@/components/layout/characterContent/CharacterPublicSection';

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

  const publicContents = data.content ? data.content : '';
  const privateContents = data.privateContent ? data.privateContent : '';
  const charPath = `/characters/${data.pageSlug}`;

  return (
    <main>
      <Hero
        variant="half"
        title={data.name}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      />
      <PageContents>
        <CharacterPublicSection
          publicContents={publicContents}
          characterId={data.id}
          charPath={charPath}
        />
        {isPlayer && (
          <CharacterPrivateSection
            privateContents={privateContents}
            characterId={data.id}
            charPath={charPath}
          />
        )}
      </PageContents>
    </main>
  );
}
