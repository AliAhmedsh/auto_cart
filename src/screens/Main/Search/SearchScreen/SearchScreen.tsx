import React from 'react';
import { Text, View } from 'react-native';
import { SearchStackScreenProps } from '../../../../navigation/types';
import { styles } from './styles';

export default function SearchScreen({ navigation }: SearchStackScreenProps<'SearchScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Cars</Text>
    </View>
  );
}
