import { Input as Inp } from "../ui/input";

type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
};

const Input = ({ name, ...props }: InputProps) => {
  return (
    <div className="p-2 m-1">
      <label htmlFor={name} className="capitalize inline-block pb-1" >
        {name !== "confirmPassword" ? name : name.split("P").join(" P")}
      </label>
      <Inp name={name} {...props} className="p-4"/>
    </div>
  );
};

export default Input;
