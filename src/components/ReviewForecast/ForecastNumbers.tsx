import clsx from "clsx";

type ForecastNumbers = {
  newReviews: number;
  cumulativeReviews: number;
  hasSpacing?: boolean;
};

const ForecastNumbers = ({
  newReviews,
  cumulativeReviews,
  hasSpacing = false,
}: ForecastNumbers) => {
  return (
    <span className="flex items-stretch text-base">
      <span
        className={clsx(
          "mr-2 border-r border-neutral-600 pr-2",
          hasSpacing && "py-1"
        )}
      >
        <span className="text-neutral-500">+</span>
        {newReviews}
      </span>
      <span className="inline-flex w-8 items-center">{cumulativeReviews}</span>
    </span>
  );
};

export default ForecastNumbers;
