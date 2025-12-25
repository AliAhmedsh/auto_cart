import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './src/navigation';
import { LayoutProvider } from './src/context/LayoutContext';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LayoutProvider>
        <Navigation />
      </LayoutProvider>
    </GestureHandlerRootView>
  );
}

export default App;
