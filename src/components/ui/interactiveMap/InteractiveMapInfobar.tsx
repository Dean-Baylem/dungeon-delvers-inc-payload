'use client';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import Image from 'next/image';
import PageTitle from '../typography/PageTitle';
import { RichText } from '../RichText';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  mapContent?: SerializedEditorState;
  mapName: string;
};

export default function InteractiveMapInfobar({ mapContent, mapName }: Props) {
  const { primary, secondary } = CTA_TYPES;
  const { sideBarExpanded, setSideBarExpanded, mapPinList, sideBarHighlight, setSideBarHighlight } =
    useInteractiveMapStore((state) => state);

  return (
    <div
      className={`absolute bg-white h-full top-0 left-0 z-10 transition duration-300 ease-out w-90 ${sideBarExpanded ? 'translate-x-0' : '-translate-x-full'}`}
      id="map-infobar"
      aria-expanded={sideBarExpanded}
    >
      <button
        type="button"
        className="absolute top-0 -right-6 l z-20 bg-white cursor-pointer"
        aria-controls="map-infobar"
        onClick={() => {
          setSideBarExpanded(!sideBarExpanded);
        }}
      >
        <img
          src="/icons/icon-chevron.svg"
          alt="expand infobar"
          width="24"
          height="24"
          className={`${sideBarExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div className="overflow-hidden h-full flex flex-col">
        <div>
          <Image
            src="/common/map-banner.webp"
            width="360"
            height="140"
            alt="map banner"
            loading="lazy"
            className="h-35 object-cover"
          />
        </div>
        <AnimatePresence mode="wait">
          {sideBarHighlight ? (
            <motion.div
              key="highlighted-content"
              id="highlighted-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>CONTENT HERE</div>
              <div>
                <button
                  onClick={() => {
                    setSideBarHighlight(undefined);
                  }}
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="infobar-map-content"
              id="infobar-map-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="px-4 py-2 flex flex-col gap-3 overflow-y-auto pb-4 h-full"
                id="map-infobar-content"
              >
                <PageTitle as="h1" size="lg" customClasses="md:!text-3xl">
                  {mapName}
                </PageTitle>
                {mapContent && <RichText data={mapContent} />}
                <hr className="border-heading" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-2xl text-heading text-center">
                    Map Pins
                  </h3>
                  {mapPinList.map((pin, index) => (
                    <button
                      key={`pin-${index}`}
                      className={`${secondary}`}
                      onClick={() => {
                        setSideBarHighlight(pin);
                      }}
                    >
                      {pin.pinLabel}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
