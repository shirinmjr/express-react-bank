import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    console.log(user);
    return (
        isAuthenticated && (
            <div className="profile-container">
                <div>
                    <img className="profile-item profile-img" src={user.picture} alt={user.name} ></img>
                </div>
                <div className="profile-item">Welcome {user.given_name}</div>



            </div>
        )
    );
};

export default Profile;