import clsx from "clsx";
import type { WeekNumbers } from "luxon";
import { DateTime } from "luxon";
import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import type { HourForecast } from "../../utils/forecast";

type DayForecastProps = {
  weekday: WeekNumbers;
  currentWeekday: WeekNumbers;
  forecast: HourForecast[] | undefined;
};

const DayForecast = ({
  weekday,
  currentWeekday,
  forecast,
}: DayForecastProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("dashboard");
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const hasForecast = forecast && forecast.length;

  const formattedWeekday = useMemo(() => {
    if (weekday === currentWeekday) return t("forecast.today");

    const weekdayDate = DateTime.fromObject({ weekday })
      .setLocale(language)
      .toLocaleString({
        weekday: "long",
      });

    return weekdayDate;
  }, [currentWeekday, language, t, weekday]);

  return (
    <article className="rounded-md bg-slate-700 px-4 py-2">
      <button
        disabled={!hasForecast}
        onClick={toggle}
        className={clsx("text-lg capitalize", !hasForecast && "opacity-60")}
      >
        <span>{formattedWeekday}</span>
      </button>
      {open && hasForecast && (
        <div className="mt-1 border-t border-neutral-600">
          {forecast.map((hour) => {
            const time = hour.time.toLocaleTimeString(language, {
              timeStyle: "short",
            });

            return (
              <div key={time} className="flex pt-2">
                <span>{time}</span>
                <span className="grow"></span>
                <span className="mr-2 border-r border-neutral-600 pr-2">
                  <span className="text-neutral-500">+</span>
                  {hour.newReviews}
                </span>
                <span className="w-8">{hour.cumulativeReviews}</span>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default DayForecast;
