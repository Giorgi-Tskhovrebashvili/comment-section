import { InputType } from "../../../types";


const Input = ({type, placeholder, value, onChange, className}: InputType) => {
  return <input className={className} type={type} placeholder={placeholder} value={value} onChange={onChange}/>;
}

export default Input
