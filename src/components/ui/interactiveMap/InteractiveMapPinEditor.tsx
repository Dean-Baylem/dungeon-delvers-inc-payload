'use client';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { FORM_STYLES } from '@/constants/formStyles';
import { AnimatePresence, motion } from 'motion/react';
import { PIN_TYPES } from '@/constants/pinTypes';
import { CTA_TYPES } from '@/constants/ctaTypes';

export default function InteractiveMapPinEditor() {
  const { sideBarHighlight, setSideBarHighlight, isEditingPin, setIsEditingPin } =
    useInteractiveMapStore((state) => state);

  if (!sideBarHighlight) return null;

  const [summary, setSummary] = useState(sideBarHighlight?.content || '');
  const [loading, setLoading] = useState(false);

  const { formRow, formLabel, inputBase } = FORM_STYLES;
  const { primary, secondary } = CTA_TYPES;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const editedPinData = {
      pinLabel: formData.get('pinLabel') as string,
      pinType: formData.get('pinType') as string,
      summary: summary,
      id: sideBarHighlight?.id,
    };

    try {
      const response = await fetch(`/api/maps/pins`, {
        method: 'PATCH',
        body: JSON.stringify(editedPinData),
      });

      if (!response.ok) throw new Error('Error Editing Pin');

      setSideBarHighlight({
        ...sideBarHighlight,
        mainTitle: editedPinData.pinLabel,
        content: editedPinData.summary,
        pintype: editedPinData.pinType,
      });
    } catch (error) {
      console.error('Error Creating Pin');
      alert('Error Editing Pin. Please try again later.');
    } finally {
      setLoading(false);
      setIsEditingPin(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isEditingPin && (
          <>
            <motion.div
              className="absolute top-0 left-0 bg-[rgba(0,0,0,0.90)] w-full h-full z-5 cursor-auto"
              aria-hidden="true"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsEditingPin(false);
              }}
            ></motion.div>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-pin-title"
              aria-hidden={isEditingPin ? 'false' : 'true'}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-5 cursor-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onDoubleClick={(e) => {
                if (isEditingPin) {
                  e.stopPropagation();
                }
              }}
            >
              <form
                onSubmit={handleFormSubmit}
                className="p-6 bg-surface border-heading border-4 flex flex-col gap-4 w-[80vw] max-w-115 relative z-2 max-h-[75dvh] overflow-y-auto"
              >
                <span
                  className={`absolute h-full w-full bg-[rgba(230,209,185,0.8)] top-0 left-0 ${loading ? 'opacity-100 pointer-events-auto animate-pulse' : 'opacity-0 pointer-events-none'}`}
                ></span>
                <p
                  className="font-subheading font-bold text-heading text-xl text-center"
                  id="edit-pin-title"
                >
                  Edit Map Pin
                </p>
                <div className={formRow}>
                  <label className={formLabel} htmlFor="pinLabel">
                    Pin Label
                  </label>
                  <input
                    className={inputBase}
                    type="text"
                    name="pinLabel"
                    id="pinLabel"
                    defaultValue={sideBarHighlight.mainTitle}
                    required
                  />
                </div>
                <div className={formRow}>
                  <label className={formLabel} htmlFor="pinType">
                    Pin Type
                  </label>
                  <select
                    className={`${inputBase}`}
                    id="pinType"
                    name="pinType"
                    defaultValue={sideBarHighlight.pintype}
                  >
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
                    <MDEditor
                      value={String(summary)}
                      onChange={(value) => setSummary(value ?? '')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button type="submit" className={`${primary} cursor-pointer`}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className={`${secondary} cursor-pointer`}
                    onClick={() => {
                      setIsEditingPin(false);
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
