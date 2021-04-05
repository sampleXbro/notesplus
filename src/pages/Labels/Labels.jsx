import React, {useState} from "react"
import {colors} from "../../utils/colors"
import firebase from "../../firebase/config"
import {Title} from "../../componenets/Title/Title"
import {Input} from "../../componenets/Input/Input"
import {Modal} from "../../componenets/Modal/Modal"
import {Button} from "../../componenets/Button/Button"
import {Select} from "../../componenets/Select/Select"
import {Option} from "../../componenets/Select/Option"
import {Loader} from "../../componenets/Loader/Loader"
import {ListItem} from "../../componenets/ListItem/ListItem"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {Container} from "../../componenets/Container/Container"

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

            <Modal
                isVisible={!!modalMode}
                onClose={() => setModalMode('')}
                onSubmit={handleSubmit}
            >
                <Title margin={'5px'}>
                    Color:
                    <Select
                        name={'color'}
                        onChange={handleInputs}
                        value={label.color}
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
                    Title:
                    <Input
                        value={label.title}
                        name={'title'}
                        onChange={handleInputs}
                        holder={'Category title'}
                    />
                </Title>
            </Modal>

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
                {labelsSnapshot && labelsSnapshot.map(label =>
                    <ListItem
                        title={label.title.toUpperCase()}
                        color={label.color}
                        key={label.id}
                        itemId={label.id}
                        onEditClick={handleClicks}
                        onDeleteClick={handleClicks}
                    />
                )}
            </Container>

        </Container>
    )
}
