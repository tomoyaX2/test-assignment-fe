import { ErrorMessage, Field } from "formik";
import { cn } from "../../../shared/cn";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errorMessageClassName?: string;
  label: string;
  labelClassName?: string;
  isRequired?: boolean;
  containerClassName?: string;
  autoComplete?: string;
  value?: string;
}

export const Input = ({
  name,
  type,
  placeholder,
  className,
  errorMessageClassName,
  label,
  labelClassName,
  isRequired,
  containerClassName,
  autoComplete,
}: InputProps) => {
  return (
    <div className={containerClassName}>
      <label
        htmlFor="link"
        className={cn("text-gray-400 mb-2 block", labelClassName)}
      >
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <Field
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(
          "w-full p-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600",
          className
        )}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={cn("text-red-500 text-sm mt-1", errorMessageClassName)}
      />
    </div>
  );
};
