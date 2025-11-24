import { Button } from "../ui/button";
import { useFormContext } from "./formContext";

const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
};

export default SubscribeButton;
