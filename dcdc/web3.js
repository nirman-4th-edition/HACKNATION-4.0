
import Web3 from "web3";

let web3;
if (typeof window.ethereum !== "undefined") {
  // If using MetaMask
  web3 = new Web3(window.ethereum);
  await window.ethereum.enable();  // Request account access if needed
} else {
  // If using Ganache locally
  web3 = new Web3("http://127.0.0.1:8546");  // Point to Ganache's port
}
