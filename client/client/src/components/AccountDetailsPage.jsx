import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';


const AccountDetailsPage = ({ account }) => {
    console.log("account detail", account);
    return (
        <div>
            {account ? (

                <div className="account-detail-page">

                    <Table striped bordered hover>
                        <h2>Account Details</h2>
                        <tbody>
                            <tr>
                                <th>Account Number</th>
                                <td>{account.accountNumber}</td>
                            </tr>
                            <tr>
                                <th>Account Balance:</th>
                                <td>{account.balance}</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <td>{account.status ? "Open" : "Closed"}</td>
                            </tr>
                            <tr>
                                <th>Type: </th>
                                <td>{account.type === "SVG" ? "Savings Account" : "Checking Account"}</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
            ) : (
                <div>
                    <p><h2>Loading account details..</h2></p>
                </div>
            )}
        </div >
    );
};

export default AccountDetailsPage;

