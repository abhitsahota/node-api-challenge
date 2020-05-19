import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardItem from './Card'

export default function App () {

    const [list, setList] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:3030/api/projects')
        .then(r => {
            console.log(r.data.r)
            setList(r.data.r)
        })
        .catch(e => {
            console.log('error in the server call', e)
        })
    }, [] )

    return (
        <>
        {Object.values(list).map((keyName, index) => {
            return (
                <CardItem key={index} name={keyName.name} description={keyName.description} completed={keyName.completed} />
            )
        }
        )}
        </>

    )
}