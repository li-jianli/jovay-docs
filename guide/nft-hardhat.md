---
outline: deep
---

# Create and Deploy Your First NFT
This guide walks you through the process of creating and deploying your own **ERC-721 NFT** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Hardhat** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Hardhat? No problem. This document follows standard Hardhat practices and includes all the steps you need to get started with confidence.

By the end, you’ll have:
- A working NFT contract
- Experience deploying and verifying smart contracts
- The skills to interact with your NFT on-chain

Before you begin, please note the connection details for the network you are targeting:

| Network | RPC URL | Chain ID |
| --- | --- | --- |
| Jovay Mainnet | `https://rpc.jovay.io` | `5734951` |
| Jovay Testnet | `https://api.zan.top/public/jovay-testnet` | `2019775` |


This guide will use the **Testnet** configuration in its examples.

## 🧰 Prerequisites

Before starting, make sure you have:
- **Node.js** – Install from [nodejs.org](https://nodejs.org/)
- **Have an account with funds** – You can get DEV tokens for testing on Jovay once every 24 hours from the [Faucet](https://zan.top/faucet/jovay)
- **Access to Jovay Devnet or Testnet** – To deploy and interact with your token, you will need to have your own endpoint and API key, which you can get from one of the supported [QuickStart](./developer-quickstart.md)

## Step 1: Set Up Your Project
1. Download the example repository:
    ```bash
    wget 'https://web3-static-prod.oss-ap-southeast-1.aliyuncs.com/static/Jovay/JovayExamples.tar.gz'
    tar -xvzf JovayExamples.tar.gz
    cd JovayExamples/hardhat/ERC721Example/
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Step 2: Configure the Project
Now that you have the project set up, the next step is to configure your Hardhat environment to connect to the Jovay network.

### 1. (Optional) Generate a Private Key
To deploy contracts, you need a wallet with a private key. If you don't have one, you can generate a new one.

First, install `ethers.js` in your project (it might already be installed as a dependency of Hardhat):
```bash
npm i ethers
```

Next, create a file named `gen_eth_key.js` in your project root:
```bash
touch gen_eth_key.js
```

Paste the following code into `gen_eth_key.js`:
```javascript
const { ethers } = require('ethers');
const wallet = ethers.Wallet.createRandom();
console.log('Private Key:', wallet.privateKey);
console.log('Address    :', wallet.address);
```

Run the script to generate a new keypair:
```bash
node gen_eth_key.js
```

The output will give you a new `Private Key` and `Address`. **Save these securely.** You will use the `Private Key` in the next step. Remember to also send some testnet funds to the new `Address` using the [Jovay Faucet](https://zan.top/faucet/jovay).

### 2. Create a `.env` file
Create a `.env` file in your project root to store your sensitive data. This allows you to configure both testnet and mainnet.
```bash
touch .env
```

Add your network RPC URLs and **wallet private keys** to the `.env` file. You can get the RPC URL from the table at the top of this guide. **Remember to never commit this file to version control.**
```
# Testnet Configuration
JOVAY_TESTNET_RPC_URL="https://api.zan.top/public/jovay-testnet"
TESTNET_PRIVATE_KEY="YOUR_TESTNET_WALLET_PRIVATE_KEY"

# Mainnet Configuration (Optional)
# JOVAY_MAINNET_RPC_URL="https://rpc.jovay.io"
# MAINNET_PRIVATE_KEY="YOUR_MAINNET_WALLET_PRIVATE_KEY"
```

### 3. Install `dotenv`
Install `dotenv` to allow Hardhat to read your environment variables.
```bash
npm install dotenv
```

### 4. Update `hardhat.config.js`
Update `hardhat.config.js` to support multiple networks. Replace the entire content of your `hardhat.config.js` with the following code. This configuration points to the variables you just defined in your `.env` file.
```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    jovay_mainnet: {
      url: process.env.JOVAY_MAINNET_RPC_URL || "",
      chainId: 5734951,
      accounts:
        process.env.MAINNET_PRIVATE_KEY !== undefined ? [process.env.MAINNET_PRIVATE_KEY] : [],
    },
    jovay_testnet: {
      url: process.env.JOVAY_TESTNET_RPC_URL || "",
      chainId: 2019775,
      accounts:
        process.env.TESTNET_PRIVATE_KEY !== undefined ? [process.env.TESTNET_PRIVATE_KEY] : [],
    }
  },
};
```

## Step 3: Write the NFT Contract
1. Create a New Solidity File:
    ```bash
    touch contracts/MyNFT.sol
    ```

2. Paste the following code into `contracts/MyNFT.sol`:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract MyNFT is ERC721, Ownable {
        uint256 public nextTokenId;
        mapping(uint256 => string) private _tokenURIs;

        event Minted(address to, uint256 tokenId, string tokenURI);

        constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

        function mint(address recipient, string calldata _tokenURI) external onlyOwner {
            uint256 tokenId = nextTokenId;
            nextTokenId++;

            _safeMint(recipient, tokenId);
            _tokenURIs[tokenId] = _tokenURI;

            emit Minted(recipient, tokenId, _tokenURI);
        }

        function tokenURI(uint256 tokenId) public view override returns (string memory) {
            _requireOwned(tokenId);

            return _tokenURIs[tokenId];
        }
    }
    ```

