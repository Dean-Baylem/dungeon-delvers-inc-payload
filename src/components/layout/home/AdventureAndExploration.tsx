import PageSection from '../page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import InfoBox from '@/components/blocks/infobox/Infobox';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';
import AdventureLogs from '@/components/ui/adventure/adventureLogs/AdventureLogs';
import BlockSingleAdventure from '@/components/ui/adventure/BlockSingleAdventure';
import PageTitle from '@/components/ui/typography/PageTitle';
import { RichText } from '@/components/ui/RichText';
import { gridOptions } from '@/lib/options/gridOptions';
import Image from 'next/image';
import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState';
import { AdventureLogType } from '@/types/adventureLog/adventureLog';
import { AdventureCardType } from '@/types/adventureCard/adventureCard';
import BlockNavLinks from '@/components/blocks/nav/BlockNavLinks';

type Props = {
  richText: SerializedEditorState;
  gazetterLinks: Array<AdventureLogType>;
  sessionData: Array<AdventureLogType>;
  adventureData: Array<AdventureCardType>;
};

export default function AdventureAndExploration({
  richText,
  gazetterLinks,
  sessionData,
  adventureData,
}: Props) {
  return (
    <PageSection title="Adventure & Exploration">
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
              title: 'World Map',
              content: (
                <Image
                  src="/home/flanaess-map.avif"
                  width="320"
                  height="160"
                  alt="Flanaess World Map"
                />
              ),
            },
            {
              title: 'World Information',
              content: (
                <InfoBoxList
                  list={[
                    { title: 'Setting:', text: 'Greyhawk (The Flanaess)' },
                    { title: 'Current Year:', text: '576 CY' },
                    {
                      title: 'Antagonists:',
                      text: 'The Giant Kingdoms\nThe Old Evil\nThe Spider Queen',
                    },
                  ]}
                />
              ),
            },
          ]}
        ></InfoBox>
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[6], pc: gridOptions.span.pc[3] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[8] },
          row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[2] },
        }}
      >
        <AdventureLogs sessions={sessionData} gazetter={gazetterLinks} />
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[7] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
          row: { tab: gridOptions.row.tab[2], pc: gridOptions.row.pc[1] },
          rowSpan: { tab: gridOptions.rowSpan.tab[2], pc: gridOptions.rowSpan.pc[2] },
        }}
      >
        <RichText data={richText} />
        <BlockNavLinks
          linkArray={[{ link: '/sessions', text: 'Adventures and Tales', type: 'primary' }]}
        />
        <PageTitle as="h3" size="md" customClasses="mt-8">
          Ongoing Quests & Highlights
        </PageTitle>
        {adventureData.map((adventure, index) => (
          <BlockSingleAdventure
            key={`adventure-${index}-${adventure.title}`}
            card={adventure as AdventureCardType}
          />
        ))}
      </BlockGroup>
    </PageSection>
  );
}
