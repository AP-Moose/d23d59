let optionCount = 0;
const MAX_OPTIONS = 3; // Cap at 3 options, can be adjusted

export function render(container) {
    container.innerHTML = `
        <h2>Carpet Calculator</h2>
        <p id="selectedType" class="selected-type">Selected: 12' Wide</p>
        <div class="toggle-group">
            <span>Choose type:</span>
            <div class="toggle-buttons">
                <button class="toggle-button active" data-type="fullCarpet">12' Wide</button>
                <button class="toggle-button" data-type="runner">Runner</button>
            </div>
        </div>
        <div class="input-group">
            <label for="feet">Length:</label>
            <input type="number" id="feet" placeholder="feet..." style="width: 30%;">
            <span>feet</span>
            <input type="number" id="inches" placeholder="inches..." style="width: 30%;">
            <span>inches</span>
        </div>
        <div class="input-group">
            <label for="cost">Cost:</label>
            <span>$</span>
            <input type="number" id="cost" placeholder="Cost" style="width: 50%;">
            <span id="costUnit">per sq. yd.</span>
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result">
            <button class="clear-button">Clear All</button>
        </div>
    `;

    const toggleButtons = container.querySelectorAll('.toggle-button');
    const selectedType = container.querySelector('#selectedType');
    const costUnit = container.querySelector('#costUnit');
    const clearButton = container.querySelector('.clear-button');
    const calculateButton = container.querySelector('#calculate');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const isFullCarpet = button.dataset.type === 'fullCarpet';
            selectedType.textContent = `Selected: ${isFullCarpet ? '12\' Wide' : 'Runner'}`;
            costUnit.textContent = isFullCarpet ? 'per sq. yd.' : 'per ln. ft.';
        });
    });

    clearButton.addEventListener('click', () => {
        clearResult();
        clearInputs();
    });

    calculateButton.addEventListener('click', () => {
        calculate();
        clearInputs();
    });
}

function clearInputs() {
    document.getElementById('feet').value = '';
    document.getElementById('inches').value = '';
    document.getElementById('cost').value = '';
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<button class="clear-button">Clear All</button>';
    optionCount = 0;
}

export function calculate() {
    const feet = parseFloat(document.getElementById('feet').value) || 0;
    const inches = parseFloat(document.getElementById('inches').value) || 0;
    const cost = parseFloat(document.getElementById('cost').value) || 0;
    const isRunner = document.querySelector('.toggle-button.active').dataset.type === 'runner';
    
    const totalFeet = feet + (inches / 12);
    const squareFeet = totalFeet * 12;
    const squareYards = squareFeet / 9;
    const totalCost = isRunner ? totalFeet * cost : squareYards * cost;

    optionCount++;
    if (optionCount > MAX_OPTIONS) {
        alert(`Maximum of ${MAX_OPTIONS} options reached. Please clear to start over.`);
        return;
    }

    let newResult = `
        <h3>Option ${optionCount}:</h3>
        <p>Total Length: ${totalFeet.toFixed(2)} feet</p>
        ${!isRunner ? `<p class="emphasis">Square Yards: ${squareYards.toFixed(2)}</p>` : ''}
        <p class="emphasis">Total Cost: $${totalCost.toFixed(2)}</p>
    `;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = newResult + resultDiv.innerHTML;

    document.querySelector('.clear-button').addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
}