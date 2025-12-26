import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import { MainTabParamList } from './types';
import { HomeStack } from './stacks/HomeStack';
import Search from '../screens/Main/Search/Search';
import Scan from '../screens/Main/Scan/Scan';
import Messages from '../screens/Main/Messages/Messages';
import Profile from '../screens/Main/Profile/Profile';
import Story from '../screens/Main/Story/Story';
import { Header } from '../components/layout/Header';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  homeActive,
  homeInactive,
  searchInactive,
  scanActive,
  scanInactive,
  messageInactive,
  storyInactive,
  profileInactive,
} from '../assets/svg/Index';
import { tabBarStyles } from './styles/tabBarStyles';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: { 
            ...tabBarStyles.tabBar, 
            height: tabBarStyles.tabBar.height + insets.bottom
          },
          tabBarLabelStyle: tabBarStyles.label,
          header: () => <Header />,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <SvgXml xml={focused ? homeActive : homeInactive} width={size} height={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ size }) => <SvgXml xml={searchInactive} width={size} height={size} />,
          }}
        />
        <Tab.Screen
          name="Scan"
          component={Scan}
          options={{
            tabBarIcon: ({ focused, size }) => <SvgXml xml={focused ? scanActive : scanInactive} width={size} height={size} />,
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarIcon: ({ size }) => <SvgXml xml={messageInactive} width={size} height={size} />,
          }}
        />
        <Tab.Screen
          name="Story"
          component={Story}
          options={{
            tabBarIcon: ({ size }) => <SvgXml xml={storyInactive} width={size} height={size} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ size }) => <SvgXml xml={profileInactive} width={size} height={size} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
