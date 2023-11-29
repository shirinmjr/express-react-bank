import React, { useState } from "react";
import { Link } from "react-router-dom";
// import SearchBar from "./SearchBar";
import login from '../assets/login.png';
import appLogo from '../assets/bank.png';
import gitHub from '../assets/github-logo-light.png';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";



const Nav = () => {




    return (
        <>
            <div className="navbar">
                <p>
                    <Link className="nav-a" to='/about'>

                        <img height='50px' width='50px' src={gitHub} />
                    </Link>

                    <Link className="nav-a" to='/about'>

                        <img height='50px' width='50px' src={appLogo} />
                    </Link>

                    <Link className="nav-a" to="/login"><img height='50px' width='50px' src={login} />


                        <LoginButton />
                        <LogoutButton />
                    

                    </Link>
                </p>
                <Profile />
            </div>
        </>
    );
};


export default Nav;