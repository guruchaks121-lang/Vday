import { useEffect, useMemo, useRef, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import MemoryRenderer from './components/MemoryRenderer';
import { memories } from './data/memories';
import { useAudio } from './hooks/useAudio';

const App = () => {
  const [started, setStarted] = useState(false);
  const [activeId, setActiveId] = useState<string>(memories[0]?.id ?? '');
  const [isLetterActive, setIsLetterActive] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const { play, stop } = useAudio(started && !isLetterActive);

  const activeMemory = useMemo(
    () => memories.find((memory) => memory.id === activeId),
    [activeId],
  );

  useEffect(() => {
    if (!started) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries[0];
          const id = topEntry.target.getAttribute('data-memory-id');
          if (id) {
            setActiveId(id);
          }
        }
      },
      {
        threshold: [0.6, 0.8, 1],
      },
    );

    sectionRefs.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    setIsLetterActive(activeMemory?.type === 'letter');
  }, [activeMemory?.type]);

  useEffect(() => {
    if (!started) {
      return;
    }

    if (!activeMemory || activeMemory.type === 'pause' || activeMemory.type === 'letter') {
      void stop();
      return;
    }

    void play(activeMemory.audioUrl);

    return () => {
      void stop();
    };
  }, [activeMemory, play, started, stop]);

  return (
    <main className="bg-base text-zinc-100">
      {!started && <IntroScreen onStart={() => setStarted(true)} />}

      {started && (
        <div>
          {memories.map((memory) => (
            <section
              key={memory.id}
              data-memory-id={memory.id}
              ref={(node) => {
                if (node) {
                  sectionRefs.current.set(memory.id, node);
                } else {
                  sectionRefs.current.delete(memory.id);
                }
              }}
              className="h-screen w-full"
            >
              <MemoryRenderer memory={memory} active={memory.id === activeId} />
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

export default App;
