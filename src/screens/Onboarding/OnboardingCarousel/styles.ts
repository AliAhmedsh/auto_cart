import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: spacing.lg,
    right: spacing.lg,
  },
  title: {
    fontSize: 32,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontFamily: typography.bold,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    fontFamily: typography.regular,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  dotInactive: {
    backgroundColor: colors.textSecondary,
  },
  next: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: typography.semiBold,
  },
});
