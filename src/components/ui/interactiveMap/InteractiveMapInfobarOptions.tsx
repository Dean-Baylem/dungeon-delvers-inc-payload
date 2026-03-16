'use client';
import { useAuthStore } from '@/providers/auth-provider';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { Player } from '@/payload-types';
import { CTA_TYPES } from '@/constants/ctaTypes';

export default function InteractiveMapInfobarOptions() {
  const { user } = useAuthStore((state) => state);
  const {
    sideBarHighlight,
    setSideBarHighlight,
    setIsEditingPin,
    mapPinList,
    setMapPinList,
    setMapLoading,
  } = useInteractiveMapStore((state) => state);
  const { primary, secondary, danger } = CTA_TYPES;

  if (!sideBarHighlight) return null;

  const handlePinDelete = async () => {
    if (confirm('Are you sure you want to delete this pin? This action cannot be undone.')) {
      setMapLoading(true);
      try {
        const response = await fetch(`/api/maps/pins`, {
          method: 'DELETE',
          body: JSON.stringify({ id: sideBarHighlight.id }),
        });

        if (!response.ok) throw new Error('Failed to delete pin');

        const filteredPins = mapPinList.filter(
          (pin) => Number(pin.id) !== Number(sideBarHighlight.id),
        );
        setMapPinList(filteredPins);
      } catch (error) {
        console.error('Error deleting pin');
        alert('There was an error deleting your pin. Please try again.');
      } finally {
        setSideBarHighlight(undefined);
        setMapLoading(false);
      }
    }
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
