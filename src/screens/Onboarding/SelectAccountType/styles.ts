import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: spacing.lg,
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  logo: {
    height: 48,
  },
  title: {
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: typography.semiBold,
  },
  list: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  card: {
    minHeight: 80,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  radioIdle: {
    borderColor: colors.gray400,
  },
  radioSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  details: {
    gap: spacing.sm,
  },
  detailText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 22,
    fontFamily: typography.regular,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: spacing.md,
  },
});
