'use client';
import { LoreCardType } from '@/types/loreCard/lordCard';
import { useTransition } from 'react';
import LoreList from './LoreList';
import { LORE_SUBTYPES } from '@/constants/loreSubtypes';
import { useSearchParams, useRouter } from 'next/navigation';
import LoreFilterButton from './LoreFilterButton';

type Props = {
  loreData: Array<LoreCardType>;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function LoreDisplay({ loreData, headingLevel }: Props) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const querySubtypes = searchParams.getAll('type');
  const page = Number(searchParams.get('page') || '1');

  const handleFilterClick = (newSubtype: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSubtype === 'all') {
        params.delete('type');
      } else {
        const types = params.getAll('type');
        params.delete('type');

        const nextTypes = types.includes(newSubtype)
          ? types.filter((t) => t !== newSubtype)
          : [...types, newSubtype];

        nextTypes.forEach((t) => params.append('type', t));
      }

      params.delete('page');
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 lg:gap-4 items-center">
        <LoreFilterButton
          handleFilterClick={handleFilterClick}
          querySubtypes={querySubtypes.join(',')}
        />
        {LORE_SUBTYPES.map((subtype) => (
          <LoreFilterButton
            key={subtype.value}
            subtype={subtype}
            handleFilterClick={handleFilterClick}
            querySubtypes={querySubtypes.join(',')}
          />
        ))}
      </div>

      <div className="mt-10">
        <LoreList
          allItems={loreData}
          id="lore-card-list"
          isLoading={isPending}
          headingLevel={headingLevel}
        />
      </div>
    </div>
  );
}
