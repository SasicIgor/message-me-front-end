import { createFormHook } from "@tanstack/react-form";
import TextField from "./TextField";
import SubscribeButton from "./SubscribeButton";
import { fieldContext, formContext } from "./formContext";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubscribeButton },
});
export default useAppForm;
