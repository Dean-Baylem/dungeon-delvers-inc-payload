import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function HeroQuoteCitation({ children }: Props) {
  return <p className="text-white text-sm text-end font-sans italic font-light mt-2">{children}</p>;
}
