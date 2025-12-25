import React from 'react';
import { Text, View } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { Button } from '../../../components/ui/Button';
import { AuthStackScreenProps } from '../../../navigation/types';
import { styles } from './styles';

export default function PendingApproval({ navigation }: AuthStackScreenProps<'PendingApproval'>) {
  return (
    <Screen>
      <Text style={styles.title}>Trade Account Under Review</Text>
      <View style={styles.card}>
        <Text style={styles.body}>
          Thank you for your interest in a Trade Seller account. Our team is currently reviewing your request.
        </Text>
        <Text style={styles.body}>You'll receive an update soon.</Text>
      </View>
      <Button label="Back to start" onPress={() => navigation.popToTop()} />
    </Screen>
  );
}
