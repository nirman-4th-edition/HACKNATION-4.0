import React from "react";
import SideBar from "../Layout/SideBar";
import ChatPanel from "../Chatting/ChatPanel";
import axios from "axios";

const Home = () => {
  // Change it to a useEffect for fetching username on mount

  async function getUserName() {
    const response = await axios.get("http://localhost:3001/users/name", {
      headers: {
        token: localStorage.getItem("authToken"),
      },
    });
    console.log(response.data.username);
    localStorage.setItem("username", response.data.username.toString());

    return response.data.username;
  }

  getUserName();

  return (
    <>
      <div className="flex justify-center">
        <SideBar />
        <ChatPanel />
      </div>
    </>
  );
};

export default Home;
