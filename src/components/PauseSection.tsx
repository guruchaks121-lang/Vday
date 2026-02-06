interface PauseSectionProps {
  content?: string | string[];
}

const PauseSection = ({ content }: PauseSectionProps) => {
  const message = Array.isArray(content) ? content[0] : content;

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <p className="max-w-sm text-center text-lg font-light leading-relaxed text-zinc-300">{message}</p>
    </div>
  );
};

export default PauseSection;
