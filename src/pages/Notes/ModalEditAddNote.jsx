import {colors} from "../../utils/colors"
import {Input} from "../../componenets/Input/Input"
import {Title} from "../../componenets/Title/Title"
import {Modal} from "../../componenets/Modal/Modal"
import {bool, func, object, array} from 'prop-types'
import {Option} from "../../componenets/Select/Option"
import {Select} from "../../componenets/Select/Select"
import {TextArea} from "../../componenets/TextArea/TextArea"

export const ModalEditAddNote = ({isVisible, onClose, note, onSubmit, onChangeInputs, categories, labels, isDisabledSubmit}) => (
    <Modal
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={onSubmit}
        isDisabledSubmit={isDisabledSubmit}
    >
        <Title margin={'5px 0'}>
            Title: *
        </Title>

        <Input
            name={'title'}
            holder={'Note title'}
            value={note.title}
            onChange={onChangeInputs}
        />

        <Title margin={'5px 0'}>
            Description: *
        </Title>

        <TextArea
            name={'description'}
            holder={'Note description'}
            value={note.description}
            onChange={onChangeInputs}
        />

        <Title margin={'5px 0'}>
            Color:
        </Title>
        <Select
            name={'color'}
            onChange={onChangeInputs}
            value={note.color}
        >
            <Option>----- Select color -----</Option>
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
            Categories:
        </Title>
        <Select
            name={'categories'}
            onChange={onChangeInputs}
            defaultVal={note.categories}
            multiple
            height={'100px'}
        >
            {categories.map(category => (
                <Option
                    key={category.id}
                    value={category.id}
                >
                    {category.title.toUpperCase()}
                </Option>
            ))}

        </Select>

        <Title margin={'5px 0'}>
            Labels:
        </Title>
        <Select
            name={'labels'}
            onChange={onChangeInputs}
            defaultVal={note.labels}
            multiple
            height={'100px'}
        >
            {labels.map(label => (
                <Option
                    key={label.id}
                    value={label.id}
                    color={label.color}
                >
                    {label.title.toUpperCase()}
                </Option>
            ))}

        </Select>

        <Title margin={'5px'} color={'#e74c3c'}>
            * - Required
        </Title>
    </Modal>
)

ModalEditAddNote.propTypes = {
    isVisible: bool,
    onClose: func,
    note: object,
    onSubmit: func,
    onChangeInputs: func,
    categories: array,
    labels: array,
    isDisabledSubmit: bool
}

ModalEditAddNote.defaultProps = {
    isVisible: false,
    onClose: () => {},
    note: {},
    onSubmit: () => {},
    onChangeInputs: () => {},
    categories: [],
    labels: [],
    isDisabledSubmit: true
}
