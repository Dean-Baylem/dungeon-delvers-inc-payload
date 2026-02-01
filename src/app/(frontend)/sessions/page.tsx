import BlockGroup from '@/components/blocks/group/BlockGroup';
import NoPosts from '@/components/layout/noPosts/noPosts';
import PageContents from '@/components/layout/page/PageContents';
import PageSection from '@/components/layout/page/PageSection';
import Hero from '@/components/ui/hero/Hero';
import archiveQuery from '@/lib/query/archiveQuery';
import { gridOptions } from '@/lib/options/gridOptions';
import InfoBox from '@/components/blocks/infobox/Infobox';
import React from 'react';
import type { Adventure, Character, Session } from '@/payload-types';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';
import BlockSingleAdventure from '@/components/ui/adventure/BlockSingleAdventure';
import { AdventureCardType } from '@/types/adventureCard/adventureCard';
import Link from 'next/link';
import CTALink from '@/components/ui/links/CTALink';
import { WhereField } from 'payload';
import { mapAdventureDocToCard } from '@/lib/mappers/adventureCardMapper';

export default async function Sessions({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const sessionData = await archiveQuery({
    collection: 'sessions',
    page: 1,
    where: { relatedWorld: '1' as WhereField },
  });

  const adventureQuery = await archiveQuery({
    collection: 'adventures',
    page: page ? Number(page) : 1,
    where: { relatedWorld: '1' as WhereField },
  });

  if (
    (!sessionData || sessionData.totalDocs === 0) &&
    (!adventureQuery || adventureQuery.totalDocs === 0)
  ) {
    return <NoPosts />;
  }

  const adventureData: AdventureCardType[] = adventureQuery.docs.map((adventure: Adventure) =>
    mapAdventureDocToCard(adventure),
  );

  return (
    <main>
      <Hero
        variant="half"
        title={`Session Archive`}
        image={{ src: '/home/hero-home.webp', alt: 'hero-image-adventurers-overlooking-city' }}
      />
      <PageContents>
        <PageSection title="Tales from the Table">
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[4], pc: gridOptions.span.pc[3] },
              start: { tab: gridOptions.start.tab[7], pc: gridOptions.start.pc[8] },
              row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
            }}
          >
            <InfoBox
              groups={[
                {
                  title: 'Archive Details',
                  content: (
                    <InfoBoxList
                      list={[
                        { title: 'Total Sessions:', text: `${sessionData.totalDocs}` },
                        { title: 'Total Adventures:', text: `${adventureQuery?.totalDocs || 0}` },
                      ]}
                    />
                  ),
                },
                {
                  title: 'Session List',
                  content: sessionData.docs.length > 0 && (
                    <ul className="p-4 flex flex-col gap-2">
                      {sessionData.docs.map((session: Session) => (
                        <li key={session.id}>
                          <a
                            href={`/sessions/${session.pageSlug}`}
                            className="text-mainText font-medium font-serif underline underline-offset-2 text-center block"
                          >
                            {session.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />
          </BlockGroup>
          <BlockGroup
            options={{
              span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[7] },
              start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
              row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
              rowSpan: { tab: gridOptions.rowSpan.tab[1], pc: gridOptions.rowSpan.pc[1] },
            }}
          >
            {adventureData.map((adventureCard: AdventureCardType, index: number) => (
              <BlockSingleAdventure key={`adventure-${index}`} card={adventureCard} />
            ))}
            <div className="flex">
              <CTALink link="/" type="secondary" text="Home Page" />
            </div>
          </BlockGroup>
        </PageSection>
      </PageContents>
    </main>
  );
}
