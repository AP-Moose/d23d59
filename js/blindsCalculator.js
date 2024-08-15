export function render(container) {
    container.innerHTML = `
        <h2>Blinds Calculator</h2>
        <div class="input-group">
            <label>Mode:</label>
            <div class="toggle-buttons">
                <button class="toggle-button active" data-mode="outside">Outside (Exact)</button>
                <button class="toggle-button" data-mode="inside">Inside</button>
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

    const toggleButtons = container.querySelectorAll('.toggle-button');
    const calculateButton = container.querySelector('#calculate');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('windowWidth').value = '';
    document.getElementById('startingWidth').value = '';
    document.querySelector('.toggle-button[data-mode="outside"]').classList.add('active');
    document.querySelector('.toggle-button[data-mode="inside"]').classList.remove('active');
}

function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

export function calculate() {
    const windowWidth = parseFloat(document.getElementById('windowWidth').value) || 0;
    const startingWidth = parseFloat(document.getElementById('startingWidth').value) || 0;
    const isOutside = document.querySelector('.toggle-button.active').dataset.mode === 'outside';

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