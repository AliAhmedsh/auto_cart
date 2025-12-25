import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import Splash from '../../screens/Onboarding/Splash';
import OnboardingCarousel from '../../screens/Onboarding/OnboardingCarousel';
import SelectAccountType from '../../screens/Onboarding/SelectAccountType';
import TradeSellerSignup from '../../screens/Onboarding/TradeSellerSignup';
import TradeSellerExtras from '../../screens/Onboarding/TradeSellerExtras';
import PendingApproval from '../../screens/Onboarding/PendingApproval';
import PrivateSellerSignup from '../../screens/Onboarding/PrivateSellerSignup';
import ImageEditor from '../../screens/Onboarding/ImageEditor';
import Login from '../../screens/Auth/Login';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnboardingCarousel" component={OnboardingCarousel} />
      <Stack.Screen name="SelectAccountType" component={SelectAccountType} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TradeSellerSignup" component={TradeSellerSignup} />
      <Stack.Screen name="TradeSellerExtras" component={TradeSellerExtras} />
      <Stack.Screen name="PendingApproval" component={PendingApproval} />
      <Stack.Screen name="PrivateSellerSignup" component={PrivateSellerSignup} />
      <Stack.Screen name="ImageEditor" component={ImageEditor} />
    </Stack.Navigator>
  );
}
