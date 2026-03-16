import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { CTA_TYPES } from '@/constants/ctaTypes';
import InteractiveMapInfobarPinList from './InteractiveMapInfobarList';

export default function InteractiveMapInfobarOtherPins({ isMain }: { isMain: boolean }) {
  const { sideBarHighlight, setSideBarHighlight } = useInteractiveMapStore((state) => state);
  const { primary } = CTA_TYPES;

  return (
    <div className="flex flex-col gap-2">
      {!isMain && (
        <button className={`${primary} text-lg`} onClick={() => setSideBarHighlight(undefined)}>
          RETURN
        </button>
      )}
      <h3 className="font-heading font-bold text-2xl text-heading text-center">Other Map Pins</h3>
      {isMain ? (
        <InteractiveMapInfobarPinList id="other-pin-list" type="pinList" />
      ) : (
        <InteractiveMapInfobarPinList
          id="highlight-pin-list"
          type="pinList"
          current={sideBarHighlight && sideBarHighlight.mainTitle}
        />
      )}
    </div>
  );
}
