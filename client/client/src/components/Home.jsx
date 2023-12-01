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
    console.log(accounts);

    const getAllAccounts = async () => {
        const allAccounts = await axios.get(`${BASE_URL}/accounts`);
        console.log('all accounts:', allAccounts.data);
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