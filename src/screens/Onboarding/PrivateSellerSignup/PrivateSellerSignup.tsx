import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';
import { Screen } from '../../../components/layout/Screen';
import { TextInput } from '../../../components/ui/TextInput';
import { Button } from '../../../components/ui/Button';
import { addIcon, arrowBack, crossIcon } from '../../../assets/svg/Index';
import { AuthStackScreenProps } from '../../../navigation/types';
import { colors } from '../../../theme/colors';
import { styles } from './styles';
import * as yup from 'yup';

export default function PrivateSellerSignup({
  navigation,
  route,
}: AuthStackScreenProps<'PrivateSellerSignup'>) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(route.params?.photoUri);

  const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
  });

  const update = async (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    // realtime field-level validation
    try {
      await schema.validateAt(key, { ...form, [key]: value });
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } catch (err: any) {
      if (err?.message) {
        setErrors(prev => ({ ...prev, [key]: err.message }));
      }
    }
  };

  useEffect(() => {
    if (route.params?.photoUri) {
      setPhotoUri(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const handleContinue = async () => {
    setSubmitting(true);
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
      navigation.navigate('Login');
    } catch (err: any) {
      const errs: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          if (e.path) errs[e.path] = e.message;
        });
      }
      setErrors(errs);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePick = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    const uri = res.assets?.[0]?.uri;
    if (uri) {
      navigation.navigate('ImageEditor', { sourceUri: uri });
    }
  };

  const handleRemovePhoto = () => setPhotoUri(undefined);
  const handleChangePhoto = () => handlePick();

  return (
    <Screen scroll style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Text style={styles.title}>Create your Private seller account</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="full name"
          placeholderTextColor={colors.editorPlaceholder}
          value={form.fullName}
          onChangeText={v => update('fullName', v)}
          error={errors.fullName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="email address"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.editorPlaceholder}
          value={form.email}
          onChangeText={v => update('email', v)}
          error={errors.email}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="phone number"
          keyboardType="phone-pad"
          placeholderTextColor={colors.editorPlaceholder}
          value={form.phone}
          onChangeText={v => update('phone', v)}
          error={errors.phone}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="address"
          placeholderTextColor={colors.editorPlaceholder}
          value={form.address}
          onChangeText={v => update('address', v)}
          error={errors.address}
        />

        <Text style={styles.label}>Upload Profile Picture</Text>
        <Pressable style={styles.upload} hitSlop={8} onPress={handlePick}>
          {photoUri ? (
            <View style={styles.previewWrapper}>
              <Image source={{ uri: photoUri }} style={styles.preview} />
              <TouchableOpacity style={styles.removeBadge} onPress={handleRemovePhoto} hitSlop={8}>
                <SvgXml xml={crossIcon} width={36} height={36} />
              </TouchableOpacity>
            </View>
          ) : (
            <SvgXml xml={addIcon} width={24} height={24} />
          )}
        </Pressable>
        {photoUri && (
          <TouchableOpacity onPress={handleChangePhoto}>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cta}>
        <Button label="Continue" onPress={handleContinue} loading={submitting} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginHint}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
