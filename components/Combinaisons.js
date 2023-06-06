import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const Combinaisons = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Combinaisons</Text>
      
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Combinaisons;
