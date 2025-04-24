import axios from 'axios';
import { CurrencyData, CurrencyRate } from '../types/currency';

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export const fetchCurrencyData = async (): Promise<CurrencyData> => {
    try {
        const response = await axios.get(API_URL);
        return parseCurrencyData(response.data);
    } catch (error) {
        console.error('Error fetching currency data:', error);
        throw error;
    }
};

const parseCurrencyData = (data: string): CurrencyData => {
    const lines = data.trim().split('\n');

    // Parse the currency rates (skip the first two lines - header and column names)
    const rates: CurrencyRate[] = [];

    for (let i = 2; i < lines.length; i++) {
        const parts = lines[i].split('|');

        if (parts.length === 5) {
            rates.push({
                country: parts[0],
                currency: parts[1],
                amount: parseFloat(parts[2]),
                code: parts[3],
                rate: parseFloat(parts[4]),
            });
        }
    }

    return {
        rates
    };
};