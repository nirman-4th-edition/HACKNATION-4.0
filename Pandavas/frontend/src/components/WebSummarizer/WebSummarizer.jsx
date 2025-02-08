import { useState } from "react";
import { summarizeWeb } from "../../api";
import "./WebSummarizer.css";
import ReactMarkdown from "react-markdown";


const MarkdownRenderer = ({ text }) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
};

function WebSummarizer() {
    const [pageUrl, setPageUrl] = useState("");
    const [summary, setSummary] = useState("");
    // const [chatHistory, setChatHistory] = useState([]);


    const handleSummarize = async () => {
        if (!pageUrl) return;
        try {
          const response = await fetch(`http://localhost:5001/summarize_web`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: pageUrl })
          });
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let streamedSummary = "";
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunk = decoder.decode(value);
            streamedSummary += chunk;
            setSummary(streamedSummary); // Update state to show streaming results
          }
        } catch (error) {
          console.error("Error summarizing webpage:", error);
          setSummary("There was an error processing the request.");
        }
      };
      

    return (
        <div className="pdf-container">
            <h1>Web Page Summarizer</h1>
            <input 
                type="text" 
                value={pageUrl} 
                onChange={(e) => setPageUrl(e.target.value)} 
                placeholder="Enter Web Page URL" 
                style={{width:"100vh"}} 
            />
            <button onClick={handleSummarize}>Summarize</button>

            {summary && (
            <div>
                <h2>Summary</h2>
                <div className="summary-container">
                <MarkdownRenderer text={summary} />
                </div>
            </div>
            )}
        </div>
    );
}

export default WebSummarizer;