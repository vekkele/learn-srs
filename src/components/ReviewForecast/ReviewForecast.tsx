import clsx from "clsx";
import { DateTime } from "luxon";
import { useTranslation } from "next-i18next";
import type { RouterOutputs } from "../../utils/api";
import { weekdayNamesToNums, weekdayNumsToNames } from "../../utils/forecast";
import DayForecast from "./DayForecast";

interface ReviewForecastProps {
  forecast: RouterOutputs["learn"]["getReviewForecast"];
}

const ReviewForecast = ({ forecast }: ReviewForecastProps) => {
  const { t } = useTranslation("dashboard");
  const currentWeekday = DateTime.now().weekday;
  const weekNums = Object.values(weekdayNamesToNums);
  const todayIndex = weekNums.indexOf(currentWeekday);
  const weekFromToday = [
    ...weekNums.slice(todayIndex),
    ...weekNums.slice(0, todayIndex),
  ];

  return (
    <section
      className={clsx(
        "mx-[5%] min-w-max max-w-[90%] grow self-stretch rounded-md bg-slate-200 px-5 py-3",
        "sm:mx-[10%] sm:max-w-[80%]",
        "md:ml-12 md:mr-0 md:max-w-md md:grow md:self-auto",
        "dark:bg-slate-800"
      )}
    >
      <h2 className="text-2xl font-bold">{t("forecast.title")}</h2>
      <div className="flex flex-col gap-2">
        {weekFromToday.map((weekday) => {
          return (
            <DayForecast
              key={weekday}
              forecast={forecast[weekdayNumsToNames[weekday]]}
              weekday={weekday}
              currentWeekday={currentWeekday}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ReviewForecast;
