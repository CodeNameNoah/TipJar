import React from 'react';

const ConnectLink = ({ connect }) => {
  return (
    <a href="#" className="link-button" onClick={connect}>
      Connect to MetaMask
    </a>
  );
};

export default ConnectLink;
