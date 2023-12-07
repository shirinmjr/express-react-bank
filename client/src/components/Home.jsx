import { useState, useEffect } from 'react';
import AccountList from './AccountsList';
import OpenAccount from './OpenAccount';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";

export default function Home({ user }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAllAccountsByUser();
    }, []);

    const getAllAccountsByUser = async () => {
        const allAccounts = await axios.get(`${BASE_URL}/accounts/user/${user.auth}`);
        console.log('all of my accounts in Home:', allAccounts.data);
        setAccounts(allAccounts.data);
    };

    return (
        <div className='home-container'>
            <div className='open-account'>
                <OpenAccount callBack={getAllAccountsByUser} user={user} accounts={accounts} />
            </div>
            <div className='accounts'>
                <AccountList accounts={accounts} />
            </div>
        </div>
    );
};