import { Location } from '@/payload-types';
import singleQuery from '@/lib/query/singleQuery';
import SinglePage from '@/components/layout/page/SinglePage';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import { ReactNode } from 'react';
import config from '@/payload.config';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';

const createLocationInfoboxGroup = (location: Location) => {
  let groups = [];
  let boxListPoints: Array<{ title: string; text: string }> = [
    {
      title: 'Located In',
      text:
        location.parentLocation && typeof location.parentLocation === 'object'
          ? location.parentLocation?.name
          : '',
    },
    { title: 'Type', text: location.type || '' },
    {
      title: 'Resources',
      text: location.resources ? location.resources?.map((r) => r.singleResource).join(`,\n`) : '',
    },
    { title: 'Population', text: location.population || '' },
    { title: 'Terrain', text: location.terrain || '' },
    { title: 'Economy', text: location.economy || '' },
  ];

  if (location.hasMap) {
    boxListPoints.push({
      title: 'Map',
      text: `<a style='text-decoration: underline; text-underline-offset: 2px;' href="/grand-gazetteer/${location.pageSlug}/map" target="_blank">View Map</a>`,
    });
  }

  const boxList = boxListPoints.filter((point) => point.text);

  if (boxList.length) {
    groups.push({ title: 'Location Details', content: <InfoBoxList list={boxList} /> });
  }

  return groups;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: 'locations',
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

  const data: Location = await singleQuery({
    collection: 'locations',
    slug,
  });

  if (!data) notFound();

  const infoBoxGroups: Array<{ title: string; content: ReactNode }> =
    createLocationInfoboxGroup(data);

  return (
    <SinglePage
      title={data.name}
      content={data.content ? data.content : undefined}
      heroImage={{
        src: '/home/hero-home.webp',
        alt: 'hero-image-adventurers-overlooking-city',
      }}
      archiveLink="/grand-gazetteer"
      archiveText="Archive"
      infobox={infoBoxGroups}
    />
  );
}
