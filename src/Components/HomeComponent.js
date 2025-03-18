import React from "react";
import { Link } from "react-router-dom";

function Home () {
    return(
        <React.Fragment>
        <div>Home Component</div>
        <Link to='/about'>Click here to go to About</Link>
        </React.Fragment>
    )
}

export default Home;