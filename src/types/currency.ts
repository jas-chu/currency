export interface CurrencyData {
    rates: CurrencyRate[];
}

export interface CurrencyRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}