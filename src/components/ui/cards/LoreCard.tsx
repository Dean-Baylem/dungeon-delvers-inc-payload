import PageText from '../typography/PageText';
import CTALink from '../links/CTALink';
import { LoreCardType } from '@/types/loreCard/lordCard';

type Props = {
  loreData: LoreCardType;
  isLoading?: boolean;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function LoreCard({ loreData, isLoading, headingLevel = 'h4' }: Props) {
  const { name, summary, type, subtype, slug } = loreData;

  const Heading = headingLevel;

  return (
    <div
      className={`border-2 border-heading bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size-cover h-full flex flex-col gap-2 p-4 transition-opacity duration-200 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <Heading className="text-sm md:text-base font-bold font-subheading text-center text-heading">
        {name}
      </Heading>
      {subtype && (
        <p className="font-serif font-bold grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <span className="w-full h-px bg-mainText flex-1"></span>
          <span className="text-sm md:text-base capitalize text-center flex-2">
            {subtype.replaceAll('_', ' ')}
          </span>
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
