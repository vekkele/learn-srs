import colors from "tailwindcss/colors";

export const computeNextLearn = (hoursToNextStage: number) => {
  const nextLearn = new Date(Date.now() + hoursToNextStage * 60 * 60 * 1000);
  nextLearn.setMinutes(0, 0, 0);

  return nextLearn;
};

export const getNextStage = (
  currentStage: number,
  incorrectAnswers: number
) => {
  if (incorrectAnswers === 0) return currentStage + 1;

  const incorrectAdjustmentCount = Math.ceil(incorrectAnswers / 2);
  const srsPenaltyFactor = currentStage >= 5 ? 2 : 1;

  return Math.max(
    1,
    currentStage - incorrectAdjustmentCount * srsPenaltyFactor
  );
};

export function getStageFromLevel(level: number) {
  const stage = stages.find(
    (stage) => level >= stage.minLevel && level <= stage.maxLevel
  )?.title;

  if (!stage) {
    console.error(`no stage exists for level ${level}`);
    return stages[0].title;
  }

  return stage;
}

export const stages = [
  { title: "apprentice", minLevel: 1, maxLevel: 4, color: colors.pink[600] },
  { title: "guru", minLevel: 5, maxLevel: 6, color: colors.purple[600] },
  { title: "master", minLevel: 7, maxLevel: 7, color: colors.blue[600] },
  { title: "enlightened", minLevel: 8, maxLevel: 8, color: colors.sky[600] },
  { title: "burned", minLevel: 9, maxLevel: 9, color: colors.stone[600] },
] as const;

export const stageMap = new Map(stages.map((stage) => [stage.title, stage]));

export type StageData = (typeof stages)[number];
export type StageTitle = StageData["title"];
