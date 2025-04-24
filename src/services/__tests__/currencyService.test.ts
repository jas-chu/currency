import axios from 'axios';
import { fetchCurrencyData } from '../currencyService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('currencyService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches and parses currency data correctly', async () => {
        // Mock API response
        const mockResponse = {
            data: `22 Apr 2025 #77
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.975
Brazil|real|1|BRL|3.769
USA|dollar|1|USD|21.849`,
        };

        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await fetchCurrencyData();

        // Check if axios was called with the correct URL
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
        );

        // Check if the data was parsed correctly
        expect(result).toEqual({
            rates: [
                {
                    country: 'Australia',
                    currency: 'dollar',
                    amount: 1,
                    code: 'AUD',
                    rate: 13.975,
                },
                {
                    country: 'Brazil',
                    currency: 'real',
                    amount: 1,
                    code: 'BRL',
                    rate: 3.769,
                },
                {
                    country: 'USA',
                    currency: 'dollar',
                    amount: 1,
                    code: 'USD',
                    rate: 21.849,
                },
            ],
        });
    });


});