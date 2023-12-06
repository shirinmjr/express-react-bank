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

    const [account, setAccount] = useState();
    const [transferAccounts, setTransferAccounts] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        action: '',
        method: '',
        transfer: '',
    });
    const [method, setMethod] = useState();
    const [action, setAction] = useState();
    const [error, setError] = useState();
    const { acc } = useParams();

    useEffect(() => {
        if (acc) {
            getAccountInfo(acc);
        }
    }, []);

    useEffect(() => {
        if (account) {
            getAllTransferAccounts();
        }
    }, [account]);

    const getAccountInfo = async (acc) => {
        let accountInfo = await axios.get(`${BASE_URL}/accounts/id/${acc}`);
        setAccount(accountInfo.data);

    };
    const getAllTransferAccounts = async () => {
        console.log("Current Account Info: ", account);
        let allUserAccounts = await axios.get(`${BASE_URL}/accounts/user/${account.user}`);
        let transferToAccounts = allUserAccounts.data.filter((acc => acc._id != account._id));
        //console.log('all accounts', allUserAccounts.data);
        //console.log('all transfer to accounts', transferToAccounts);
        setTransferAccounts(transferToAccounts);
    };





    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        // setAction(e.target.value);

    };
    const handleChangeAction = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setAction(e.target.value);

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
    };

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group as={Col} className="mb-3 transaction-form">
                {/* Action */
                    account &&
                    <Form.Group as={Row} className="mb-3 transaction-action" >
                        <Form.Label>Select An Action: </Form.Label>
                        <Form.Control
                            as="select"
                            name="action"
                            required="true"
                            value={formData.action}
                            onChange={(event) => handleChangeAction(event)}
                        >
                            <option value="">Action</option>
                            <option value="d">Deposit</option>
                            <option value="w">Withdraw</option>
                            <option value="t">Transfer</option>
                            <option value="c">Close</option>
                        </Form.Control>
                        <Form.Text className="text-muted">*</Form.Text>
                    </Form.Group>
                }
                {/* Amount */
                    action && action != 'c' &&
                    <Form.Group as={Row} className="mb-3 transaction-amount">
                        <Form.Label>Amount: $</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            required="true"
                            value={formData.amount}
                            onChange={handleChange}
                            defaultValue={0}
                        />
                        <Form.Text className="text-muted">*</Form.Text>
                    </Form.Group >
                }

                {/* Method */
                    (action == 'd' || action == 'w') && formData.amount != 0 &&
                    <Form.Group as={Col} className="mb-3 transaction-method">
                        <Form.Label>Select A Method: </Form.Label>
                        <Form.Control
                            as="select"
                            name="method"
                            required="true"
                            value={formData.method}
                            onChange={handleChange}
                        >
                            <option value="">Method</option>
                            <option value="check">Check</option>
                            <option value="cash">Cash</option>
                        </Form.Control>
                        <Form.Text className="text-muted">*</Form.Text>
                    </Form.Group>
                }

                {/* Transfer To Accounts */
                    action && action == 't' &&
                    <Form.Group as={Col} className="mb-3 select-transfer-account" >
                        <Form.Label>Select an Account to Transfer: </Form.Label>
                        <Form.Control
                            as="select"
                            name="transfer"
                            required="true"
                            value={formData.transfer}
                            onChange={handleChange}
                        >
                            <option value="">Select Account</option>
                            {
                                transferAccounts &&
                                transferAccounts.map((transferAccount, index) => {
                                    return (<option key={index} value={transferAccount._id}>{transferAccount.accountNumber}</option>);
                                })}
                        </Form.Control>
                        <Form.Text className="text-muted">*</Form.Text>

                    </Form.Group>
                }

                <Button type="submit" className='primary-btn btn-submit' onSubmit={handleSubmit} >
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
};

export default AccountForm;
