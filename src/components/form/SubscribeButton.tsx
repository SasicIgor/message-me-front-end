import { Button } from "../ui/button";
import { useFormContext } from "./formContext";

const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [
        state.isSubmitting,
        state.canSubmit,
        state.isFormValidating,
      ]}
    >
      {([isSubmitting, canSubmit, isFormValidating]) => (
        <Button
          type="submit"
          disabled={
            //button is disabled if the from submitting, if its invalid or if user didnt
            //interact with form yet
            isSubmitting || !canSubmit || isFormValidating === undefined
          }
          className="w-full cursor-pointer"
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
};

export default SubscribeButton;
