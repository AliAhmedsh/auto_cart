import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { styles } from './styles';

interface CardProps {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  children?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  selected,
  onPress,
  style,
  leftIcon,
  rightAdornment,
  children,
}: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
        style,
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.contentRow}>
          {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}
          <View style={styles.textWrap}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>
        {rightAdornment ? <View style={styles.right}>{rightAdornment}</View> : null}
      </View>
      {children ? <View style={styles.body}>{children}</View> : null}
    </Pressable>
  );
}
