'use client';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import Image from 'next/image';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { AnimatePresence, motion } from 'motion/react';
import InteractiveMapInfobarContents from './InteractiveMapInfobarContents';
import InteractiveMapInfobarPinList from './InteractiveMapInfobarList';
import { useAuthStore } from '@/providers/auth-provider';
import { Player } from '@/payload-types';

type Props = {
  mapContent?: SerializedEditorState;
  mapName: string;
};

export default function InteractiveMapInfobar({ mapContent, mapName }: Props) {
  const { primary, secondary, danger } = CTA_TYPES;
  const { user } = useAuthStore((state) => state);
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
              <InteractiveMapInfobarContents
                mainTitle={sideBarHighlight.mainTitle}
                content={sideBarHighlight.content}
              >
                <div className="flex flex-col gap-2">
                  <button
                    className={`${primary} text-lg`}
                    onClick={() => setSideBarHighlight(undefined)}
                  >
                    RETURN
                  </button>
                  <h3 className="font-heading font-bold text-2xl text-heading text-center">
                    Other Map Pins
                  </h3>
                  <InteractiveMapInfobarPinList
                    id="highlight-pin-list"
                    type="pinList"
                    current={sideBarHighlight.mainTitle}
                  />
                </div>
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
                            console.log('editing!');
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
              </InteractiveMapInfobarContents>
            </motion.div>
          ) : (
            <InteractiveMapInfobarContents mainTitle={mapName} content={mapContent}>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-2xl text-heading text-center">
                  Map Pins
                </h3>
                <InteractiveMapInfobarPinList id="pin-list" type="pinList" />
              </div>
            </InteractiveMapInfobarContents>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
