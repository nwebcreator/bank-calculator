export const percentFormatter = new Intl.NumberFormat('ru-RU', 
    {
        style: 'percent', 
        maximumFractionDigits: 3
    }
); // 4,752 %

export const priceFormatter = new Intl.NumberFormat ('ru-RU', 
{
    style: 'currency', 
    currency: 'RUB', 
    maximumFractionDigits: 2
}
); // 7 000 000 ₽
