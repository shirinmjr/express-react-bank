import Table from 'react-bootstrap/Table';


const AccountDetailsPage = ({ account }) => {
    console.log("Loading account detail page...", account);
    return (
        <div>
            {account ? (
                <div className="account-detail-container">
                    <div className='title'>Account Details</div>
                    <Table>
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
                    <p>Loading account details...</p>
                </div>
            )}
        </div >
    );
};

export default AccountDetailsPage;

