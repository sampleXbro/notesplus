import React, {useState} from "react"
import firebase from "../../firebase/config"
import {Note} from "../../componenets/Note/Note"
import {Title} from "../../componenets/Title/Title"
import {Button} from "../../componenets/Button/Button"
import {Loader} from "../../componenets/Loader/Loader"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {Container} from "../../componenets/Container/Container"
import {ModalEditAddNote} from "./ModalEditAddNote";

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

            <ModalEditAddNote
                onSubmit={handleSubmit}
                onClose={() => setModalMode('')}
                isVisible={!!modalMode}
                labels={labelsSnapshot}
                categories={categoriesSnapshot}
                note={note}
                onChangeInputs={handleInputs}
                isDisabledSubmit={!note.title || !note.description}
            />

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

            {
                notesSnapshot ? notesSnapshot.map(note => (
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
                    />)).reverse()

                    :

                    <Title size={'16px'} margin={'10px auto'} align={'center'}>
                    There are no notes here yet. Let's create the first one!
                    </Title>
            }

        </Container>
    )
}
