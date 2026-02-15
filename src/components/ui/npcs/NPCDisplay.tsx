'use client';

import { NPCListSingle } from '@/types/NPC/npcTypes';
import NPCList from './NPCList';
import { useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  npcData: Array<NPCListSingle>;
};
export default function NPCDisplay({ npcData }: Props) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryDisposition = searchParams.get('disposition');
  const page = Number(searchParams.get('page') || '1');

  const handleDispositionClick = (newDisposition: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newDisposition === 'all') {
        params.delete('disposition');
      } else {
        params.set('disposition', newDisposition);
      }
      params.delete('page');
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-4 items-center mb-8">
        {['all', 'ally', 'neutral', 'villain'].map((disposition) => (
          <button
            key={disposition}
            onClick={() => handleDispositionClick(disposition)}
            className={`${
              queryDisposition === disposition ||
              (queryDisposition === null && disposition === 'all')
                ? 'bg-secondary text-white'
                : 'bg-background text-mainText hover:bg-mainText hover:text-white'
            } py-1 px-4 text-lg font-bold font-sans rounded border border-secondary duration-150 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 cursor-pointer`}
          >
            {disposition.charAt(0).toUpperCase() + disposition.slice(1)}
          </button>
        ))}
      </div>
      <NPCList list={npcData} isLoading={isPending} />
    </div>
  );
}
