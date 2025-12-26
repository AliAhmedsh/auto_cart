# License Plate Recognition Setup Guide

## Current Implementation

The camera screen now includes a **"Scan License Plate"** button that captures a photo and uses OCR to detect license plates.

## How It Works

1. User points camera at a car's license plate
2. User taps the "Scan License Plate" button
3. Camera captures a photo
4. `react-native-text-recognition` processes the image
5. Text is extracted and validated against license plate patterns
6. If a valid plate is found, the AlertModal appears

## Required Setup

### iOS Setup

1. **Install Pods**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Add Camera Usage Description** (if not already added):
   Open `ios/auto_cart/Info.plist` and add:
   ```xml
   <key>NSCameraUsageDescription</key>
   <string>We need camera access to scan license plates</string>
   ```

3. **Rebuild the app**:
   ```bash
   yarn ios
   ```

### Android Setup

1. **Add Camera Permission** (if not already added):
   Open `android/app/src/main/AndroidManifest.xml` and add:
   ```xml
   <uses-permission android:name="android.permission.CAMERA" />
   ```

2. **Rebuild the app**:
   ```bash
   yarn android
   ```

## Supported License Plate Formats

The system recognizes various license plate patterns:
- Standard format: `XX00XX0000` (e.g., `DL01AB1234`)
- Flexible format: `XX0XXX0000` (e.g., `MH12DE3456`)
- Alphanumeric: 5-10 characters (e.g., `ABC123`, `XYZ9876`)
- Custom patterns with letters and numbers

## Troubleshooting

### OCR Not Working

If text recognition isn't working:

1. **Check permissions**: Ensure camera permissions are granted
2. **Lighting**: Make sure the license plate is well-lit
3. **Distance**: Keep the camera at an appropriate distance (not too close, not too far)
4. **Angle**: Try to keep the camera perpendicular to the plate
5. **Clean the lens**: Ensure the camera lens is clean

### No Plates Detected

If the button works but no plates are detected:

1. **Check the patterns**: The license plate patterns in the code may need adjustment for your region
2. **Add more patterns**: Edit `LICENSE_PLATE_PATTERNS` in `CameraScreen.tsx` to include your region's format
3. **Test with different plates**: Some plates may have unusual formatting

### Improving Detection

To improve detection accuracy:

1. **Adjust patterns**: Modify `LICENSE_PLATE_PATTERNS` array to match your region's plates
2. **Add preprocessing**: Consider adding image preprocessing before OCR
3. **Multiple captures**: Take multiple photos if the first attempt fails

## Alternative: Automatic Scanning with vision-camera-ocr

For automatic real-time scanning (more advanced):

1. **Install vision-camera-ocr**:
   ```bash
   yarn add vision-camera-ocr
   ```

2. **iOS Setup**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Update babel.config.js** (already configured):
   ```javascript
   plugins: [
     ['react-native-worklets/plugin'],
     ['react-native-reanimated/plugin'],
   ]
   ```

4. This enables frame-by-frame OCR processing for automatic detection

## Testing

1. Run the app
2. Navigate to the camera screen
3. Point at a license plate
4. Tap "Scan License Plate"
5. Wait for the AlertModal to appear with the detected plate number

## Notes

- The current implementation uses manual capture for better reliability
- QR code/barcode scanning still works alongside license plate detection
- The AlertModal shows the detected registration number and asks for confirmation
