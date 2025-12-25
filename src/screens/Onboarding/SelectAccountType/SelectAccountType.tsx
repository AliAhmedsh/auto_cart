import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Screen } from '../../../components/layout/Screen';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { AuthStackScreenProps } from '../../../navigation/types';
import { tradeSeller, privateSeller } from '../../../assets/svg/Index';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

const options = [
  {
    key: 'trade',
    title: 'Trade Seller',
    subtitle: 'Requires approval',
    icon: tradeSeller,
    details: [
      '🏢 Designed for Dealerships & Garages Tailored for businesses managing multiple vehicle listings.',
      '✅ Business Verification Requires business credentials for added credibility and professionalism.',
      '📦 Unlimited Listings Post as many ads as needed to showcase your inventory.',
      '💳 Mandatory Finance Price Input Ensure transparency with finance price details for all vehicle listings.',
      '🛡️ Verification Tick Stand out with a verification tick to build trust with buyers.',
      '📣 Social Media Integration Expand your reach by linking your social media profiles.',
    ],
  },
  {
    key: 'private',
    title: 'Private Seller',
    subtitle: 'No approval needed',
    icon: privateSeller,
    details: [
      '🚗 Perfect for individual sellers designed for individuals looking to sell their cars, parts, or post wanted ads.',
      '✅ Simple setup Easy sign-up process with minimal information required.',
      '📢 Post flexibly Post both wanted ads and private car sales without any restrictions.',
      '💰 No finance requirement No mandatory finance price input for your listings.',
    ],
  },
];

export default function SelectAccountType({ navigation }: AuthStackScreenProps<'SelectAccountType'>) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Select Your Account Type</Text>
      <View style={styles.list}>
        {options.map(opt => {
          const isSelected = selected === opt.key;
          return (
            <Card
              key={opt.key}
              title={opt.title}
              subtitle={opt.subtitle}
              selected={isSelected}
              onPress={() => setSelected(opt.key)}
              style={styles.card}
              leftIcon={<SvgXml xml={opt.icon} width={36} height={36} />}
              rightAdornment={
                <View style={[styles.radio, isSelected ? styles.radioSelected : styles.radioIdle]}>
                  {isSelected ? <View style={styles.radioDot} /> : null}
                </View>
              }
              children={
                isSelected && opt.details ? (
                  <View style={styles.details}>
                    {opt.details.map(line => (
                      <Text key={line} style={styles.detailText}>
                        {line}
                      </Text>
                    ))}
                  </View>
                ) : null
              }
            />
          );
        })}
      </View>
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={() => navigation.navigate(selected === 'trade' ? 'TradeSellerSignup' : 'PrivateSellerSignup')}
          disabled={!selected}
          backgroundColor={selected ? undefined : colors.disabledGreen}
          textColor={selected ? undefined : colors.editorTitle}
        />
      </View>
    </Screen>
  );
}
