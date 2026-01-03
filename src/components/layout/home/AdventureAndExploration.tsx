import PageSection from '../page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import InfoBox from '@/components/blocks/infobox/Infobox';
import InfoBoxList from '@/components/blocks/infobox/InfoboxList';
import BlockNavLinks from '@/components/blocks/nav/BlockNavLinks';
import AdventureLogs from '@/components/ui/adventure/adventureLogs/AdventureLogs';
import BlockSingleAdventure from '@/components/ui/adventure/BlockSingleAdventure';
import PageTitle from '@/components/ui/typography/PageTitle';
import { RichText } from '@/components/ui/RichText';
import { gridOptions } from '@/lib/options/gridOptions';
import Image from 'next/image';
import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState';

type Props = {
  richText: SerializedEditorState;
};

export default function AdventureAndExploration({ richText }: Props) {
  const adventureLogs = [
    { link: '/adventures/log1', text: 'The Awakening of the Giant Kings' },
    { link: '/adventures/log2', text: 'Siege of the Spider Queen' },
    { link: '/adventures/log3', text: 'The Old Evil Rises' },
  ];

  const grandGazetter = [
    { link: '/gazetter/entry1', text: 'The Forgotten City of Zel' },
    { link: '/gazetter/entry2', text: 'The Whispering Woods' },
    { link: '/gazetter/entry3', text: 'The Shattered Peaks' },
  ];

  const adventurerList = [
    { iconSrc: '/icons/adventurer1.webp', name: 'Valen' },
    { iconSrc: '/icons/adventurer2.png', name: 'Raltz' },
    { iconSrc: '/icons/adventurer3.png', name: 'Spades' },
    { iconSrc: '/icons/adventurer4.png', name: 'Sivan' },
    { iconSrc: '/icons/adventurer5.png', name: 'Lem Naelax' },
  ];

  const dummyAdventures = [
    {
      title: 'The Lost Tomb of Horrors',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla nulla nisi, vitae porttitor sem rutrum a. Donec aliquam condimentum erat non pretium. Aliquam ligula nisi, vestibulum ac convallis ut, laoreet vel ex. Aliquam erat volutpat.',
      adventurerList: adventurerList,
    },
    {
      title: "Dragon's Lair",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla nulla nisi, vitae porttitor sem rutrum a. Donec aliquam condimentum erat non pretium. Aliquam ligula nisi, vestibulum ac convallis ut, laoreet vel ex. Aliquam erat volutpat.',
      adventurerList: adventurerList,
    },
    {
      title: 'Cursed Forest',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla nulla nisi, vitae porttitor sem rutrum a. Donec aliquam condimentum erat non pretium. Aliquam ligula nisi, vestibulum ac convallis ut, laoreet vel ex. Aliquam erat volutpat.',
      adventurerList: adventurerList,
    },
  ];

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
        <AdventureLogs logs={adventureLogs} gazetter={grandGazetter} />
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
          linkArray={[
            { link: '/', text: 'Current Campaign', type: 'primary' },
            { link: '/', text: 'Past Campaigns', type: 'secondary' },
          ]}
        />
        <PageTitle as="h3" size="md" customClasses="mt-8">
          Ongoing Quests & Highlights
        </PageTitle>
        {dummyAdventures.map((adventure, index) => (
          <BlockSingleAdventure
            title={adventure.title}
            description={adventure.description}
            list={adventure.adventurerList}
            key={`adventure-${adventure.title}-${index}`}
          />
        ))}
      </BlockGroup>
    </PageSection>
  );
}
