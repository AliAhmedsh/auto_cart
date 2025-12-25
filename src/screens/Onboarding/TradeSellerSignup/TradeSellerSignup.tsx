import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, StatusBar } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Screen } from '../../../components/layout/Screen';
import { TextInput } from '../../../components/ui/TextInput';
import { Button } from '../../../components/ui/Button';
import { AuthStackScreenProps } from '../../../navigation/types';
import { addIcon, arrowBack, crossIcon } from '../../../assets/svg/Index';
import * as yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';

export default function TradeSellerSignup({ navigation, route }: AuthStackScreenProps<'TradeSellerSignup'>) {
  const [form, setForm] = useState({
    businessName: '',
    address: '',
    contactName: '',
    vatNumber: '',
    dealerLicense: '',
    logoUri: undefined as string | undefined,
    backgroundUri: undefined as string | undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (route.params?.photoUri) {
      const targetField = (route.params as any)?.field === 'backgroundUri' ? 'backgroundUri' : 'logoUri';
      update(targetField as 'logoUri' | 'backgroundUri', route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const update = async (key: keyof typeof form, value: string) => {
    const nextForm = { ...form, [key]: value };
    setForm(nextForm);
    try {
      await schema.validateAt(key, nextForm);
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    } catch (err: any) {
      if (err?.message) {
        setErrors(prev => ({ ...prev, [key]: err.message }));
      }
    }
  };

  const schema = yup.object().shape({
    businessName: yup.string().required('Business name is required'),
    address: yup.string().required('Address is required'),
    contactName: yup.string().required('Contact person is required'),
    vatNumber: yup.string().nullable(),
    dealerLicense: yup.string().nullable(),
    logoUri: yup.string().nullable(),
    backgroundUri: yup.string().nullable(),
  });

  const handleContinue = async () => {
    setSubmitting(true);
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
      navigation.navigate('TradeSellerExtras');
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

  const pickImage = async (field: 'logoUri' | 'backgroundUri') => {
    const res = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    const uri = res.assets?.[0]?.uri;
    if (uri) {
      navigation.navigate('ImageEditor', { sourceUri: uri, from: 'TradeSellerSignup', field });
    }
  };

  const removeImage = (field: 'logoUri' | 'backgroundUri') => update(field, '');

  return (
    <Screen scroll style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Text style={styles.title}>Create your Trade seller account</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          label="Business Name"
          value={form.businessName}
          onChangeText={v => update('businessName', v)}
          error={errors.businessName}
          placeholder="Business name"
        />
        <TextInput
          label="Address"
          value={form.address}
          onChangeText={v => update('address', v)}
          error={errors.address}
          placeholder="Lorem ipsum dolor."
        />
        <TextInput
          label="Contact Person Name"
          value={form.contactName}
          onChangeText={v => update('contactName', v)}
          error={errors.contactName}
          placeholder="Contact person name"
        />
        <TextInput
          label="VAT Number (Recommended)"
          value={form.vatNumber}
          onChangeText={v => update('vatNumber', v)}
          error={errors.vatNumber}
          placeholder="VAT Number"
        />
        <TextInput
          label="Dealer  License (Optional)"
          value={form.dealerLicense}
          onChangeText={v => update('dealerLicense', v)}
          error={errors.dealerLicense}
          placeholder="Dealer license"
        />

        <View style={styles.uploadSection}>
          <View style={styles.uploadRow}>
            <View style={styles.uploadItem}>
              <Text style={styles.uploadHint}>Upload Business Logo</Text>
              <Pressable style={styles.upload} onPress={() => pickImage('logoUri')} hitSlop={8}>
                {form.logoUri ? (
                  <View style={styles.previewWrapper}>
                    <Image source={{ uri: form.logoUri }} style={styles.preview} />
                    <Pressable style={styles.removeBadge} onPress={() => removeImage('logoUri')} hitSlop={8}>
                      <SvgXml xml={crossIcon} width={36} height={36} />
                    </Pressable>
                  </View>
                ) : (
                  <SvgXml xml={addIcon} width={24} height={24} />
                )}
              </Pressable>
              {form.logoUri ? (
                <Pressable onPress={() => pickImage('logoUri')}>
                  <Text style={styles.changeLink}>Change</Text>
                </Pressable>
              ) : null}
            </View>
            <View style={styles.uploadItem}>
              <Text style={styles.uploadHint}>Upload Background Image</Text>
              <Pressable style={styles.upload} onPress={() => pickImage('backgroundUri')} hitSlop={8}>
                {form.backgroundUri ? (
                  <View style={styles.previewWrapper}>
                    <Image source={{ uri: form.backgroundUri }} style={styles.preview} />
                    <Pressable style={styles.removeBadge} onPress={() => removeImage('backgroundUri')} hitSlop={8}>
                      <SvgXml xml={crossIcon} width={36} height={36} />
                    </Pressable>
                  </View>
                ) : (
                  <SvgXml xml={addIcon} width={24} height={24} />
                )}
              </Pressable>
              {form.backgroundUri ? (
                <Pressable onPress={() => pickImage('backgroundUri')}>
                  <Text style={styles.changeLink}>Change</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button label="Continue" onPress={handleContinue} loading={submitting} />
        <Text style={styles.link}>
          Already have an account? <Text style={styles.linkBold}>Login</Text>
        </Text>
      </View>
    </Screen>
  );
}
