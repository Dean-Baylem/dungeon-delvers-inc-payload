'use client';
import { AnimatePresence, motion } from 'motion/react';

import ContentCard from '../cards/ContentCard';

type Props = {
  allItems: Array<{
    type: string;
    name: string;
    slug: string;
    summary: string;
  }>;
  activeTypes: string[];
};

export default function LoreList({ allItems, activeTypes }: Props) {
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
        {allItems.map((item) =>
          activeTypes.includes(item.type) ? (
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
          ) : null,
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
