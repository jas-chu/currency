import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { CurrencyItem } from './CurrencyItem';
import { CurrencySkeleton } from './CurrencySkeleton';
import { useCurrencyData } from '../hooks/useCurrencyData';

export const CurrencyList: React.FC = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useCurrencyData();

  if (isLoading) {
    return <CurrencySkeleton />;
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
        <Text style={styles.errorDetail}>{(error as Error).message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.rates}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => <CurrencyItem item={item} />}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Currency Exchange Rates</Text>
            <Text style={styles.listSubHeaderText}>Czech National Bank</Text>
          </View>
        }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listHeader: {
    padding: 16,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  listSubHeaderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});