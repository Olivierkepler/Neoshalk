import { GripVertical } from "lucide-react";

interface SplitDividerProps {
  dividerPosition: number;
  onMouseDown: (e: React.MouseEvent) => void;
}

export default function SplitDivider({ dividerPosition, onMouseDown }: SplitDividerProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{ left: `${dividerPosition}%` }}
      className="absolute top-1/2 -translate-y-1/2 h-250 z-20 w-[1px] cursor-col-resize select-none
                 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
    >
      <GripVertical
        size={20}
        className="absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
      />
    </div>
  );
}
