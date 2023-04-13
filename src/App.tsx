import { useState } from "react";
import "./App.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import Header from "./components/Header";
import Attack from "./components/Attack";
import Bank from "./components/Bank";
import { Contract } from "ethers";

const chains = [sepolia];
const projectId = "00fcfd24ba80db0936d2a46823796325";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Header></Header>
        <Bank></Bank>
        <Attack></Attack>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
