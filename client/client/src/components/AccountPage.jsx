import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AccountDetailsPage from "./AccountDetailsPage";
import AccountForm from "./AccountForm";
import AccountHistory from "./AccountHistory";

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

    async function getAccountInfo(accountId) {
        console.log("getting summary for account: ", accountId);
        let accountInfo = await axios.get(`${BASE_URL}/accounts/id/${accountId}`);
        //console.log("this is Account Info", accountInfo.data);
        setAccountInfo(accountInfo.data);
    }

    return (<div>
        <div className="account-page-elem">
            <AccountDetailsPage account={accountInfo} />
        </div>
        <hr />
        <div className="account-page-elem">
            <AccountForm account={accountInfo} />
        </div>
        <div className="account-page-elem">
            <AccountHistory account={accountInfo} />
        </div>
    </div>);
};

export default Account;

