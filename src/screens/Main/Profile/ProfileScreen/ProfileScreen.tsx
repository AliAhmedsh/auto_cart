import React from 'react';
import { Text, View } from 'react-native';
import { ProfileStackScreenProps } from '../../../../navigation/types';
import { styles } from './styles';

export default function ProfileScreen({ navigation }: ProfileStackScreenProps<'ProfileScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}
