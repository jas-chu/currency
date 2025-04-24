import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import { CurrencyRate } from '../types/currency';

interface CurrencyConverterProps {
  rates: CurrencyRate[];
}

const { width: screenWidth } = Dimensions.get('window');

const getContainerWidth = () => {
  return Math.max(300, screenWidth * 0.70);
};

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ rates }) => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRate | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerWidth = getContainerWidth();

  // Filter currencies based on search query
  const filteredCurrencies = searchQuery.trim() === ''
    ? rates
    : rates.filter(rate => 
        rate.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rate.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rate.currency.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Calculate conversion when amount or selected currency changes
  useEffect(() => {
    if (amount && selectedCurrency) {
      // Formula: amount in CZK / rate * amount (from the API)
      const amountInCZK = parseFloat(amount);
      if (!isNaN(amountInCZK)) {
        const convertedValue = (amountInCZK / selectedCurrency.rate) * selectedCurrency.amount;
        setConvertedAmount(convertedValue.toFixed(2));
      }
    } else {
      setConvertedAmount(null);
    }
  }, [amount, selectedCurrency]);

  const handleCurrencySelect = (currency: CurrencyRate) => {
    setSelectedCurrency(currency);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.title}>Currency Converter</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount (CZK)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount in CZK"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Currency</Text>
        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => setModalVisible(true)}
        >
          <Text style={selectedCurrency ? styles.currencyText : styles.placeholderText}>
            {selectedCurrency 
              ? `${selectedCurrency.code} - ${selectedCurrency.country} ${selectedCurrency.currency}`
              : 'Select a currency'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {convertedAmount && selectedCurrency && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Converted Amount:</Text>
          <Text style={styles.resultValue}>
            {`${convertedAmount} ${selectedCurrency.code}`}
          </Text>
          <Text style={styles.resultDetail}>
            {`1 CZK = ${(1 / selectedCurrency.rate * selectedCurrency.amount).toFixed(4)} ${selectedCurrency.code}`}
          </Text>
        </View>
      )}
      
      {/* Currency Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search currency..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <FlatList
              data={filteredCurrencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.currencyItem,
                    pressed && styles.currencyItemPressed
                  ]}
                  onPress={() => handleCurrencySelect(item)}
                >
                  <View style={styles.currencyItemContent}>
                    <Text style={styles.currencyCode}>{item.code}</Text>
                    <View style={styles.currencyDetails}>
                      <Text style={styles.currencyName}>{item.country} - {item.currency}</Text>
                      <Text style={styles.currencyRate}>Rate: {item.rate}</Text>
                    </View>
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <Text>No currencies found</Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0066cc',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  currencySelector: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  currencyText: {
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  resultContainer: {
    backgroundColor: '#e6f2ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 4,
  },
  resultDetail: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  currencyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  currencyItemPressed: {
    backgroundColor: '#f0f8ff',
  },
  currencyItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyCode: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    color: '#0066cc',
    marginRight: 12,
    minWidth: 50,
    textAlign: 'center',
  },
  currencyDetails: {
    flex: 1,
  },
  currencyName: {
    fontSize: 14,
    marginBottom: 4,
  },
  currencyRate: {
    fontSize: 12,
    color: '#666',
  },
  emptyList: {
    padding: 20,
    alignItems: 'center',
  },
});