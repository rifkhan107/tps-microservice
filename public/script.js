document.addEventListener('DOMContentLoaded', async function() {
    const apiStatusElement = document.getElementById('api-status');
    const dbStatusElement = document.getElementById('db-status');
    const redisStatusElement = document.getElementById('redis-status');

    try {
        console.log('Fetching API status...');
        const apiResponse = await fetch(`${config.apiUrl}/status/api-status`);
        if (!apiResponse.ok) {
            throw new Error(`API request failed with status ${apiResponse.status}`);
        }
        const apiData = await apiResponse.json();
        console.log('API Response:', apiData);
        apiStatusElement.innerText = apiData.status || 'API status unknown';
        apiStatusElement.parentElement.classList.add(apiData.status.includes('smoothly') ? 'green' : 'red');

        console.log('Fetching Database status...');
        const dbResponse = await fetch(`${config.apiUrl}/status/db-status`);
        if (!dbResponse.ok) {
            throw new Error(`DB request failed with status ${dbResponse.status}`);
        }
        const dbData = await dbResponse.json();
        console.log('Database Response:', dbData);
        dbStatusElement.innerText = dbData.status || 'Database status unknown';
        dbStatusElement.parentElement.classList.add(dbData.status.includes('connected') ? 'green' : 'red');

        console.log('Fetching Redis status...');
        const redisResponse = await fetch(`${config.apiUrl}/status/redis-status`);
        if (!redisResponse.ok) {
            throw new Error(`Redis request failed with status ${redisResponse.status}`);
        }
        const redisData = await redisResponse.json();
        console.log('Redis Response:', redisData);
        redisStatusElement.innerText = redisData.status || 'Redis status unknown';
        redisStatusElement.parentElement.classList.add(redisData.status.includes('connected') ? 'green' : 'red');
    } catch (error) {
        console.error('Error occurred:', error);

        apiStatusElement.innerText = 'Error fetching API status';
        dbStatusElement.innerText = 'Error fetching Database status';
        redisStatusElement.innerText = 'Error fetching Redis status';

        apiStatusElement.parentElement.classList.add('red');
        dbStatusElement.parentElement.classList.add('red');
        redisStatusElement.parentElement.classList.add('red');
    }
});
