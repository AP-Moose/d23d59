export function render(container) {
    container.innerHTML = `
        <h2>Flooring Calculator</h2>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="totalSqFeet">Total Square Feet:</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="totalSqFeet" placeholder="Total Sq. Feet">
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="sqFeetPerBox">Square Feet per Box:</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="sqFeetPerBox" placeholder="Sq. Feet per Box">
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="costPerBox">Cost per Box:</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="costPerBox" placeholder="Cost per Box">
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="extraBoxes">Extra Boxes:</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="extraBoxes" placeholder="Extra Boxes">
            </div>
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result"></div>
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
        <p>Total Boxes Needed: ${totalBoxes}</p>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
        <button class="clear-button">Clear</button>
    `;

    document.querySelector('.clear-button').addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
}