import React from 'react';
import { Text, View } from 'react-native';
import { MessagesStackScreenProps } from '../../../../navigation/types';
import { styles } from './styles';

export default function MessagesScreen({ navigation }: MessagesStackScreenProps<'MessagesScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
    </View>
  );
}
