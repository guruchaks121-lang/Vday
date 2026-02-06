import { useMemo, useState } from 'react';
import { journeyUi } from '../data/memories';

interface ChoiceSelectorProps {
  title?: string;
  options?: string[];
}

const ChoiceSelector = ({ title, options = [] }: ChoiceSelectorProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const normalizedOptions = useMemo(() => options.slice(0, 3), [options]);

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700/80 bg-surface/70 p-8 shadow-card">
        {title && <h3 className="text-xl font-light text-zinc-100">{title}</h3>}
        <div className="mt-6 space-y-3">
          {normalizedOptions.map((option) => {
            const isSelected = selected === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                disabled={Boolean(selected && !isSelected)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-zinc-700 bg-zinc-900/40 text-zinc-200 hover:border-zinc-500'
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {option}
              </button>
            );
          })}
        </div>
        {selected && <p className="mt-6 text-sm text-accent">{journeyUi.choiceConfirmationPrefix} {selected}</p>}
      </div>
    </div>
  );
};

export default ChoiceSelector;
