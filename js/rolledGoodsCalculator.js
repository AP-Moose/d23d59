export function render(container) {
    container.innerHTML = `
        <h2>Rolled Goods Calculator</h2>
        <div class="toggle-group">
            <label>Choose Type:</label>
            <div class="toggle-buttons">
                <button class="toggle-button active" data-type="LNFT">LN FT</button>
                <button class="toggle-button" data-type="SQYD">SQ YD</button>
            </div>
        </div>
        <div class="input-group">
            <label for="entireRoll">Diameter of entire roll (inches):</label>
            <input type="number" id="entireRoll" placeholder="Entire Roll Diameter" aria-label="Entire Roll Diameter">
        </div>
        <div class="input-group">
            <label for="tube">Diameter of tube (inches):</label>
            <input type="number" id="tube" placeholder="Tube Diameter" aria-label="Tube Diameter">
        </div>
        <div class="input-group">
            <label for="rings">Number of rings:</label>
            <input type="number" id="rings" placeholder="Number of Rings" aria-label="Number of Rings">
        </div>
        <div id="rollWidthGroup" class="input-group">
            <label>Roll Width:</label>
            <div class="roll-width-buttons">
                <button class="roll-width-button" data-width="0.0872">6'</button>
                <button class="roll-width-button" data-width="0.1454">10'</button>
                <button class="roll-width-button" data-width="0.1744">12'</button>
                <button class="roll-width-button" data-width="0.2182">15'</button>
            </div>
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result" aria-live="polite"></div>
    `;

    const toggleButtons = container.querySelectorAll('.toggle-button');
    const rollWidthGroup = container.querySelector('#rollWidthGroup');
    const rollWidthButtons = container.querySelectorAll('.roll-width-button');
    const calculateButton = container.querySelector('#calculate');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            rollWidthGroup.style.display = button.dataset.type === 'SQYD' ? 'block' : 'none';
        });
    });

    rollWidthButtons.forEach(button => {
        button.addEventListener('click', () => {
            rollWidthButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('entireRoll').value = '';
    document.getElementById('tube').value = '';
    document.getElementById('rings').value = '';
    document.querySelectorAll('.roll-width-button').forEach(btn => btn.classList.remove('active'));
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

export function calculate() {
    const entireRoll = parseFloat(document.getElementById('entireRoll').value) || 0;
    const tube = parseFloat(document.getElementById('tube').value) || 0;
    const rings = parseFloat(document.getElementById('rings').value) || 0;
    const isLNFT = document.querySelector('.toggle-button.active').dataset.type === 'LNFT';
    
    const diameter = entireRoll + tube;
    const multiplied = diameter * rings;
    const linearFeet = ((multiplied * 0.0872) / 0.665).toFixed(2);
    
    let result = '';
    if (isLNFT) {
        result = `<p>Linear Feet: <span class="emphasis">${linearFeet}</span></p>`;
    } else {
        const activeRollWidthButton = document.querySelector('.roll-width-button.active');
        const rollWidth = activeRollWidthButton ? parseFloat(activeRollWidthButton.dataset.width) : 0.0872;
        const sqYards = (multiplied * rollWidth).toFixed(2);
        result = `<p>Square Yards: <span class="emphasis">${sqYards}</span></p>`;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result;

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.classList.add('clear-button');
    clearButton.addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
    resultDiv.appendChild(clearButton);
}