import React, { useMemo, useState } from 'react';
import { Image, Pressable, Text, View, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SvgXml } from 'react-native-svg';
import { AuthStackScreenProps } from '../../../navigation/types';
import { spacing } from '../../../theme/spacing';
import { arrowBack, cropIcon, flipHorizontalIcon, flipVerticalIcon } from '../../../assets/svg/Index';
import { Button } from '../../../components/ui/Button';
import { styles } from './styles';
import { useAppDispatch } from '../../../store/hooks';
import { setImage } from '../../../store/slices/mediaSlice';

export default function ImageEditor({ navigation, route }: AuthStackScreenProps<'ImageEditor'>) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [imageUri, setImageUri] = useState(route.params?.sourceUri);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const displayStyle = useMemo(
    () => ({
      transform: [{ scaleX: flipH ? -1 : 1 }, { scaleY: flipV ? -1 : 1 }],
    }),
    [flipH, flipV],
  );

  const handleCrop = async () => {
    if (!imageUri) return;
    try {
      const res = await ImageCropPicker.openCropper({
        path: imageUri,
        mediaType: 'photo',
        freeStyleCropEnabled: false,
        cropperToolbarTitle: 'Crop Image',
      });
      if (res.path) setImageUri(res.path);
    } catch (e) {
      // user cancelled; ignore
    }
  };

  const handleNext = () => {
    const destination = route.params?.from ?? 'PrivateSellerSignup';
    const field = (route.params as any)?.field;
    if (field && imageUri) {
      dispatch(setImage({ field, uri: imageUri }));
    }
    navigation.navigate(destination as any, { photoUri: imageUri, flipH, flipV, field });
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom + spacing.lg }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.body}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <SvgXml xml={arrowBack} width={32} height={32} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.title}>Choose Image</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.imageWrap}>
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={[styles.image, displayStyle]} resizeMode="cover" />
              <View style={styles.cropOverlay}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          ) : (
            <Text style={styles.placeholder}>No image selected</Text>
          )}
        </View>

        <View style={styles.tools}>
          <ToolButton label="Crop" icon={cropIcon} onPress={handleCrop} />
          <ToolButton label="Flip Horizontal" icon={flipHorizontalIcon} onPress={() => setFlipH(!flipH)} />
          <ToolButton label="Flip Vertical" icon={flipVerticalIcon} onPress={() => setFlipV(!flipV)} />
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button label="Next" onPress={handleNext} disabled={!imageUri} />
      </View>
    </SafeAreaView>
  );
}

function ToolButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.tool} onPress={onPress} hitSlop={8}>
      <SvgXml xml={icon} width={26} height={26} />
      <Text style={styles.toolLabel}>{label}</Text>
    </Pressable>
  );
}
