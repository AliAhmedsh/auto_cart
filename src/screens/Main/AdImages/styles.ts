import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { insets } from '../../../utils/insets';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  counter: {
    fontSize: 16,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    gap: spacing.xs / 2,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.background,
  },
  sliderWrapper: {
    height: SCREEN_HEIGHT * 0.72,
    position: 'relative',
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(117, 103, 103, 0.5)',
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
});
