import swapKeysValues from "./swapKeysValues";

export type Forecast = Partial<Record<WeekdayName, HourForecast[]>>;
export interface HourForecast {
  time: Date;
  newReviews: number;
  cumulativeReviews: number;
}
export type WeekdayName =
  (typeof weekdayNumsToNames)[keyof typeof weekdayNumsToNames];

export const weekdayNumsToNames = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday",
} as const;

export const weekdayNamesToNums = swapKeysValues(weekdayNumsToNames);

const getDayLastCumulativeReviews = (dayForecast: HourForecast[]) => {
  return dayForecast[dayForecast.length - 1]?.cumulativeReviews;
};

export const getLastCumulativeReviews = (
  forecast: Forecast,
  weekdayName: WeekdayName
) => {
  const currentDayForecast = forecast[weekdayName] ?? [];
  const forecastDays = Object.values(forecast);
  const prevDayForecast = forecastDays[forecastDays.length - 1] ?? [];

  return (
    getDayLastCumulativeReviews(currentDayForecast) ??
    getDayLastCumulativeReviews(prevDayForecast) ??
    0
  );
};
