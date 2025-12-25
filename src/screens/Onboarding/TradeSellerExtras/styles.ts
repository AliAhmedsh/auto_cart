import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { insets } from '../../../utils/insets';

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg + insets.top,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  logo: {
    height: 36,
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    fontFamily: typography.semiBold,
  },
  formGroup: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  footer: {
    gap: spacing.sm,
  },
  link: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: typography.regular,
  },
  login: {
    color: colors.primary,
    fontFamily: typography.semiBold,
  },
});
