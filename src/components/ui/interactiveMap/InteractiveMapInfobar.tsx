'use client';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import InteractiveMapInfobarContents from './InteractiveMapInfobarContents';
import InteractiveMapInfobarOptions from './InteractiveMapInfobarOptions';
import InteractiveMapInfobarOtherPins from './interactiveMapInfobarOtherPins';

type Props = {
  mapContent?: SerializedEditorState;
  mapName: string;
};

export default function InteractiveMapInfobar({ mapContent, mapName }: Props) {
  const { sideBarExpanded, setSideBarExpanded, sideBarHighlight } = useInteractiveMapStore(
    (state) => state,
  );

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
              <InteractiveMapInfobarContents
                mainTitle={sideBarHighlight.mainTitle}
                content={sideBarHighlight.content}
              >
                <InteractiveMapInfobarOtherPins isMain={false} />
                <InteractiveMapInfobarOptions />
              </InteractiveMapInfobarContents>
            </motion.div>
          ) : (
            <InteractiveMapInfobarContents mainTitle={mapName} content={mapContent}>
              <InteractiveMapInfobarOtherPins isMain={true} />
            </InteractiveMapInfobarContents>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
