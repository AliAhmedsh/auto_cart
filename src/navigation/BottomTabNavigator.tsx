import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeStack } from './stacks/HomeStack';
import { SearchStack } from './stacks/SearchStack';
import { ListingsStack } from './stacks/ListingsStack';
import { MessagesStack } from './stacks/MessagesStack';
import { ProfileStack } from './stacks/ProfileStack';
import Story from '../screens/Main/Story/Story';
import { SvgXml } from 'react-native-svg';
import { storyInactive } from '../assets/svg/Index';
import { colors } from '../theme/colors';
import { tabBarStyles } from './styles/tabBarStyles';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: tabBarStyles.tabBar,
        tabBarLabelStyle: tabBarStyles.label,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Listings"
        component={ListingsStack}
        options={{
          tabBarLabel: 'Listings',
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen
        name="Story"
        component={Story}
        options={{
          tabBarLabel: 'Story',
          tabBarIcon: ({ size }) => <SvgXml xml={storyInactive} width={size} height={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
