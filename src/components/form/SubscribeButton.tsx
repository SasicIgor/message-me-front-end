import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormContext } from "./formContext";
import { ClipLoader } from "react-spinners";

const SubscribeButton = ({
  label,
  className,
}: {
  label: string | React.ReactNode;
  className?: string;
}) => {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [
        state.isSubmitting,
        state.canSubmit,
        state.isFormValidating,
        state.isDefaultValue,
      ]}
    >
      {([isSubmitting, canSubmit, isFormValidating, isDefaultValue]) => (
        <Button
          type="submit"
          disabled={
            //button is disabled if the from submitting, if its invalid or if user didnt
            //interact with form yet
            isSubmitting ||
            !canSubmit ||
            isFormValidating === undefined ||
            isDefaultValue
          }
          className={cn(
            "w-full bg-brand-blue-default",
            "enabled:cursor-pointer disabled:cursor-not-allowed",
            className,
          )}
        >
          {isSubmitting ? (
            <>
              <ClipLoader color="brand-blue-light" />
            </>
          ) : (
            label
          )}
        </Button>
      )}
    </form.Subscribe>
  );
};

export default SubscribeButton;
