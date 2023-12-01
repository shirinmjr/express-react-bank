import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const BASE_URL = "http://localhost:3001";

const AccountsList = ({ accounts }) => {



    return (
        <div>

            {accounts.map((account, index) => (<Link key={index} className='button account-link' to="/client/account.html?acc=${account._id}">
                <Card className="mb-2 text-muted">
                    <Card.Body className="mb-2 text-muted">
                        <Card.Title>Account Number: {account.accountNumber}</Card.Title>
                        <Card.Subtitle>Account Balance: {account.balance}</Card.Subtitle>
                        <Card.Subtitle>Status: {account.status ? "Open" : "Closed"}</Card.Subtitle>
                        <Card.Subtitle>Type: {account.type === "SVG" ? "Savings Account" : "Checking Account"}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Link>
            ))
            }


        </div>
    );
};

export default AccountsList;