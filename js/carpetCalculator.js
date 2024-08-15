let optionCount = 0;
const MAX_OPTIONS = 3;

export function render(container) {
    optionCount = 0;

    container.innerHTML = `
        <h2>Carpet Calculator</h2>
        <p id="selectedType" class="selected-type">Selected: 12' Wide</p>
        <div class="toggle-group">
            <label>Choose type:</label>
            <div class="toggle-buttons">
                <button class="toggle-button active" data-type="fullCarpet">12' Wide</button>
                <button class="toggle-button" data-type="runner">Runner</button>
            </div>
        </div>
        <div class="input-group">
            <label for="feet">Length:</label>
            <div class="input-wrapper">
                <input type="number" id="feet" placeholder="Feet" aria-label="Feet">
                <span>feet</span>
                <input type="number" id="inches" placeholder="Inches" aria-label="Inches">
                <span>inches</span>
            </div>
        </div>
        <div class="input-group">
            <label for="cost">Cost:</label>
            <div class="input-wrapper">
                <span>$</span>
                <input type="number" id="cost" placeholder="Cost" aria-label="Cost">
                <span id="costUnit">per sq. yd.</span>
            </div>
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result" aria-live="polite"></div>
    `;

    const toggleButtons = container.querySelectorAll('.toggle-button');
    const selectedType = container.querySelector('#selectedType');
    const costUnit = container.querySelector('#costUnit');
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

    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('feet').value = '';
    document.getElementById('inches').value = '';
    document.getElementById('cost').value = '';
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    optionCount = 0;
}

export function calculate() {
    if (optionCount >= MAX_OPTIONS) {
        alert(`Maximum of ${MAX_OPTIONS} options reached. Please clear to start over.`);
        return;
    }

    const feet = parseFloat(document.getElementById('feet').value) || 0;
    const inches = parseFloat(document.getElementById('inches').value) || 0;
    const cost = parseFloat(document.getElementById('cost').value) || 0;
    const isRunner = document.querySelector('.toggle-button.active').dataset.type === 'runner';
    
    const totalFeet = feet + (inches / 12);
    const squareFeet = totalFeet * 12;
    const squareYards = squareFeet / 9;
    const totalCost = isRunner ? totalFeet * cost : squareYards * cost;

    optionCount++;

    let newResult = `
        <h3>Option ${optionCount}:</h3>
        <p>Total Length: ${totalFeet.toFixed(2)} feet</p>
        ${!isRunner ? `<p class="emphasis">Square Yards: ${squareYards.toFixed(2)}</p>` : ''}
        <p class="emphasis">Total Cost: $${totalCost.toFixed(2)}</p>
    `;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = newResult + resultDiv.innerHTML;

    if (optionCount === 1) {
        addClearButton();
    }

    clearInputs();
}

function addClearButton() {
    const resultDiv = document.getElementById('result');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All';
    clearButton.classList.add('clear-button');
    clearButton.addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
    resultDiv.appendChild(clearButton);
}