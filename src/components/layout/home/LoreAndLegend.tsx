import PageSection from '../page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import LoreList from '@/components/ui/lore/LoreList';
import { gridOptions } from '@/lib/options/gridOptions';
import { RichText } from '@/components/ui/RichText';
import Image from 'next/image';
import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState';
import CTALink from '@/components/ui/links/CTALink';
import { LoreCardType } from '@/types/loreCard/lordCard';

type Props = {
  richText: SerializedEditorState;
  loreItems: Array<LoreCardType>;
};

export default function LoreAndLegend({ richText, loreItems }: Props) {
  return (
    <PageSection title="Lore & Legend">
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[7], pc: gridOptions.span.pc[7] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
          row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
          order: gridOptions.order[1],
        }}
      >
        <RichText data={richText} />
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[3], pc: gridOptions.span.pc[3] },
          start: { tab: gridOptions.start.tab[8], pc: gridOptions.start.pc[8] },
          row: { tab: gridOptions.row.tab[1], pc: gridOptions.row.pc[1] },
          order: gridOptions.order[0],
        }}
      >
        <Image
          src="/home/lore-legend.webp"
          width="277"
          height="277"
          alt="lore-and-legend"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
          row: { tab: gridOptions.row.tab[2], pc: gridOptions.row.pc[2] },
          order: gridOptions.order[2],
        }}
      >
        <div className="flex justify-center md:justify-start">
          <CTALink link="/lore" text="Explore Lore" type="primary" />
        </div>
        <LoreList allItems={loreItems} />
      </BlockGroup>
    </PageSection>
  );
}
