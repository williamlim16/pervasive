import React from 'react'
import TopTrashCanList from './TopTrashCanList'
import axios from 'axios';
import { useState, useEffect } from 'react'
function WelcomePage() {
    //Axios
    const [topTrashCans, setTopTrashCans] = useState([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios
            .get("http://localhost:8888/node/getTopTrashCans")
            .then((res) => {
                console.log("success");
                console.log(res);
                setTopTrashCans(res.data.data);
            }).catch((err) => {
                console.log("error");
            });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    return (
        <div>
            <TopTrashCanList topTrashCans={topTrashCans} />
        </div>
    )
}

export default WelcomePage
