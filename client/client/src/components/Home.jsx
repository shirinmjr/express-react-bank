import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import AccountList from './AccountsList';
import OpenAccount from './OpenAccount';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";

export default function Home({ user }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        // getAllAccounts();
        getAllAccountsByAuth();
    }, []);

    // const getAllAccounts = async () => {
    //     const allAccounts = await axios.get(`${BASE_URL}/accounts`);
    //     console.log('all accounts in Home:', allAccounts.data);
    //     setAccounts(allAccounts.data);
    // };
    const getAllAccountsByAuth = async () => {
        console.log("user in homepage", user.auth);
        console.log("type of user in homepage", typeof (user.auth));
        const currentUser = user.auth;
        // const params = {
        //     "user": user.auth

        // };
        const allAccounts = await axios.get(`${BASE_URL}/accounts/user/${currentUser}`);
        console.log('all of my accounts in Home:', allAccounts.data);
        setAccounts(allAccounts.data);

    };


    return (
        <div>
            <div>
                <OpenAccount callBack={getAllAccountsByAuth} user={user} accounts={accounts} />
            </div>
            <div>
                <AccountList accounts={accounts} />
            </div>
        </div>
    );
};