import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Main from './components/Main';
import './App.css';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [appUser, setAppUser] = useState();

  useEffect(() => {
    console.log("Is user Authenticated?", isAuthenticated);
    console.log("appUser", appUser);

    if (isAuthenticated && !appUser) {
      getUserInfo(user);
    }

    async function getUserInfo(user) {
      console.log("user in getUserInfo()", user);

      let auth = user.sub.substring(user.sub.indexOf('|') + 1);
      try {
        const body = {
          "email": user.email,
          "name": user.name,
          "auth": auth
        };
        let userInfo = await axios.post(`${BASE_URL}/users/${user.email}`, body);
        setAppUser(userInfo.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuthenticated, appUser]);

  return (
    <div className='main-container'>
      <Main user={appUser} />
    </div>
  );
}

export default App;
