import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  OnboardingCarousel: undefined;
  SelectAccountType: undefined;
  TradeSellerSignup:
    | { photoUri?: string; flipH?: boolean; flipV?: boolean; field?: 'logoUri' | 'backgroundUri' }
    | undefined;
  TradeSellerExtras: undefined;
  PendingApproval: undefined;
  PrivateSellerSignup: { photoUri?: string; flipH?: boolean; flipV?: boolean } | undefined;
  ImageEditor:
    | {
        sourceUri?: string;
        from?: 'PrivateSellerSignup' | 'TradeSellerSignup';
        field?: 'logoUri' | 'backgroundUri';
      }
    | undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Listings: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  CarDetails: { carId: string };
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  SearchResults: { query: string };
};

export type ListingsStackParamList = {
  ListingsScreen: undefined;
  CreateListing: undefined;
  EditListing: { listingId: string };
};

export type MessagesStackParamList = {
  MessagesScreen: undefined;
  ChatScreen: { chatId: string; userName: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  MainTabScreenProps<'Home'>
>;

export type SearchStackScreenProps<T extends keyof SearchStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, T>,
  MainTabScreenProps<'Search'>
>;

export type ListingsStackScreenProps<T extends keyof ListingsStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ListingsStackParamList, T>,
  MainTabScreenProps<'Listings'>
>;

export type MessagesStackScreenProps<T extends keyof MessagesStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<MessagesStackParamList, T>,
  MainTabScreenProps<'Messages'>
>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, T>,
  MainTabScreenProps<'Profile'>
>;
