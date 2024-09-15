import { cn } from "../../../shared/cn";
import { Spinner } from "../spinner";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  className?: string;
  isSubmitting?: boolean;
  buttonText?: string;
  disabled?: boolean;
}

export const Button = ({
  type,
  className,
  isSubmitting,
  buttonText,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200",
        className
      )}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? <Spinner /> : buttonText}
    </button>
  );
};
