import React, { useState, useEffect } from 'react';
import ConnectLink from './ConnectLink';
import SendForm from './SendForm';

const TipCreator = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Get Ethereum address from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const addressFromUrl = urlParams.get('address');

    // If an address is passed in the URL, put it in the input field and set the connected state to true
    if (addressFromUrl) {
      setAddress(addressFromUrl);
      setConnected(true);
    }

    // Check localStorage to see if the user was previously connected
    if (localStorage.getItem('connected') === 'true') {
      setConnected(true);
    }
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        // Save connected state to localStorage
        localStorage.setItem('connected', 'true');
        setConnected(true);
      } catch (error) {
        console.error('User denied account access or an error occurred');
      }
    } else {
      console.log('Non-Ethereum browser detected!');
    }
  };

  const sendTip = async () => {
    if (!address || !amount) {
      console.log('Please set both the address and the amount');
      return;
    }
  
    if (window.ethereum) {
      try {
        const transaction = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: ethereum.selectedAddress,
              to: address,
              value: ethers.utils.parseUnits(amount.toString(), "ether").toHexString(),
            },
          ],
        });
        console.log(transaction);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Ethers library not loaded');
    }
  };
  

  return (
    <div className="container">
      <h1>Tip Creator</h1>
      {!connected ? (
        <ConnectLink connectToMetaMask={connectToMetaMask} />
      ) : (
        <SendForm
          address={address}
          setAddress={setAddress}
          amount={amount}
          setAmount={setAmount}
          sendTip={sendTip}
        />
      )}
    </div>
  );
};

export default TipCreator;
