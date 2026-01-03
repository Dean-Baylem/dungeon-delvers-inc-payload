import BlockGroup from '@/components/blocks/group/BlockGroup';
import PageSection from '../page/PageSection';
import { gridOptions } from '@/lib/options/gridOptions';
import Image from 'next/image';
import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState';
import { RichText } from '@/components/ui/RichText';
import CardStack from '@/components/ui/cards/CardStack';
import PageTitle from '@/components/ui/typography/PageTitle';
import PageText from '@/components/ui/typography/PageText';

type Props = {
  richText: SerializedEditorState;
  npcRichText: SerializedEditorState;
};

export default function FactionsAndSocieties({ richText, npcRichText }: Props) {
  type CardType = {
    type: 'faction' | 'location';
    title: string;
    CTAlink: string;
    summary: string;
  };

  const dummyData: CardType[] = [
    {
      type: 'faction',
      title: 'The Harpers',
      CTAlink: '/factions/the-harpers',
      summary:
        'A semi-secret organization dedicated to promoting good, preserving history, and maintaining balance in the world.',
    },
    {
      type: 'location',
      title: 'Greyhawk City',
      CTAlink: '/locations/greyhawk-city',
      summary:
        'Society and culture of the bustling city of Greyhawk, a hub of commerce and adventure.',
    },
    {
      type: 'faction',
      title: 'The Harpers',
      CTAlink: '/factions/the-harpers',
      summary:
        'A semi-secret organization dedicated to promoting good, preserving history, and maintaining balance in the world.',
    },
    {
      type: 'location',
      title: 'Greyhawk City',
      CTAlink: '/locations/greyhawk-city',
      summary:
        'Society and culture of the bustling city of Greyhawk, a hub of commerce and adventure.',
    },
    {
      type: 'faction',
      title: 'The Harpers',
      CTAlink: '/factions/the-harpers',
      summary:
        'A semi-secret organization dedicated to promoting good, preserving history, and maintaining balance in the world.',
    },
    {
      type: 'location',
      title: 'Greyhawk City',
      CTAlink: '/locations/greyhawk-city',
      summary:
        'Society and culture of the bustling city of Greyhawk, a hub of commerce and adventure.',
    },
  ];

  return (
    <PageSection title="Factions & Societies" reverseTitle={true}>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[3], pc: gridOptions.span.pc[3] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
          row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
          order: gridOptions.order[0],
        }}
      >
        <span className="flex self-center md:-mt-8">
          <Image
            src="/home/factions-societies.webp"
            alt="factions-and-societies"
            width={300}
            height={300}
            loading="lazy"
          />
        </span>
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[7], pc: gridOptions.span.pc[7] },
          start: { tab: gridOptions.start.tab[4], pc: gridOptions.start.pc[4] },
          row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
          order: gridOptions.order[1],
        }}
      >
        <RichText data={richText} />
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
          row: { tab: gridOptions.row.tab[2], pc: gridOptions.row.pc[2] },
          order: gridOptions.order[2],
        }}
      >
        <CardStack list={dummyData} />
        <div className="mt-6">
          <PageTitle as="h3" size="md">
            Allies, Rivals, and Villains
          </PageTitle>
        </div>
        <RichText data={npcRichText} />
      </BlockGroup>
    </PageSection>
  );
}
