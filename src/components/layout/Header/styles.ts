import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: '#F9FAFB',
  },
  logo: {
    height: 32,
    width: 100,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  placeAdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    gap: spacing.xs,
  },
  placeAdText: {
    color: colors.background,
    fontSize: 14,
    fontFamily: typography.semiBold,
  },
  filterIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    gap: 4,
  },
  filterLine: {
    height: 2,
    backgroundColor: colors.textPrimary,
    borderRadius: 1,
  },
});
