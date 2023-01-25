export const computeNextLearn = (hoursToNextStage: number) => {
  const nextLearn = new Date(Date.now() + hoursToNextStage * 60 * 60 * 1000);
  nextLearn.setMinutes(0, 0, 0);

  return nextLearn;
}

export const getNextStage = (currentStage: number, incorrectAnswers: number) => {
  if (incorrectAnswers === 0) return currentStage + 1;

  const incorrectAdjustmentCount = Math.ceil(incorrectAnswers / 2);
  const srsPenaltyFactor = currentStage >= 5 ? 2 : 1;

  return Math.max(1, currentStage - incorrectAdjustmentCount * srsPenaltyFactor);
}