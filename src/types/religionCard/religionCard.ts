export type ReligionCardType = {
  type: string;
  name: string;
  slug: string;
  summary: string;
  icon?: {
    src: string;
    alt: string;
  };
  deities?: Array<string>;
};
