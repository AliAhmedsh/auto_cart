import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { MainTabScreenProps } from '../../../navigation/types';
import { styles } from './styles';
import CameraScreen from './CameraScreen';
import AlertModal from './AlertModal';

export default function Scan({ navigation }: MainTabScreenProps<'Scan'>) {
  const [showCamera, setShowCamera] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [scannedText, setScannedText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const parent = navigation.getParent?.();
    if (showCamera && parent) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    } else if (parent) {
      parent.setOptions({ tabBarStyle: undefined });
    }
    return () => {
      parent?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation, showCamera]);

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handlePlaceManually = () => {
    navigation.navigate('Home');
  };

  const handleScanComplete = (text: string) => {
    setShowCamera(false);
    setScannedText(text);
    setShowAlert(true);
  };

  const handleOpenDetails = () => {
    setShowAlert(false);
  };

  const handleGoBack = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Screen style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>Reg Scanner</Text>
          <Image
            source={require('../../../assets/images/scan.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.description}>
            This option allows you to check your vehicle details before purchasing
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleOpenCamera}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handlePlaceManually}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Place Ad Manually</Text>
          </TouchableOpacity>
        </View>
      </Screen>

      <Modal
        visible={showCamera}
        animationType="fade"
        transparent={false}
        presentationStyle="fullScreen"
        statusBarTranslucent
      >
        <CameraScreen
          onClose={() => setShowCamera(false)}
          onScanComplete={handleScanComplete}
        />
      </Modal>

      <AlertModal
        visible={showAlert}
        registrationNumber={scannedText}
        onOpenDetails={handleOpenDetails}
        onGoBack={handleGoBack}
      />
    </>
  );
}
