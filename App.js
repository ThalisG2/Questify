import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe as suas telas (ajuste o caminho da pasta se necessário)
import HomeScreen from './Screens/HomeScreen';
import IntroScreen from './Screens/IntroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* headerShown: false tira aquela barra com o nome da tela no topo */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* A primeira tela da lista é a que abre primeiro */}
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}