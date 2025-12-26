import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export default function Story() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <Text style={{ fontFamily: typography.semiBold, fontSize: 18, color: colors.textPrimary }}>
        Story screen
      </Text>
    </View>
  );
}
