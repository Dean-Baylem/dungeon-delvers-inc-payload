import { MapPin } from '@/payload-types';
import { InteractiveMapPinType } from '@/types/interactiveMap/interactiveMapPinType';

export async function mapPinQuery({ mapId }: { mapId: number }) {
  try {
    const response = await fetch(`/api/maps/pins?mapId=${mapId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pins');
    }

    const data = await response.json();

    const formattedData: Array<InteractiveMapPinType> = data.docs.map((doc: MapPin) => {
      return {
        pinLabel: doc.pinLabel,
        pinType: doc.pinType,
        relatedMap: doc.relatedMap,
        xPoint: doc.xPoint,
        yPoint: doc.yPoint,
        summary: doc.summary,
        relatedDocuments: doc.relatedDocuments,
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching pins:', error);
    return [];
  }
}
