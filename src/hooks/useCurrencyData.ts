import { useQuery } from '@tanstack/react-query';
import { fetchCurrencyData } from '../services/currencyService';

export const useCurrencyData = () => {
    return useQuery({
        queryKey: ['currencyData'],
        queryFn: fetchCurrencyData,
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: false,
    });
};