'use client';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { mapPinQuery } from '@/lib/query/mapPinQuery';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function InteractiveMapPins({
  mapId,
  imageSize,
}: {
  mapId: number;
  imageSize: { width: number; height: number };
}) {
  const { mapPinList, setMapPinList, setSideBarHighlight, setSideBarExpanded } =
    useInteractiveMapStore((state) => state);

  useEffect(() => {
    const fetchMapPins = async () => {
      const mapPinData = await mapPinQuery({ mapId });
      setMapPinList(mapPinData);
    };

    fetchMapPins();
  }, [mapId]);

  return (
    <>
      {mapPinList.map((pin, index) => {
        const mapIcon = new L.Icon({
          iconUrl: `/map-markers/icon-${pin.pinType}.svg`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        });
        return (
          <Marker
            key={`pin-${index}`}
            position={{ lat: pin.yPoint + imageSize.height - 30, lng: pin.xPoint }}
            draggable={false}
            icon={mapIcon}
            autoPanOnFocus={false}
            eventHandlers={{
              click: (e) => {
                console.log('CLICKED');
                setSideBarHighlight({ mainTitle: pin.pinLabel, content: pin.summary });
                setSideBarExpanded(true);
              },
            }}
          >
            <Tooltip
              direction="right"
              offset={[-70, 18]}
              opacity={1}
              className="mapToolTip"
              interactive={false}
            >
              {pin.pinLabel}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}
