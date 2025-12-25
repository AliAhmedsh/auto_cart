import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.cardBackground,
    gap: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.successLight,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.94,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    gap: spacing.xs,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: typography.semiBold,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: typography.regular,
  },
  right: {
    marginLeft: spacing.sm,
  },
  body: {
    marginTop: spacing.sm,
    gap: spacing.sm * 0.75,
  },
});
