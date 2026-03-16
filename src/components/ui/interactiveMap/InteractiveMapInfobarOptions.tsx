'use client';
import { useAuthStore } from '@/providers/auth-provider';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { Player } from '@/payload-types';
import { CTA_TYPES } from '@/constants/ctaTypes';

export default function InteractiveMapInfobarOptions() {
  const { user } = useAuthStore((state) => state);
  const { sideBarHighlight, setIsEditingPin, mapPinList, setMapPinList } = useInteractiveMapStore(
    (state) => state,
  );
  const { primary, secondary, danger } = CTA_TYPES;

  if (!sideBarHighlight) return null;

  const handlePinDelete = async () => {
    const filteredPins = mapPinList.filter((pin) => Number(pin.id) !== Number(sideBarHighlight.id));
    setMapPinList(filteredPins);
    console.log(filteredPins);
    console.log(sideBarHighlight);
  };

  return (
    <>
      {user &&
        typeof sideBarHighlight.author === 'object' &&
        (sideBarHighlight.author as Player)?.id === Number(user.id) && (
          <>
            <hr className="border-heading" />
            <div className="grid grid-cols-2 gap-3">
              <button
                className={primary}
                type="button"
                onClick={() => {
                  setIsEditingPin(true);
                }}
              >
                EDIT
              </button>
              <button
                className={danger}
                type="button"
                onClick={() => {
                  handlePinDelete();
                }}
              >
                DELETE
              </button>
            </div>
          </>
        )}
    </>
  );
}
