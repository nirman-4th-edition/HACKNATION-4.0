import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingContract from "../contracts/Voting.json"; // Adjust the path if needed

const Voting = () => {
    const [account, setAccount] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [voteStatus, setVoteStatus] = useState("");

    useEffect(() => {
        console.log("Using Contract ABI:", VotingContract.abi);
        console.log("Using Contract Address:", VotingContract.networks[5777]?.address || "Not Found");
        loadBlockchainData();
    }, []);

    async function loadBlockchainData() {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                if (accounts.length === 0) {
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                }
                setAccount(accounts[0]);

                const contractAddress = VotingContract.networks[5777]?.address;
                if (!contractAddress) {
                    console.error("Contract address not found. Check deployment.");
                    return;
                }

                const votingContract = new web3.eth.Contract(VotingContract.abi, contractAddress);
                const candidateCount = await votingContract.methods.candidatesCount().call();
                let candidatesArray = [];

                for (let i = 1; i <= candidateCount; i++) {
                    const candidate = await votingContract.methods.getCandidate(i).call();
                    candidatesArray.push({
                        id: candidate[0],
                        name: candidate[1],
                        votes: candidate[2],
                    });
                }

                setCandidates(candidatesArray);
            } catch (error) {
                console.error("Error loading blockchain data:", error);
            }
        } else {
            alert("Please install MetaMask.");
        }
    }

    async function voteCandidate(candidateId) {
        if (!account) {
            alert("Connect MetaMask first!");
            return;
        }

        try {
            const web3 = new Web3(window.ethereum);
            const contractAddress = VotingContract.networks[5777]?.address;
            const votingContract = new web3.eth.Contract(VotingContract.abi, contractAddress);

            await votingContract.methods.vote(candidateId).send({ from: account });

            setVoteStatus(`Voted successfully for Candidate ${candidateId}`);
            loadBlockchainData(); // Refresh UI
        } catch (error) {
            console.error("Voting error:", error);
            setVoteStatus("Error voting: " + error.message);
        }
    }

    return (
        <div>
            <h1>Blockchain Voting System</h1>
            <p>Connected Account: {account || "Not Connected"}</p>

            <h2>Candidates</h2>
            {candidates.length === 0 ? (
                <p>Loading candidates...</p>
            ) : (
                <ul>
                    {candidates.map((candidate) => (
                        <li key={candidate.id}>
                            {candidate.name} - {candidate.votes} votes
                            <button onClick={() => voteCandidate(candidate.id)}>Vote</button>
                        </li>
                    ))}
                </ul>
            )}

            <p>{voteStatus}</p>
        </div>
    );
};

export default Voting;