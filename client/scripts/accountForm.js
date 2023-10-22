const BASE_URL = "http://localhost:3001";

import { dom } from '../pom/account.page.js';
import { accountId } from './accountScript.js';
const selectAction = dom('selectAction');
const selectMethod = dom('selectMethod');
const selectTransferAccount = dom('selectTransferAccount');
const submitActionBtn = dom('submitActionBtn');
const transactionForm = dom('transactionForm');
const transactionMessageBox = dom('transactionMessageBox');

//Select Action
selectAction.addEventListener('change', () => {
    switch (selectAction.value) {
        case ''://select none
            selectMethod.style.visibility = "hidden";
            selectTransferAccount.style.visibility = "hidden";
            break;
        case 'd'://select Deposit
            console.log("Deposit");
            selectMethod.style.visibility = "visible";
            selectTransferAccount.style.visibility = "hidden";

            break;
        case 'w'://select Withdraw
            console.log("Withdraw");
            selectMethod.style.visibility = "visible";
            selectTransferAccount.style.visibility = "hidden";
            break;
        case 't'://select transfer
            console.log("Transfer");
            selectMethod.style.visibility = "hidden";
            selectTransferAccount.style.visibility = "visible";
            break;
        case 'c'://select close
            console.log("Close Account");
            selectMethod.style.visibility = "hidden";

            break;

    }
});


submitActionBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let transactionBody = {};//Data send for back-end
    const formData = new FormData(transactionForm);
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        transactionBody[key] = value;
    }

    if (formVerify(transactionBody)) {// Form Verification

        switch (transactionBody.action) {//form action router
            case 'd':// Deposit
                console.log(`Depositing to ${accountId}`);
                transactionBody.amount = balance + Number(transactionBody.amount);
                await axios.put(`${BASE_URL}/accounts/${accountId}`, transactionBody);
                break;
            case 'w':// Withdraw
                console.log('Withdrawing...');
                if (transactionBody.amount <= balance) {
                    transactionBody.amount = balance - transactionBody.amount;
                    await axios.put(`${BASE_URL}/accounts/${accountId}`, transactionBody);
                } else {
                    transactionMessageBox.innerText = "Balance Not Sufficient";
                }
                break;
            case 't'://transfer
                console.log('Transferring...');
                console.log("transfer from account", accountId);
                console.log("transfer to account", transaction.transfer);
                if (transaction.amount <= balance) {
                    transaction.amount = balance - transaction.amount;
                    //  await axios.put(`${BASE_URL}/accounts/${accountId}`, transaction);

                    // await axios.put(`${BASE_URL}/accounts/${accountId}`, transaction);

                } else {
                    transactionMessageBox.innerText = "Balance Not Sufficient";
                }
                break;
            case 'c':// Close 
                console.log('Closing...');
                if (balance == 0) {
                    await axios.delete(`${BASE_URL}/accounts/${accountId}`);
                    window.location.href = '../client'; //one level up
                } else {
                    transactionMessageBox.innerText = "Withdraw or transfer the balance to close";
                }
                break;
        }
    }
    loadPage();
});


function formVerify(transactionForm) {
    transactionMessageBox.innerText = "";//Rest error message dialog
    if (transactionForm.amount == "" && transactionForm.action != 'c') {
        transactionMessageBox.innerText = "Amount is Required";//need amount if request is not to close
        return false;
    } else if (transactionForm.amount != "" && transactionForm.action == "") {//should select action
        transactionMessageBox.innerText = "Action is Required";
        return false;
    } else if ((transactionForm.action == 'd' || transactionForm.action == 'w') && transactionForm.method == "") {
        transactionMessageBox.innerText = "Method is Required";
        selectAction.selectedIndex = 0;
        return false;
    //}else if (transactionForm.transferTo)
    } else {
        return true;
    }
}