import React, { useState } from 'react';

const AccountForm = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        amount: '',
        transactionType: 'deposit', // default to deposit
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any necessary actions with the form data
        console.log('Form submitted:', formData);
        // Reset the form after submission
        setFormData({
            amount: '',
            transactionType: 'deposit',
        });
    };

    return (
        <form method="post" id="transaction-form">
      <input required="true" name="amount" id="transaction-amount" type="number" value="" />

      <select required="true" name="action" id="select-action">
        <option value="">Select An Action</option>
        <option value="d">Deposit</option>
        <option value="w">Withdraw</option>
        <option value="t">Transfer</option>
        <option value="c">Close</option>
      </select>
      <select name="method" id="select-method">
        <option value="">Method</option>
        <option value="check">Check</option>
        <option value="cash">Cash</option>
      </select>
      <select name="transferTo" id="select-transfer-account">
        <option value="">Select a Transfer to Account</option>
      </select>
      <button id="submit-action" class="primary-btn">Submit</button>
    </form>
    );
};



export default AccountForm;