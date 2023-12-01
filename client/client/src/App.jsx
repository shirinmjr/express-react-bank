import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Main from './components/Main';
import './App.css';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";



function App() {
  const { user, isAuthenticated } = useAuth0();
  const [appUser, setAppUser] = useState({});

  useEffect(() => {
    console.log("Is user Authenticated?", isAuthenticated);
    if (isAuthenticated) {
      getUserInfo(user);
    }

    async function getUserInfo(user) {
      try {
        const body = {
          "email": user.email,
          "name": user.name,
          "auth": user.sub
        };
        let userInfo = await axios.post(`${BASE_URL}/users/${user.email}`, body);
        setAppUser(userInfo.data);

      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuthenticated]);



  return (<div className='app'>
    <div className='main-container'>
      <Main user={appUser} />
    </div>
  </div>
  );
}

export default App;
