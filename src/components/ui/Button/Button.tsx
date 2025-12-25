import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export function Button({ label, onPress, loading, disabled, backgroundColor, textColor }: ButtonProps) {
  const isDisabled = disabled || loading;
  const bg = backgroundColor ?? colors.primary;
  const fg = textColor ?? colors.primaryTextOn;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg },
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={[styles.label, { color: fg }]}>{label}</Text>
      )}
    </Pressable>
  );
}
