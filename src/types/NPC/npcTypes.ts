export type NPCListSingle = {
  id: number;
  slug: string;
  name: string;
  portrait: {
    src: string;
    alt: string;
  };
  disposition: 'ally' | 'neutral' | 'villain';
  location: string;
  faction?: string;
  summary: string;
};
