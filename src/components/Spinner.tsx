import clsx from "clsx";

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <span
      className={clsx(
        className,
        "block h-6 w-6 animate-spin rounded-full border-4 border-transparent border-t-white"
      )}
    />
  );
};

export default Spinner;
