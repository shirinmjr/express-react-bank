import { useState, useEffect } from 'react';
import AccountList from './AccountsList';
import OpenAccount from './OpenAccount';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";

export default function Home({ user }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAllAccountsByAuth();
    }, []);

    const getAllAccountsByAuth = async () => {
        //console.log("user in homepage", user.auth);
        const allAccounts = await axios.get(`${BASE_URL}/accounts/user/${user.auth}`);
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