import { GazetteerCardType } from '@/types/gazetteerCard/gazetteerCardType';
import PageTitle from '../typography/PageTitle';
import CTALink from '../links/CTALink';
import PageText from '../typography/PageText';

type Props = {
  data: GazetteerCardType;
};

export default function GazetteerCard({ data }: Props) {
  return (
    <article className="flex flex-col items-center bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size-cover  w-full h-full p-4 gap-4 border-heading border-2 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.25)]">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 w-full items-center">
        <span className="w-full h-px bg-heading inline-block"></span>
        <PageTitle as="h3" size="sm">
          {data.name}
        </PageTitle>
        <span className="w-full h-px bg-heading inline-block"></span>
      </div>
      <PageText customClasses="font-medium">{data.summary}</PageText>
      <CTALink link={`/grand-gazetteer/${data.slug}`} text="Read More" type="secondary" />
    </article>
  );
}
