import { motion } from 'framer-motion';
import { journeyUi } from '../data/memories';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-md space-y-8 text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-accent/75">{journeyUi.introBadge}</p>
        <h1 className="text-3xl font-light leading-tight text-zinc-100">{journeyUi.introTitle}</h1>
        <button
          type="button"
          onClick={onStart}
          className="rounded-full border border-accent/45 px-8 py-3 text-sm tracking-wide text-accent transition hover:bg-accent/10"
        >
          {journeyUi.startButton}
        </button>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
