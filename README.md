# TipJar: Ethereum Tipping Made Simple

TipJar is a robust and user-friendly decentralized application (dApp) built on Ethereum and React.js that simplifies the process of sending tips in Ether. With an intuitive interface and seamless integration with MetaMask, it provides a quick and easy way for users to tip one another for their contributions.

# Table of Contents

- [TipJar: Ethereum Tipping Made Simple](#tipjar-ethereum-tipping-made-simple)
  * [Features](#features)
  * [How To Use](#how-to-use)
    + [Installation](#installation)
    + [Live Heroku app](#Live-Heroku-app)
    + [Connecting to MetaMask](#connecting-to-metamask)
    + [Sending a Tip](#sending-a-tip)
    + [Using a Link with a URL Parameter](#using-a-link-with-a-url-parameter)
    + [Running the GraphQL Server](#running-the-graphql-server)
    + [Disconnecting from MetaMask](#disconnecting-from-metamask)
  * [Future Improvements](#future-improvements)
  * [Contributing](#contributing)
  * [License](#license)

## Features

- **Easy Connection with MetaMask:** The application uses MetaMask for user authentication and transaction signing, ensuring the security and integrity of the tipping process.
- **Apollo Client for GraphQL:** The application leverages the Apollo Client for interacting with a GraphQL server, making the data fetching more efficient and the code cleaner.
- **URL Parameters for Convenience:** The application uses URL parameters to automatically fill in the Ethereum address of the recipient. This is a user-friendly feature as it eliminates the need for the sender to manually input the recipient's address. Instead, they can just click on a link, and the recipient's address is automatically populated in the form.
- **Error Handling:** The application includes robust error handling to guide users through any potential issues they might encounter while connecting to MetaMask or sending a tip.

## How To Use

### Installation

1. Clone the repository: `git clone https://github.com/CodeNameNoah/TipJar.git`
2. Install the dependencies: `npm install`
3. cd client: `npm install`
4. cd server: `npm install`
5. In root directory start the application: `npm run dev`
6. **MUST have MetaMask extension installed or else the application will NOT work.**
   
The application should now be running at `http://localhost:3000` `http://localhost:4000`.

### Live Heroku app
https://mytipjar.herokuapp.com/

### Connecting to MetaMask

1. When you open the application, you will see a button to connect to MetaMask. 
Clicking on this button will prompt you to connect with your MetaMask account.

2. Most users will be loaded on the home page when you first visit our site. simply just fill in the address and amount fields and click "send tip". A window will pop up for you to connect your MetaMask with our application.

![ezgif com-video-to-gif (6)](https://github.com/CodeNameNoah/TipJar/assets/128002901/63447017-ac4f-457a-be08-16e689f04931)

![ezgif com-video-to-gif (7)](https://github.com/CodeNameNoah/TipJar/assets/128002901/408d0349-a9a1-4440-b6cf-e5836793e481)

### Sending a Tip

Once connected, you can input the Ethereum address of the recipient and the amount of Ether you want to send as a tip. 
Clicking on "Send Tip" will prompt you to confirm the transaction in MetaMask.

![ezgif com-video-to-gif (10)](https://github.com/CodeNameNoah/TipJar/assets/128002901/0fde2354-7f04-4f06-8ae5-91689f2788d0)


### Using a Link with a URL Parameter

To make it easier for users to send a tip to a specific address, you can include the recipient's address as a URL parameter. 
Here is an example of how to construct such a link:

https://mytipjar.herokuapp.com/?address=0x08bE1b402447c12E7Da7D454d77641086878a8D5


In this example, `0x08bE1b402447c12E7Da7D454d77641086878a8D5` should be replaced with the actual Ethereum address of the recipient. When a user clicks on this link, 
the Ethereum address is automatically filled in, saving the user the trouble of having to manually input it.

![ezgif com-video-to-gif (11)](https://github.com/CodeNameNoah/TipJar/assets/128002901/5ffcd087-80d1-4dc2-a893-ff509e2f095c)


### Running the GraphQL Server

To run the GraphQL server, use the command: `node server.js`. The server will start on `http://localhost:4000/graphql`.

### Disconnecting from MetaMask

If you want to disconnect your MetaMask account from TipJar, follow these steps:

1. Open the MetaMask extension. You should see your account details.
2.  Click on "Connected". This will open a new page showing a list of all the websites your MetaMask wallet is currently connected to.
3.  Click on the 3 dots on the account you wish to disconnect and then proceed to disconnect.
4.  Your MetaMask account should now be disconnected from TipJar. If you want to connect again in the future, you'll need to go through the connection process again.

![ezgif com-video-to-gif (8)](https://github.com/CodeNameNoah/TipJar/assets/128002901/c1b83f5b-caf7-4fba-b86b-75429bc969ea)

## Future Improvements

We're always looking to make TipJar better and more efficient. Some potential future improvements include:

- Integration with other Ethereum wallets.
- Support for tipping in ERC-20 tokens.

## Contributing

We welcome contributions from the community. If you have a feature request, bug report, or want to contribute to the code, please open an issue or submit a pull request.

## License

TipJar is open-source software licensed under the MIT license.

Enjoy using TipJar! We hope it makes your Ethereum tipping experience more enjoyable and efficient.
