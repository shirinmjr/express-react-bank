import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const AccountDetailsPage = ({ account }) => {
    console.log("account", account);
    // console.log("account info:", account, "Account Current Balance", account?.balance);
    // const type = account?.type == 'SVG' ? 'Savings Account' : 'Checking Account';
    // const status = account?.status == true ? 'Open' : 'Closed';

    return (
        <div> <h1>Here is the detail</h1>
            {account?.accountNumber}</div>
    );
};

export default AccountDetailsPage;