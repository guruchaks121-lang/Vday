import { motion } from 'framer-motion';
import type { Memory } from '../data/memories';
import PauseSection from './PauseSection';
import LetterReveal from './LetterReveal';
import ChoiceSelector from './ChoiceSelector';
import FutureLock from './FutureLock';

interface MemoryRendererProps {
  memory: Memory;
  active: boolean;
}

const MemoryRenderer = ({ memory, active }: MemoryRendererProps) => {
  const contentLines = Array.isArray(memory.content) ? memory.content : memory.content ? [memory.content] : [];

  if (memory.type === 'pause') {
    return <PauseSection content={memory.content} />;
  }

  if (memory.type === 'letter') {
    return <LetterReveal title={memory.title} content={memory.content} />;
  }

  if (memory.type === 'choice') {
    return <ChoiceSelector title={memory.title} options={memory.options} />;
  }

  if (memory.type === 'future-lock') {
    return <FutureLock id={memory.id} title={memory.title} content={memory.content} unlockDate={memory.unlockDate} />;
  }

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {memory.type === 'image' && memory.mediaUrl && (
        <img src={memory.mediaUrl} alt={memory.title ?? memory.id} className="absolute inset-0 h-full w-full object-cover" />
      )}

      {memory.type === 'video' && memory.mediaUrl && (
        <video
          src={memory.mediaUrl}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/60" />
      <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        {memory.title && <h2 className="text-3xl font-light text-zinc-50 md:text-4xl">{memory.title}</h2>}
        <div className="mt-6 space-y-3">
          {contentLines.map((line, index) => (
            <p key={`${memory.id}-${index}`} className="text-base leading-relaxed text-zinc-200 md:text-lg">
              {line}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryRenderer;
