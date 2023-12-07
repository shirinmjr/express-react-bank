import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AccountDetailsPage from "./AccountDetailsPage";
import AccountForm from "./AccountForm";
import AccountHistory from "./AccountHistory";

import axios from 'axios';
const BASE_URL = "http://localhost:3001";

const Account = () => {
    const [accountInfo, setAccountInfo] = useState();
    const [accountHistory, setAccountHistory] = useState();
    const { acc } = useParams();

    useEffect(() => {
        if (acc) {
            console.log(acc);
            getAccountInfo(acc);
            getAccountHistory(acc);
        }
    }, [acc]);

    useEffect(() => {
        getAccountHistory(acc);
    }, [accountInfo]);

    async function getAccountInfo(accountId) {
        console.log("getting summary for account: ", accountId);
        let accountInfo = await axios.get(`${BASE_URL}/accounts/id/${accountId}`);
        //console.log("this is Account Info", accountInfo.data);
        setAccountInfo(accountInfo.data);
    }

    async function getAccountHistory(accountId) {
        console.log("getting History for account: ", accountId);
        let accountHistoryInfo = await axios.get(`${BASE_URL}/histories/${accountId}`);
        setAccountHistory(accountHistoryInfo.data);

    }

    return (<div className="account-page-container">
        <div className="account-page-elem">
            <AccountDetailsPage account={accountInfo} />
        </div>
        <hr />
        <div className="account-page-elem">
            <AccountForm callBack={getAccountInfo} />
        </div>
        <div className="account-page-elem">
            <AccountHistory accountHistory={accountHistory} />
        </div>
    </div>);
};

export default Account;

