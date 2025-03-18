import React from "react";
import { Link } from 'react-router-dom';

function Home () {
    return(
        <React.Fragment>
        <div>Home Component</div>
        <link to='/about'>Click here to go to About</link>
        </React.Fragment>
    )
}

export default Home;