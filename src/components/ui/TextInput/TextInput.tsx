import React from 'react';
import { Text, TextInput as RNTextInput, TextInputProps, View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

interface Props extends TextInputProps {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  rightIcon?: boolean;
  rightAdornment?: React.ReactNode;
  labelStyle?: any;
  containerStyle?: StyleProp<ViewStyle>;
  borderless?: boolean;
}

export function TextInput({
  label,
  helperText,
  error,
  style,
  rightIcon,
  rightAdornment,
  labelStyle,
  containerStyle,
  borderless,
  ...rest
}: Props) {
  const hasError = Boolean(error);
  const isMultiline = Boolean(rest.multiline);
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label
        ? typeof label === 'string'
          ? <Text style={[styles.label, labelStyle]}>{label}</Text>
          : label
        : null}
      <View style={[
        styles.inputRow,
        isMultiline && styles.inputRowMultiline,
        borderless && styles.inputRowBorderless,
        hasError && styles.inputError,
      ]}>
        <RNTextInput
          style={[styles.input, isMultiline && styles.multilineInput, style]}
          placeholderTextColor={colors.editorPlaceholder}
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
