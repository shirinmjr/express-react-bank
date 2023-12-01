import Button from 'react-bootstrap/Button';
import axios from 'axios';
const BASE_URL = "http://localhost:3001";



async function createCHKAccount() {
    console.log("creating a new Checking account...");
    let body = {
        accountNumber: Math.floor(100000 + Math.random() * 900000),
        type: "CHK",
        balance: 0,
        status: true,
    };
    try {
        let newAccount = await axios.post(`${BASE_URL}/accounts`, body);
        console.log(newAccount);
        loadPage();
    } catch (err) {
        console.log(err);
    }

};

const OpenAccount = ({ user, callBack }) => {
    console.log("user in create account", user);

    async function createSVGAccount(user) {

        console.log("creating a new Savings account...");
        let body = {
            accountNumber: Math.floor(100000000 + Math.random() * 999999999),
            type: "SVG",
            balance: 0,
            status: true,
            auth: user[0].auth
        };
        try {
            let newAccount = await axios.post(`${BASE_URL}/accounts`, body);

            console.log(newAccount);
            callBack();
        } catch (err) {
            console.log(err);
        }

    };



    return (
        <div className='new-account-buttons'>
            <Button className='primary-btn new-svg-btn'
                onClick={() => createSVGAccount(user)}
            >Open a Savings Account</Button>


            <Button className='primary-btn new-chk-btn'
                onClick={() => createCHKAccount()}
            >Open a Checking Account</Button>
        </div>
    );
};

export default OpenAccount;

