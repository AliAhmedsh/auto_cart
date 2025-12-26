import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { MainTabScreenProps } from '../../../navigation/types';
import { styles } from './styles';
import { Button } from '../../../components/ui/Button';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';

export default function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Button label="Logout" onPress={handleLogout} />
      </View>
    </Screen>
  );
}
