import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.editorBackground,
    paddingHorizontal: spacing.lg,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: 18,
    color: colors.editorTitle,
    fontFamily: typography.semiBold,
  },
  imageWrap: {
    width: '100%',
    marginTop: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  cropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  placeholder: {
    color: colors.editorPlaceholder,
    fontFamily: typography.regular,
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  tool: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
  },
  toolLabel: {
    fontSize: 12,
    color: colors.editorToolLabel,
    textAlign: 'center',
    fontFamily: typography.regular,
  },
  footer: {
    paddingTop: spacing.sm,
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
});
