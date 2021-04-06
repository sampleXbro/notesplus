import {Modal} from "../../componenets/Modal/Modal"
import {Input} from "../../componenets/Input/Input"
import {Title} from "../../componenets/Title/Title"
import {bool, func, object, array} from "prop-types"
import {Select} from "../../componenets/Select/Select"
import {Option} from "../../componenets/Select/Option"

export const ModalAddEditCategory = ({isVisible, onClose, onSubmit, onInputsChange, category, categories}) => (
    <Modal
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={onSubmit}
    >
        <Title margin={'5px'}>
            Parent:
            <Select
                name={'parent'}
                onChange={onInputsChange}
                value={category.parent}
            >
                <Option value={''} disabled>----- NO CATEGORY -----</Option>

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
        </Title>

        <Title margin={'5px'}>
            Title:
            <Input
                value={category.title}
                name={'title'}
                onChange={onInputsChange}
                holder={'Category title'}
            />
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