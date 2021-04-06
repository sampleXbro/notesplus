import React, {useState} from "react"
import firebase from "../../firebase/config"
import {Button} from "../../componenets/Button/Button"
import {Loader} from "../../componenets/Loader/Loader"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {ModalAddEditCategory} from "./ModalAddEditCategory"
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

    const sortCat = (parentId = '') => { //recursively sorts categories tree
        const roots = categoriesSnapshot.filter(c => c.parent === parentId)

        return roots.map(root => {

            const parent = categoriesSnapshot.find(c => root.parent === c.id)
            const isDeletable  = !categoriesSnapshot.find(c => root.id === c.parent)

            return (
                <ListItem
                    title={root.title.toUpperCase()}
                    key={root.id}
                    itemId={root.id}
                    onEditClick={handleClicks}
                    onDeleteClick={handleClicks}
                    border={!root.parent}
                    description={parent ? `Parent: ${parent.title.toUpperCase()}` : 'Root'}
                    deletable={isDeletable}
                >
                    {sortCat(root.id)}
                </ListItem>
            )
        })
    }


    if(isLoading) return <Loader/>
    return (
        <Container padding={'5px'}>

            <ModalAddEditCategory
                categories={categoriesSnapshot}
                isVisible={!!modalMode}
                onClose={() => setModalMode('')}
                onSubmit={handleSubmit}
                category={category}
                onInputsChange={handleInputs}
            />

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

                {categoriesSnapshot && sortCat()}
                
            </Container>

        </Container>
    )
}
