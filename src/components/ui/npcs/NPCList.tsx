'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  list: Array<{
    name: string;
    portraitSrc: string;
    disposition: 'ally' | 'neutral' | 'villain';
    location: string;
    faction?: string;
    summary: string;
  }>;
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
    >
      <AnimatePresence>
        {list.map((npc, index) =>
          allowedDispositions.includes(npc.disposition) ? (
            <motion.li
              key={`npc-${npc.name}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <p>NPC CARD</p>
            </motion.li>
          ) : null,
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
