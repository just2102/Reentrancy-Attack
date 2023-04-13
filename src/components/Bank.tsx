import { BigNumber, Contract, ethers } from "ethers";
import { useState } from "react";
import { useAccount, useContract, useProvider, useSigner, useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi'
import bankInterface from "../Bank.sol/Bank.json"

const Bank = () => {
  const bankCode = `// SPDX-License-Identifier: MIT

  pragma solidity ^0.8.18;
    
  contract Bank {
    mapping (address => uint) balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw() public {
      uint amountToWithdraw = balances[msg.sender];
      require(amountToWithdraw > 0, "user has 0 balance");
    
      (bool sent, ) = msg.sender.call{value: amountToWithdraw}("");
    
      require(sent, "Failed to send ETH");
            
      balances[msg.sender] = 0;  // UPDATE BEFORE TRANSFER (vulnerability)
      }
    
    function getCurrentBalance() public view returns(uint) {
      return address(this).balance;
    }
  }
// CONTRACT ADDRESS: 0x7FB3F5c8E8133C52966435118F0aF14054E40fBe
// sepolia.etherscan.io/address/0x7FB3F5c8E8133C52966435118F0aF14054E40fBe`;

  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner()
  const bankAddress = "0x7FB3F5c8E8133C52966435118F0aF14054E40fBe"

  const [displayedBalance, setDisplayedBalance] = useState("");
  const {data: balance, isLoading:isLoadingBalance} =  useContractRead({
    address: bankAddress,
    abi: bankInterface.abi,
    functionName: 'getCurrentBalance',
    onSuccess(balance:BigNumber) {
      setDisplayedBalance(ethers.utils.formatEther(balance))
    },
    watch: true
  })

  const {config: depositConfig} = usePrepareContractWrite({
    address: bankAddress,
    abi: bankInterface.abi,
    functionName: 'deposit',
    overrides: {
      value: ethers.utils.parseEther('0.2'),
      gasLimit: BigNumber.from(3000000)
    }
  })
  const {data: depositTx, isLoading: isLoadingDeposit, write: deposit} = useContractWrite(depositConfig)

  return (
    <div className="contract bank">
      <button disabled={!deposit} onClick={()=>deposit?.()}>Deposit (0.2 ETH)</button>
        <pre>
          <span>Balance: {displayedBalance ? displayedBalance : '...'}</span>
          <code>{bankCode}</code>
        </pre>
      <div className="contract_actions">
      </div>
    </div>
  );
};

export default Bank;
