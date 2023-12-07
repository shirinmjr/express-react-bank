import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import gitHub from './assets/github-logo-light.png';


const Footer = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    return (
        <>
            <div className="footer-container">
                <div className="footer-row">
                    Copyright © 2023 Express Bank | Shirin Mohajer | All Rights Reserved
                </div>
                <div className="footer-row">
                    <Link to='/about'>About This Project</Link> |
                    <Link to='/linkedin'> Connect & Follow</Link> |
                    <Link to='/blog'> Blog</Link> |
                    <Link to='/blog'> Source Code</Link> <img className="github-logo" src={gitHub}></img>
                </div>
            </div>
        </>
    );
};


export default Footer;