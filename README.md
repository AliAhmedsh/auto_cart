<div align="center">

# AutoCart Mobile — Technical Documentation

React Native (TypeScript) app scaffold with onboarding, ad feed UI, create-ad flow, and license-plate OCR. This document captures the current code state and what is **implemented vs. missing** so new developers can understand, maintain, and extend the project.

</div>

---

## Table of Contents
1. [Stack & Project Layout](#stack--project-layout)
2. [Navigation Map](#navigation-map)
3. [State Management](#state-management)
4. [Features (Current State)](#features-current-state)
5. [OCR Plate Scanning](#ocr-plate-scanning)
6. [Data & Persistence](#data--persistence)
7. [Build & Run](#build--run)
8. [File Pointers](#file-pointers)
9. [Gaps vs Requested Scope](#gaps-vs-requested-scope)
10. [Extension Roadmap](#extension-roadmap)
11. [End-to-End User Flow](#end-to-end-user-flow)

---

## Stack & Project Layout
- **Framework:** React Native (TypeScript)
- **Navigation:** `@react-navigation` (native stack + bottom tabs)
- **State:** Redux Toolkit + redux-persist (AsyncStorage)
- **UI/Theming:** Custom components (`Screen`, `Header`, `TextInput`, `Button`, `AdCard`), theme colors/spacing/typography
- **Media/OCR:** `react-native-vision-camera` for live camera; `react-native-text-recognition` for OCR; `react-native-image-picker` for gallery; `react-native-image-crop-picker` for cropping
- **Entry:** `App.tsx` wraps Redux/PersistGate/GestureHandler/Layout providers → `Navigation` → `RootNavigator`
- **Key dirs:** `src/navigation`, `src/screens`, `src/store`, `src/assets`, `src/components`

---

## Navigation Map
- **RootNavigator**: Auth stack + Main tab.
- **AuthStack** (@src/navigation/stacks/AuthStack.tsx): Splash → OnboardingCarousel → SelectAccountType → (PrivateSellerSignup | TradeSellerSignup → TradeSellerExtras → PendingApproval) → Login → ImageEditor.
- **MainTabNavigator** (@src/navigation/MainTabNavigator.tsx): Home (HomeStack), Search, Scan, Messages, Story, Profile.
- **HomeStack** (@src/navigation/stacks/HomeStack.tsx): HomeScreen, CreateAd, PreviewAd, AdDetail, AdImages, ViewAllImages, Filters.

---

## State Management
- Store persisted (auth slice) via AsyncStorage @src/store/index.ts.
- Slices:
  - **authSlice**: user {id, email, name, accountType}, token, isAuthenticated @src/store/slices/authSlice.ts.
  - **filterSlice**: filters used by Home to filter mock ads (category/year/price/location/country).
  - **mediaSlice**: stores edited images (logo/background) for trade signup from ImageEditor.

---

## Features (Current State)
### Onboarding & Splash
- Splash, onboarding carousel (4 slides), account-type selection.
- PrivateSellerSignup: form + photo upload via picker → ImageEditor; yup validation.
- TradeSellerSignup: business info + logo/background upload/crop; continues to TradeSellerExtras (social links + password) → PendingApproval modal/screen.
- Login screen present. **No backend/auth API.**

### Home Feed
- Mock ads rendered; filters applied client-side; tap → AdDetail; CTA to post ad if empty.

### Ad Details & Media
- AdDetail shows carousel, price/actions, specs, seller info, related images (static). Actions not wired. AdImages/ViewAllImages provide carousel/grid.

### Create Ad & Preview
- Form with validation (category, phone, location, price, description, vehicle fields), image/story upload via picker; PreviewAd shows passed data.
- TODO: Story preview; enforce 20-image cap; no publish/persistence.

### Filters
- Filters screen exists; affects Home mock data only.

### Search
- Placeholder UI only; no query/results.

### Messages/Chat
- Placeholder screen; no threads/messages.

### Story
- Tab exists; implementation not included (likely placeholder).

### Profile
- Tab exists; implementation not detailed here.

### Notifications
- Not implemented (only icons in AdDetail).

---

## OCR Plate Scanning
- **Entry:** Scan tab screen with CTA to open camera or place ad manually.
- **CameraScreen:**
  - Requests camera permission; selects back camera.
  - Periodic photo capture (1.5s) → `TextRecognition.recognize`.
  - Extracts candidate strings, matches license-plate patterns; shows confirmation modal (AlertModal).
  - Also has barcode/QR codeScanner.
  - Returns plate text via callback. **No vehicle-info API lookup; no auto-fill.**

---

## Data & Persistence
- Local Redux store; `auth` slice persisted; `filter` and `media` are in-memory (media holds URIs).
- Ads are mock data; CreateAd state is local and only passed to PreviewAd.
- **No remote persistence**: no REST/GraphQL calls, no sockets, no DB models.

---

## Build & Run
```sh
# Install
yarn install

# iOS (first time)
cd ios && pod install && cd ..

# Start metro
yarn start

# Run platforms
yarn ios
yarn android
```
Requirements: vision-camera & text-recognition native deps; camera permissions on device/emulator.

---

## File Pointers
- App root: @App.tsx
- Navigation provider: @src/navigation/index.tsx
- Tabs: @src/navigation/MainTabNavigator.tsx
- Home stack: @src/navigation/stacks/HomeStack.tsx
- Auth stack: @src/navigation/stacks/AuthStack.tsx
- Home feed: @src/screens/Main/Home/Home.tsx
- Create Ad: @src/screens/Main/CreateAd/CreateAd.tsx
- Ad Detail: @src/screens/Main/AdDetail/AdDetail.tsx
- Scan launcher: @src/screens/Main/Scan/Scan.tsx
- OCR engine: @src/screens/Main/Scan/CameraScreen.tsx
- Private signup: @src/screens/Onboarding/PrivateSellerSignup/PrivateSellerSignup.tsx
- Trade signup: @src/screens/Onboarding/TradeSellerSignup/TradeSellerSignup.tsx
- Trade extras: @src/screens/Onboarding/TradeSellerExtras/TradeSellerExtras.tsx
- Pending approval: @src/screens/Onboarding/PendingApproval/PendingApproval.tsx
- Store setup: @src/store/index.ts
- Auth slice: @src/store/slices/authSlice.ts

---

## Gaps vs Requested Scope
- **Backend/APIs/DB/Admin:** None present.
- **Notifications:** Not implemented (no push or in-app list).
- **Search:** Placeholder only.
- **Chat:** Placeholder only.
- **Profiles:** Tab present; functionality not implemented.
- **Ad posting:** UI-only; no upload/storage/publish.
- **Stories:** Upload list only; no playback/preview; no persistence.
- **Swipe browsing:** Not implemented; feed is vertical scroll.
- **OCR enrichment:** Plate text is captured but not used to auto-populate vehicle details.

---

## Extension Roadmap
1) Add API layer (REST/GraphQL), auth (login/signup/refresh), ads CRUD, media upload (S3/Firebase), chat, search, notifications token registration.
2) Wire CreateAd to backend; enforce 20-image limit; upload images/stories; publish listings; tie PreviewAd to server payload.
3) Implement Stories model and playback in Story tab and AdDetail; include in PreviewAd.
4) Build Search UI with filters and backend pagination.
5) Implement Chat (conversation list + thread) with sockets or polling; wire AdDetail “chat” action.
6) Add Notifications (push + in-app list) with deep links to ads/chat.
7) Profile: fetch/update profile, listings, saved ads, trade review status.
8) Admin: separate web console or restricted routes for moderation/approvals.
9) OCR enrichment: call vehicle-info API after plate capture to auto-fill make/model/year.
10) Add error handling/analytics (Sentry/Crashlytics), retries, and secure storage for tokens.

---

## End-to-End User Flow (Current)
1) Launch → Splash → OnboardingCarousel → SelectAccountType.
2) Private: fill form + optional photo → ImageEditor → Login (UI only).
3) Trade: business details + logo/background crop → Trade extras (links/password) → “Under review” modal → Login (UI only).
4) Main tabs:
   - Home: mock feed; tap ad → AdDetail; view images/grids.
   - Filters: narrow mock feed.
   - Create Ad: fill form + images/stories → PreviewAd; cannot publish.
   - Scan: open camera, OCR plate, confirm plate; no auto-fill.
   - Search/Messages/Story/Profile: placeholders.

---

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
