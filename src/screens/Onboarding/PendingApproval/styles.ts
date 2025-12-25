import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    fontFamily: typography.semiBold,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    backgroundColor: colors.cardBackground,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: typography.regular,
  },
});
