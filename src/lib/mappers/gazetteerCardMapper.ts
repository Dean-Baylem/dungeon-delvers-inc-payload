import { GazetteerCardType } from '@/types/gazetteerCard/gazetteerCardType';

export const mapLocationToGazetteerCard = (gazeteerItem: any): GazetteerCardType => ({
  name: gazeteerItem.name,
  slug: gazeteerItem.pageSlug,
  type: gazeteerItem.type,
  terrain: gazeteerItem.terrain,
  summary: gazeteerItem.summary,
  parentLocation: gazeteerItem.parentLocation,
});
