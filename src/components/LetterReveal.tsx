import { useState } from 'react';
import { motion } from 'framer-motion';
import { journeyUi } from '../data/memories';

interface LetterRevealProps {
  title?: string;
  content?: string | string[];
}

const LetterReveal = ({ title, content }: LetterRevealProps) => {
  const [revealed, setRevealed] = useState(false);
  const body = Array.isArray(content) ? content.join(' ') : content;

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <motion.button
        type="button"
        onClick={() => setRevealed((value) => !value)}
        className="w-full max-w-xl rounded-2xl border border-zinc-700/80 bg-surface/70 p-8 text-left shadow-card"
        whileTap={{ scale: 0.99 }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{revealed ? journeyUi.letterOpenLabel : journeyUi.letterLockedLabel}</p>
        {title && <h3 className="mt-3 text-2xl font-light text-zinc-100">{title}</h3>}
        <p className="mt-6 text-base leading-relaxed text-zinc-300">{revealed ? body : journeyUi.letterRevealPrompt}</p>
      </motion.button>
    </div>
  );
};

export default LetterReveal;
