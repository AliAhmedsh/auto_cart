import React from 'react';
import { Text, View } from 'react-native';
import { ListingsStackScreenProps } from '../../../../navigation/types';
import { styles } from './styles';

export default function ListingsScreen({ navigation }: ListingsStackScreenProps<'ListingsScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Listings</Text>
    </View>
  );
}
