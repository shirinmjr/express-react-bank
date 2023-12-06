import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const BASE_URL = "http://localhost:3001";

const AccountForm = () => {
    const [formData, setFormData] = useState({});
    const [account, setAccount] = useState();
    // const [method, setMethod] = useState();
    // const [action, setAction] = useState();
    const [transferAccounts, setTransferAccounts] = useState();

    const [error, setError] = useState();
    const { acc } = useParams();

    useEffect(() => {
        // setCurrentAccount(account);
        // if (account) {
        //     console.log("account Info in account form", account.account.user);
        getAllTransferAccounts(acc);
        // }


    }, [acc]);

    const getAllTransferAccounts = async (acc) => {
        let accountInfo = await axios.get(`${BASE_URL}/accounts/id/${acc}`);
        setAccount(accountInfo.data).then(account => {
            let allUserAccounts = await axios.get(`${BASE_URL}/accounts/user/${account.user}`);
            let transferToAccounts = allUserAccounts.data.filter((t_acc => t_acc._id != account._id));
            setTransferAccounts(transferToAccounts);
            //allUserAccounts.data.forEach(item => console.log(item.accountNumber));  
        }

        );



        console.log('all accounts', allUserAccounts.data);
        console.log('transfer accounts', transferAccounts);

        //  {transferAccounts.forEach((accountSelect) => {
        //    return (<option value="">Select</option>);
        //    })}


        //const toAcc = allAccounts.data.filter(acc => acc.accountNumber != account.accountNumber);

        // setTransferAccounts(transferToAcc);
        //  console.log('all of my transfer to accounts in account form:', transferAccounts);
    };




    const handleInputChange = (e) => {
        console.log("form change");
        // console.log("method", method);
        // console.log("action", action);
        //     const { name, value } = e.target;
        //     switch (name) {
        //         case 'deposit':
        //             switch (value) {
        //                 case 'd':
        //                     break;
        //                 case 'w':
        //                     break;
        //                 case 't':
        //                     break;
        //             }
        //             break;
        //             case 'deposit':


        //     }
        //     //setFormData({ ...formData, [amount]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        console.log('Form submitted:', formData);
        // setFormData({
        //     amount: e.target.amount,
        //     transactionType: 'deposit',
        // });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} className="mb-3 transaction-form">

                <InputGroup as={Row} className="mb-3 transaction-amount" controlid="amount">
                    <Form.Label>Amount: $</Form.Label>
                    <Form.Control type="number" placeholder="Enter amount" />
                    <Form.Text className="text-muted"> *</Form.Text>
                </InputGroup>

                <Form.Group as={Col} className="mb-3 transaction-action" controlid="action">
                    <Form.Label>Select An Action: </Form.Label>
                    <Form.Select defaultValue="" size="lg" onChange={(e) => setAction(e.target.value)}>
                        <option value="">Action</option>
                        <option value="d">Deposit</option>
                        <option value="w">Withdraw</option>
                        <option value="t">Transfer</option>
                        <option value="c">Close</option>
                    </Form.Select>
                    <Form.Text className="text-muted">*</Form.Text>
                </Form.Group>

                <Form.Group as={Col} className="mb-3 transaction-method" controlid="method">
                    <Form.Label>Select A Method: </Form.Label>
                    <Form.Select defaultValue="" size="lg" onChange={(e) => setMethod(e.target.value)}>
                        <option value="">Method</option>
                        <option value="check">Check</option>
                        <option value="cash">Cash</option>
                    </Form.Select>
                    <Form.Text className="text-muted">*</Form.Text>
                </Form.Group>

                <Form.Group as={Col} className="mb-3 select-transfer-account" controlid="transferTo">
                    <Form.Label>Select an Account to Transfer: </Form.Label>
                    <Form.Select defaultValue="" >


                    </Form.Select>
                    <Form.Text className="text-muted">*</Form.Text>
                </Form.Group>

                <Button type="submit" className='primary-btn btn-submit' onSubmit={handleSubmit} >
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
};


export default AccountForm;