(function() {
    // Extract the API key from the script tag's src attribute
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const apiKey = urlParams.get('key');

    if (!apiKey) {
        console.error('API key is missing.');
        return;
    }

    // Create the sticky "Checker" button
    const checkerButton = document.createElement('div');
    checkerButton.innerText = 'Checker';
    checkerButton.style.position = 'fixed';
    checkerButton.style.bottom = '20px';
    checkerButton.style.right = '20px';
    checkerButton.style.padding = '10px 20px';
    checkerButton.style.backgroundColor = '#28a745';
    checkerButton.style.color = 'white';
    checkerButton.style.cursor = 'pointer';
    checkerButton.style.borderRadius = '5px';
    checkerButton.style.fontSize = '16px';
    checkerButton.style.fontWeight = 'bold';
    document.body.appendChild(checkerButton);

    checkerButton.onclick = function() {
        openPopup();
    };

    function openPopup() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        document.body.appendChild(overlay);

        const popup = document.createElement('div');
        popup.style.background = 'white';
        popup.style.padding = '20px';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        popup.style.textAlign = 'center';
        popup.innerHTML = `
            <h3>Check Score</h3>
            <button id="checkButton" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Check</button>
        `;
        overlay.appendChild(popup);

        const checkButton = popup.querySelector('#checkButton');
        checkButton.onclick = function() {
            // fetch(`https://yourserver.com/api/check-number?key=${apiKey}`)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Failed to fetch the number.');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         if (data.number !== undefined) {
            //             checkButton.innerText = `Number: ${data.number}`;
            //             checkButton.style.backgroundColor = '#28a745'; // Green for success
            //         } else {
            //             console.error('Invalid response format.');
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error fetching number:', error);
            //         checkButton.innerText = 'Error';
            //         checkButton.style.backgroundColor = '#dc3545'; // Red for error
            //     });

             (async () => {
            // Load axe-core from a CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.6.1/axe.min.js';
        document.head.appendChild(script);

        script.onload = async () => {
        console.log('axe-core loaded. Running accessibility checks...');
      
        const results = await axe.run();
      
        // Display results in the console
        console.log('Accessibility audit results:', results);

          // Example: Show a popup with issues count
          alert(`Accessibility issues found: ${results.violations.length}`);
    };
  })();

            popup.innerHTML = `
            <h3>Score: 1</h3>
        `;
        };

        overlay.onclick = function(event) {
            if (event.target === overlay) {
                overlay.remove();
            }
        };
    }
})();
