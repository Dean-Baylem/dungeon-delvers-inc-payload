import archiveQuery from '@/lib/query/archiveQuery';
import { Where, WhereField } from 'payload';
import { mapLocationToGazetteerCard } from '@/lib/mappers/gazetteerCardMapper';
import { GazetteerCardType } from '@/types/gazetteerCard/gazetteerCardType';
import Hero from '@/components/ui/hero/Hero';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import GazetteerCard from '@/components/ui/cards/GazetteerCard';
import { gridOptions } from '@/lib/options/gridOptions';
import { RichText } from '@/components/ui/RichText';
import PageText from '@/components/ui/typography/PageText';
import HeroQuote from '@/components/ui/hero/HeroQuote';
import HeroQuoteText from '@/components/ui/hero/HeroQuoteText';

export default async function GrandGazetteerArchive({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const where: Where = {
    relatedWorld: '1' as WhereField,
  };

  const grandGazetteerQuery = await archiveQuery({
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
        title={`Grand Gazetteer`}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      >
        <HeroQuote>
          <HeroQuoteText>Documented Locations: {grandGazetteerQuery.totalDocs}</HeroQuoteText>
        </HeroQuote>
      </Hero>
      <PageContents>
        <PageSection title="Grand Gazetteer">
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
              start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
              row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
              rowSpan: { tab: gridOptions.rowSpan.tab[1], pc: gridOptions.rowSpan.pc[1] },
            }}
          >
            <PageText customClasses="-mt-4 text-lg font-medium leading-[1.8]">
              Our archives contain information regarding locations the adventuring parties have
              previously visited. Currently, the locations documented are found in the region
              surrounding the Free City of Greyhawk. Over time, we expect to expand our records and
              categorise them by region as well as location type, but this is not required at this
              time.
            </PageText>
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
