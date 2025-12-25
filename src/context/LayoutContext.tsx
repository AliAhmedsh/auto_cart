import React, { createContext, useContext, useMemo } from 'react';
import { Edge } from 'react-native-safe-area-context';
import { StatusBar, StatusBarStyle } from 'react-native';
import { colors } from '../theme/colors';

type LayoutConfig = {
  statusBarStyle: StatusBarStyle;
  backgroundColor: string;
  navBarColor: string;
  safeAreaEdges: Edge[];
};

const defaultConfig: LayoutConfig = {
  statusBarStyle: 'dark-content',
  backgroundColor: colors.background,
  navBarColor: colors.background,
  safeAreaEdges: ['top', 'left', 'right', 'bottom'],
};

const LayoutContext = createContext<LayoutConfig>(defaultConfig);

type Props = {
  children: React.ReactNode;
  value?: Partial<LayoutConfig>;
};

export function LayoutProvider({ children, value }: Props) {
  const merged = useMemo(() => ({ ...defaultConfig, ...value }), [value]);
  return (
    <LayoutContext.Provider value={merged}>
      <StatusBar barStyle={merged.statusBarStyle} backgroundColor={merged.backgroundColor} />
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutConfig() {
  return useContext(LayoutContext);
}
