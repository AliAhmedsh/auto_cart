import { StyleSheet } from 'react-native';
import { spacing } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  logo: {
    height: 48,
    alignSelf: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'center',
    fontFamily: typography.semiBold,
  },
  form: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  forgot: {
    fontSize: 14,
    color: colors.accentIndigo,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  footer: {
    gap: spacing.md,
  },
  signupText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: typography.regular,
  },
  signupLink: {
    color: colors.primary,
    fontFamily: typography.semiBold,
    fontStyle: 'normal',
  },
});
