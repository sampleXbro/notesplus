import React, {useState} from "react"
import {colors} from '../../utils/colors'
import firebase from "../../firebase/config"
import {Note} from "../../componenets/Note/Note"
import {Input} from "../../componenets/Input/Input"
import {Title} from "../../componenets/Title/Title"
import {Modal} from "../../componenets/Modal/Modal"
import {Button} from "../../componenets/Button/Button"
import {Loader} from "../../componenets/Loader/Loader"
import {Option} from "../../componenets/Select/Option"
import {Select} from "../../componenets/Select/Select"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {TextArea} from "../../componenets/TextArea/TextArea"
import {Container} from "../../componenets/Container/Container"

const initNote = {
    title: '',
    description: '',
    categories: [],
    labels: [],
    color: '',
    createdAt: {},
}

export const Notes = () => {
    const [modalMode, setModalMode] = useState('')
    const [note, setNote] = useState(initNote)
    const [snapshot, isLoading] = useSnapshot()

    const notesSnapshot = snapshot.notes
    const categoriesSnapshot = snapshot.categories
    const labelsSnapshot = snapshot.labels

    const ref = firebase.database().ref('notes')

    const handleInputs = (e) => { //combined inputs handler
        const name = e.target.name
        if(name === 'categories' || name === 'labels') {
            const selected = Array.from(e.target.selectedOptions, option => option.value)
            return setNote({...note, [name]: selected})
        }
        setNote({...note, [name]: e.target.value,})
    }

    const handleClick = (e) => { //combined clicks handler
        const name = e.target.name
        const id = e.target.dataset.id

        switch (name) {
            case 'add':
                setNote(initNote)
                setModalMode('add')
                break

            case 'edit':
                const curNote = notesSnapshot.find(n => n.id === id)
                setNote(curNote)
                setModalMode('edit')
                break

            case 'delete':
                ref.child(id).remove()
                break

            default: return
        }
    }

    const handleSubmit = () => { // submit button handler changes depends on modal mode
        if(modalMode === 'add'){
            ref.push({...note, createdAt: Date.now()})
                .then(() => {
                    setModalMode('')
                })
        }
        if(modalMode === 'edit') {
            const id = note.id
            ref.child(id).update(note)
                .then(() => {
                    setModalMode('')
                })
        }
    }

    if(isLoading) return <Loader/>

    return (
        <Container padding={'5px'}>

            <Modal
                isVisible={!!modalMode}
                onClose={() => setModalMode('')}
                onSubmit={handleSubmit}
            >
                <Title size={'16px'} margin={'5px'}>
                    Title:
                    <Input
                        name={'title'}
                        holder={'Note title'}
                        value={note.title}
                        onChange={handleInputs}
                    />
                </Title>
                <Title margin={'5px'}>
                    Description:
                    <TextArea
                        name={'description'}
                        holder={'Note description'}
                        value={note.description}
                        onChange={handleInputs}
                    />
                </Title>

                <Title margin={'5px'}>
                    Color:
                    <Select
                        name={'color'}
                        onChange={handleInputs}
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
                </Title>

                <Title margin={'5px'}>
                    Categories:
                    <Select
                        name={'categories'}
                        onChange={handleInputs}
                        defaultVal={note.categories}
                        multiple
                        height={'100px'}
                    >
                        {categoriesSnapshot && categoriesSnapshot.map(category => (
                            <Option
                                key={category.id}
                                value={category.id}
                            >
                                {category.title.toUpperCase()}
                            </Option>
                        ))}

                    </Select>
                </Title>

                <Title margin={'5px'}>
                    Labels:
                    <Select
                        name={'labels'}
                        onChange={handleInputs}
                        defaultVal={note.labels}
                        multiple
                        height={'100px'}
                    >
                        {labelsSnapshot && labelsSnapshot.map(label => (
                            <Option
                                key={label.id}
                                value={label.id}
                                color={label.color}
                            >
                                {label.title.toUpperCase()}
                            </Option>
                        ))}

                    </Select>
                </Title>
            </Modal>

            <Button
                width={'150px'}
                height={'30px'}
                radius={'7px'}
                textSize={'16px'}
                onClick={handleClick}
                name={'add'}
            >
                ADD NOTE
            </Button>

            {!notesSnapshot && <Title size={'16px'} margin={'10px auto'}>
                There are no notes here yet. Let's create the first one!
            </Title>}

            {notesSnapshot && notesSnapshot.map(note => (
                <Note
                    key={note.id}
                    onEditClick={handleClick}
                    onDeleteClick={handleClick}
                    id={note.id}
                    title={note.title}
                    description={note.description}
                    color={note.color}
                    catIds={note.categories}
                    labelsIds={note.labels}
                    createdAt={note.createdAt}
                    data={snapshot}
                />))}

        </Container>
    )
}
