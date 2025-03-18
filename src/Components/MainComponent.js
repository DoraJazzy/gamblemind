import React from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

import About from "./AboutComponent";
import Home from "./HomeComponent";
import {Routes, Route, Navigate} from "react-router-dom";

function Main () {
    return(
        <React.Fragment> 

            <Header/>
            <Routes>
                    <Route path='/home' component={< Home />} />
                    <Route path='/about' component={< About />} />
                    {/* Redirect to /home by default */}
                    <Route path='*' element={<Navigate to='/home' />} />
                </Routes>
            <Footer/>

        </React.Fragment>
    )
}

export default Main;