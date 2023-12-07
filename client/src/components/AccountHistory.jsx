import { useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";

const AccountHistory = ({ accountHistory = [] }) => {

    return (<div>
        {accountHistory.length > 0 &&
            <div className="history-table-content">
                <div className='title'>Account History</div>
                <table className="history-table">
                    <header>
                        <th className="history-th">
                            <td className="history-td">Date</td>
                            <td className="history-td">Transaction</td>
                            <td className="history-td">Method</td>
                            <td className="history-td">Description</td>
                            <td className="history-td">Amount</td>
                        </th>
                    </header>
                    <tbody>
                        {accountHistory.map((history) => {
                            return (<div>
                                <tr className="history-tr">
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
        }
    </div>
    );

};

export default AccountHistory;