const account = {
    accountSummaryDiv: 'account-summary-div',
    accountHistoryTable: 'account-history-table',
    transactionAmountText: 'transaction-amount',
    selectAction: 'select-action',
    selectMethod: 'select-method',
    selectTransferAccount: 'select-transfer-account',
    submitActionBtn: 'submit-action',
    transactionForm: 'transaction-form',
    transactionMessageBox: 'message-box'
};


export function dom(id) {
    return document.getElementById(account[id]);
};