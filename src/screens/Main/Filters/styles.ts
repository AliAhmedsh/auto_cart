import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  clearButton: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.error,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
    position: 'relative',
    zIndex: 1,
  },
  sectionActive: {
    zIndex: 2000,
  },
  label: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
  dropdownValue: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textPrimary,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 4000,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfWidth: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  halfWidthActive: {
    zIndex: 2000,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
