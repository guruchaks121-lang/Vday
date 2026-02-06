import { useEffect, useMemo, useState } from 'react';
import { journeyUi } from '../data/memories';

interface FutureLockProps {
  id: string;
  title?: string;
  content?: string | string[];
  unlockDate?: string;
}

const FutureLock = ({ id, title, content, unlockDate }: FutureLockProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const unlockTimestamp = useMemo(() => {
    if (!unlockDate) {
      return Number.NaN;
    }
    return new Date(unlockDate).getTime();
  }, [unlockDate]);

  useEffect(() => {
    const storageKey = `memory-unlock-${id}`;
    const stored = localStorage.getItem(storageKey);
    const hasTimeElapsed = Number.isFinite(unlockTimestamp) && Date.now() >= unlockTimestamp;

    if (stored === 'true' || hasTimeElapsed) {
      setIsUnlocked(true);
      localStorage.setItem(storageKey, 'true');
    }
  }, [id, unlockTimestamp]);

  const body = Array.isArray(content) ? content.join(' ') : content;
  const unlockLabel = unlockDate ? new Date(unlockDate).toLocaleDateString() : journeyUi.futureLockFallbackDate;

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700/80 bg-surface/70 p-8 text-center shadow-card">
        {title && <h3 className="text-xl font-light text-zinc-100">{title}</h3>}
        {isUnlocked ? (
          <p className="mt-4 text-zinc-200">{body}</p>
        ) : (
          <>
            <p className="mt-4 text-zinc-400">{journeyUi.futureLockPrefix} {unlockLabel}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-500">{journeyUi.futureLockNotYet}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FutureLock;
