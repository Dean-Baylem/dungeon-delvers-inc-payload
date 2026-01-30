import { Npc } from '@/payload-types';
import { NPCListSingle } from '@/types/NPC/npcTypes';
import mediaTypeCheck from '../query/mediaTypeCheck';

export const mapNPCDocToCard = (npc: Npc): NPCListSingle => ({
  id: npc.id,
  slug: npc.slug,
  name: npc.name,
  portrait: mediaTypeCheck(npc.portrait),
  disposition: npc.disposition,
  location: typeof npc.home === 'number' ? 'Unknown' : npc.home?.name || 'Unknown',
  faction:
    Array.isArray(npc?.relatedFaction) && npc?.relatedFaction[0]
      ? typeof npc?.relatedFaction[0] === 'number'
        ? ''
        : npc?.relatedFaction[0]?.name
      : '',
  summary: npc.summary,
});
