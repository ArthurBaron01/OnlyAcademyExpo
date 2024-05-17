import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from './src/telaUsuario'; // Importe o componente UserProfile
import CameraScreen from './src/telaUsuario/CameraScreen'; // Importe o componente CameraScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserProfile">
        <Stack.Screen name="Perfil" component={UserProfile} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
