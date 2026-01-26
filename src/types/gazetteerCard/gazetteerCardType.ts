import { Location } from '@/payload-types';

export type GazetteerCardType = {
  name: string;
  slug: string;
  type: string;
  terrain?: string;
  summary: string;
  parentLocation?: Location;
};
