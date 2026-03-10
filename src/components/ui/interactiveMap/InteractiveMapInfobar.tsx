'use client';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';

export default function InteractiveMapInfobar() {
  const { sideBarExpanded, setSideBarExpanded } = useInteractiveMapStore((state) => state);

  return (
    <div
      className={`absolute bg-white h-full top-0 left-0 z-10 transition-[width] duration-300 ease-out ${sideBarExpanded ? 'w-90' : 'w-0'}`}
      id="map-infobar"
      aria-expanded={sideBarExpanded}
    >
      <button
        type="button"
        className="absolute top-0 -right-6 l z-20 bg-white"
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
    </div>
  );
}
