import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { Button } from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { AuthStackScreenProps } from '../../../navigation/types';
import { TextInput } from '../../../components/ui/TextInput';
import { styles } from './styles';
import * as yup from 'yup';
import { SvgXml } from 'react-native-svg';
import { eyeOpen, eyeClose } from '../../../assets/svg/Index';

export default function Login({ navigation }: AuthStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const validateField = async (key: 'email' | 'password', value: string, next?: Record<string, string>) => {
    try {
      await schema.validateAt(key, { email, password, [key]: value });
      setErrors(prev => {
        const n = { ...prev, ...(next ?? {}) };
        delete n[key];
        return n;
      });
    } catch (err: any) {
      if (err?.message) {
        setErrors(prev => ({ ...prev, ...(next ?? {}), [key]: err.message }));
      }
    }
  };

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      // TODO: integrate real login
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

  return (
    <Screen>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Log In to your Account</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={v => {
            setEmail(v);
            validateField('email', v);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email address"
          placeholderTextColor={colors.editorPlaceholder}
          error={errors.email}
        />
        <View>
          <TextInput
            label="Password"
            value={password}
            onChangeText={v => {
              setPassword(v);
              validateField('password', v);
            }}
            secureTextEntry={!showPassword}
            rightAdornment={
              <Pressable onPress={() => setShowPassword(prev => !prev)} hitSlop={10}>
                <SvgXml xml={showPassword ? eyeOpen : eyeClose } width={20} height={20} />
              </Pressable>
            }
            placeholder="password"
            placeholderTextColor={colors.editorPlaceholder}
            error={errors.password}
          />
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Log In" onPress={handleLogin} loading={submitting} />
        <TouchableOpacity onPress={() => navigation.navigate('SelectAccountType')}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