3. Compile the Smart Contract:
    ```bash
    npx hardhat compile
    ```
4. Test the Smart Contract (optional but recommended):
    ```bash
    touch test/MyNFT.js
    ```

5. Paste the following code into `test/MyNFT.js`:
    ```javascript
    const { expect } = require("chai");
    const { ethers } = require("hardhat");

    describe("MyNFT", function () {
        let MyNFT;
        let myNFT;
        let owner;
        let addr1;
        let tokenURI = "https://example.com/token/1";

        beforeEach(async function () {
            [owner, addr1] = await ethers.getSigners();

            MyNFT = await ethers.getContractFactory("MyNFT");
            myNFT = await MyNFT.deploy();
            await myNFT.waitForDeployment();
        });

        it("Should mint an NFT and set tokenURI correctly", async function () {
            const tx = await myNFT.mint(addr1.address, tokenURI);
            await tx.wait();

            expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await myNFT.tokenURI(0)).to.equal(tokenURI);
        });

        it("Should only allow owner to mint", async function () {
            await expect(
            myNFT.connect(addr1).mint(addr1.address, tokenURI)
            ).to.be.revertedWithCustomError(myNFT, 'OwnableUnauthorizedAccount');
        });

        it("Should increment tokenId on each mint", async function () {
            await myNFT.mint(addr1.address, tokenURI);
            await myNFT.mint(addr1.address, tokenURI);

            expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await myNFT.nextTokenId()).to.equal(2);
        });
    });
    ```

6. Test it:
    ```bash
    npx hardhat test
    ```

## Step 4: Deploy the NFT Contract
1. Create a Deployment Script:
    ```bash
    touch scripts/deploy.js
    ```
2. Paste the following code into `scripts/deploy.js`:
    ```javascript
    async function main() {
        const MyNFT = await ethers.getContractFactory("MyNFT");

        const gasLimit = 3_000_000; // or use estimated gas or default
        const myNFT = await MyNFT.deploy({ gasLimit: gasLimit });

        await myNFT.waitForDeployment();

        console.log("MyNFT deployed to:", await myNFT.getAddress());
    }

    main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
    ```

3. Deploy the contract to the desired network. This example uses the testnet:
    ```bash
    npx hardhat run scripts/deploy.js --network jovay_testnet
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Deploy Suucess](/Images/foundry-hardhat-tutorial/deploy-success-nft-hardhat.png)


## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Can't interact with the contract?** Double-check the contract address and ABI.
- **Transfer fails?** Confirm your wallet has enough balance.

## ✅ Conclusion
You’ve just built, deployed, and verified your first NFT on the Jovay blockchain using Hardhat! This process covers the basics of smart contract development, deployment, and verification — essential skills for any Web3 developer.

If you run into issues, refer back to this guide or check out the official [Hardhat documentation](https://hardhat.org/docs).

Happy coding! 🚀
