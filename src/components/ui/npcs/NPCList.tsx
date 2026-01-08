'use client';
import { AnimatePresence, motion } from 'motion/react';
import { NPCListSingle } from '@/types/NPC/npcTypes';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  list: Array<NPCListSingle>;
  allowedDispositions: Array<'ally' | 'neutral' | 'villain'>;
};

export default function NPCList({ list, allowedDispositions }: Props) {
  return (
    <motion.ul
      initial="show"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-center"
    >
      <AnimatePresence>
        {list.map((npc, index) =>
          allowedDispositions.includes(npc.disposition) ? (
            <motion.li
              key={`npc-${npc.id}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-90"
            >
              <Link
                href={`/npcs/${npc.slug}`}
                className="block relative z-1 pt-60 h-full border-heading border-2 shadow-[2px_2px_4px_2px_rgba(0,0,0,0.45)] transition-transform duration-150 hover:scale-105"
              >
                <h4 className="absolute top-0 left-0 w-full p-2 bg-[rgba(12,12,12,0.9)] text-white text-center font-subheading">
                  {npc.name}
                </h4>
                <div className="w-full h-full absolute -z-1 top-0 left-0">
                  <Image
                    src={npc.portrait.src}
                    alt={npc.portrait.alt}
                    width={288}
                    height={342}
                    loading="lazy"
                    className="w-full h-3/4 object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative z-1 bg-[rgba(12,12,12,0.9)] h-full p-4 text-white">
                  <dl className="grid grid-cols-[auto_1fr] gap-2">
                    {npc.location && (
                      <>
                        <dt className="font-serif text-sm font-bold">Location:</dt>
                        <dd className="font-serif text-sm">{npc.location}</dd>
                      </>
                    )}
                    {npc.faction && (
                      <>
                        <dt className="font-serif text-sm font-bold">Faction:</dt>
                        <dd className="font-serif text-sm capitalize">{npc.faction}</dd>
                      </>
                    )}
                    {npc.disposition && (
                      <>
                        <dt className="font-serif text-sm font-bold">Disposition:</dt>
                        <dd className="font-serif text-sm capitalize">{npc.disposition}</dd>
                      </>
                    )}
                  </dl>
                  <p className="font-medium font-serif text-sm mt-4">{npc.summary}</p>
                </div>
              </Link>
            </motion.li>
          ) : null,
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
