import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginBottom: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0,
  },
  sellerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarText: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.background,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  sellerDetails: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  sellerName: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  postedTime: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
  sellerBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 5,
  },
  sellerBadgeTrade: {
    backgroundColor: '#E5F0FF',
  },
  sellerBadgePrivate: {
    backgroundColor: colors.successLight,
  },
  sellerBadgeText: {
    fontSize: 10,
    fontFamily: typography.semiBold,
  },
  sellerBadgeTextTrade: {
    color: colors.blue,
  },
  sellerBadgeTextPrivate: {
    color: colors.primary,
  },
  mainImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  thumbnails: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  thumbnailWrapper: {
    position: 'relative',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailOverlayText: {
    fontSize: 14,
    fontFamily: typography.bold,
    color: colors.background,
  },
  adInfo: {
    paddingVertical: spacing.md,
    paddingTop: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    marginBottom: spacing.sm,
  },
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  priceSection: {
    gap: 2,
  },
  price: {
    fontSize: 20,
    fontFamily: typography.bold,
    color: colors.primary,
  },
  pricePerMonth: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
});
