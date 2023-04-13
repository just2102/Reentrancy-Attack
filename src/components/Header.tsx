import { Web3Button } from "@web3modal/react";
import githubLogo from "../assets/github.svg"

const Header = () => {
    return ( 
        <header className="header">
            <Web3Button></Web3Button>

            <a className="logo" href="https://github.com/just2102/Reentrancy-Attack" target="_blank" ><img src={githubLogo} alt="github.com/just2102" /></a>

        </header>
     );
}
 
export default Header;