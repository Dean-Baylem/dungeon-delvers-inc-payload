import { motion } from 'motion/react';
import PageTitle from '../typography/PageTitle';
import { InteractiveHighlightType } from '@/types/interactiveMap/interactiveHighlightType';
import ReactMarkdown from 'react-markdown';
import { RichText } from '../RichText';

export default function InteractiveMapInfobarContents({
  mainTitle,
  content,
  children,
}: InteractiveHighlightType) {
  return (
    <motion.div
      key="infobar-map-content"
      id="infobar-map-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-hidden"
    >
      <div
        className="px-4 py-2 flex flex-col gap-3 overflow-y-auto pb-4 h-full"
        id="map-infobar-content"
      >
        <PageTitle as="h2" size="lg" customClasses="md:!text-3xl">
          {mainTitle}
        </PageTitle>
        {content && typeof content === 'object' && <RichText data={content} />}
        {content && typeof content === 'string' && <ReactMarkdown>{content}</ReactMarkdown>}
        <hr className="border-heading" />
        {children}
      </div>
    </motion.div>
  );
}
