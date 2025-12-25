import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    fontFamily: typography.semiBold,
  },
  inputRow: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: typography.regular,
  },
  inputError: {
    borderColor: colors.error,
  },
  iconPlaceholder: {
    width: 16,
    height: 16,
    marginLeft: spacing.sm,
    backgroundColor: 'transparent',
  },
  helper: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.regular,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    fontFamily: typography.regular,
  },
});
