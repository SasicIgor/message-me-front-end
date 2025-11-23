import { Input as Inp } from "../ui/input";

type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
};

const Input = ({ name, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className="capitalize">
        {name !== "confirmedPassword" ? name : name.split("P").join(" P")}
      </label>
      <Inp name={name} {...props} />
    </div>
  );
};

export default Input;
