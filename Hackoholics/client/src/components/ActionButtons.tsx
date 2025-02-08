interface ActionButtonsProps {
  onActionClick: (actionText: string) => Promise<void>;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onActionClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button onClick={() => onActionClick('Tell Me about my resume')} className="bg-[#00BCD4] text-white px-4 py-2 rounded-full hover:bg-[#00ACC1] transition-colors text-sm sm:text-base">
        Tell Me about my resume
      </button>
      <button onClick={() => onActionClick('Tell Me about my skills')} className="bg-[#00BCD4] text-white px-4 py-2 rounded-full hover:bg-[#00ACC1] transition-colors text-sm sm:text-base">
        Tell Me about my skills
      </button>
      <button onClick={() => onActionClick('Tell Me about my projects')} className="bg-[#00BCD4] text-white px-4 py-2 rounded-full hover:bg-[#00ACC1] transition-colors text-sm sm:text-base">
        Tell Me about my projects
      </button>
    </div>
  );
}
