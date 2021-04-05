import {number, any, func, string, oneOfType} from "prop-types"

export const Title = ({children, size, color, width, margin, cursor, onClick, fontStyle}) => {

    const styles = {
        fontSize: size || '12px',
        color: color || '#212121',
        margin: margin || 0,
        cursor: cursor || '',
        fontWeight: width || 400,
        fontStyle: fontStyle || ''
    }

    return (
        <div style={styles} onClick={onClick}>
            {children}
        </div>
    )
}

Title.propTypes = {
    children: any,
    size: string,
    color: string,
    width: oneOfType([number, string]),
    margin: string,
    cursor: string,
    onClick: func,
    fontStyle: string,
}
