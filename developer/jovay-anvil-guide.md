---
outline: deep
---

# Using Jovay with Anvil

[Anvil](https://book.getfoundry.sh/anvil/) is a local testnet node included with Foundry that you can use for testing your contracts. It can also be used to fork other networks, allowing you to test against real-world contract state without needing testnet funds or waiting for transaction times.

This guide will show you how to use Anvil to fork the Jovay Testnet for local development.

## Prerequisites

You must have [Foundry](https://getfoundry.sh/) installed.

## Forking the Jovay Testnet

To fork the Jovay Testnet, you will need its RPC URL.

| Network | RPC URL | Chain ID |
| :--- | :--- | :--- |
| **Jovay Testnet** | `https://api.zan.top/public/jovay-testnet` | `2019775` |

Open your terminal and run the following command to start a local Anvil instance that forks the Jovay Testnet at the latest block:

```bash
anvil --fork-url https://api.zan.top/public/jovay-testnet
```

Anvil will start, and you will see a list of available accounts and their private keys. This local fork behaves like the real Jovay Testnet, but it runs on your machine and gives you 10 accounts with 10000 ETH each.

The local Anvil node will be available at `http://127.0.0.1:8545`.

### Forking at a Specific Block

Forking from a specific block number ensures a deterministic state, which is useful for running tests or debugging specific transactions.

You can fork from a specific block by adding the `--fork-block-number` flag:

```bash
anvil --fork-url https://api.zan.top/public/jovay-testnet --fork-block-number <BLOCK_NUMBER>
```

Replace `<BLOCK_NUMBER>` with the block number you want to fork from.

## Example: Interacting with the Fork

Once your Anvil fork is running, you can interact with it using Foundry's `cast` tool or by writing scripts and tests.

### Call a Contract Function

Let's use `cast` to call a read-only function on a deployed ERC20 token contract. We'll fetch the `symbol` of a token on the testnet.

Open a **new terminal window** (leaving Anvil running) and use the following command. Note that we are pointing `cast` to our local Anvil RPC URL and calling the `symbol()` function on the token contract.

```bash
cast call --rpc-url http://127.0.0.1:8545 0x8d53dcf0bb191743a2b7db56a9feb284164f690f "symbol()"
```

This command will call the `symbol()` function and return the result. `cast` automatically decodes the string, so you should see the token's symbol printed in your terminal, proving that you are successfully interacting with the forked state of the Jovay Testnet.

## Conclusion

Using Anvil to fork the Jovay Testnet provides a powerful environment for local development and testing. It allows you to build and test your applications against the live network's state with the speed and convenience of a local blockchain.
