'use client';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { CTA_TYPES } from '@/constants/ctaTypes';

type Props = {
  id: string;
  type: string;
  current?: string;
};

export default function InteractiveMapInfobarPinList({ id, type, current }: Props) {
  const { mapPinList, setSideBarHighlight } = useInteractiveMapStore((state) => state);
  let { primary, secondary } = CTA_TYPES;

  const buttonStyle =
    type === 'pinList'
      ? secondary.replace('text-lg', 'text-base')
      : primary.replace('text-lg', 'text-base');

  return (
    <ul className="flex flex-col gap-2 w-full">
      {mapPinList
        .filter((pin) => pin.pinLabel !== current)
        .map((pin, index) => (
          <li key={`list-${id}-${index}`}>
            <button
              className={`${buttonStyle} w-full`}
              onClick={() => {
                setSideBarHighlight({ mainTitle: pin.pinLabel, content: pin.summary });
              }}
            >
              {pin.pinLabel}
            </button>
          </li>
        ))}
    </ul>
  );
}
