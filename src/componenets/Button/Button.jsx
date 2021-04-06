import {string, func} from 'prop-types'
import './Button.module.sass'

export const Button = ({children, radius, width, height, color, textColor, textSize, align, onClick, name, disabled}) => {

    const styles = {
        borderRadius: radius || '',
        alignSelf: align || 'flex-end',
        width: width,
        height: height,
        backgroundColor: color || '#00BCD4',
        color: textColor || 'white',
        fontSize: textSize || '18px',
    }

    return (
        <button style={styles} onClick={onClick} name={name} disabled={disabled}>
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
