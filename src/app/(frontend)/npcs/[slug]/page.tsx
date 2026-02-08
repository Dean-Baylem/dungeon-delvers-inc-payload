import { Npc, Faction } from '@/payload-types';
import singleQuery from '@/lib/query/singleQuery';
import SinglePage from '@/components/layout/page/SinglePage';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@/payload.config';
import HeroQuote from '@/components/ui/hero/HeroQuote';
import HeroQuoteText from '@/components/ui/hero/HeroQuoteText';
import Image from 'next/image';
import mediaTypeCheck from '@/lib/query/mediaTypeCheck';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';
import { ReactNode } from 'react';

function isFactionOrNpc(f: unknown): f is Faction | Npc {
  return typeof f === 'object' && f !== null && 'name' in f && typeof (f as any).name === 'string';
}

const createNpcInfoBoxGroup = (npc: Npc) => {
  let groups = [];
  const { src, alt } = mediaTypeCheck(npc.portrait);

  const boxListPoints = [
    'aliases',
    'species',
    'age',
    'relatedFaction',
    'disposition',
    'allies',
    'adversaries',
  ] as const;

  type InfoBoxItem = {
    title: string;
    text: string;
  };

  const boxList = boxListPoints.reduce<InfoBoxItem[]>((acc, point) => {
    const value = npc[point];

    if (Array.isArray(value)) {
      const names = value
        .filter(isFactionOrNpc)
        .map((f) => f.name)
        .join(', ');

      if (value.length) {
        acc.push({
          title: point,
          text: names.length ? names : value.join(', '),
        });
      }

      return acc;
    }

    if (value != null && value !== '') {
      acc.push({
        title: point,
        text: String(value),
      });
    }

    return acc;
  }, []);

  if (src && alt) {
    groups.push({
      title: 'Portrait',
      content: <Image src={src} alt={alt} width="280" height="280" loading="eager" />,
    });
  }

  if (boxList.length) {
    groups.push({
      title: 'NPC Details',
      content: <InfoBoxList list={boxList} />,
    });
  }

  return groups;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'npcs',
    limit: 100,
    populate: {
      locations: {
        pageSlug: true,
      },
    },
  });

  return data.docs.map((doc) => ({
    slug: doc.pageSlug,
  }));
}

export default async function SingleLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data: Npc = await singleQuery({
    collection: 'npcs',
    slug,
  });

  if (!data) notFound();

  const infoBoxGroups: Array<{ title: string; content: ReactNode }> = createNpcInfoBoxGroup(data);

  return (
    <SinglePage
      title={data.name}
      subtitle="Biography"
      content={data.content ? data.content : undefined}
      heroChildren={
        <HeroQuote>
          <HeroQuoteText>{data.summary}</HeroQuoteText>
        </HeroQuote>
      }
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
      infobox={infoBoxGroups}
    />
  );
}
