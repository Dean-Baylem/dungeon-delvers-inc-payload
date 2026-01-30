import BlockGroup from '@/components/blocks/group/BlockGroup';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import Hero from '@/components/ui/hero/Hero';
import LoreDisplay from '@/components/ui/lore/LoreDisplay';
import { mapLoreDocToCard } from '@/lib/mappers/loreCardMapper';
import { gridOptions } from '@/lib/options/gridOptions';
import archiveQuery from '@/lib/query/archiveQuery';
import type { Lore } from '@/payload-types';
import { LoreCardType } from '@/types/loreCard/lordCard';
import { Where, WhereField } from 'payload';

export default async function Lore({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const { page, type } = await searchParams;

  const where: Where = {
    relatedWorld: '1' as WhereField,
    ...(type && {
      subtype: Array.isArray(type) ? { in: type } : { equals: type },
    }),
  };

  const loreQuery = await archiveQuery({
    collection: 'lore',
    page: page ? Number(page) : 1,
    where,
  });

  const loreData: LoreCardType[] = loreQuery.docs.map((lore: Lore) => mapLoreDocToCard(lore));

  return (
    <main>
      <Hero
        variant="half"
        title={`Session Archive`}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      />
      <PageContents>
        <PageSection title="Lore from the Vaults">
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
            <LoreDisplay loreData={loreData} />
          </BlockGroup>
        </PageSection>
      </PageContents>
    </main>
  );
}
