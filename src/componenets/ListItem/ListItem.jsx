import {Title} from "../Title/Title"
import styles from "./ListItem.module.sass"
import {any, func, string} from "prop-types"
import editIcon from "../../images/note-edit-outline.png"
import deleteIcon from "../../images/trash-can-outline.png"

export const ListItem = (props) => {

    const {title, children, color, itemId, onEditClick, onDeleteClick, deletable = true, border, description} = props

    const style ={
        backgroundColor: color,
        border: border &&'2px solid #00BCD4'
    }

    return (
        <div>
            <div className={styles.listItemContainer} style={style}>
                <Title size={'18px'}>
                    {title}
                    <Title margin={'3px 0 0 0'}>
                        {description}
                    </Title>
                </Title>

                <div className={styles.iconsContainer}>
                    <img
                        className={styles.icon}
                        src={editIcon}
                        alt="edit"
                        name="edit"
                        title="Edit"
                        data-id={itemId}
                        onClick={onEditClick}
                    />
                    {deletable &&
                        <img
                            className={styles.icon}
                            src={deleteIcon}
                            alt="delete"
                            name="delete"
                            title="Delete"
                            data-id={itemId}
                            onClick={onDeleteClick}
                        />
                    }

                </div>

            </div>
            <div className={styles.childItem}>
                {children}
            </div>
        </div>
    )
}

ListItem.propTypes = {
    title: string,
    children: any,
    color: string,
    itemId: string,
    onEditClick: func,
    onDeleteClick: func,
}