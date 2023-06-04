import React from 'react';

const ConnectLink = ({ connectToMetaMask }) => {
  return (
    <div>
      <a href="#" className="link-button" onClick={connectToMetaMask}>
        Connect to MetaMask
      </a>
      <div className="center-container">
        <a href="https://github.com/CodeNameNoah/TipJar#readme" target="_blank" rel="noopener noreferrer" className="help-button">Help?</a>
      </div>
    </div>
  );
};

export default ConnectLink;
