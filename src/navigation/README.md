# Navigation Architecture

This project uses a **stack-based navigation system** designed to support multiple user roles and authentication states.

## Structure Overview

```
Navigation (Root)
├── AuthProvider (Context)
└── RootNavigator
    ├── AuthStack (Unauthenticated)
    │   ├── Splash
    │   ├── OnboardingCarousel
    │   ├── SelectAccountType
    │   ├── Login
    │   ├── TradeSellerSignup
    │   ├── TradeSellerExtras
    │   ├── PendingApproval
    │   ├── PrivateSellerSignup
    │   └── ImageEditor
    │
    └── MainStack (Authenticated)
        └── BottomTabNavigator
            ├── Home (HomeStack)
            │   └── HomeScreen
            ├── Search (SearchStack)
            │   └── SearchScreen
            ├── Listings (ListingsStack)
            │   └── ListingsScreen
            ├── Messages (MessagesStack)
            │   └── MessagesScreen
            └── Profile (ProfileStack)
                └── ProfileScreen
```

## Key Components

### 1. **AuthContext** (`context/AuthContext.tsx`)
Manages authentication state and user roles:
- `user`: Current user object with role information
- `isAuthenticated`: Boolean authentication status
- `login()`: Authenticate user
- `logout()`: Clear user session
- `updateUserRole()`: Update user role (for role-based features)

**Supported Roles:**
- `trade_seller`: Trade/dealer sellers
- `private_seller`: Individual sellers
- `admin`: Admin users
- `null`: Unauthenticated

### 2. **RootNavigator** (`navigation/RootNavigator.tsx`)
Top-level navigator that switches between:
- **AuthStack**: For unauthenticated users
- **MainStack**: For authenticated users

### 3. **AuthStack** (`navigation/stacks/AuthStack.tsx`)
Handles all authentication and onboarding flows:
- Splash screen
- Onboarding carousel
- Account type selection
- Login/Signup flows
- Image editing

### 4. **BottomTabNavigator** (`navigation/BottomTabNavigator.tsx`)
Main app navigation with 5 tabs, each containing its own stack:
- **Home**: Browse cars and featured listings
- **Search**: Search and filter cars
- **Listings**: Manage user's listings
- **Messages**: Chat and messaging
- **Profile**: User profile and settings

### 5. **Feature Stacks** (`navigation/stacks/`)
Each tab has its own stack navigator for nested navigation:
- `HomeStack.tsx`
- `SearchStack.tsx`
- `ListingsStack.tsx`
- `MessagesStack.tsx`
- `ProfileStack.tsx`

## Adding New Screens

### To Auth Flow:
1. Create screen in `screens/Auth/` or `screens/Onboarding/`
2. Add route to `AuthStackParamList` in `types.ts`
3. Add screen to `AuthStack.tsx`

### To Main App:
1. Create screen in appropriate `screens/Main/[Feature]/` folder
2. Add route to corresponding stack param list in `types.ts`
3. Add screen to corresponding stack in `stacks/` folder

### To Bottom Tabs:
1. Create new feature folder in `screens/Main/`
2. Create new stack param list in `types.ts`
3. Create new stack in `stacks/` folder
4. Add tab to `BottomTabNavigator.tsx`

## Role-Based Navigation

The system is designed to support different navigation flows based on user roles:

```typescript
// Example: Check user role in a screen
const { user } = useAuth();

if (user?.role === 'trade_seller') {
  // Show trade seller specific features
} else if (user?.role === 'private_seller') {
  // Show private seller specific features
}
```

## Navigation Types

All navigation types are strongly typed in `types.ts`:
- `RootStackParamList`: Root level navigation
- `AuthStackParamList`: Auth flow screens
- `MainTabParamList`: Bottom tab screens
- `[Feature]StackParamList`: Feature-specific stacks

Use screen props for type-safe navigation:
```typescript
import { HomeStackScreenProps } from '../navigation/types';

function MyScreen({ navigation, route }: HomeStackScreenProps<'HomeScreen'>) {
  // Fully typed navigation and route
}
```

## Future Enhancements

The architecture supports:
- Multiple user roles with different permissions
- Role-based screen access
- Dynamic tab visibility based on role
- Nested navigation within features
- Deep linking support
- Navigation state persistence
