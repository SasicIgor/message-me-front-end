import { useState } from "react";
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
  //keep state of user typing on the input
  //dont show error message if true
  const [isTyping, setIsTyping] = useState(false);
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel className="capitalize">{label}</FieldLabel>
      <Input
        type={type}
        value={field.state.value}
        onBlur={() => {
          field.handleBlur();
          setIsTyping(false);
        }}
        onChange={(e) => {
          field.handleChange(e.target.value);
          setIsTyping(true);
        }}
      />

      {field.state.meta.isBlurred && !field.state.meta.isValid && !isTyping ? (
        <FieldError errors={field.state.meta.errors} />
      ) : null}
    </Field>
  );
};

export default TextField;
