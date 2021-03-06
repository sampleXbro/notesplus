import {colors} from "../../utils/colors"
import {bool, func, object} from "prop-types";
import {Input} from "../../componenets/Input/Input"
import {Title} from "../../componenets/Title/Title"
import {Modal} from "../../componenets/Modal/Modal"
import {Select} from "../../componenets/Select/Select"
import {Option} from "../../componenets/Select/Option"
import {ModalAddEditCategory} from "../Categories/ModalAddEditCategory";

export const ModalAddEditLabel = ({isVisible, onClose, onSubmit, onInputsChange, label, isDisabledSubmit}) => (
    <Modal
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={onSubmit}
        isDisabledSubmit={isDisabledSubmit}
    >
        <Title margin={'5px 0'}>
            Color: *
        </Title>

        <Select
            name={'color'}
            onChange={onInputsChange}
            value={label.color}
        >
            <Option value={''}>----- Select color -----</Option>
            {colors.map(color => (
                <Option
                    key={color.title}
                    value={color.hex}
                    color={color.hex}
                >
                    {color.title.toUpperCase()}
                </Option>
            ))}

        </Select>

        <Title margin={'5px 0'}>
            Title: *
        </Title>
            <Input
                value={label.title}
                name={'title'}
                onChange={onInputsChange}
                holder={'Category title'}
            />


        <Title margin={'5px'} color={'#e74c3c'}>
            * - Required
        </Title>
    </Modal>
)

ModalAddEditCategory.propTypes = {
    isVisible: bool,
    onClose: func,
    onSubmit: func,
    onInputsChange: func,
    label: object,
}

ModalAddEditCategory.defaultProps = {
    isVisible: false,
    onClose: () => {},
    onSubmit: () => {},
    onInputsChange: () => {},
    label: {},
}