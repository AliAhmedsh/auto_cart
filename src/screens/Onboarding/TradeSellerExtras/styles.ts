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
    textAlign: 'center',
  },
  formGroup: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  footer: {
    gap: spacing.md,
    marginTop: spacing.xl,
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
  login: {
    color: colors.primary,
    fontFamily: typography.semiBold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFCEB',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F9E9A7',
  },
  modalTitle: {
    color: '#CA8A04',
    paddingTop: spacing.xs,
    fontFamily: typography.semiBold,
    fontSize: 14,
    marginBottom: spacing.xs,
    fontStyle: 'italic',
  },
  modalBody: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xs,
    fontFamily: typography.regular,
  },
});
