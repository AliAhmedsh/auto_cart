import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { RootNavigator } from './RootNavigator';

export function Navigation() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
