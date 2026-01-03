'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import PageText from '../typography/PageText';
import Link from 'next/link';

type Props = {
  list: Array<{
    title: string;
    type: 'faction' | 'location';
    CTAlink: string;
    summary: string;
  }>;
};
export default function CardStack({ list }: Props) {
  const [cardIndex, setCardIndex] = useState(0);
  const isDesktop = useIsDesktop();

  const handleCardClick = (index: number) => {
    if (!isDesktop) return;
    setCardIndex(index);
  };

  const handleKeyboardNavi = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!isDesktop) return;

    event.preventDefault();
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % list.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + list.length) % list.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = list.length - 1;
        break;
      default:
        return;
    }

    setCardIndex(nextIndex);

    document.getElementById(`paneltab-${nextIndex}`)?.focus();
  };

  return (
    <div className="w-fit mx-auto">
      <ul className="flex flex-col md:flex-row gap-6 md:gap-0" role="tablist">
        {list.map((item, index) => (
          <li
            key={`card--${item.title}-${index}`}
            className={`border-2 md:border-y-2 md:border-x first:md:border-l-2 last:md:border-r-2 border-heading bg-surface bg-[url(/transparent-bg/crossword.png)] bg-size-cover grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-2 w-vw md:w-full max-w-dvh ${index === cardIndex ? 'md:max-w-100' : 'md:max-w-16'} duration-150 overflow-hidden`}
          >
            <button
              className="grid grid-cols-[2rem_1fr] md:flex md:flex-col gap-4 items-center justify-self-center p-4 pb-1 md:pt-4 md:pb-8 md:px-3 md:cursor-pointer md:hover:bg-[#e6c095] md:focus:bg-[#e6c095] duration-150 outline-none"
              onClick={() => handleCardClick(index)}
              role={isDesktop ? 'tab' : undefined}
              aria-selected={isDesktop ? index === cardIndex : undefined}
              aria-controls={isDesktop ? `panel-${index}` : undefined}
              tabIndex={isDesktop ? (index === cardIndex ? 0 : -1) : undefined}
              id={`paneltab-${index}`}
              onKeyDown={(e) => {
                handleKeyboardNavi(e, index);
              }}
            >
              <Image
                src={`/icons/icon-${item.type}.svg`}
                width="32"
                height="32"
                alt={item.type}
                loading="lazy"
                className="w-full"
              />
              <h3 className="font-subheading font-bold text-xl text-end w-fit textmode-sideways">
                {item.title}
              </h3>
            </button>
            <div
              className="pt-0 pb-4 px-4 md:p-4 h-fit w-full md:w-64 md:mx-auto lg:w-75 flex flex-col gap-3"
              role="tabpanel"
              id={`panel-${index}`}
            >
              <p className="font-serif font-bold flex items-center gap-2">
                <span className="w-full h-px bg-mainText"></span>
                <span className="capitalize text-center">{item.type.replace('_', ' ')}</span>
                <span className="w-full h-px bg-mainText"></span>
              </p>
              <div>
                <PageText customClasses="font-medium text-center md:text-start">
                  {item.summary}
                </PageText>
              </div>
              <div className={`flex mx-auto ${index === cardIndex ? '' : 'md:hidden'}`}>
                {item.CTAlink && (
                  <Link
                    href={item.CTAlink}
                    className="bg-background py-1 px-4 text-mainText text-lg font-bold font-sans rounded border border-secondary duration-150 hover:bg-mainText hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  >
                    Read More
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
