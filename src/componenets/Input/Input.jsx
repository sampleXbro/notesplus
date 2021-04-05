import './Input.module.sass'
import {func, string} from 'prop-types'

export const Input = ({onChange, value, holder, name, type}) => (
    <input
        name={name}
        type={type || 'text'}
        title={'input text'}
        onChange={onChange}
        value={value}
        placeholder={holder}
    />
)


Input.propTypes = {
    onChange: func,
    value: string,
    holder: string,
    name: string,
    type: string,
}