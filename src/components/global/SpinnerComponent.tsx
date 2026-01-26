import { Spinner } from "../ui/spinner";

const SpinnerComponent = () => {
  return (
    <div className="h-dvh w-full flex justify-center items-center flex-col m-auto">
      <Spinner className="size-10" />
      <h2>Loading...</h2>
    </div>
  );
};

export default SpinnerComponent;
