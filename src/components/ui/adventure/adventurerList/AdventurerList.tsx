import Image from 'next/image';

type Props = {
  list: Array<{
    iconSrc: string;
    name: string;
  }>;
};

export default function AdventurerList({ list }: Props) {
  return (
    <ul className="flex flex-wrap gap-4 justify-center">
      {list.map((adventurer, index) => (
        <li key={`adventurer-${adventurer.name}-${index}`}>
          <figure className="grid grid-rows-[2.5rem_auto] justify-items-center gap-1 w-12">
            <Image
              src={adventurer.iconSrc}
              alt={adventurer.name}
              width="40"
              height="40"
              loading="lazy"
            />
            <figcaption className="font-serif font-semibold text-sm text-mainText text-center leading-4">
              {adventurer.name}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
