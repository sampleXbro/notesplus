import React, {useState} from "react"
import firebase from "../../firebase/config"
import {Input} from "../../componenets/Input/Input"
import {Modal} from "../../componenets/Modal/Modal"
import {Title} from "../../componenets/Title/Title"
import {Button} from "../../componenets/Button/Button"
import {Loader} from "../../componenets/Loader/Loader"
import {Select} from "../../componenets/Select/Select"
import {Option} from "../../componenets/Select/Option"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {ListItem} from "../../componenets/ListItem/ListItem"
import {Container} from "../../componenets/Container/Container"

const initCategory = {
    parent: '',
    title: ''
}

export const Categories = () => {
    const [modalMode, setModalMode] = useState('')
    const [category, setCategory] = useState(initCategory)
    const [snapshot, isLoading] = useSnapshot()

    const ref = firebase.database().ref('categories')
    const categoriesSnapshot = snapshot.categories

    const handleClicks = (e) => { //combined clicks handler
        const name = e.target.name
        const id = e.target.dataset.id

        switch (name) {
            case 'add':
                setCategory(initCategory)
                setModalMode(name)
                break
            case 'edit':
                const curCat = categoriesSnapshot.find(c => c.id === id)
                setCategory(curCat)
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
        setCategory({...category, [name]: value})
    }

    const handleSubmit = () => {
        if(modalMode === 'add'){
            ref.push(category)
                .then(() => {
                    setModalMode('')
                })
        }
        if(modalMode === 'edit') {
            const id = category.id
            ref.child(id).update(category)
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
                    Parent:
                    <Select
                        name={'parent'}
                        onChange={handleInputs}
                        value={category.parent}
                    >
                        <Option value={''} disabled>----- Select category -----</Option>
                        {categoriesSnapshot && categoriesSnapshot.map(cat => {
                            if(category.id === cat.id) return null
                            return (
                                <Option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.title.toUpperCase()}
                                </Option>
                            )}
                        )}
                    </Select>
                </Title>

                <Title margin={'5px'}>
                    Title:
                    <Input
                        value={category.title}
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
                ADD CATEGORY
            </Button>

            <Container>
                {categoriesSnapshot && categoriesSnapshot.map(cat =>
                    <ListItem
                        title={cat.title.toUpperCase()}
                        key={cat.id}
                        itemId={cat.id}
                        onEditClick={handleClicks}
                        onDeleteClick={handleClicks}
                    />
                )}
            </Container>

        </Container>
    )
}
