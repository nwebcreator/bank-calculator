import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const maxPrice = 100000000;

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

    let cost = parseInt(cleaveCost.getRawValue());
    if(cost > maxPrice) {
        cost = maxPrice;
    }

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


// Slider Cost
const sliderCost = document.querySelector('#slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min: 0,
        '50%': [10000000, 1000000],
        max: maxPrice,
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderCost.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    cleaveCost.setRawValue(sliderValue);
    calcMortage();
});

// Slider Downpayment
const sliderDownpayment = document.querySelector('#slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 6000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        min: 0,
        max: 10000000,
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderDownpayment.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
    cleaveDownpayment.setRawValue(sliderValue);
    calcMortage();
});

// Slider Years
const sliderTerm = document.querySelector('#slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
        min: 1,
        max: 30,
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

sliderTerm.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
    cleaveTerm.setRawValue(sliderValue);
    calcMortage();
});

// Форматирование inputCost
inputCost.addEventListener('input', function(){
    const value = parseInt(cleaveCost.getRawValue());

    // Обновляем range slider
    sliderCost.noUiSlider.set(value);

    // Проверка на max цену
    if(value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error');
    }

    if(value <= maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
    }

    // Зависимость значений downpayment in input cost
    const persentMin = value * 0.15;
    const persentMax = value * 0.90;

    updateSlider.noUiSlider.updateOptions({
        range: {
            min: persentMin,
            max: persentMax,
        }
    });
});

inputCost.addEventListener('change', function () {
    const value = parseInt(cleaveCost.getRawValue());

    if(value > maxPrice) {
        inputCost.closest('param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(maxPrice);
    }
})