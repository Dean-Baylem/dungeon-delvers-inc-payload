'use client';
import { AnimatePresence, motion } from 'motion/react';
import { LoreCardType } from '@/types/loreCard/lordCard';
import LoreCard from '../cards/LoreCard';

type Props = {
  allItems: Array<LoreCardType>;
  id?: string;
  isLoading: boolean;
  hasMounted?: boolean;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function LoreList({
  allItems,
  id,
  isLoading,
  headingLevel,
  hasMounted = true,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={allItems.map((i) => i.slug).join(',')}
        id={id ?? 'lore-list'}
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={hasMounted ? 'hidden' : 'show'}
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {allItems.map((item, index) => (
          <motion.li
            key={`lore-item-${index}-${item.slug}`}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <LoreCard loreData={item} isLoading={isLoading} headingLevel={headingLevel} />
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
