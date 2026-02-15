import BlockGroup from '@/components/blocks/group/BlockGroup';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import Hero from '@/components/ui/hero/Hero';
import HeroQuote from '@/components/ui/hero/HeroQuote';
import HeroQuoteText from '@/components/ui/hero/HeroQuoteText';
import NPCDisplay from '@/components/ui/npcs/NPCDisplay';
import NPCList from '@/components/ui/npcs/NPCList';
import { mapNPCDocToCard } from '@/lib/mappers/NPCCardMapper';
import { gridOptions } from '@/lib/options/gridOptions';
import archiveQuery from '@/lib/query/archiveQuery';
import { Npc } from '@/payload-types';
import { Where, WhereField } from 'payload';

export default async function NPCArchive({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; disposition?: string }>;
}) {
  const { page, disposition } = await searchParams;

  const where: Where = {
    relatedWorld: '1' as WhereField,
    ...(disposition && {
      disposition: Array.isArray(disposition) ? { in: disposition } : { equals: disposition },
    }),
  };

  const npcQuery = await archiveQuery({
    collection: 'npcs',
    page: page ? Number(page) : 1,
    where,
  });

  const npcData = npcQuery.docs.map((npc: Npc) => mapNPCDocToCard(npc));

  return (
    <main>
      <Hero
        variant="half"
        title={`NPC Archive`}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      >
        <HeroQuote>
          <HeroQuoteText>Documented NPC's: {npcQuery.totalDocs}</HeroQuoteText>
        </HeroQuote>
      </Hero>
      <PageContents>
        <PageSection title="NPC's of the Flanaess">
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
              start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
              row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
              rowSpan: { tab: gridOptions.rowSpan.tab[1], pc: gridOptions.rowSpan.pc[1] },
            }}
          >
            <NPCDisplay npcData={npcData} />
          </BlockGroup>
        </PageSection>
      </PageContents>
    </main>
  );
}
