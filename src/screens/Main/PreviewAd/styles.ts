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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
  },
  publishButton: {
    backgroundColor: '#00C853',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
    borderRadius: 8,
  },
  publishButtonText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: '#FFFFFF',
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
    height: 280,
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
    paddingBottom: spacing.lg / 2,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
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
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  specIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.md,
    rowGap: spacing.md,
    marginBottom: spacing.xl,
  },
  detailColumn: {
    flex: 1,
  },
  detailItem: {
    width: '30%',
    minWidth: 90,
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
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
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
});
