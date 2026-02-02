import { Adventure } from '@/payload-types';
import { AdventureCardType } from '@/types/adventureCard/adventureCard';
import mediaTypeCheck from '../query/mediaTypeCheck';

export const mapAdventureDocToCard = (adventure: Adventure): AdventureCardType => ({
  title: adventure.name,
  summary: adventure.summary,
  link: `/adventures/${adventure.pageSlug}`,
  characterList: Array.isArray(adventure?.relatedCharacters)
    ? adventure?.relatedCharacters.map((char) => {
        return {
          iconSrc: typeof char === 'number' ? '' : mediaTypeCheck(char?.icon).src,
          name: typeof char === 'number' ? '' : char?.name,
        };
      })
    : [],
});
