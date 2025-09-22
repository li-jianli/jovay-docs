---
outline: deep
---

# Create and Deploy Your First Token
This guide walks you through the process of building and deploying an **ERC-20 token** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Hardhat** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Hardhat? No problem. This document follows standard Hardhat practices and includes all the steps you need to get started with confidence.

By the end, you’ll have:
- A working token contract
- Experience deploying and verifying smart contracts
- The skills to interact with your token on-chain

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
    cd JovayExamples/hardhat/ERC20Example/
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

## Step 3: Write the Token Contract
1. Create a New Solidity File:
    ```bash
    touch contracts/MyToken.sol
    ```

2. Paste the following code into `contracts/MyToken.sol`:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract MyToken is ERC20 {
        constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
            _mint(msg.sender, initialSupply);
        }

        function decimals() public pure override returns (uint8) {
            return 6;
        }
    }
    ```

3. Compile the Smart Contract:
    ```bash
    npx hardhat compile
    ```
4. Test the Smart Contract (optional but recommended):
    ```bash
    touch test/MyToken.js
    ```

5. Paste the following code into `test/MyToken.js`:
    ```javascript
    const { expect } = require("chai");
    const { ethers } = require("hardhat");

    describe("MyToken", function () {
        let MyToken;
        let myToken;
        let owner;
        let addr1;

        beforeEach(async function () {
            [owner, addr1] = await ethers.getSigners();

            MyToken = await ethers.getContractFactory("MyToken");
            initialSupply = ethers.parseUnits("1000", 6);
            myToken = await MyToken.deploy(initialSupply);
            await myToken.waitForDeployment();
        });

        it("Should assign the total supply to the owner", async function () {
            const ownerBalance = await myToken.balanceOf(owner.address);
            expect(await myToken.totalSupply()).to.equal(ownerBalance);
        });

        it("Should transfer tokens between accounts", async function () {
            const sendAmount = ethers.parseUnits("100", 6);

            await myToken.transfer(addr1.address, sendAmount);

            expect(await myToken.balanceOf(addr1.address)).to.equal(sendAmount);
            expect(await myToken.balanceOf(owner.address)).to.equal(
            (await myToken.totalSupply()) - sendAmount
            );
        });

        it("Should have 6 decimals", async function () {
            expect(await myToken.decimals()).to.equal(6);
        });
    });
    ```

6. Test it:
    ```bash
    npx hardhat test
    ```

## Step 4: Deploy the Token Contract
1. Create a Deployment Script:
    ```bash
    touch scripts/deploy.js
    ```
2. Paste the following code into `scripts/deploy.js`:
    ```javascript
    async function main() {
        const Token = await ethers.getContractFactory("MyToken");
        const gasLimit = 3_000_000; // or use estimated gas or default
        const token = await Token.deploy(ethers.parseUnits("1000", 6), { gasLimit: gasLimit });
        await token.waitForDeployment();

        console.log("Token address:", await token.getAddress());
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

    ![Deploy Suucess](/Images/foundry-hardhat-tutorial/deploy-success-token-hardhat.png)


## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Can't interact with the contract?** Double-check the contract address and ABI.
- **Transfer fails?** Confirm your wallet has enough balance.

## ✅ Conclusion
You’ve just built, deployed, and verified your first token on the Jovay blockchain using Hardhat! This process covers the basics of smart contract development, deployment, and verification — essential skills for any Web3 developer.

If you run into issues, refer back to this guide or check out the official [Hardhat documentation](https://hardhat.org/docs).

Happy coding! 🚀
