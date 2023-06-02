# TransCrypt: Ethereum Tipping Made Simple

TransCrypt is a robust and user-friendly decentralized application (dApp) built on Ethereum and React.js that simplifies the process of sending tips in Ether. With an intuitive interface and seamless integration with MetaMask, it provides a quick and easy way for users to tip one another for their contributions.

## Features

- **Easy Connection with MetaMask:** The application uses MetaMask for user authentication and transaction signing, ensuring the security and integrity of the tipping process.
- **Apollo Client for GraphQL:** The application leverages the Apollo Client for interacting with a GraphQL server, making the data fetching more efficient and the code cleaner.
- **URL Parameters for Convenience:** The application uses URL parameters to automatically fill in the Ethereum address of the recipient. This is a user-friendly feature as it eliminates the need for the sender to manually input the recipient's address. Instead, they can just click on a link, and the recipient's address is automatically populated in the form.
- **Error Handling:** The application includes robust error handling to guide users through any potential issues they might encounter while connecting to MetaMask or sending a tip.

## How To Use

### Installation

1. Clone the repository: `git clone https://github.com/CodeNameNoah/TransCrypt.git`
2. Install the dependencies: `npm install`
3. Start the application: `npm run dev`
   
The application should now be running at `http://localhost:3000` `http://localhost:4000`.

### Connecting to MetaMask

When you open the application, you will see a button to connect to MetaMask. 
Clicking on this button will prompt you to connect with your MetaMask account.

### Sending a Tip

Once connected, you can input the Ethereum address of the recipient and the amount of Ether you want to send as a tip. 
Clicking on "Send Tip" will prompt you to confirm the transaction in MetaMask.

### Using a Link with a URL Parameter

To make it easier for users to send a tip to a specific address, you can include the recipient's address as a URL parameter. 
Here is an example of how to construct such a link:

http://localhost:3000/?address=0x123...abc


In this example, `0x123...abc` should be replaced with the actual Ethereum address of the recipient. When a user clicks on this link, 
the Ethereum address is automatically filled in, saving the user the trouble of having to manually input it.

### Running the GraphQL Server

To run the GraphQL server, use the command: `node server.js`. The server will start on `http://localhost:4000/graphql`.

## Future Improvements

We're always looking to make TipCreator better and more efficient. Some potential future improvements include:

- Integration with other Ethereum wallets.
- Support for tipping in ERC-20 tokens.
- A system for storing and displaying the history of tips a user has sent or received.

## Contributing

We welcome contributions from the community. If you have a feature request, bug report, or want to contribute to the code, please open an issue or submit a pull request.

## License

TransCrypt is open-source software licensed under the MIT license.

Enjoy using TransCrypt! We hope it makes your Ethereum tipping experience more enjoyable and efficient.
