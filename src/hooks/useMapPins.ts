import { mapPinQuery } from '@/lib/query/mapPinQuery';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { useEffect } from 'react';

export function useMapPins(mapId: number) {
  const { setMapPinList } = useInteractiveMapStore((state) => state);

  useEffect(() => {
    const fetchMapPins = async () => {
      const mapPinData = await mapPinQuery({ mapId });
      setMapPinList(mapPinData);
    };

    fetchMapPins();
  }, [mapId]);
}
