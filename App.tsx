import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@contexts/index';
import { Routes } from '@routes/index';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style='light' translucent backgroundColor='transparent' />
      <Routes />
    </AppProvider>
  );
}