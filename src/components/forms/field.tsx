import CustomError from "@/types/interfaces/custom-error";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FieldProps {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  errors: CustomError[];
  required?: boolean;
}

const Field = (props: FieldProps) => {
  const { label, placeholder, name, errors } = props;
  const type = props.type ?? "text";
  const required = props.required ?? false;

  const baseStyle = "focus:outline-none";

  const style = errors.find((item) => item.type === name)
    ? baseStyle + " border-destructive"
    : baseStyle;

  return (
    <div className="w-full flex flex-col gap-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        className={style}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Field;
