import React from 'react';
import { ScrollView, StyleSheet, ViewProps, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import { useLayoutConfig } from '../../context/LayoutContext';

interface ScreenProps extends ViewProps {
  scroll?: boolean;
  children: React.ReactNode;
}

export function Screen({ scroll, style, children, ...rest }: ScreenProps) {
  const { backgroundColor, safeAreaEdges } = useLayoutConfig();
  const insets = useSafeAreaInsets();

  if (scroll) {
    return (
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor, paddingBottom: spacing.md + insets.bottom }, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: spacing.xl + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  const Container = SafeAreaView;
  return (
    <Container
      style={[styles.container, { backgroundColor, paddingBottom: spacing.md + insets.bottom }, style]}
      edges={safeAreaEdges}
      {...rest}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
});
