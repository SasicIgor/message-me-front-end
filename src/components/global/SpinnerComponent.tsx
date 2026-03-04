import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

const SpinnerComponent = ({ className = "" }) => {
  return (
    <div
      className={cn(
        `h-dvh w-full flex justify-center items-center flex-col m-auto ${className}`,
      )}
    >
      <Spinner className="size-10" />
      <h2>Loading...</h2>
    </div>
  );
};

export default SpinnerComponent;
