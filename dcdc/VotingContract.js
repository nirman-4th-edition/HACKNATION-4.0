// // src/components/VotingContract.js

// import VotingJson from '../contracts/Voting.json'; // Correct path to Voting.json
// //const contractAddress = '0xf362d544e4Fd43a1862d1E113C90C7919Cdf82B4';

// const VotingContract = {
//   abi: VotingJson.abi, // Accessing the ABI from the Voting.json file
//   address: VotingJson.networks.address,
// };

// export default VotingContract;


import VotingJson from '../contracts/Voting.json'; // Correct path to Voting.json

const networkId = Object.keys(VotingJson.networks)[0]; // Get the first network ID from compiled contract
const contractAddress = VotingJson.networks[networkId]?.address; // Get the deployed contract address

const VotingContract = {
  abi: VotingJson.abi, // ABI from compiled contract JSON
  address: contractAddress || "0x0000000000000000000000000000000000000000", // Default to prevent errors if undefined
};

export default VotingContract;