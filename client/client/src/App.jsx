import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import Main from './components/Main';
import './App.css';

import axios from 'axios';

const BASE_URL = "http://localhost:3001";

async function getUserInfo(user) {

  user.email = "testuser4@test.com";
  let appUser;
  try {
    appUser = await axios.get(`${BASE_URL}/users/${user.email}`);
    console.log("user information:", appUser);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
  return appUser;


}

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    let userInfo = isAuthenticated ? getUserInfo(user) : console.log("User is not Authenticated");
    // if (isAuthenticated) {
    //   console.log(" Authenticated");

    //   let userInfo = getUserInfo(user);
    console.log("this is user:", userInfo);
    // } else {
    //   console.log("User is not Authenticated");
    // }
    //save user in the db and get the id back



  }, []);

  return (
    <div className='app'>
      <div className='main-container'>
        <Main />
      </div>
    </div>
  );
}

export default App;
