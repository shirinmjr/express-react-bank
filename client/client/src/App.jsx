import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import Main from './components/Main';
import './App.css';

import axios from 'axios';

const BASE_URL = "http://localhost:3001";

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is Authenticated");
      manageUserRecord();
      //if Authenticated and in the db get user's id and set it to state
    } else {
      console.log("User is not Authenticated")
      //save user in the db and get the id back
    }


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
