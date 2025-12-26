import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  illustration: {
    width: moderateScale(300),
    height: moderateScale(300),
    marginBottom: spacing.xl,
  },
  description: {
    fontSize: moderateScale(16),
    fontFamily: typography.regular,
    color: colors.gray400,
    textAlign: 'center',
    lineHeight: moderateScale(24),
    paddingHorizontal: spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: moderateScale(16),
    fontFamily: typography.semiBold,
    color: colors.primaryTextOn,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontSize: moderateScale(16),
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
});
