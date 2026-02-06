import { useCallback, useEffect, useRef } from 'react';

interface UseAudioReturn {
  play: (url?: string) => Promise<void>;
  stop: () => Promise<void>;
  stopImmediately: () => void;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAudio = (enabled: boolean): UseAudioReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeUrlRef = useRef<string | undefined>(undefined);
  const operationIdRef = useRef(0);

  const stopImmediately = useCallback(() => {
    operationIdRef.current += 1;
    const currentAudio = audioRef.current;
    if (!currentAudio) {
      return;
    }

    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.src = '';
    audioRef.current = null;
    activeUrlRef.current = undefined;
  }, []);

  const stop = useCallback(async () => {
    operationIdRef.current += 1;
    const opId = operationIdRef.current;
    const currentAudio = audioRef.current;

    if (!currentAudio) {
      return;
    }

    const startVolume = currentAudio.volume;
    const steps = 8;
    for (let i = steps; i >= 0; i -= 1) {
      if (operationIdRef.current !== opId) {
        return;
      }
      currentAudio.volume = (startVolume * i) / steps;
      await sleep(50);
    }

    if (operationIdRef.current !== opId) {
      return;
    }

    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.src = '';
    audioRef.current = null;
    activeUrlRef.current = undefined;
  }, []);

  const play = useCallback(
    async (url?: string) => {
      if (!enabled || !url) {
        await stop();
        return;
      }

      if (activeUrlRef.current === url && audioRef.current) {
        return;
      }

      await stop();

      operationIdRef.current += 1;
      const opId = operationIdRef.current;
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
      activeUrlRef.current = url;

      try {
        await audio.play();
      } catch {
        audioRef.current = null;
        activeUrlRef.current = undefined;
        return;
      }

      const steps = 10;
      for (let i = 0; i <= steps; i += 1) {
        if (operationIdRef.current !== opId) {
          return;
        }
        audio.volume = i / steps;
        await sleep(60);
      }
    },
    [enabled, stop],
  );

  useEffect(() => {
    if (!enabled) {
      void stop();
    }
  }, [enabled, stop]);

  useEffect(
    () => () => {
      stopImmediately();
    },
    [stopImmediately],
  );

  return { play, stop, stopImmediately };
};
