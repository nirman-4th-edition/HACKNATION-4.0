import "./ChatInterface.css";

const ChatInterface = ({ chatInput, setChatInput, chatResponse, handleChat, handleResetChat }) => {
    return (
        <div className="chat-container">
            <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                placeholder="Ask a question..." 
            />
            <button onClick={handleChat}>Chat</button>
            <button onClick={handleResetChat} className="reset-btn">Reset Chat</button>
            <p>{chatResponse || "No response yet"}</p>
        </div>
    );
};

export default ChatInterface;
