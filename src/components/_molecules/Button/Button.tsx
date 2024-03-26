import { ButtonType } from "../../../types"

const Button = ({onClick, content, className}: ButtonType) => {
    return <button className={className} onClick={onClick}>{content}</button>
}

export default Button
