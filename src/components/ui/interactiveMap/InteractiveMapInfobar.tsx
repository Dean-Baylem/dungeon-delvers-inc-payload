'use client';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import Image from 'next/image';
import PageTitle from '../typography/PageTitle';
import { RichText } from '../RichText';

type Props = {
  mapContent?: SerializedEditorState;
  mapName: string;
};

export default function InteractiveMapInfobar({ mapContent, mapName }: Props) {
  const { sideBarExpanded, setSideBarExpanded } = useInteractiveMapStore((state) => state);

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
      <div className="overflow-hidden">
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
        <div className="px-4 py-2 flex flex-col gap-3">
          <PageTitle as="h1" size="lg" customClasses="md:!text-3xl">
            {mapName}
          </PageTitle>
          {mapContent && <RichText data={mapContent} />}
        </div>
      </div>
    </div>
  );
}
