# SkillPulse — React Native (Expo)

## Quick Start

### 1. Install
```bash
npm install
```

### 2. Configure Firebase
```bash
cp .env.example .env
# Then fill in your Firebase credentials
```

## Running

### ⭐ Android — with emulator picker (MANDATORY FEATURE)
```bash
npm run android
```
Lists all your AVDs → you pick one → it boots → Expo starts.

Requirements: Android Studio + at least one AVD created, `adb` in PATH.

### Android — skip picker
```bash
npm run android:default
```

### iOS (macOS only)
```bash
npm run ios
```

### Expo dev server
```bash
npm start
```

## Key Changes from Web
- All `div/span/button` → `View/Text/TouchableOpacity`
- CSS → `StyleSheet.create()`
- `localStorage` → `AsyncStorage`
- Browser download → `expo-file-system` + `expo-sharing`
- `<input type="date">` → custom Calendar component
- SVG icons → `react-native-svg`
- Modals → RN bottom-sheet `Modal`
