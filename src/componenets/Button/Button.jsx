import {string, func} from 'prop-types'

export const Button = ({children, radius, width, height, color, textColor, textSize, align, onClick, name}) => {

    const styles = {
        borderRadius: radius || '',
        alignSelf: align || 'flex-end',
        width: width,
        height: height,
        backgroundColor: color || '#00BCD4',
        border: 'none',
        outline: 'none',
        color: textColor || 'white',
        fontSize: textSize || '18px',
        margin: '5px',
        cursor: 'pointer'
    }

    return (
        <button style={styles} onClick={onClick} name={name}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: string,
    radius: string,
    width: string,
    height: string,
    color: string,
    textColor: string,
    textSize: string,
    align: string,
    onClick: func,
    name: string
}
