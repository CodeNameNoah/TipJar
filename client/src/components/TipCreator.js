import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import ConnectLink from './ConnectLink';
import SendForm from './SendForm';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URL
  cache: new InMemoryCache()
});

// Define your mutation
const CREATE_TIP = gql`
  mutation CreateTip($recipient: String!, $amount: Float!) {
    createTip(recipient: $recipient, amount: $amount) {
      id
    }
  }
`;

const TipCreator = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [createTip, { data }] = useMutation(CREATE_TIP, { client });

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
      alert('Please set both the address and the amount');
      return;
    }
  
    if (window.ethereum) {
      try {
        // Get the user's account
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
  
        // Create a new ethers.js provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Define the transaction
        const transaction = {
          to: address,
          value: ethers.utils.parseEther(amount)
        };
  
        // Sign and send the transaction
        const tx = await signer.sendTransaction(transaction);
    
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
  
        // If the transaction was successful, save the tip in the database
        if (receipt.status === 1) {
          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: `
                mutation {
                  createTip(recipient: "${address}", amount: ${amount}) {
                    id
                    recipient
                    amount
                  }
                }
              `,
            }),
          });
    
          const responseBody = await response.json();
    
          console.log(responseBody);
        } else {
          alert('The transaction failed.');
        }
      } catch (error) {
        // Check if the error is due to insufficient funds
        if (error.message.includes('insufficient funds')) {
          alert('You do not have enough Ethereum to send this tip.');
        } else {
          console.error(error);
        }
      }
    } else {
      alert('Ethers library not loaded');
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
