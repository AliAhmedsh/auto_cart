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
  },
  viewStoryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  viewStoryText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
    backgroundColor: '#000',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  imageDots: {
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
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 0,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  carTitle: {
    fontSize: 20,
    fontFamily: typography.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textSecondary,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  price: {
    fontSize: 24,
    fontFamily: typography.bold,
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: {
    fontSize: 18,
  },
  specsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  specIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs / 2,
  },
  specIcon: {
    fontSize: 24,
  },
  specValue: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  detailColumn: {
    flex: 1,
  },
  detailRow: {
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: typography.regular,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  sellerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.background,
  },
  sellerDetails: {
    gap: spacing.xs / 2,
  },
  sellerName: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  sellerBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  sellerBadgeText: {
    fontSize: 10,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
  postedInfo: {
    alignItems: 'flex-end',
  },
  postedLabel: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
  postedTime: {
    fontSize: 12,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  reportButton: {
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  reportButtonText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.error,
  },
  relatedSection: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.xl,
  },
  relatedSectionTitle: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  relatedTitle: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  relatedScroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  relatedCard: {
    width: 180,
    marginRight: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  relatedImageContainer: {
    position: 'relative',
  },
  relatedImage: {
    width: '100%',
    height: 120,
  },
  relatedImageBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  relatedImageBadgeText: {
    fontSize: 10,
    fontFamily: typography.semiBold,
    color: colors.background,
  },
  relatedInfo: {
    padding: spacing.sm,
  },
  relatedPrice: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  relatedSeller: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    marginBottom: spacing.xs / 2,
  },
  relatedAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  relatedAvatarText: {
    fontSize: 10,
    fontFamily: typography.bold,
    color: colors.background,
  },
  relatedSellerName: {
    fontSize: 11,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
  relatedLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  relatedLocationIcon: {
    fontSize: 10,
  },
  relatedLocationText: {
    fontSize: 11,
    fontFamily: typography.regular,
    color: colors.textSecondary,
  },
});
