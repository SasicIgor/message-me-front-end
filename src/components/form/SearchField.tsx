import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./formContext";

const SearchField = ({ placeholder }: { placeholder: string }) => {
  //keep state of user typing on the input
  //dont show error message if true
  const field = useFieldContext<string>();
  return (
    <Field>
      <Input
        value={field.state.value}
        placeholder={placeholder}
        onBlur={() => {
          field.handleBlur();
        }}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
      />
      {!field.state.meta.isBlurred && 
        !field.state.meta.isValid &&
        !field.state.meta.isDefaultValue && (
          <FieldError errors={field.state.meta.errors} />
        )}
    </Field>
  );
};

export default SearchField;
