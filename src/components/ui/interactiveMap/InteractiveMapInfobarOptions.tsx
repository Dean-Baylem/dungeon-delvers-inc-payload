'use client';
import { useAuthStore } from '@/providers/auth-provider';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { Player } from '@/payload-types';
import { CTA_TYPES } from '@/constants/ctaTypes';

export default function InteractiveMapInfobarOptions() {
  const { user } = useAuthStore((state) => state);
  const { sideBarHighlight, setIsEditingPin } = useInteractiveMapStore((state) => state);
  const { primary, secondary, danger } = CTA_TYPES;

  if (!sideBarHighlight) return null;

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
                  console.log('deleting!');
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
