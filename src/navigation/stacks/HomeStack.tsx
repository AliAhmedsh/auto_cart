import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import Home from '../../screens/Main/Home/Home';
import CreateAd from '../../screens/Main/CreateAd/CreateAd';
import PreviewAd from '../../screens/Main/PreviewAd/PreviewAd';
import AdDetail from '../../screens/Main/AdDetail/AdDetail';
import AdImages from '../../screens/Main/AdImages/AdImages';
import ViewAllImages from '../../screens/Main/ViewAllImages/ViewAllImages';
import Filters from '../../screens/Main/Filters/Filters';
import { Header } from '../../components/layout/Header';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <Stack.Screen name="CreateAd" component={CreateAd} />
      <Stack.Screen name="PreviewAd" component={PreviewAd} />
      <Stack.Screen name="AdDetail" component={AdDetail} />
      <Stack.Screen name="AdImages" component={AdImages} />
      <Stack.Screen name="ViewAllImages" component={ViewAllImages} />
      <Stack.Screen name="Filters" component={Filters} />
    </Stack.Navigator>
  );
}
