import { AnimatePresence, motion } from 'motion/react';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';
import './loadingScreen.css';

export default function LoadingScreen({ text }: { text: string }) {
  const { mapLoading } = useInteractiveMapStore((state) => state);

  return (
    <>
      <AnimatePresence>
        <motion.div className="absolute w-full h-full bg-mainText flex flex-col items-center justify-center z-12 gap-4">
          <div className="flex gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={`loading-dot-${i}`}
                className="pingDot"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-4xl text-white font-heading font-bold">{text}</p>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
