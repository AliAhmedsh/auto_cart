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
  formGroup: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    fontSize: 14,
    color: colors.editorPlaceholder,
    fontFamily: typography.semiBold,
  },
  labelNote: {
    fontSize: 14,
    color: colors.editorPlaceholder,
    fontStyle: 'italic',
    fontFamily: typography.regular,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
    fontFamily: typography.semiBold,
  },
  uploadSection: {
    gap: spacing.xs,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  uploadItem: {
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  uploadRowLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
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
    top: -12,
    right: -12,
  },
  uploadHint: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.regular,
  },
  changeLink: {
    color: colors.blue ?? colors.primary,
    fontFamily: typography.semiBold,
    textDecorationLine: 'underline',
  },
  footer: {
    gap: spacing.md,
    marginTop: spacing.xl * 1.2,
    paddingBottom: spacing.xl,
  },
  linkPressable: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  link: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: typography.regular,
  },
  linkBold: {
    color: colors.primary,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: typography.semiBold,
  },
});
