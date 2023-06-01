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
  const [errorMessage, setErrorMessage] = useState(''); 
  // New state variable for error messages


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

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        // If user locks their MetaMask wallet, it will disconnect from the dApp
        if (accounts.length > 0) {
          setConnected(true);
        } else {
          setConnected(false);
          alert('Your MetaMask is locked. Please unlock it to continue.');
        }
      });
    }
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // If the request was successful, accounts is an array of account addresses
        if (accounts.length > 0) {
          // Save connected state to localStorage
          localStorage.setItem('connected', 'true');
          setConnected(true);
          setErrorMessage(''); // clear the error message
        } else {
          // If accounts is an error object, check for the -32002 error code
          if (accounts.code === -32002) {
            setErrorMessage('MetaMask is currently busy. Please manually open the MetaMask extension, then try again.');
          } else {
            setErrorMessage('An error occurred while connecting to MetaMask.');
          }
        }
      } catch (error) {
        setErrorMessage('MetaMask is currently processing a request. Please manually open the MetaMask extension from your browser extensions.');
        console.error('An error occurred: ', error);
      }
    } else {
      setErrorMessage('Non-Ethereum browser detected!');
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
          try {
            // Replace the fetch call with a call to the createTip function
            const result = await createTip({
              variables: {
                recipient: address,
                amount: parseFloat(amount)  // Ensure the amount is a number
              },
            });

            // If the mutation was successful, inform the user
      if (result.data) {
        alert('Your transaction was successful!'); 
      }
  
            console.log(result);
          } catch (error) {
            // Handle any errors from the mutation
            console.error('An error occurred while saving the tip: ', error);
          }
        }
      } catch (error) {
        // Check if the error is due to insufficient funds
        if (error.message.includes('insufficient funds')) {
          setErrorMessage('You do not have enough Ethereum to send this tip.');
        } else if (error.message.includes('Already processing eth_requestAccounts')) {
          setErrorMessage('MetaMask is currently processing a request. Please manually open the MetaMask extension from your browser extensions. ');
        } else {
          console.error('An error occurred: ', error);
        }
      }
    } else {
      setErrorMessage('Non-Ethereum browser detected! Once connected reload the page !');
    }
  };
  
  
  
  return (
    <div className="container">
      <h1>Tip Creator</h1>
      {errorMessage && <div className="error">{errorMessage}</div>} {/* Display the error message if there is one */}
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
