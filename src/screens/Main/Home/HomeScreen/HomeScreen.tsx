import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { HomeStackScreenProps } from '../../../../navigation/types';
import { styles } from './styles';

export default function HomeScreen({ navigation }: HomeStackScreenProps<'HomeScreen'>) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to AutoCart</Text>
        <Text style={styles.subtitle}>Find your dream car today</Text>
      </ScrollView>
    </View>
  );
}
