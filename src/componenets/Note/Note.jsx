import moment from "moment"
import {Title} from "../Title/Title"
import {Label} from "../Label/Label"
import styles from './Note.module.sass'
import {ColoredLine} from "../ColoredLine/ColoredLine"
import editIcon from '../../images/note-edit-outline.png'
import deleteIcon from '../../images/trash-can-outline.png'
import {func, string, number, object, array, oneOfType} from "prop-types"

export const Note = (props) => {

    const {id, title, data, description, catIds, labelsIds, createdAt, onEditClick, onDeleteClick, color} = props

    const categoriesSnapshot = data && data.categories
    const labelsSnapshot = data && data.labels

    const noteCategories = categoriesSnapshot && catIds && categoriesSnapshot.filter(cat => catIds.includes(cat.id))
    const noteLabels = labelsSnapshot && labelsIds && labelsSnapshot.filter(label => labelsIds.includes(label.id))

    const dynStyle ={
        border: color && `${color} 1px solid`,
        boxShadow: color && `0 0 7px 0 ${color}`
    }

    return (
        <div className={styles.noteContainer} style={dynStyle}>
            <div className={styles.noteTitleContainer}>
                <Title size={'18px'} width={500}>
                    {title}
                </Title>
                <Title size={'12px'} fontStyle={'italic'}>
                    {moment(createdAt).format('MMMM Do YYYY HH:mm')}
                </Title>
            </div>

            <ColoredLine/>

            <Title size={'14px'} margin={'5px 0'}>
                {description}
            </Title>

            {noteCategories &&
            <Title fontStyle={'italic'} margin={'10px 0'}>
                Categories: {noteCategories.map(cat => cat.title).join(', ').toUpperCase() || 'no category'}
            </Title>
            }

            {noteLabels &&
            <div className={styles.labelsContainer}>
                {noteLabels && noteLabels.map(label =>
                    <Label key={label.id} color={label.color}>
                        {label.title}
                    </Label>
                )}
            </div>
            }

            <div className={styles.iconsContainer}>
                <img
                    data-id={id}
                    className={styles.icon}
                    src={editIcon}
                    alt="edit"
                    title="edit icon"
                    name={'edit'}
                    onClick={onEditClick}
                />

                <img
                    data-id={id}
                    className={styles.icon}
                    src={deleteIcon}
                    alt="delete"
                    title="delete icon"
                    name={'delete'}
                    onClick={onDeleteClick}
                />
            </div>

        </div>
    )
}

Note.propTypes = {
    id: oneOfType([string, number]),
    title: string,
    data: object,
    description: string,
    catIds: array,
    labelsIds: array,
    createdAt: oneOfType([string, number]),
    onEditClick: func,
    onDeleteClick: func,
    onLabelClick: func,
    color: string
}