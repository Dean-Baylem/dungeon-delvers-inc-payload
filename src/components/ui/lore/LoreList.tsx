'use client';
import { AnimatePresence, motion } from 'motion/react';

import ContentCard from '../cards/ContentCard';
import { LoreCardType } from '@/types/loreCard/lordCard';

type Props = {
  allItems: Array<LoreCardType>;
};

export default function LoreList({ allItems }: Props) {
  return (
    <motion.ul
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      initial="show"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <AnimatePresence>
        {allItems.map((item) => (
          <motion.li
            key={item.slug}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <ContentCard
              title={item.name}
              summary={item.summary}
              type={item.type}
              ctaLink={`/entries/${item.slug}`}
              ctaType="secondary"
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
