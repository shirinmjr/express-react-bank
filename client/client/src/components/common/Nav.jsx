import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const Nav = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="navbar">
            <div>
                <Profile />
            </div>
            <div>
                <Link className="nav-item app-title" to='/'><h1>Express Bank</h1></Link>
            </div>
    
            <div className="nav-item">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
    );
};

export default Nav;