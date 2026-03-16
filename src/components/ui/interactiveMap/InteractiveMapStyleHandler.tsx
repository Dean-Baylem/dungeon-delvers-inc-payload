'use client';

import { useMap } from 'react-leaflet';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { useEffect } from 'react';

export default function InteractiveMapStyleHandler() {
  const map = useMap();
  const { addPinActive, isCreatingPin, isEditingPin, sideBarExpanded } = useInteractiveMapStore(
    (state) => state,
  );
  const sideBarWidth = useEffect(() => {
    if (isCreatingPin || isEditingPin) {
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.dragging.disable();
    } else {
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.dragging.enable();
    }
  }, [isCreatingPin, isEditingPin, map]);

  useEffect(() => {
    const container = map.getContainer();
    container.classList.toggle('interactiveCursor--mapPin', addPinActive);
  }, [map, addPinActive]);

  return null;
}
