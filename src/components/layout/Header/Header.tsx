import React from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { plusIcon, filterIcon } from '../../../assets/svg/Index';
import { useInsets } from '../../../utils/insets';
import { spacing } from '../../../theme/spacing';
import { styles } from './styles';

interface HeaderProps {
  onPlaceAdPress?: () => void;
  onFilterPress?: () => void;
}

export function Header({ onPlaceAdPress, onFilterPress }: HeaderProps) {
  const navigation = useNavigation<any>();
  const insets = useInsets();

  const handleFilterPress = () => {
    if (onFilterPress) {
      onFilterPress();
    } else {
      navigation.navigate('Filters');
    }
  };

  const handlePlaceAdPress = () => {
    if (onPlaceAdPress) {
      onPlaceAdPress();
    } else {
      navigation.navigate('CreateAd');
    }
  };

  return (
    <View style={{ paddingBottom: 0 }}>
      <View style={[styles.container, { paddingTop: spacing.sm + insets.top }]}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.actions}>
          <Pressable style={styles.placeAdButton} onPress={handlePlaceAdPress} hitSlop={8}>
            <Text style={styles.placeAdText}>Place Ad</Text>
            <SvgXml xml={plusIcon} width={14} height={14} />
          </Pressable>

          <Pressable onPress={handleFilterPress} hitSlop={8}>
            <SvgXml xml={filterIcon} width={24} height={24} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
