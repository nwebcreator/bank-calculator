import { priceFormatter } from "./formatters.js";

// Инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');


const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');

// Cleave опции форматирования
const cleavePriceSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
}

// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownpayment = new Cleave(inputDownPayment, cleavePriceSettings);

    // Чтобы сумма кредита отображалась сразу
const totalAmount = +cleaveCost.getRawValue() - cleaveDownpayment.getRawValue();
totalCost.innerText = priceFormatter.format(totalAmount);

    // Отображение и расчет суммы кредита
form.addEventListener('input', function() {

    // Сумма кредита
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownpayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);
});
