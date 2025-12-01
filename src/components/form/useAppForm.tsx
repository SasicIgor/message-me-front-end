import { createFormHook } from "@tanstack/react-form";
import TextField from "./TextField";
import SubscribeButton from "./SubscribeButton";
import { fieldContext, formContext } from "./formContext";
import SearchField from "./SearchField";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, SearchField },
  formComponents: { SubscribeButton },
});
export default useAppForm;
