import './Select.module.sass'
import {any, bool, number, oneOfType, string, func} from "prop-types"

export const Select = ({children, name, value, onChange, defaultVal, multiple, height}) => {

    const styles = {
        color: name === 'color' ? value : '',
        height: height || '25px'
    }

    return (
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            style={styles}
            defaultValue={defaultVal}
            multiple={multiple}
        >
            {children}
        </select>
    )
}

Select.propTypes = {
    children: any,
    onChange: func,
    height: string,
    name: oneOfType([string, number]),
    value: oneOfType([string, number]),
    defaultVal: any,
    multiple: oneOfType([string, bool]),
}
