import {number, oneOfType, string, bool} from "prop-types"

export const Option = ({children, value, color, disabled, selected}) => {

    const styles = {
        height: '30px',
        color: color,
        fontWeight: 500
    }

    return (
        <option value={value} style={styles} disabled={disabled} selected={selected}>{children}</option>
    )
}

Option.propTypes = {
    children: oneOfType([string, number]),
    value: string,
    color: string,
    disabled: oneOfType([string, bool]),
    selected: oneOfType([string, number]),
}