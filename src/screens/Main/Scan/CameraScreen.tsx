import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Linking } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
  type Code,
  type CameraDevice,
} from 'react-native-vision-camera';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { moderateScale } from 'react-native-size-matters';
import { arrowBack } from '../../../assets/svg/Index';
import AlertModal from './AlertModal';
import TextRecognition from 'react-native-text-recognition';

interface CameraScreenProps {
  onClose: () => void;
  onScanComplete: (text: string) => void;
}

const LICENSE_PLATE_PATTERNS = [
  /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
  /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/,
  /^[A-Z0-9]{5,10}$/,
  /^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,2}$/,
];

function isLicensePlate(text: string): boolean {
  const cleaned = text.replace(/[\s\-_]/g, '').toUpperCase();
  if (cleaned.length < 5 || cleaned.length > 10) return false;
  return LICENSE_PLATE_PATTERNS.some(pattern => pattern.test(cleaned));
}

export default function CameraScreen({ onClose, onScanComplete }: CameraScreenProps) {
  const device = useCameraDevice('back');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [lastPlate, setLastPlate] = useState('');
  const [checkingPermission, setCheckingPermission] = useState(true);
  const [manualDevice, setManualDevice] = useState<CameraDevice | null>(null);
  const [loadingDevice, setLoadingDevice] = useState(true);
  const { hasPermission, requestPermission } = useCameraPermission();
  const insets = useSafeAreaInsets();
  const activeDevice = device ?? manualDevice;
  const cameraRef = useRef<Camera>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pickBackDevice = (devices: CameraDevice[]): CameraDevice | null => {
    const back = devices.find(d => d.position === 'back');
    return back ?? devices[0] ?? null;
  };

  const handleDetected = useCallback(
    (text: string) => {
      if (isProcessing) return;
      setIsProcessing(true);
      const normalized = text.trim();
      setLastPlate(normalized);
      setShowAlert(true);
    },
    [isProcessing],
  );

  const scanForLicensePlate = useCallback(async () => {
    if (isProcessing || !cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });

      const result = await TextRecognition.recognize(photo.path);

      if (result && result.length > 0) {
        const normalizedItems = result
          .map(item => (typeof item === 'string' ? item : (item as any)?.text || (item as any)?.value || ''))
          .filter(Boolean);

        const candidates = new Set<string>();
        normalizedItems.forEach(text => {
          const cleanedLine = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
          candidates.add(cleanedLine);
          text
            .split(/[\s\-_\.]+/)
            .map((w: string) => w.replace(/[^A-Za-z0-9]/g, '').toUpperCase())
            .filter(Boolean)
            .forEach((w: string) => candidates.add(w));
        });

        const combined = normalizedItems.join('').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (combined) candidates.add(combined);

        console.log('OCR candidates:', Array.from(candidates));

        for (const candidate of candidates) {
          if (isLicensePlate(candidate)) {
            handleDetected(candidate);
            if (scanIntervalRef.current) {
              clearInterval(scanIntervalRef.current);
              scanIntervalRef.current = null;
            }
            return;
          }
        }
      }
    } catch (error) {
      console.log('License plate scan error:', error);
    }
  }, [isProcessing, handleDetected]);

  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'ean-13',
      'ean-8',
      'upc-e',
      'upc-a',
      'code-39',
      'code-93',
      'code-128',
      'codabar',
      'itf',
      'pdf-417',
      'aztec',
      'data-matrix',
    ],
    onCodeScanned: (codes: Code[]) => {
      if (!isProcessing && codes.length > 0) {
        const scannedValue = codes[0].value || '';
        handleDetected(scannedValue);
      }
    },
  });

  useEffect(() => {
    const ensure = async () => {
      try {
        await requestPermission();
        const devices = await Camera.getAvailableCameraDevices();
        setManualDevice(pickBackDevice(devices));
      } finally {
        setCheckingPermission(false);
        setLoadingDevice(false);
      }
    };
    ensure();
  }, [requestPermission]);

  useEffect(() => {
    if (hasPermission && activeDevice && !isProcessing) {
      scanIntervalRef.current = setInterval(() => {
        scanForLicensePlate();
      }, 1500);
    }

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
    };
  }, [hasPermission, activeDevice, isProcessing, scanForLicensePlate]);
  if (checkingPermission) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Requesting camera permission...</Text>
        </View>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Text style={styles.permissionTitle}>Camera permission denied</Text>
        <Text style={styles.permissionBody}>
          Please enable camera access to scan your vehicle registration.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => Linking.openSettings()}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Open Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={requestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!activeDevice && !loadingDevice && hasPermission) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Camera not available</Text>
          <TouchableOpacity
            style={[styles.primaryButton, { marginTop: spacing.md, width: '80%' }]}
            onPress={async () => {
              setLoadingDevice(true);
              try {
                const devices = await Camera.getAvailableCameraDevices();
                setManualDevice(pickBackDevice(devices));
              } finally {
                setLoadingDevice(false);
              }
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryButton, { marginTop: spacing.sm, width: '80%' }]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!activeDevice) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={activeDevice}
        isActive={!isProcessing}
        codeScanner={codeScanner}
        photo={true}
      />

      <View style={styles.overlay}>
        <View style={styles.maskTop} />
        <View style={styles.maskBottom} />
        <View style={styles.maskLeft} />
        <View style={styles.maskRight} />

        <TouchableOpacity style={[styles.backButton, { top: insets.top + spacing.md }]} onPress={onClose}>
          <SvgXml xml={arrowBack} width={moderateScale(22)} height={moderateScale(22)} color={colors.background} />
        </TouchableOpacity>

        <View style={styles.scanFrame}>
          <View style={styles.scanBorder}>
            <View style={[styles.cornerBracket, styles.topLeftCorner]} />
            <View style={[styles.cornerBracket, styles.topRightCorner]} />
            <View style={[styles.cornerBracket, styles.bottomLeftCorner]} />
            <View style={[styles.cornerBracket, styles.bottomRightCorner]} />
          </View>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Keep the subject clear while shooting
          </Text>
        </View>

        <AlertModal
          visible={showAlert}
          registrationNumber={lastPlate}
          onOpenDetails={() => {
            setShowAlert(false);
            onScanComplete(lastPlate);
            setIsProcessing(false);
          }}
          onGoBack={() => {
            setShowAlert(false);
            setIsProcessing(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  permissionTitle: {
    fontSize: moderateScale(18),
    fontFamily: typography.semiBold,
    color: colors.background,
    textAlign: 'center',
  },
  permissionBody: {
    fontSize: moderateScale(15),
    fontFamily: typography.regular,
    color: colors.background,
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: moderateScale(16),
    fontFamily: typography.regular,
    color: colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: moderateScale(50),
    left: spacing.lg,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: moderateScale(24),
    color: colors.background,
    fontFamily: typography.semiBold,
  },
  scanFrame: {
    position: 'absolute',
    top: '15%',
    left: '5%',
    right: '5%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    overflow: 'visible',
  },
  scanBorder: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(24),
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  maskTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '15%',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  maskBottom: {
    position: 'absolute',
    top: '85%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  maskLeft: {
    position: 'absolute',
    top: '15%',
    bottom: '15%',
    left: 0,
    width: '5%',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  maskRight: {
    position: 'absolute',
    top: '15%',
    bottom: '15%',
    right: 0,
    width: '5%',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  cornerBracket: {
    position: 'absolute',
    width: moderateScale(60),
    height: moderateScale(60),
    borderColor: 'rgba(255,255,255,0.9)',
    borderWidth: moderateScale(4),
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    // borderTopLeftRadius: moderateScale(24),
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    // borderTopRightRadius: moderateScale(24),
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    // borderBottomLeftRadius: moderateScale(24),
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderBottomRightRadius: moderateScale(24),
  },
  instructionContainer: {
    position: 'absolute',
    bottom: moderateScale(80),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: moderateScale(16),
    fontFamily: typography.regular,
    color: colors.background,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  scanningText: {
    fontSize: moderateScale(14),
    fontFamily: typography.regular,
    color: colors.primary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: moderateScale(12),
    width: '100%',
    minHeight: moderateScale(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: moderateScale(16),
    fontFamily: typography.semiBold,
    color: colors.primaryTextOn,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: moderateScale(12),
    width: '100%',
    minHeight: moderateScale(48),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.background,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: moderateScale(15),
    fontFamily: typography.regular,
    color: colors.background,
  },
});
