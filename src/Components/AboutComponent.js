import React from "react";
import { Link } from 'react-router-dom';

function About () {
    return(
        <React.Fragment>
        <div>About</div>
        <Link to='/home'>Click here to go to Home</Link>
        </React.Fragment>
    )
}

export default About;