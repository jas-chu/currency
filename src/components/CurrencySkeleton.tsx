import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

export const CurrencySkeleton: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.item, { opacity: fadeAnim }]}
        >
          <View style={styles.codeBox} />
          <View style={styles.contentContainer}>
            <View style={styles.titleBar} />
            <View style={styles.subtitleBar} />
          </View>
          <View style={styles.rateBox} />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  codeBox: {
    width: 60,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  titleBar: {
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
    width: '70%',
  },
  subtitleBar: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    width: '50%',
  },
  rateBox: {
    width: 50,
    height: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});