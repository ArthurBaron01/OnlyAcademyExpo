import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import UserProfile from './src/telaUsuario'; // Importando o componente UserProfile

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProfile />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
