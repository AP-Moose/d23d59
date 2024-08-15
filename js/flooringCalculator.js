export function render(container) {
    container.innerHTML = `
        <h2>Flooring Calculator</h2>
        <div class="input-group">
            <label for="totalSqFeet">Total Square Feet:</label>
            <input type="number" id="totalSqFeet" placeholder="Total Sq. Feet" aria-label="Total Square Feet">
        </div>
        <div class="input-group">
            <label for="sqFeetPerBox">Square Feet per Box:</label>
            <input type="number" id="sqFeetPerBox" placeholder="Sq. Feet per Box" aria-label="Square Feet per Box">
        </div>
        <div class="input-group">
            <label for="costPerBox">Cost per Box:</label>
            <div class="input-wrapper">
                <span>$</span>
                <input type="number" id="costPerBox" placeholder="Cost per Box" aria-label="Cost per Box">
            </div>
        </div>
        <div class="input-group">
            <label for="extraBoxes">Extra Boxes:</label>
            <input type="number" id="extraBoxes" placeholder="Extra Boxes" aria-label="Extra Boxes">
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result" aria-live="polite"></div>
    `;

    const calculateButton = container.querySelector('#calculate');
    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('totalSqFeet').value = '';
    document.getElementById('sqFeetPerBox').value = '';
    document.getElementById('costPerBox').value = '';
    document.getElementById('extraBoxes').value = '';
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

export function calculate() {
    const totalSqFeet = parseFloat(document.getElementById('totalSqFeet').value) || 0;
    const sqFeetPerBox = parseFloat(document.getElementById('sqFeetPerBox').value) || 0;
    const costPerBox = parseFloat(document.getElementById('costPerBox').value) || 0;
    const extraBoxes = parseFloat(document.getElementById('extraBoxes').value) || 0;

    const totalBoxes = Math.ceil(totalSqFeet / sqFeetPerBox) + extraBoxes;
    const totalCost = totalBoxes * costPerBox;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Total Boxes Needed: <span class="emphasis">${totalBoxes}</span></p>
        <p>Total Cost: <span class="emphasis">$${totalCost.toFixed(2)}</span></p>
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