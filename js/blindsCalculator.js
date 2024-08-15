export function render(container) {
    container.innerHTML = `
        <h2>Blinds Calculator</h2>
        <div class="input-group">
            <div class="label-wrapper">
                <label>Mode:</label>
            </div>
            <div class="input-wrapper">
                <label>
                    <input type="radio" name="blindMode" value="outside" checked> Outside (Exact)
                </label>
                <label>
                    <input type="radio" name="blindMode" value="inside"> Inside
                </label>
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="windowWidth">Window Width (inches):</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="windowWidth" placeholder="Window Width">
            </div>
        </div>
        <div class="input-group">
            <div class="label-wrapper">
                <label for="startingWidth">Starting Blind Width (inches):</label>
            </div>
            <div class="input-wrapper">
                <input type="number" id="startingWidth" placeholder="Starting Width">
            </div>
        </div>
        <button id="calculate">Calculate</button>
        <div id="result" class="result"></div>
    `;

    const calculateButton = container.querySelector('#calculate');
    calculateButton.addEventListener('click', calculate);
}

function clearInputs() {
    document.getElementById('windowWidth').value = '';
    document.getElementById('startingWidth').value = '';
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
        <p>Amount to Cut Off Each Side: ${cutAmount < 0 ? "Need Wider Size" : cutAmount.toFixed(2) + " inches"}</p>
        <button class="clear-button">Clear</button>
    `;

    document.querySelector('.clear-button').addEventListener('click', () => {
        clearResult();
        clearInputs();
    });
}