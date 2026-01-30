import PageText from '../typography/PageText';
import PageTitle from '../typography/PageTitle';
import CTALink from '../links/CTALink';
import Image from 'next/image';
import { ReligionCardType } from '@/types/religionCard/religionCard';
import { truncate } from '@/lib/utility/truncateString';

type Props = {
  religion: ReligionCardType;
};

export default function ReligionCard({ religion }: Props) {
  const singleDeityclass = 'font-serif font-bold text-lg text-center';

  return (
    <div className="border-2 border-heading bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size-cover h-full flex flex-col gap-2 p-4 shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)]">
      <hgroup className="text-center">
        <PageTitle as="h4" size="sm">
          {religion.name}
        </PageTitle>
        <PageText customClasses="capitalize mt-1 font-bold">
          {religion.type.replace('_', ' ')}
        </PageText>
      </hgroup>
      <div className="flex justify-center">
        {religion.icon && (
          <Image
            src={religion.icon.src}
            alt={religion.icon.alt}
            width="150"
            height="150"
            loading="lazy"
            className="h-40 w-auto"
            unoptimized
          />
        )}
      </div>
      <ul>
        {Array.isArray(religion.deities) && religion.deities.length > 0 ? (
          religion.deities.map((deity) => (
            <li className={singleDeityclass} key={`${religion.name}-deity-${deity}`}>
              {deity}
            </li>
          ))
        ) : (
          <li className={singleDeityclass}>Unknown Deities</li>
        )}
      </ul>
      <PageText customClasses="mt-1">{truncate(religion.summary, 250)}</PageText>
      <div className="flex self-center mt-auto pt-2">
        <CTALink link={`/religion/${religion.slug}`} text="Read More" type="primary" />
      </div>
    </div>
  );
}
