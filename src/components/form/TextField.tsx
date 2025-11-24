import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./formContext";

const TextField = ({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) => {
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel className="capitalize">{label}</FieldLabel>
      <Input
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      ></Input>
      <FieldError />
    </Field>
  );
};

export default TextField;
