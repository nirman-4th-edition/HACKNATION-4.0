import "./SummaryDisplay.css";

const SummaryDisplay = ({ summary }) => {
    return (
        <div className="summary-container">
            <h3>Summary:</h3>
            <div 
                className="summary-content"
                dangerouslySetInnerHTML={{ __html: summary || "No summary yet" }} 
            />
        </div>
    );
};

export default SummaryDisplay;
