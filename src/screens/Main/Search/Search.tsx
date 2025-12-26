import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { MainTabScreenProps } from '../../../navigation/types';
import { styles } from './styles';

export default function Search({ navigation }: MainTabScreenProps<'Search'>) {
  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Search</Text>
      </View>
    </Screen>
  );
}
