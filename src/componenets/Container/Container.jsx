import {any, string} from 'prop-types'
import styles from './Container.module.sass'

export const Container = ({children, padding, margin, justify, align, direction}) => {

    const style = {
        padding,
        margin,
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction || 'column'

    }

    return (
        <div className={styles.container} style={style}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: any,
    padding: string,
    margin: string,
    justify: string,
    align: string,
    direction: string
}