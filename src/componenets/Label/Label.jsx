import {any, func, string} from "prop-types";

export const Label = ({children, color, radius, fontSize, labelId, noteId}) => {

    const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: radius || '5px',
        fontSize: fontSize || '10px',
        textTransform: 'uppercase',
        padding: '5px',
        fontWeight: 500,
        width: 'fit-content',
        color: 'white',
        margin: '0 5px 5px 0',
    }

    return (
        <div style={styles} data-labelid={labelId} data-noteid={noteId}>
            {children}
        </div>
    )
}

Label.propTypes = {
    children: any,
    color: string,
    radius: string,
    fontSize: string,
    onClick: func,
    labelId: string,
    noteId: string,
}