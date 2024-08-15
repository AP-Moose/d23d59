import * as carpetCalculator from './carpetCalculator.js';
import * as rolledGoodsCalculator from './rolledGoodsCalculator.js';
import * as flooringCalculator from './flooringCalculator.js';
import * as blindsCalculator from './blindsCalculator.js';

const calculators = {
    carpet: {
        name: "Carpet",
        module: carpetCalculator,
        icon: 'fas fa-rug'
    },
    rolledGoods: {
        name: "Rolled Goods",
        module: rolledGoodsCalculator,
        icon: 'fas fa-scroll'
    },
    flooring: {
        name: "Flooring",
        module: flooringCalculator,
        icon: 'fas fa-th'
    },
    blinds: {
        name: "Blinds",
        module: blindsCalculator,
        icon: 'fas fa-blinds'
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
        button.innerHTML = `<i class="${calculators[category].icon}"></i> ${calculators[category].name}`;
        mainNav.appendChild(button);
    });

    mainNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-button') || e.target.closest('.nav-button')) {
            const clickedButton = e.target.closest('.nav-button');
            currentCategory = clickedButton.dataset.category;
            document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
            clickedButton.classList.add('active');
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