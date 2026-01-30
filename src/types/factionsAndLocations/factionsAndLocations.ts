export type FactionLocationCardType = {
  type: 'faction' | 'location';
  title: string;
  iconSrc?: string;
  details?: {
    type?: string;
    terrain?: string;
  };
  CTAlink: string;
  summary: string;
};
