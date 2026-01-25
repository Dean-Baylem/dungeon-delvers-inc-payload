import { LoreCardType } from '@/types/loreCard/lordCard';

export const mapLoreDocToCard = (loreItem: any): LoreCardType => ({
  name: loreItem.name,
  summary: loreItem.summary,
  type: loreItem.type,
  subtype: loreItem.subtype,
  slug: loreItem.slug,
});
