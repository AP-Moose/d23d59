export function render(container) {
    container.innerHTML = `
        <h2>Rolled Goods Calculator</h2>
        <div class="toggle-group">
            <span>Choose Type:</span>
            <div class="toggle-buttons">
                <button class="toggle-button active" data-type="LNFT">LN FT</button>
                <button class="toggle-button" data-type="SQYD">SQ YD</button>
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="entireRoll">Diameter of entire roll (inches):</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="entireRoll" placeholder="Entire Roll Diameter">
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="tube">Diameter of tube (inches):</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="tube" placeholder="Tube Diameter">
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="rings">Number of rings:</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="rings" placeholder="Number of Rings">
            </div>
        </div>
        <div id="rollWidthGroup" class="input-group" style="display:none;">
            <div class="label-wrapper">
                <label for="rollWidth">Roll Width:</label>
            </div>
            <div class="input-wrapper">
                <select id="rollWidth">
                    <option value="0.0872">6'</option>
                    <option value="0.1454">10'</option>
                    <option value="0.1744">12'</option>
                    <option value="0.2182">15'</option>
                </select>
            </div>
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result">
            <button class="clear-button">Clear</button>
        </div>
    `;

    const toggleButtons = container.querySelectorAll('.toggle-button');
    const rollWidthGroup = container.querySelector('#rollWidthGroup');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            rollWidthGroup.style.display = button.dataset.type === 'SQYD' ? 'block' : 'none';
        });
    });

    const clearButton = container.querySelector('.clear-button');
    clearButton.addEventListener('click', () => {
        clearResult();
        clearInputs();
    });

    const calculateButton = container.querySelector('#calculate');
    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('entireRoll').value = '';
    document.getElementById('tube').value = '';
    document.getElementById('rings').value = '';
    if (document.getElementById('rollWidth')) {
        document.getElementById('rollWidth').selectedIndex = 0;
    }
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<button class="clear-button">Clear</button>';
}

export function calculate() {
    const entireRoll = parseFloat(document.getElementById('entireRoll').value) || 0;
    const tube = parseFloat(document.getElementById('tube').value) || 0;
    const rings = parseFloat(document.getElementById('rings').value) || 0;
    const isLNFT = document.querySelector('.toggle-button.active').dataset.type === 'LNFT';
    
    const diameter = entireRoll + tube;
    const multiplied = diameter * rings;
    const linearFeet = ((multiplied * 0.0872) / 0.665).toFixed(2);
    
    let result = '<button class="clear-button">Clear</button>';
    if (isLNFT) {
        result += `<p>Linear Feet: ${linearFeet}</p>`;
    } else {
        const rollWidth = parseFloat(document.getElementById('rollWidth').value) || 0.0872;
        const sqYards = (multiplied * rollWidth).toFixed(2);
        result += `<p>Square Yards: ${sqYards}</p>`;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result;

    document.querySelector('.clear-button').addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
}