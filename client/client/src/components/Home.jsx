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
        getAllAccounts();
    }, []);

    const getAllAccounts = async () => {
        console.log("user in homepage", user);
        const params = {

        };
        const allAccounts = await axios.get(`${BASE_URL}/accounts`, { params });
        console.log('all of my accounts:', allAccounts.data);
        setAccounts(allAccounts.data);
    };


    return (
        <div>
            <div>
                <OpenAccount callBack={getAllAccounts} user={user} accounts={accounts} />
            </div>
            <div>
                <AccountList accounts={accounts} />
            </div>
        </div>
    );
}