import ArchiveQuery from '@/lib/query/archiveQuery';
import { Where, WhereField } from 'payload';
import { mapLocationToGazetteerCard } from '@/lib/mappers/gazetteerCardMapper';
import { GazetteerCardType } from '@/types/gazetteerCard/gazetteerCardType';
import Hero from '@/components/ui/hero/Hero';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import GazetteerCard from '@/components/ui/cards/GazetteerCard';
import { gridOptions } from '@/lib/options/gridOptions';

export default async function GrandGazetteerArchive({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const where: Where = {
    relatedWorld: '1' as WhereField,
  };

  const grandGazetteerQuery = await ArchiveQuery({
    collection: 'locations',
    page: page ? Number(page) : 1,
    where,
  });

  const grandGazetteerData: GazetteerCardType[] = grandGazetteerQuery.docs.map((item) =>
    mapLocationToGazetteerCard(item),
  );

  return (
    <main>
      <Hero
        variant="half"
        title={`Session Archive`}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      />
      <PageContents>
        <PageSection title="Grand Gazetteer Explored">
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
              start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
              row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
              rowSpan: { tab: gridOptions.rowSpan.tab[1], pc: gridOptions.rowSpan.pc[1] },
            }}
          >
            <p className="-mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            {grandGazetteerData.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {grandGazetteerData.map((location, index) => (
                  <li key={`Archive-location-${index}`}>
                    <GazetteerCard data={location} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No locations found.</p>
            )}
          </BlockGroup>
        </PageSection>
      </PageContents>
    </main>
  );
}
