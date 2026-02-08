import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  customClass?: string;
};

export default function HeroQuoteText({ children, customClass }: Props) {
  const classString =
    customClass ??
    'font-subheading text-white text-xs sm:text-base text-center max-w-2xl leading-loose';

  return <p className={classString}>{children}</p>;
}
