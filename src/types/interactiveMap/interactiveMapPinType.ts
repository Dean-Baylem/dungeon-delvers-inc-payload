export type InteractiveMapPinType = {
  pinLabel: string;
  pinType: string;
  relatedMap: number;
  xPoint: number;
  yPoint: number;
  summary: string;
  relatedDocuments?: Array<{
    relationTo: string;
    value: number;
  }>;
};
