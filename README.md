# TipJar: Ethereum Tipping Made Simple

TipJar is a robust and user-friendly decentralized application (dApp) built on Ethereum and React.js that simplifies the process of sending tips in Ether. With an intuitive interface and seamless integration with MetaMask, it provides a quick and easy way for users to tip one another for their contributions.

## Features

- **Easy Connection with MetaMask:** The application uses MetaMask for user authentication and transaction signing, ensuring the security and integrity of the tipping process.
- **Apollo Client for GraphQL:** The application leverages the Apollo Client for interacting with a GraphQL server, making the data fetching more efficient and the code cleaner.
- **URL Parameters for Convenience:** The application uses URL parameters to automatically fill in the Ethereum address of the recipient. This is a user-friendly feature as it eliminates the need for the sender to manually input the recipient's address. Instead, they can just click on a link, and the recipient's address is automatically populated in the form.
- **Error Handling:** The application includes robust error handling to guide users through any potential issues they might encounter while connecting to MetaMask or sending a tip.

## How To Use

### Installation

1. Clone the repository: `git clone https://github.com/CodeNameNoah/TipJar.git`
2. Install the dependencies: `npm install`
3. cd client: 'npm install'
4. cd server: npm install'
5. Start the application: `npm run dev`
   
The application should now be running at `http://localhost:3000` `http://localhost:4000`.

### Connecting to MetaMask

When you open the application, you will see a button to connect to MetaMask. 
Clicking on this button will prompt you to connect with your MetaMask account.
If loaded on the home screen where you enter the address and amount , you can enter those fields and then press send tip and it'll give you the direction to connect to MetaMask with our application as well.

![ezgif com-video-to-gif (6)](https://github.com/CodeNameNoah/TipJar/assets/128002901/ce70cda0-92a7-4e41-80a1-1ef7642ecd9e)

![ezgif com-video-to-gif (7)](https://github.com/CodeNameNoah/TipJar/assets/128002901/89ee3413-0051-4900-aedc-db2650cddd69)

### Sending a Tip

Once connected, you can input the Ethereum address of the recipient and the amount of Ether you want to send as a tip. 
Clicking on "Send Tip" will prompt you to confirm the transaction in MetaMask.

![ezgif com-video-to-gif (10)](https://github.com/CodeNameNoah/TipJar/assets/128002901/912f4650-86c5-46c6-9a27-28dbda15419f)

### Using a Link with a URL Parameter

To make it easier for users to send a tip to a specific address, you can include the recipient's address as a URL parameter. 
Here is an example of how to construct such a link:

http://localhost:3000/?address=0x123...abc


In this example, `0x123...abc` should be replaced with the actual Ethereum address of the recipient. When a user clicks on this link, 
the Ethereum address is automatically filled in, saving the user the trouble of having to manually input it.

![ezgif com-video-to-gif (11)](https://github.com/CodeNameNoah/TipJar/assets/128002901/3f235c40-04f9-4b90-a0f8-91b35980a9ae)

### Running the GraphQL Server

To run the GraphQL server, use the command: `node server.js`. The server will start on `http://localhost:4000/graphql`.

### Disconnecting from MetaMask

If you want to disconnect your MetaMask account from TipJar, follow these steps:

1. Open the MetaMask extension. You should see your account details.
2.  Click on "Connected". This will open a new page showing a list of all the websites your MetaMask wallet is currently connected to.
3.  Click on the 3 dots on the account you wish to disconnect and then proceed to disconnect.
4.  Your MetaMask account should now be disconnected from TipJar. If you want to connect again in the future, you'll need to go through the connection process again.

![ezgif com-video-to-gif (8)](https://github.com/CodeNameNoah/TipJar/assets/128002901/9bac5a76-593a-4077-ab0a-209cc590fe3e)

## Future Improvements

We're always looking to make TipJar better and more efficient. Some potential future improvements include:

- Integration with other Ethereum wallets.
- Support for tipping in ERC-20 tokens.

## Contributing

We welcome contributions from the community. If you have a feature request, bug report, or want to contribute to the code, please open an issue or submit a pull request.

## License

TipJar is open-source software licensed under the MIT license.

Enjoy using TipJar! We hope it makes your Ethereum tipping experience more enjoyable and efficient.
