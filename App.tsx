import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from './src/telaUsuario';
import CameraScreen from './src/telaUsuario/CameraScreen';
import Pagamento from './pagamento/pagamento';
import PagamentoMensal from './pagamento/PagamentoMensal';
import PagamentoAnual from './pagamento/PagamentoAnual';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Home: undefined;
  Perfil: undefined;
  CameraScreen: undefined;
  Pagamento: undefined;
  PagamentoMensal: undefined;
  PagamentoAnual: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Perfil" component={UserProfile} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Pagamento" component={Pagamento} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={UserProfile} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="Pagamento" component={Pagamento} />
        <Stack.Screen name="PagamentoMensal" component={PagamentoMensal} />
        <Stack.Screen name="PagamentoAnual" component={PagamentoAnual} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
