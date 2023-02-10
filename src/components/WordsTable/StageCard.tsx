import clsx from "clsx";
import { useTranslation } from "next-i18next";
import type { StageTitle } from "../../utils/stage";

interface StageCardProps {
  title: StageTitle;
  wordsCount: number;
  color: string;
  onClick: VoidFunction;
}

const StageCard = ({ title, color, wordsCount, onClick }: StageCardProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={clsx(
        "flex select-none flex-col items-center rounded-lg py-4 px-10 text-white",
        { "cursor-pointer": wordsCount }
      )}
    >
      <h3 className="mb-1 text-2xl font-bold">{wordsCount}</h3>
      <h4 className="text-md capitalize">{t(`stages.${title}`)}</h4>
    </button>
  );
};

export default StageCard;
