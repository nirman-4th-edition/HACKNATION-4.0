document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const currentDate = new Date().toLocaleString();
    addLog(currentDate, 'Shreyash Mohapatra', 'example.zip');
});

function addLog(date, username, filename) {
    const logSection = document.getElementById('logs');
    const noLogs = document.getElementById('no-logs');

    noLogs.style.display = 'none';

    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `
        <span>${date}</span>
        <span>${username}</span>
        <span>${filename}</span>
        <button class="remove-btn">REMOVE</button>
    `;

    logItem.querySelector('.remove-btn').addEventListener('click', function() {
        logSection.removeChild(logItem);
        if (logSection.children.length === 0) {
            noLogs.style.display = 'block';
        }
    });

    logSection.insertBefore(logItem, logSection.firstChild);
}
