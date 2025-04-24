import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CurrencyRate } from '../types/currency';

interface CurrencyItemProps {
  item: CurrencyRate;
}

export const CurrencyItem: React.FC<CurrencyItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{item.code}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.country}>{item.country}</Text>
        <Text style={styles.currency}>{item.currency}</Text>
      </View>
      <View style={styles.rateContainer}>
        <Text style={styles.amount}>{item.amount > 1 ? `${item.amount} units = ` : ''}</Text>
        <Text style={styles.rate}>{item.rate.toFixed(3)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  codeContainer: {
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  code: {
    fontWeight: 'bold',
    color: '#0066cc',
  },
  detailsContainer: {
    flex: 1,
  },
  country: {
    fontSize: 16,
    fontWeight: '500',
  },
  currency: {
    fontSize: 14,
    color: '#666',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amount: {
    fontSize: 12,
    color: '#666',
  },
  rate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});