(function() {
    // Extract the API key from the script tag's src attribute
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const apiKey = urlParams.get('key');

    if (!apiKey) {
        console.error('API key is missing.');
        return;
    }else {
        console.log('APIKEY : ', apiKey);
    }

    // Create the Check button
    const button = document.createElement('div');
    button.innerText = 'Check';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#28a745';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    button.style.fontSize = '16px';
    button.style.fontWeight = 'bold';
    document.body.appendChild(button);

    button.onclick = function() {
        // fetch(`https://yourserver.com/api/check-number?key=${apiKey}`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch the number.');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         if (data.number !== undefined) {
        //             button.innerText = `Number: ${data.number}`;
        //             button.style.backgroundColor = '#007bff'; // Change color after showing the number
        //         } else {
        //             console.error('Invalid response format.');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error fetching number:', error);
        //         button.innerText = 'Error';
        //         button.style.backgroundColor = '#dc3545'; // Red for error
        //     });

        button.innerText = 'Score: 5';
        button.style.backgroundColor = '#007bff'; // Change color after showing the number
    };
})();
