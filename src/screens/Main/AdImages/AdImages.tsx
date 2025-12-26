import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Dimensions, FlatList, Image } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { SvgXml } from 'react-native-svg';
import { arrowBack, gridIcon } from '../../../assets/svg/Index';
import { HomeStackScreenProps } from '../../../navigation/types';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const mockImages = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
];

export default function AdImages({ navigation, route }: HomeStackScreenProps<'AdImages'>) {
  const { adId, initialIndex = 0 } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
    </View>
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Text style={styles.counter}>
          {currentIndex + 1}/{mockImages.length}
        </Text>
        <Pressable
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('ViewAllImages', { adId, images: mockImages })}
          hitSlop={12}
        >
          <SvgXml xml={gridIcon} width={16} height={16} />
          <Text style={styles.viewAllText}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.sliderWrapper}>
        <FlatList
          ref={flatListRef}
          data={mockImages}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialScrollIndex={initialIndex}
          getItemLayout={(data, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
        />

        <View style={styles.dotsContainer}>
          {mockImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}
