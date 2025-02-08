const contentData = {
    basics: `<h1>Basics of Financial Literacy</h1>
             <p>Understanding personal finance is key to financial independence. Learn how to manage money, set goals, and make smart financial decisions.</p>
             <ul>
                <li>Introduction to Personal Finance</li>
                <li>Importance of Financial Literacy</li>
                <li>Key Financial Terms (Income, Expenses, Assets, Liabilities)</li>
             </ul>`,

    budgeting: `<h1>Budgeting & Money Management</h1>
                <p>Budgeting helps you track income and expenses to maintain financial stability.</p>
                <ul>
                    <li>How to Create a Budget</li>
                    <li>50/30/20 Rule of Budgeting</li>
                    <li>Expense Tracking & Categorization</li>
                    <li>Saving Strategies & Emergency Funds</li>
                </ul>`,

    saving: `<h1>Saving & Investing</h1>
             <p>Saving builds security, while investing grows wealth. Learn the fundamentals of both.</p>
             <ul>
                <li>Types of Savings Accounts</li>
                <li>Introduction to Investing (Stocks, Bonds, ETFs, Mutual Funds)</li>
                <li>Risk vs. Reward in Investing</li>
                <li>Compound Interest & Wealth Growth</li>
             </ul>`,

    banking: `<h1>Banking & Credit Management</h1>
              <p>Understanding banking and credit is essential for smart money management.</p>
              <ul>
                <li>Types of Bank Accounts</li>
                <li>Credit Scores & How They Work</li>
                <li>How to Build & Improve Credit Score</li>
                <li>Credit Cards: Pros, Cons & Best Practices</li>
              </ul>`
};

function showContent(topic) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = contentData[topic] || '<p>Content not found.</p>';
}

// Show default content on page load
showContent('basics');