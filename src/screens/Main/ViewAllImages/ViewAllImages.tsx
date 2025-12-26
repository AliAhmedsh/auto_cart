import React from 'react';
import { View, Text, Pressable, FlatList, Image, Dimensions } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { SvgXml } from 'react-native-svg';
import { arrowBack } from '../../../assets/svg/Index';
import { HomeStackScreenProps } from '../../../navigation/types';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = (SCREEN_WIDTH - 32) / 3; // 3 columns with padding

export default function ViewAllImages({ navigation, route }: HomeStackScreenProps<'ViewAllImages'>) {
  const { adId, images } = route.params;

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable
      style={styles.imageWrapper}
      onPress={() => navigation.navigate('AdImages', { adId, initialIndex: index })}
    >
      <Image source={{ uri: item }} style={styles.gridImage} resizeMode="cover" />
    </Pressable>
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
      </View>

      <FlatList
        data={images}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
