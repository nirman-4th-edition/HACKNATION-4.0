const meetings = {
    "2024-09-05": ["Meeting with advocate at 10:00 AM"],
    "2024-09-07": ["Meeting with the verification advisor at 12:35 PM"]
};

const schedules = {
    "2024-09-15": ["Court Visit"],
    "2024-09-30": ["Document verification visit at 2:00 PM"]
};
function createCalendar(elementId, events, detailsId) {
    const calendar = document.getElementById(elementId);
    const details = document.getElementById(detailsId);
    let currentOpenDate = null; 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    calendar.innerHTML = '';
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(dayName => {
        const dayNameElement = document.createElement('div');
        dayNameElement.className = 'day-name';
        dayNameElement.textContent = dayName;
        calendar.appendChild(dayNameElement);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day';
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        dayElement.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (events[dayElement.dataset.date]) {
            dayElement.classList.add('highlighted-day');
        }

        dayElement.addEventListener('click', () => {
            if (currentOpenDate === dayElement.dataset.date) {
                details.innerHTML = '';
                currentOpenDate = null;
            } else {
                details.innerHTML = `<h3>Details for ${dayElement.dataset.date}</h3><p>${events[dayElement.dataset.date].join('</p><p>')}</p>`;
                currentOpenDate = dayElement.dataset.date;
            }
        });

        calendar.appendChild(dayElement);
    }
}
createCalendar('calendar', meetings, 'meeting-details');
createCalendar('schedule-calendar', schedules, 'schedule-details');
