import './TextArea.module.sass'
import {func, number, oneOfType, string} from "prop-types"

export const TextArea = ({value, onChange, name, holder}) => (

    <textarea value={value} onChange={onChange} name={name} placeholder={holder}/>
)

TextArea.propTypes = {
    value: oneOfType([string, number]),
    name: string,
    onChange: func,
    holder: oneOfType([string, number]),
}