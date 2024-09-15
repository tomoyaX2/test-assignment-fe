import { cn } from "@shared/cn";
import { ErrorMessage, Field } from "formik";

interface SelectProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  options: { label: string; value: any }[];
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const Select = ({
  label,
  className,
  containerClassName,
  options,
  isRequired,
  labelClassName,
  name,
}: SelectProps) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={name} className={cn("block", labelClassName)}>
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <Field
        as="select"
        name={name}
        className={cn(
          "w-full px-4 py-2 border rounded-md bg-gray-700",
          className
        )}
      >
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};
