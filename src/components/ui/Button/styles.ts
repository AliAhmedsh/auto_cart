import { StyleSheet } from 'react-native';
import { spacing } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.primaryTextOn,
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
});
