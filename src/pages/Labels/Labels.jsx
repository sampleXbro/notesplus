import React, {useState} from "react"
import firebase from "../../firebase/config"
import {Button} from "../../componenets/Button/Button"
import {Loader} from "../../componenets/Loader/Loader"
import {ModalAddEditLabel} from "./ModalAddEditLabel"
import {ListItem} from "../../componenets/ListItem/ListItem"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {Container} from "../../componenets/Container/Container"
import {Title} from "../../componenets/Title/Title";

const initLabel = {
    color: '',
    title: ''
}

export const Labels = () => {
    const [modalMode, setModalMode] = useState('')
    const [label, setLabel] = useState(initLabel)
    const [snapshot, isLoading] = useSnapshot()

    const ref = firebase.database().ref('labels')
    const labelsSnapshot = snapshot.labels

    const handleClicks = (e) => { //combined clicks handler
        const name = e.target.name
        const id = e.target.dataset.id

        switch (name) {
            case 'add':
                setLabel(initLabel)
                setModalMode(name)
                break
            case 'edit':
                const curCat = labelsSnapshot.find(c => c.id === id)
                setLabel(curCat)
                setModalMode('edit')
                break
            case 'delete':
                ref.child(id).remove()
                break
            default: return
        }
    }

    const handleInputs = (e) => { //combined inputs handler
        const name = e.target.name
        const value = e.target.value
        setLabel({...label, [name]: value})
    }

    const handleSubmit = () => {
        if(modalMode === 'add'){
            ref.push(label)
                .then(() => {
                    setModalMode('')
                })
        }
        if(modalMode === 'edit') {
            const id = label.id
            ref.child(id).update(label)
                .then(() => {
                    setModalMode('')
                })
        }
    }

    if(isLoading) return <Loader/>

    return (
        <Container padding={'5px'}>

            <ModalAddEditLabel
                onInputsChange={handleInputs}
                onSubmit={handleSubmit}
                onClose={() => setModalMode('')}
                isVisible={!!modalMode}
                label={label}
                isDisabledSubmit={!label.title || !label.color}
            />

            <Button
                name={'add'}
                width={'150px'}
                height={'30px'}
                radius={'7px'}
                textSize={'16px'}
                onClick={handleClicks}
            >
                ADD LABEL
            </Button>

            <Container>
                {labelsSnapshot ? labelsSnapshot.map(label =>
                    <ListItem
                        title={label.title.toUpperCase()}
                        color={label.color}
                        key={label.id}
                        itemId={label.id}
                        onEditClick={handleClicks}
                        onDeleteClick={handleClicks}
                    />
                )
                :
                    <Title margin={'10px auto'} size={'16px'} align={'center'}>
                        You've deleted all the labels. Let's create one now!
                    </Title>
                }
            </Container>

        </Container>
    )
}
