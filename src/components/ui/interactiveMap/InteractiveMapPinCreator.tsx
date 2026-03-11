'use client';
import { useState, useEffect } from 'react';
import { useMapEvent, useMap } from 'react-leaflet';
import { PIN_TYPES } from '@/constants/pinTypes';
import { FORM_STYLES } from '@/constants/formStyles';
import { AnimatePresence, motion } from 'motion/react';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { InteractiveMapPinType } from '@/types/interactiveMap/interactiveMapPinType';
import MDEditor from '@uiw/react-md-editor';

type Props = {
  mapId: string;
};

export default function InteractiveMapPinCreator({ mapId }: Props) {
  const map = useMap();
  const { primary, secondary } = CTA_TYPES;
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [summary, setSummary] = useState('');
  const { handleAddNewPin, isCreatingPin, setIsCreatingPin } = useInteractiveMapStore(
    (state) => state,
  );
  const { formRow, formLabel, inputBase } = FORM_STYLES;

  useMapEvent('click', (e) => {
    if (!isCreatingPin) {
      const { lat, lng } = e.latlng;
      console.log(`Create new icon here: lat: ${lat} | lng: ${lng}`);
      setLatLng({ lat, lng });
      setIsCreatingPin(true);
    }
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPinData: InteractiveMapPinType = {
      pinLabel: formData.get('pinLabel') as string,
      pinType: formData.get('pinType') as string,
      relatedMap: Number(mapId),
      xPoint: latLng.lng,
      yPoint: latLng.lat,
      summary: summary,
    };
    handleAddNewPin(newPinData);
    setSummary('');
  };

  return (
    <>
      <AnimatePresence>
        {isCreatingPin && (
          <>
            <motion.div
              className="absolute top-0 left-0 bg-[rgba(0,0,0,0.90)] w-full h-full z-1 cursor-auto"
              aria-hidden="true"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreatingPin(false);
                setLatLng({ lat: 0, lng: 0 });
              }}
            ></motion.div>

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-pin-title"
              aria-hidden={isCreatingPin ? 'false' : 'true'}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-2 cursor-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onDoubleClick={(e) => {
                if (isCreatingPin) {
                  e.stopPropagation();
                }
              }}
            >
              <form
                onSubmit={handleFormSubmit}
                className="p-6 bg-surface border-heading border-4 flex flex-col gap-4 w-[80vw] max-w-115 relative z-2"
              >
                <p
                  className="font-subheading font-bold text-heading text-xl text-center"
                  id="new-pin-title"
                >
                  Map Pin Creation
                </p>
                <div className={formRow}>
                  <label className={formLabel} htmlFor="pinLabel">
                    Pin Label
                  </label>
                  <input className={`${inputBase}`} type="text" id="pinLabel" name="pinLabel" />
                </div>
                <div className={formRow}>
                  <label className={formLabel} htmlFor="pinType">
                    Pin Type
                  </label>
                  <select className={`${inputBase}`} id="pinType" name="pinType">
                    {PIN_TYPES.map((pinType) => (
                      <option key={`pinType-${pinType.value}`} value={pinType.value}>
                        {pinType.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={formRow}>
                  <label className={formLabel} htmlFor="summary">
                    Summary
                  </label>
                  <div className="container">
                    <MDEditor value={summary} onChange={(value) => setSummary(value ?? '')} />
                    <MDEditor.Markdown source={summary} style={{ whiteSpace: 'pre-wrap' }} />
                  </div>
                  {/* <textarea className={`${inputBase}`} id="summary" name="summary"></textarea> */}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button type="submit" className={`${primary} cursor-pointer`}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className={`${secondary} cursor-pointer`}
                    onClick={() => {
                      setIsCreatingPin(false);
                      setLatLng({ lat: 0, lng: 0 });
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
