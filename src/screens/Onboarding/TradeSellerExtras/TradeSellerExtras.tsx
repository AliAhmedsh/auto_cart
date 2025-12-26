import React, { useState } from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Screen } from '../../../components/layout/Screen';
import { TextInput } from '../../../components/ui/TextInput';
import { Button } from '../../../components/ui/Button';
import { AuthStackScreenProps } from '../../../navigation/types';
import { arrowBack, eyeClose, eyeOpen } from '../../../assets/svg/Index';
import { styles } from './styles';
import * as yup from 'yup';

export default function TradeSellerExtras({ navigation }: AuthStackScreenProps<'TradeSellerExtras'>) {
  const [form, setForm] = useState({
    instagram: '',
    facebook: '',
    website: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showReviewNotice, setShowReviewNotice] = useState(false);

  const schema = yup.object().shape({
    instagram: yup.string().url('Enter a valid URL').nullable(),
    facebook: yup.string().url('Enter a valid URL').nullable(),
    website: yup.string().url('Enter a valid URL').nullable(),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });

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
    if (key === 'password' && nextForm.confirmPassword) {
      // re-validate confirm when password changes
      try {
        await schema.validateAt('confirmPassword', nextForm);
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.confirmPassword;
          return copy;
        });
      } catch (err: any) {
        if (err?.message) {
          setErrors(prev => ({ ...prev, confirmPassword: err.message }));
        }
      }
    }
  };

  return (
    <Screen scroll style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.formGroup}>
        <TextInput
          label="Instagram Link"
          value={form.instagram}
          onChangeText={v => update('instagram', v)}
          placeholder="Paste your  Link here"
          error={errors.instagram}
        />
        <TextInput
          label="Facebook Link"
          value={form.facebook}
          onChangeText={v => update('facebook', v)}
          placeholder="Paste your  Link here"
          error={errors.facebook}
        />
        <TextInput
          label="Website Link"
          value={form.website}
          onChangeText={v => update('website', v)}
          placeholder="Paste your  Link here"
          error={errors.website}
        />
        <TextInput
          label="Create Password"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={v => update('password', v)}
          placeholder="**********"
          error={errors.password}
          rightAdornment={
            <Pressable onPress={() => setShowPassword(s => !s)} hitSlop={8}>
              <SvgXml xml={showPassword ? eyeOpen : eyeClose} width={20} height={20} />
            </Pressable>
          }
        />
        <TextInput
          label="Confirm Password"
          secureTextEntry={!showConfirm}
          value={form.confirmPassword}
          onChangeText={v => update('confirmPassword', v)}
          placeholder="**********"
          error={errors.confirmPassword}
          rightAdornment={
            <Pressable onPress={() => setShowConfirm(s => !s)} hitSlop={8}>
              <SvgXml xml={showConfirm ? eyeOpen : eyeClose} width={20} height={20} />
            </Pressable>
          }
        />
      </View>
      <View style={styles.footer}>
        <Button label="Create Account" onPress={() => setShowReviewNotice(true)} />
        <Pressable style={styles.linkPressable} onPress={() => navigation.navigate('Login')} hitSlop={12}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.login}>Login</Text>
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={showReviewNotice}
        onRequestClose={() => navigation.navigate('Login')}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => navigation.navigate('Login')}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Trade Account Under Review</Text>
            <Text style={styles.modalBody}>
              Thank you for your interest in a Trade Seller account. Our team is currently reviewing your request.
            </Text>
            <Text style={styles.modalBody}>You&apos;ll receive an update soon.</Text>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
