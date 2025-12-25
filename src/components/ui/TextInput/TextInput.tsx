import React from 'react';
import { Text, TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

interface Props extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  rightIcon?: boolean;
  rightAdornment?: React.ReactNode;
}

export function TextInput({ label, helperText, error, style, rightIcon, rightAdornment, ...rest }: Props) {
  const hasError = Boolean(error);
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputRow, hasError && styles.inputError]}>
        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textSecondary}
          {...rest}
        />
        {rightAdornment
          ? rightAdornment
          : rightIcon
          ? <View style={styles.iconPlaceholder} />
          : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}
