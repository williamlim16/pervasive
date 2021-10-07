import React from 'react'
import TopTrashCanList from './TopTrashCanList'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useAPI } from '../context/ApiContext'
function WelcomePage() {
    //Axios
    const [topTrashCans, setTopTrashCans] = useState([]);
    const { fetchTopTrashCans } = useAPI()

    useEffect(() => {
        async function fetchData() {
            const result = await fetchTopTrashCans()
            setTopTrashCans(result.data)
        }
        fetchData()
    }, []);
    return (
        <div>
            <TopTrashCanList topTrashCans={topTrashCans} />
        </div>
    )
}

export default WelcomePage
