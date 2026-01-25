'use client';
import { LoreCardType } from '@/types/loreCard/lordCard';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import LoreList from './LoreList';
import { LORE_SUBTYPES } from '@/constants/loreSubtypes';
import { useSearchParams, useRouter } from 'next/navigation';
import LoreFilterButton from './LoreFilterButton';
import { mapLoreDocToCard } from '@/lib/mappers/loreCardMapper';

type Props = {
  loreData: Array<LoreCardType>;
};

export default function LoreDisplay({ loreData }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const querySubtypes = searchParams.getAll('type').sort().join(',');
  const page = Number(searchParams.get('page') || '1');

  const [filteredLore, setFilteredLore] = useState<LoreCardType[]>(loreData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const fetchFilteredLore = async () => {
      try {
        const url =
          querySubtypes.length === 0
            ? `/api/lore?page=${page}`
            : `/api/lore?where[subtype][in]=${querySubtypes}&page=${page}`;
        const res = await fetch(url);
        const data = await res.json();
        setFilteredLore(data.docs.map(mapLoreDocToCard));
      } catch (error) {
        console.error('Error fetching filtered lore:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredLore();
  }, [querySubtypes, page]);

  const handleFilterClick = (newSubtype: string) => {
    setIsLoading(true);
    if (newSubtype === 'all') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('type');
      params.delete('page');
      router.push(`?${params.toString()}`, { scroll: false });
      return;
    }

    const types = searchParams.getAll('type');
    if (types.includes(newSubtype)) {
      types.splice(types.indexOf(newSubtype), 1);
    } else {
      types.push(newSubtype);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('type');
    types.forEach((type) => params.append('type', type));
    router.push(`?${params.toString()}`, { scroll: false });
    params.delete('page');
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Lore Card Filter"
        className="flex flex-wrap gap-4 items-center"
      >
        <LoreFilterButton handleFilterClick={handleFilterClick} querySubtypes={querySubtypes} />
        {LORE_SUBTYPES.map((subtype: { value: string; label: string }) => (
          <LoreFilterButton
            key={`filterButton-${subtype.value}`}
            subtype={subtype}
            handleFilterClick={handleFilterClick}
            querySubtypes={querySubtypes}
          />
        ))}
      </div>
      <div className="mt-10">
        <LoreList
          allItems={filteredLore}
          id="lore-card-list"
          isLoading={isLoading}
          hasMounted={hasMounted.current}
        />
      </div>
    </div>
  );
}
