import Button from 'react-bootstrap/Button';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";


const OpenAccount = ({ user, callBack }) => {
    // console.log("user in OpenAccount.jsx", user);

    async function openNewAccount(user, accountType) {

        console.log(`creating a new ${accountType === "SVG" ? "Savings" : "Checking"} account...`);
        let body = {
            accountNumber: Math.floor(100000000 + Math.random() * 999999999),
            type: accountType,
            balance: 0,
            status: true,
            auth: user.auth
        };
        try {
            let newAccount = await axios.post(`${BASE_URL}/accounts`, body);

            console.log("New ACC: ", newAccount);
            callBack();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='new-account-buttons'>
            <Button className='primary-btn new-svg-btn'
                onClick={() => openNewAccount(user, "SVG")}
            >Open a New Savings Account</Button>
            <Button className='primary-btn new-chk-btn'
                onClick={() => openNewAccount(user, "CHK")}
            >Open a New Checking Account</Button>
        </div>
    );
};

export default OpenAccount;