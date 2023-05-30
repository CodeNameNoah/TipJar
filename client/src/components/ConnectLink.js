import React from 'react';

const ConnectLink = ({ connectToMetaMask }) => {
  return (
    <a href="#" className="link-button" onClick={connectToMetaMask}>
      Connect to MetaMask
    </a>
  );
};

export default ConnectLink;
