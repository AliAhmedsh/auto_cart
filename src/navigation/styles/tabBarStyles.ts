import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../theme/colors';

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: moderateScale(60),
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
});
