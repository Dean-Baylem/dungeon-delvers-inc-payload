import PageText from '../typography/PageText';
import CTALink from '../links/CTALink';
import { LoreCardType } from '@/types/loreCard/lordCard';

type Props = {
  loreData: LoreCardType;
  isLoading?: boolean;
};

export default function LoreCard({ loreData, isLoading }: Props) {
  const { name, summary, type, subtype, slug } = loreData;
  return (
    <div
      className={`border-2 border-heading bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size-cover h-full flex flex-col gap-2 p-4 transition-opacity duration-200 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <h4 className="font-bold font-subheading text-center text-heading">{name}</h4>
      {subtype && (
        <p className="font-serif font-bold flex items-center gap-2">
          <span className="w-full h-px bg-mainText flex-1"></span>
          <span className="capitalize text-center flex-2">{subtype.replaceAll('_', ' ')}</span>
          <span className="w-full h-px bg-mainText flex-1"></span>
        </p>
      )}
      <PageText customClasses="font-medium pt-1 pb-2">{summary}</PageText>
      {slug && (
        <div className="flex self-center mt-auto">
          <CTALink link={`/lore/${slug}`} text="Read More" type="secondary" />
        </div>
      )}
    </div>
  );
}
