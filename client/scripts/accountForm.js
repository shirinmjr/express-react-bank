const BASE_URL = "http://localhost:3001";

import { dom } from '../pom/account.page.js';
import { accountId, loadPage } from './accountScript.js';
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
            console.log("Selected Deposit");
            selectMethod.style.visibility = "visible";
            selectTransferAccount.style.visibility = "hidden";
            break;
        case 'w'://select Withdraw
            console.log("Selected Withdraw");
            selectMethod.style.visibility = "visible";
            selectTransferAccount.style.visibility = "hidden";
            break;
        case 't'://select transfer
            console.log("Selected Transfer");
            selectMethod.style.visibility = "hidden";
            selectTransferAccount.style.visibility = "visible";
            break;
        case 'c'://select close
            console.log("Selected Close Account");
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
    if (formVerify(transactionBody)) {// Form validation
        switch (transactionBody.action) {
            case 'd':
                console.log('Depositing to ', accountId);
                await axios.put(`${BASE_URL}/accounts/${accountId}`, transactionBody);
                break;
            case 'w':
                console.log('Withdrawing from ', accountId);
                try {
                    await axios.put(`${BASE_URL}/accounts/${accountId}`, transactionBody);
                } catch (error) {
                    transactionMessageBox.innerText = error.response.data;
                }
                break;
            case 't':
                try {
                    console.log('Transferring from ', accountId, 'to', transactionBody.transferTo);
                    await axios.put(`${BASE_URL}/accounts/${accountId}`, transactionBody);
                } catch (error) {
                    transactionMessageBox.innerText = error.response.data;
                }
                break;
            case 'c':// Close 
                console.log('Close account ', accountId);
                try {
                    await axios.delete(`${BASE_URL}/accounts/${accountId}`);
                    window.location.href = '../client'; //one level up
                } catch (error) {
                    transactionMessageBox.innerText = error.response.data;
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
    }
    else {
        return true;
    }
}