import React from 'react';

const SendForm = ({ address, setAddress, amount, setAmount, sendTip }) => {
  return (
    <div className="form-container">
      <label htmlFor="addressInput">Recipient's Address</label>
      <input
        type="text"
        id="addressInput"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label htmlFor="amountInput">Tip Amount (in ETH)</label>
      <input
        type="number"
        id="amountInput"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="button" onClick={sendTip}>
        Send Tip
      </button>
    </div>
  );
};

export default SendForm;
