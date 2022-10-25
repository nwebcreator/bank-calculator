import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

// Инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');


const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');

// Cleave опции форматирования
const cleavePriceSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
}

// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownpayment = new Cleave(inputDownPayment, cleavePriceSettings);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSettings);


const calcMortage = () => {
    // Общая сумма кредита
    const totalAmount = Number(cleaveCost.getRawValue()) - cleaveDownpayment.getRawValue(); // либо parseFloat(cleaveCost.getRawValue(), 2)
    totalCost.innerText = priceFormatter.format(totalAmount);

    // Ставка по кредиту
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = creditRate / 12;

    // Срок ипотеки в годах
    //const mortgageTermYears = document.querySelector('#input-term').value;
    const years = cleaveTerm.getRawValue();

    // Срок ипотеки в месяцах
    const month = years * 12;

    // Рассчет ежемесячного платежа
    // const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - month));
    const monthPayment = totalAmount * (monthRate + (monthRate / (((1 + monthRate) ** month)-1)));

    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);
}

// Чтобы сумма кредита отображалась сразу
calcMortage();

// Отображение и расчет суммы кредита
form.addEventListener('input', function() {
    // Сумма кредита
    calcMortage();
});


const sliderCost = document.querySelector('#slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min: 0,
        '50%': [10000000, 1000000],
        max: 100000000,
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});
