import clsx from "clsx";

interface StageCardProps {
  title: string;
  wordsCount: number;
  color: string;
  onClick: VoidFunction;
}

const StageCard = ({ title, color, wordsCount, onClick }: StageCardProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={clsx(
        "flex select-none flex-col items-center rounded-lg py-4 px-10 text-white",
        { "cursor-pointer": wordsCount }
      )}
    >
      <h3 className="mb-1 text-2xl font-bold">{wordsCount}</h3>
      <h5 className="text-md capitalize text-neutral-300">{title}</h5>
    </div>
  );
};

export default StageCard;
