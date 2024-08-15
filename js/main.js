import * as carpetCalculator from './carpetCalculator.js';
import * as rolledGoodsCalculator from './rolledGoodsCalculator.js';
import * as flooringCalculator from './flooringCalculator.js';
import * as blindsCalculator from './blindsCalculator.js';

const calculators = {
    carpet: {
        name: "Carpet",
        module: carpetCalculator
    },
    rolledGoods: {
        name: "Rolled Goods",
        module: rolledGoodsCalculator
    },
    flooring: {
        name: "Flooring",
        module: flooringCalculator
    },
    blinds: {
        name: "Blinds",
        module: blindsCalculator
    }
};

let currentCategory = null;

function initializeNavigation() {
    const mainNav = document.getElementById('main-nav');
    const calculatorContainer = document.getElementById('calculator-container');

    mainNav.innerHTML = '';
    Object.keys(calculators).forEach(category => {
        const button = document.createElement('button');
        button.classList.add('nav-button');
        button.dataset.category = category;
        button.textContent = calculators[category].name;
        mainNav.appendChild(button);
    });

    mainNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-button')) {
            currentCategory = e.target.dataset.category;
            document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderCalculator();
        }
    });

    currentCategory = 'carpet';
    document.querySelector(`[data-category="${currentCategory}"]`).classList.add('active');
    renderCalculator();
}

function renderCalculator() {
    const container = document.getElementById('calculator-container');
    container.innerHTML = '';

    const calculator = document.createElement('div');
    calculator.classList.add('calculator');

    calculators[currentCategory].module.render(calculator);

    container.appendChild(calculator);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
});