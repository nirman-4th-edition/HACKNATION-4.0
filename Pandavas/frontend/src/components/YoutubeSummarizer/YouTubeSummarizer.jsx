import { useState } from "react";
import "./YouTubeSummarizer.css";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ text }) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
};

function YouTubeSummarizer() {
    const [videoUrl, setVideoUrl] = useState("");
    const [summary, setSummary] = useState("");

    const handleSummarize = async () => {
        setSummary("");
    
        const response = await fetch("http://localhost:5001/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ video_url: videoUrl }),
        });
    
        if (!response.body) {
            console.error("No response body");
            return;
        }
    
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
    
            const chunk = decoder.decode(value, { stream: true });
            setSummary((prev) => prev + chunk);
        }
    };
    

    return (
        <div className="summarizer-container">
            <h1>YouTube Summarizer</h1>
            <input 
                type="text" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)} 
                placeholder="Enter YouTube URL" 
            />
            <button onClick={handleSummarize}>Summarize</button>
            <div className="summary-container">
                <MarkdownRenderer text={summary} />
            </div>
        </div>
    );
}

export default YouTubeSummarizer;
