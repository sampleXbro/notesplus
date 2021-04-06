import React, {useState} from "react"
import firebase from "../../firebase/config"
import {Button} from "../../componenets/Button/Button"
import {Loader} from "../../componenets/Loader/Loader"
import {useSnapshot} from "../../firebase/hooks/useSnapshot"
import {ModalAddEditCategory} from "./ModalAddEditCategory"
import {ListItem} from "../../componenets/ListItem/ListItem"
import {Container} from "../../componenets/Container/Container"
import {Title} from "../../componenets/Title/Title";

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

    const sortCat = (data, parentId = '') => { //recursively sorts categories tree
        const roots = data.filter(c => c.parent === parentId)

        return roots.map(root => {

            const parent = data.find(
                c => root.parent === c.id
            ) // finds appropriate category object by id

            const isDeletable  = !data.find(
                c => root.id === c.parent
            ) // finds last item of the branch to add deleting possibility

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
                    {sortCat(data, root.id)}
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
                isDisabledSubmit={!category.title}
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
                {
                    categoriesSnapshot ? sortCat(categoriesSnapshot)

                :
                    <Title margin={'10px auto'} size={'16px'} align={'center'}>
                        There are no categories. Let's create one now!
                    </Title>
                }
            </Container>

        </Container>
    )
}
