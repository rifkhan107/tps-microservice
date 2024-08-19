document.addEventListener('DOMContentLoaded', async function() {
    const apiStatusElement = document.getElementById('api-status');
    const dbStatusElement = document.getElementById('db-status');
    const redisStatusElement = document.getElementById('redis-status');

    try {
        // Fetch API Status
        const apiResponse = await fetch(`${config.apiUrl}/status/api-status`);
        const apiData = await apiResponse.json();
        apiStatusElement.innerText = apiData.status;
        apiStatusElement.parentElement.classList.add(apiData.status.includes('smoothly') ? 'green' : 'red');

        // Fetch Database Status
        const dbResponse = await fetch(`${config.apiUrl}/status/db-status`);
        const dbData = await dbResponse.json();
        dbStatusElement.innerText = dbData.status;
        dbStatusElement.parentElement.classList.add(dbData.status.includes('connected') ? 'green' : 'red');

        // Fetch Redis Status
        const redisResponse = await fetch(`${config.apiUrl}/status/redis-status`);
        const redisData = await redisResponse.json();
        redisStatusElement.innerText = redisData.status;
        redisStatusElement.parentElement.classList.add(redisData.status.includes('connected') ? 'green' : 'red');
    } catch (error) {
        apiStatusElement.innerText = 'Error fetching API status';
        dbStatusElement.innerText = 'Error fetching Database status';
        redisStatusElement.innerText = 'Error fetching Redis status';
        apiStatusElement.parentElement.classList.add('red');
        dbStatusElement.parentElement.classList.add('red');
        redisStatusElement.parentElement.classList.add('red');
    }
});
