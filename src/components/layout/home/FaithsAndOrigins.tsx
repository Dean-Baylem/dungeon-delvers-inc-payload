import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState';
import PageSection from '../page/PageSection';
import BlockGroup from '@/components/blocks/group/BlockGroup';
import { gridOptions } from '@/lib/options/gridOptions';
import { RichText } from '@/components/ui/RichText';
import Image from 'next/image';
import PageTitle from '@/components/ui/typography/PageTitle';
import CTALink from '@/components/ui/links/CTALink';
import PageText from '@/components/ui/typography/PageText';
import { truncate } from '@/lib/utility/truncateString';
import { ReligionCardType } from '@/types/religionCard/religionCard';
import ReligionCard from '@/components/ui/cards/ReligionCard';

type Props = {
  richText: SerializedEditorState;
  originsText: SerializedEditorState;
  religions: Array<ReligionCardType>;
};

export default function FaithsAndOrigins({ richText, originsText, religions }: Props) {
  return (
    <PageSection title="Faiths and Origins">
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
          src="/home/faith-and-origins.webp"
          alt="Origins"
          width="250"
          height="250"
          loading="lazy"
          className="self-center"
        />
      </BlockGroup>
      <BlockGroup
        options={{
          span: { tab: gridOptions.span.tab[11], pc: gridOptions.span.pc[11] },
          start: { tab: gridOptions.start.tab[0], pc: gridOptions.start.pc[0] },
          row: { tab: gridOptions.row.tab[2], pc: gridOptions.row.pc[2] },
          order: gridOptions.order[2],
        }}
      >
        <PageTitle as="h3" size="md" customClasses="mt-6">
          Religious Organisations
        </PageTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {religions.map((religion, index) => (
            <ReligionCard key={`religion-${index}`} religion={religion} />
          ))}
        </div>
        <div className="mt-8">
          <RichText data={originsText} />
        </div>
      </BlockGroup>
    </PageSection>
  );
}
