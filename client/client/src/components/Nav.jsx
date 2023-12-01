import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import login from '../assets/login.png';
import appLogo from '../assets/bank.png';
import gitHub from '../assets/github-logo-light.png';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";



const Nav = () => {


    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();


    return (
        <>

            <div className="navbar">
                <div>
                    <Profile />
                </div>
                <div>
                    <Link className="nav-item app-title" to='/about'><h1>Express Bank</h1></Link>
                </div>
                <div className="nav-item">
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </div>






            </div>
        </>
    );
};


export default Nav;