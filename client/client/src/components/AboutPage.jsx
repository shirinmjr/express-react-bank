const Account = () => {
    return (
        <div>
            <h1>About This Application</h1>
            <p>
                This is a experimental project to create a full CRUD app using the best practices and latest tech stack.<br />
                To do so, we're experimenting with a banking system and the goal is to user:<br />
                <ul>
                    <li> Create accounts(Saving and Checking) - Create</li>
                    <li> Create Log Record Per Transaction - Create</li>
                    <li> Display Account Details & Transactions History - Read</li>
                    <li> Deposit Funds - Update</li>
                    <li> Withdraw Funds - Update</li>
                    <li> Close an account - Delete</li>
                </ul>


            </p>
            <h1>Versions</h1>
            <p>
           
               <h3> 🔧 V1 express-mongo-bank</h3>
                ⛏️ Built Using
                MongoDB - Database
                mongoose - Database Framework
                nodemon
                Express - Server Framework
                NodeJs - Server Environment
                CORS - Connect/Express middleware
                Morgan - HTTP request logger middleware for node.js
                Live Server - A Quick Development Live Server with live browser reload.
                make sure you have live Server extension installed

                Goals:

                Create one user total (✓)
                User can create new account by selecting Create A New Account button (Saving / Checking) (✓)
                User can see the account number, balance and the status of the account (if it's open) (✓)
                Select and account takes user to the account details page (✓)
                Uer can deposit/withdraw and transfer to/from all of their account via cash,check (✓)
                User can delete their account but they need to transfer the balance before that. Balance need to be 0 before request to close an account (✓)
                User can see a history of transactions in their account page(reflecting account transactions). (✓)
                Stretch Goals - it's always a nice surprise!
                Account history gets updated as transactions happened (✓)
                User can transfer money from one account to another account and can see a history record on bot(to/from) accounts (✓)
                There is no business logic handled in the front-end (✓)
                Previews:

                v1-data-structure v1-basic-ui homepage

                🔧 V2
                ⛏️ Built Using
                MongoDB - Database
                mongoose - Database Framework
                nodemon
                Express - Server Framework
                NodeJs - Server Environment
                CORS - Connect/Express middleware
                Morgan - HTTP request logger middleware for node.js
                Live Server - A Quick Development Live Server with live browser reload.
                make sure you have live Server extension installed

                User can login (Google Auth)
                Migrate UI from ES6 to React

            </p>
        </div>
    );
};

export default Account;