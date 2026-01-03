import PageText from '../typography/PageText';
import CTALink from '../links/CTALink';

type Props = {
  title: string;
  summary: string;
  type?: string;
  ctaLink?: string;
  ctaType?: 'primary' | 'secondary';
};

export default function ContentCard({
  title,
  summary,
  type,
  ctaLink,
  ctaType = 'secondary',
}: Props) {
  return (
    <div className="border-2 border-heading bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size-cover h-full flex flex-col gap-2 p-4">
      <h4 className="font-bold font-subheading text-center text-heading">{title}</h4>
      {type && (
        <p className="font-serif font-bold flex items-center gap-2">
          <span className="w-full h-px bg-mainText"></span>
          <span className="capitalize text-center">{type.replace('_', ' ')}</span>
          <span className="w-full h-px bg-mainText"></span>
        </p>
      )}
      <PageText customClasses="font-medium pt-1 pb-2">{summary}</PageText>
      {ctaLink && (
        <div className="flex self-center mt-auto">
          <CTALink link={ctaLink} text="Read More" type={ctaType} />
        </div>
      )}
    </div>
  );
}
