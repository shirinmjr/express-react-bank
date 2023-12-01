import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import Main from './components/Main';
import './App.css';

import axios from 'axios';

const BASE_URL = "http://localhost:3001";
let appUser;
async function getUserInfo(user) {

  try {

    const body = {
      "email": user.email,
      "name": user.name,
      "auth": user.sub
    };

    console.log(body);
    let userInfo = await axios.post(`${BASE_URL}/users/${user.email}`, body);

    console.log("user information:", userInfo);
    user = userInfo;

  } catch (error) {
    console.log(error);
  }

  console.log(user);


}

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated);
    isAuthenticated ? getUserInfo(user) : console.log("You are not authenticated!");


  }, [isAuthenticated]);

  return (<div className='app'>
    <div className='main-container'>
      <Main user={user} />
    </div>
  </div>
  );
}

export default App;
