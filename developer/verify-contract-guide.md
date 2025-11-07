---
outline: deep
---

# Verify Smart Contract On Explorer Guide

Jovay Explorer now supports smart contract verification. You can verify your smart contracts by providing the source code files or by using the Solidity Standard JSON Input file. This guide will walk you through both methods.

You can find the contract verification feature in the block explorer's navigation:

![Verify Contract Nav](/Images/verify-contract-guide/verify-nav.png)

## Method 1: Using Raw Contract Source Files

This method is suitable for simple contracts that do not use external libraries like OpenZeppelin.

### Step 1: Initial Setup

1.  Navigate to the contract verification page on Jovay Scan.
2.  Enter the address of the smart contract you want to verify.
3.  For the "Compiler Input Type," select "Solidity Source File."
4.  Choose the correct "Solidity Compiler Version" from the dropdown menu.
5.  Check the box next to "I agree to the terms of service."
6.  Click "Continue."

![Step 1: Initial Setup](/Images/verify-contract-guide/verify-single-file-step1.png)

### Step 2: Uploading Source Files and Configuration

1.  Upload all the Solidity source files for your contract.
2.  Specify whether you enabled optimization during compilation.
3.  If optimization was enabled, enter the number of optimization runs.
4.  Select the target EVM version.
5.  From the "Contract Identifier" dropdown, choose the contract file that was used for deployment.
6.  If your contract uses any library contracts, add them in the "Library Contracts" section.
7.  Click "Verify."

![Step 2: Uploading Source Files](/Images/verify-contract-guide/verify-single-file-step2.png)

### Step 3: Verification Complete

If the verification is successful, you will see a success message with a link to the verified contract on Jovay Scan.

![Step 3: Verification Successful](/Images/verify-contract-guide/verify-single-file-step3.png)

### Step 4: View Verified Contract

After successful verification, you can view the contract's source code, read and write functions, and other details on Jovay Scan.

![Step 4: Verified Contract Interface 1](/Images/verify-contract-guide/verify-single-file-step4-2.png)

![Step 4: Verified Contract Interface 2](/Images/verify-contract-guide/verify-single-file-step4-2.png)

## Method 2: Using Solidity Standard Input JSON File

This method is recommended for more complex contracts, especially those that use external libraries.

### Step 1: Initial Setup

1.  Follow the same initial setup steps as in Method 1, but for the "Compiler Input Type," select "Solidity Standard Json Input."

![Step 1: Initial Setup for JSON](/Images/verify-contract-guide/verify-json-file-step1.png)

### Step 2: Generating and Uploading the JSON File

1.  For projects using Foundry, you can generate the Standard Input JSON file by running the following command:

    ```bash
    forge verify-contract --show-standard-json-input <CONTRACT_ADDRESS> <CONTRACT_IDENTIFIER> > output.json
    ```

2.  Upload the generated JSON file, eg. `output.json`.
3.  The remaining steps are similar to Method 1. You will need to configure the optimization settings, EVM version, and any library contracts.
4.  Click "Verify."

![Step 2: Uploading JSON File](/Images/verify-contract-guide/verify-json-file-step2.png)

### Step 3: Verification Complete

Upon successful verification, you will receive a confirmation message with a link to your verified contract.

![Step 3: Verification Successful](/Images/verify-contract-guide/verify-json-file-step3.png)
