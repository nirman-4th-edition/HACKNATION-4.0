// Add current date time
       

        function updateDateTime() {
            const now = new Date();
            
            // Format date
            const dateOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            const formattedDate = now.toLocaleDateString('en-US', dateOptions);
            
            // Format time
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            };
            const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
            
            // Additional information
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                          'August', 'September', 'October', 'November', 'December'];
                          
            const dayOfWeek = days[now.getDay()];
            const dayOfMonth = now.getDate();
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            
            // Calculate day suffix (st, nd, rd, th)
            function getDaySuffix(day) {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }
            
            const daySuffix = getDaySuffix(dayOfMonth);
            
            // Update DOM elements
            // document.getElementById('current-date').textContent = formattedDate;
            document.getElementById('additional-info').textContent = 
            `${dayOfWeek}, ${month} ${dayOfMonth}${daySuffix}, ${year}`;
            document.getElementById('current-time').textContent = formattedTime;
           
        }


        const apiKey = 'd74333bc0822bfc435a8fbdac5fa24eb'; // Replace with your OpenWeatherMap API key
        const cityInput = document.getElementById('cityInput');

        // Weather icon SVGs
        const weatherIcons = {
            clear: `
                <svg viewBox="0 0 100 100" class="sun">
                    <circle cx="50" cy="50" r="20" fill="#FFD700" />
                    <g stroke="#FFD700" stroke-width="2">
                        <line x1="50" y1="15" x2="50" y2="25" />
                        <line x1="50" y1="75" x2="50" y2="85" />
                        <line x1="15" y1="50" x2="25" y2="50" />
                        <line x1="75" y1="50" x2="85" y2="50" />
                        <line x1="25" y1="25" x2="35" y2="35" />
                        <line x1="65" y1="65" x2="75" y2="75" />
                        <line x1="25" y1="75" x2="35" y2="65" />
                        <line x1="65" y1="35" x2="75" y2="25" />
                    </g>
                </svg>`,
            clouds: `
                <svg viewBox="0 0 100 100" class="cloud">
                    <path d="M25,60 a20,20 0 0,1 0,-40 h50 a20,20 0 0,1 0,40 z" 
                          fill="#fff" />
                    <circle cx="25" cy="40" r="15" fill="#fff" />
                    <circle cx="75" cy="40" r="15" fill="#fff" />
                    <circle cx="50" cy="30" r="20" fill="#fff" />
                </svg>`,
            rain: `
                <svg viewBox="0 0 100 100">
                    <g class="cloud">
                        <path d="M25,60 a20,20 0 0,1 0,-40 h50 a20,20 0 0,1 0,40 z" 
                              fill="#B4B4B4" />
                    </g>
                    <g class="rain">
                        <line x1="30" y1="65" x2="30" y2="75" stroke="#4FA1DE" stroke-width="2" />
                        <line x1="40" y1="70" x2="40" y2="80" stroke="#4FA1DE" stroke-width="2" />
                        <line x1="50" y1="65" x2="50" y2="75" stroke="#4FA1DE" stroke-width="2" />
                        <line x1="60" y1="70" x2="60" y2="80" stroke="#4FA1DE" stroke-width="2" />
                        <line x1="70" y1="65" x2="70" y2="75" stroke="#4FA1DE" stroke-width="2" />
                    </g>
                </svg>`,
            snow: `
                <svg viewBox="0 0 100 100">
                    <g class="cloud">
                        <path d="M25,60 a20,20 0 0,1 0,-40 h50 a20,20 0 0,1 0,40 z" 
                              fill="#B4B4B4" />
                    </g>
                    <g class="snow">
                        <circle cx="30" cy="70" r="2" fill="white" />
                        <circle cx="40" cy="75" r="2" fill="white" />
                        <circle cx="50" cy="70" r="2" fill="white" />
                        <circle cx="60" cy="75" r="2" fill="white" />
                        <circle cx="70" cy="70" r="2" fill="white" />
                    </g>
                </svg>`
        };

        // Handle Enter key
        cityInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                getWeather();
            }
        });

        async function getWeather() {
            const city = cityInput.value.trim();
            if (!city) return;

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                );

                if (!response.ok) throw new Error('City not found');

                const data = await response.json();
                updateWeather(data);
            } catch (error) {
                alert('City not found. Please try again.');
            }
        }

        function updateWeather(data) {
            // Update location
            document.getElementById('location').textContent = 
                `${data.name}, ${data.sys.country}`;

            // Update temperature
            document.getElementById('temperature').textContent = 
                `${Math.round(data.main.temp)}°C`;

            // Update description
            document.getElementById('description').textContent = 
                data.weather[0].description;

            // Update weather icon based on weather condition
            const weatherMain = data.weather[0].main.toLowerCase();
            const iconContainer = document.getElementById('weather-icon');
            
            if (weatherMain.includes('clear')) {
                iconContainer.innerHTML = weatherIcons.clear;
            } else if (weatherMain.includes('cloud')) {
                iconContainer.innerHTML = weatherIcons.clouds;
            } else if (weatherMain.includes('rain')) {
                iconContainer.innerHTML = weatherIcons.rain;
            } else if (weatherMain.includes('snow')) {
                iconContainer.innerHTML = weatherIcons.snow;
            } else {
                iconContainer.innerHTML = weatherIcons.clear; // default
            }
        }

        // Optional: Load default city weather
        window.onload = function() {
            cityInput.value = 'Bhubaneswar';
            getWeather();
        }


        // Update immediately when page loads
        updateDateTime();

        // Update every second
        setInterval(updateDateTime, 1000);

        // // Handle navigation
        // const navLinks = document.querySelectorAll('.nav-links a');
        // navLinks.forEach(link => {
        //     link.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         navLinks.forEach(l => l.classList.remove('active'));
        //         link.classList.add('active');
        //     });
        // });

        // Handle search
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            // Add search functionality here
            console.log('Searching for:', e.target.value);
        });

       