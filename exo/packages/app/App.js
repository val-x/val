import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import WelcomeScreen from './src/WelcomeScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WelcomeScreen />
      </SafeAreaView>
    </>
  );
};

export default App;