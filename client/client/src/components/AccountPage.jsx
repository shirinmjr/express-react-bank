import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AccountDetailsPage from "./AccountDetailsPage";
import AccountForm from "./AccountForm";

import axios from 'axios';
const BASE_URL = "http://localhost:3001";



const Account = () => {
    const [accountInfo, setAccountInfo] = useState();
    const { acc } = useParams();

    useEffect(() => {
        if (acc) {
            console.log(acc);
            getAccountInfo(acc);
        }
    }, [acc]);

    async function getAccountInfo(accountNumber) {
        console.log("getting summary for account: ", accountNumber);
        let accountInfo = await axios.get(`${BASE_URL}/accounts/id/${accountNumber}`);
        console.log("this is Account Info", accountInfo.data);
        setAccountInfo(accountInfo.data);

    }
    return (<div>
        <div>
            <AccountDetailsPage account={accountInfo} />
        </div>
        <div>
            <AccountForm />
        </div>
    </div>);



};

export default Account;

