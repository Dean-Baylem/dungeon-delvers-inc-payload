import { Lore } from '@/payload-types';
import singleQuery from '@/lib/query/singleQuery';
import SinglePage from '@/components/layout/page/SinglePage';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@/payload.config';
import mediaTypeCheck from '@/lib/query/mediaTypeCheck';
import Image from 'next/image';
import { camelToTextMapper } from '@/lib/mappers/camelToTextMapper';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';

const loreInfoPointListCreation = (lore: Lore, list: readonly (keyof Lore)[]) => {
  return list.reduce<{ title: string; text: string }[]>((acc, point) => {
    const value = lore[point];
    if (value) {
      acc.push({
        title: camelToTextMapper(point),
        text: camelToTextMapper(String(value)).replaceAll('_', ' '),
      });
    }
    return acc;
  }, []);
};

const createLoreInfoBoxGroup = (lore: Lore) => {
  let groups = [];
  const { src, alt } = mediaTypeCheck(lore.LoreImage);
  const typeListPoints = ['type', 'subtype'] as const;
  const typeList = loreInfoPointListCreation(lore, typeListPoints);

  const dateListPoints = ['era', 'startDateYear'] as const;
  const dateList = loreInfoPointListCreation(lore, dateListPoints);

  const relatedNPCs = Array.isArray(lore.relatedNPCs) ? lore.relatedNPCs : [];
  const relatedFactions = Array.isArray(lore.relatedFactions) ? lore.relatedFactions : [];
  const relatedReligions = Array.isArray(lore.relatedReligions) ? lore.relatedReligions : [];
  const relatedLocations = Array.isArray(lore.relatedLocations) ? lore.relatedLocations : [];

  if (src) {
    groups.push({
      title: 'Image',
      content: (
        <Image
          className="w-full f-full object-cover"
          src={src}
          alt={alt || lore.name}
          width="280"
          height="280"
          loading="eager"
        />
      ),
    });
  }

  if (typeList.length) {
    groups.push({
      title: 'Type',
      content: <InfoBoxList list={typeList} />,
    });
  }

  if (dateList.length) {
    groups.push({
      title: 'Date / Era',
      content: <InfoBoxList list={dateList} />,
    });
  }

  const relatedItems = [];
  if (relatedNPCs.length) {
    relatedItems.push({
      title: 'Related NPCs',
      text: relatedNPCs
        .map((n) => (typeof n === 'object' && n !== null ? n.name : String(n)))
        .join(', '),
    });
  }

  if (relatedReligions.length) {
    relatedItems.push({
      title: 'Religions',
      text: relatedReligions
        .map((r) => (typeof r === 'object' && r !== null ? r.name : String(r)))
        .join(', '),
    });
  }

  if (relatedLocations.length) {
    relatedItems.push({
      title: 'Locations',
      text: relatedLocations
        .map((l) => (typeof l === 'object' && l !== null ? l.name : String(l)))
        .join(', '),
    });
  }

  if (relatedFactions.length) {
    relatedItems.push({
      title: 'Factions',
      text: relatedFactions
        .map((f) => (typeof f === 'object' && f !== null ? f.name : String(f)))
        .join(', '),
    });
  }

  if (relatedItems.length) {
    groups.push({
      title: 'Related Entries',
      content: <InfoBoxList list={relatedItems} />,
    });
  }

  return groups;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'lore',
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

export default async function SingleLorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data: Lore = await singleQuery({
    collection: 'lore',
    slug,
  });

  if (!data) notFound();

  const infoBoxGroups: Array<{ title: string; content: React.ReactNode }> =
    createLoreInfoBoxGroup(data);

  return (
    <SinglePage
      title={data.name}
      content={data.content ? data.content : undefined}
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
      infobox={infoBoxGroups}
    />
  );
}
