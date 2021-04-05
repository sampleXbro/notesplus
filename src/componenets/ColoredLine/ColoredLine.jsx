import {string} from 'prop-types'

export const ColoredLine = ({ color }) => (
    <hr
        style={{
            display: "flex",
            width: '100%',
            color: color || '#BDBDBD',
            backgroundColor: color || '#BDBDBD',
            opacity: '.3',
            margin: '5px 0',

        }}
    />
);

ColoredLine.propTypes = {
    color: string
}
