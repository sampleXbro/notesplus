import {Modal} from "../../componenets/Modal/Modal"
import {Input} from "../../componenets/Input/Input"
import {Title} from "../../componenets/Title/Title"
import {bool, func, object, array} from "prop-types"
import {Select} from "../../componenets/Select/Select"
import {Option} from "../../componenets/Select/Option"

export const ModalAddEditCategory = ({isVisible, onClose, onSubmit, onInputsChange, category, categories, isDisabledSubmit}) => (
    <Modal
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={onSubmit}
        isDisabledSubmit={isDisabledSubmit}
    >
        <Title margin={'5px 0'}>
            Parent:
        </Title>

        <Select
            name={'parent'}
            onChange={onInputsChange}
            value={category.parent}
        >
            <Option value={''}>----- NO CATEGORY -----</Option>

            {categories && categories.map(cat => {
                    if (category.id === cat.id) return null
                    return (
                        <Option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.title.toUpperCase()}
                        </Option>
                    )
                }
            )}
        </Select>

        <Title margin={'5px'}>
            Title: *
        </Title>

        <Input
            value={category.title}
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
    category: object,
    categories: array
}

ModalAddEditCategory.defaultProps = {
    isVisible: false,
    onClose: () => {},
    onSubmit: () => {},
    onInputsChange: () => {},
    category: {},
    categories: [],
}