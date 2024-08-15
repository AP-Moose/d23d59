export function render(container) {
    container.innerHTML = `
        <h2>Blinds Calculator</h2>
        <div class="input-group">
            <label>Mode:</label>
            <div class="toggle-buttons">
                <label>
                    <input type="radio" name="blindMode" value="outside" checked>
                    <span>Outside (Exact)</span>
                </label>
                <label>
                    <input type="radio" name="blindMode" value="inside">
                    <span>Inside</span>
                </label>
            </div>
        </div>
        <div class="input-group">
            <label for="windowWidth">Window Width (inches):</label>
            <input type="number" id="windowWidth" placeholder="Window Width" aria-label="Window Width">
        </div>
        <div class="input-group">
            <label for="startingWidth">Starting Blind Width (inches):</label>
            <input type="number" id="startingWidth" placeholder="Starting Width" aria-label="Starting Blind Width">
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result" aria-live="polite"></div>
    `;

    const calculateButton = container.querySelector('#calculate');
    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('windowWidth').value = '';
    document.getElementById('startingWidth').value = '';
    document.querySelector('input[name="blindMode"][value="outside"]').checked = true;
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

export function calculate() {
    const windowWidth = parseFloat(document.getElementById('windowWidth').value) || 0;
    const startingWidth = parseFloat(document.getElementById('startingWidth').value) || 0;
    const isOutside = document.querySelector('input[name="blindMode"]:checked').value === 'outside';

    const trueStartingWidth = startingWidth - 0.5;
    const targetWidth = isOutside ? windowWidth : windowWidth - 0.5;
    const cutAmount = (trueStartingWidth - targetWidth) / 2;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Amount to Cut Off Each Side: <span class="emphasis">${cutAmount < 0 ? "Need Wider Size" : cutAmount.toFixed(2) + " inches"}</span></p>
    `;

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.classList.add('clear-button');
    clearButton.addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
    resultDiv.appendChild(clearButton);
}