export type AdventureCardType = {
  title: string;
  summary: string;
  link: string;
  characterList: [
    {
      iconSrc: string;
      name: string;
    },
  ];
};
