import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = (SCREEN_WIDTH - 32) / 3;

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#F9FAFB',
  },
  grid: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    padding: spacing.xs / 2,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    // borderRadius: 8,
  },
});
