import { useEffect, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:3001";

let accountsBtn;

const AccountsList = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {


        const getAllAccounts = async () => {
            const allAccounts = await axios.get(`${BASE_URL}/accounts`);
            console.log('all accounts:', allAccounts.data);
            setAccounts(allAccounts);
        };
        getAllAccounts();

        // console.log("state", questions);
    }, []);
console.log(accounts)

    return (
        <div>
            <h1>Accounts</h1></div>
    );
};

export default AccountsList;