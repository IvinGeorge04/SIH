document.getElementById('notification-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const notificationType = document.getElementById('notification-type').value;
    const location = document.getElementById('location').value;
    const contactInfo = document.getElementById('contact-info').value;

    // Simulate subscription process
    const subscriptionStatus = document.getElementById('subscription-status');
    subscriptionStatus.textContent = `Subscribed to ${notificationType} notifications for ${location}.`;

});
document.addEventListener('DOMContentLoaded', () => {
    const disasterInfoElement = document.getElementById('disaster-info');
    
    async function fetchDisasterData() {
        try {
            // Replace with actual API endpoint
            const response = await fetch('https://api.example.com/disasters');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateDisasterInfo(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            disasterInfoElement.innerHTML = '<p>Failed to load disaster data.</p>';
        }
    }

    function updateDisasterInfo(data) {
        if (!data || data.length === 0) {
            disasterInfoElement.innerHTML = '<p>No disaster information available.</p>';
            return;
        }

        const disasterList = data.map(disaster => `
            <div>
                <h2>${disaster.title}</h2>
                <p><strong>Type:</strong> ${disaster.type}</p>
                <p><strong>Location:</strong> ${disaster.location}</p>
                <p><strong>Date:</strong> ${disaster.date}</p>
                <p><strong>Description:</strong> ${disaster.description}</p>
            </div>
        `).join('');

        disasterInfoElement.innerHTML = disasterList;
    }

    // Fetch disaster data every 60 seconds
    fetchDisasterData();
    setInterval(fetchDisasterData, 60000);
});

