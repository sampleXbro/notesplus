import firebase from "../config"
import {useState, useEffect} from 'react'

export const useSnapshot = () => {
    const [snapshot, setSnapshot] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const dbRef = firebase.database().ref()

        dbRef.on('value', (snapshot) => {
            const newSnapshot = {}

            const objSnapshot = snapshot.val()
            Object.keys(objSnapshot).map(key => { // convert firebase object snapshot into an array
                const arrSnapshot = [];
                Object.keys(objSnapshot[key]).map(key2 => {
                    const newObj = {id: key2, ...objSnapshot[key][key2]}
                    return arrSnapshot.push(newObj)
                })
                return newSnapshot[key] = arrSnapshot
            })

            setSnapshot(newSnapshot)

            setIsLoading(false)
        }
        )
        return () => {dbRef.off()}
    }, [])

    return [snapshot, isLoading]

}