import { useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";

const AccountHistory = ({ accountHistory = [] }) => {

    return (<div>
        <h2>Account History</h2>
        <div>
            <table>
                <header>
                    <th>
                        <td>Date</td>
                        <td>Transaction</td>
                        <td>Method</td>
                        <td>Description</td>
                        <td>Amount</td>
                    </th>
                </header>
                <tbody>
                    {accountHistory.map((history) => {
                        return (<div>
                            <tr>
                                <td>{history.createdAt}</td>
                                <td>{history.transactionType}</td>
                                <td>{history.method}</td>
                                <td>{history.description}</td>
                                <td>${history.amount}</td>
                            </tr>
                        </div>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>);

};

export default AccountHistory;