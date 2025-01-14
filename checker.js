(function () {
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

    checkerButton.onclick = function () {
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
        checkButton.onclick = function () {

            (async () => {
                // Load axe-core from a CDN
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.6.1/axe.min.js';
                document.head.appendChild(script);
              
                script.onload = async () => {
                  // Run axe-core on the current page
                  const results = await axe.run();
              
                  // Calculate accessibility score as a percentage
                  const totalRulesChecked = results.passes.length + results.violations.length + results.inapplicable.length;
                  const rulesWithIssues = results.violations.length;
                  const scorePercentage = totalRulesChecked === 0 ? 100 : ((totalRulesChecked - rulesWithIssues) / totalRulesChecked) * 100;
              
                  // Create result display container
                  const resultContainer = document.createElement('div');
                  resultContainer.style.position = 'fixed';
                  resultContainer.style.bottom = '20px';
                  resultContainer.style.right = '20px';
                  resultContainer.style.backgroundColor = '#fff';
                  resultContainer.style.padding = '15px';
                  resultContainer.style.border = '1px solid #ccc';
                  resultContainer.style.borderRadius = '5px';
                  resultContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                  resultContainer.style.zIndex = '9999';
                  resultContainer.innerHTML = `
                    <h3>Accessibility Report</h3>
                    <p>Accessibility Score: ${Math.round(scorePercentage)}%</p>
                    <p>Passed Checks: ${results.passes.length}</p>
                    <p>Violations Found: ${results.violations.length}</p>
                  `;
              
                  // Add detailed violations if any
                  if (results.violations.length > 0) {
                    const violationsList = results.violations.map(v => `<li>${v.description} - <a href="${v.helpUrl}" target="_blank">Learn More</a></li>`).join('');
                    const violationsSection = document.createElement('ul');
                    violationsSection.innerHTML = violationsList;
                    resultContainer.appendChild(violationsSection);
                  }

                  popup.appendChild(resultContainer);
                };
            })();

        };

        overlay.onclick = function (event) {
            if (event.target === overlay) {
                overlay.remove();
            }
        };
    }
})();
