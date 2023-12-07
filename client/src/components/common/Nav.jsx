import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const Nav = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav-container">
            <div className="nav-item profile">
                <Profile />
            </div>
            <div className="nav-item">
                <Link className="app-title" to='/'>Express Bank</Link>
            </div>
            <div className="nav-item login-btn primary-btn">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
    );
};

export default Nav;