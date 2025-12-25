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
    marginTop: spacing.sm,
  },
  back: {
    fontSize: 24,
    color: colors.textPrimary,
    paddingHorizontal: spacing.xs,
    fontFamily: typography.semiBold,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: colors.textPrimary,
    marginHorizontal: spacing.sm,
    fontFamily: typography.semiBold,
  },
  form: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: typography.semiBold,
    marginBottom: spacing.xs,
  },
  upload: {
    width: 72,
    height: 72,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
  },
  previewWrapper: {
    position: 'relative',
  },
  preview: {
    width: 70,
    height: 70,
    borderRadius: 9,
  },
  removeBadge: {
    position: 'absolute',
    top: -14,
    right: -14,
  },
  changeLink: {
    color: colors.blue,
    fontFamily: typography.semiBold,
    textDecorationLine: 'underline',
  },
  cta: {
    marginTop: spacing.xl,
    gap: spacing.md,
    paddingBottom: 0,
  },
  loginHint: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.editorPlaceholder,
    fontStyle: 'italic',
    fontFamily: typography.regular,
  },
  loginLink: {
    color: colors.primary,
    fontFamily: typography.semiBold,
    fontStyle: 'normal',
  },
});
