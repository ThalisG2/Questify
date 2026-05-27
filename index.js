import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama o AppRegistry.registerComponent('main', () => App);
// Ele garante que tanto no Expo Go quanto na build nativa o ambiente seja configurado corretamente.
registerRootComponent(App);