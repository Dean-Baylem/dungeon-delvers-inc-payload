import BlockGroup from '@/components/blocks/group/BlockGroup';
import NoPosts from '@/components/layout/noPosts/noPosts';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import Hero from '@/components/ui/hero/Hero';
import { gridOptions } from '@/lib/options/gridOptions';
import ArchiveQuery from '@/lib/query/archiveQuery';
import type { Lore } from '@/payload-types';
import { LoreCardType } from '@/types/loreCard/lordCard';

export default async function Lore({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const loreQuery = await ArchiveQuery({
    collection: 'lore',
    page: page ? Number(page) : 1,
    worldId: 1,
  });

  if (!loreQuery || loreQuery.totalDocs === 0) {
    return <NoPosts />;
  }

  const loreData: LoreCardType[] = loreQuery.docs.map((lore: Lore) => ({
    type: lore.type ?? '',
    name: lore.name,
    slug: lore.slug,
    summary: lore.summary,
  }));

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </BlockGroup>
        </PageSection>
      </PageContents>
    </main>
  );
}
