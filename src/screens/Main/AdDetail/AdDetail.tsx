import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Image, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { SvgXml } from 'react-native-svg';
import {
  arrowBack,
  viewIcon,
  loveIcon,
  shareIcon,
  locationIcon,
  callIcon,
  chatIcon,
  notificationIcon,
  calendarGridIcon,
  shieldOdometerIcon,
  sliderIcon,
  fuelIcon,
} from '../../../assets/svg/Index';
import { HomeStackScreenProps } from '../../../navigation/types';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const carImages = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
];

export default function AdDetail({ navigation, route }: HomeStackScreenProps<'AdDetail'>) {
  const { adId } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveImageIndex(index);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Pressable style={styles.viewStoryButton}>
          <Text style={styles.viewStoryText}>View Story</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Car Image Carousel */}
        <View style={styles.imageContainer}>
          <FlatList
            ref={flatListRef}
            data={carImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable 
                onPress={() => navigation.navigate('AdImages', { adId, initialIndex: activeImageIndex })}
              >
                <Image
                  source={{ uri: item }}
                  style={[styles.carImage, { width: SCREEN_WIDTH }]}
                  resizeMode="cover"
                />
              </Pressable>
            )}
          />
          <View style={styles.imageDots}>
            {carImages.map((_, index) => (
              <View 
                key={index}
                style={[styles.dot, index === activeImageIndex && styles.dotActive]} 
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          {/* Title and Stats */}
          <View style={styles.titleSection}>
            <Text style={styles.carTitle}>BMW 520 M Sport</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <SvgXml xml={viewIcon} width={16} height={16} />
                <Text style={styles.statText}>20k</Text>
              </View>
              <View style={styles.stat}>
                <SvgXml xml={loveIcon} width={16} height={16} />
                <Text style={styles.statText}>10k</Text>
              </View>
              <View style={styles.stat}>
                <SvgXml xml={shareIcon} width={16} height={16} />
                <Text style={styles.statText}>237</Text>
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <SvgXml xml={locationIcon} width={16} height={16} />
            <Text style={styles.locationText}>2614 Sweetwood Drive, Arvada, CO 80002</Text>
          </View>

          {/* Price and Actions */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>$20,000</Text>
            <View style={styles.actionButtons}>
              <Pressable style={styles.iconButton}>
                <SvgXml xml={callIcon} width={18} height={18} />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <SvgXml xml={chatIcon} width={18} height={18} />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <SvgXml xml={notificationIcon} width={18} height={18} />
              </Pressable>
            </View>
          </View>

          {/* Specs */}
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={calendarGridIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>2024</Text>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={shieldOdometerIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>80,000</Text>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={fuelIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>Petrol</Text>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={sliderIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>Automatic</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec tincidunt
              arcu ultrices lobortis elit sed euismod.
            </Text>
          </View>

          {/* Vehicle Details */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailColumn}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Make</Text>
                <Text style={styles.detailValue}>BMW</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Model</Text>
                <Text style={styles.detailValue}>520 M Sports</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Seats</Text>
                <Text style={styles.detailValue}>05</Text>
              </View>
            </View>
            <View style={styles.detailColumn}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Color</Text>
                <Text style={styles.detailValue}>White</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Door</Text>
                <Text style={styles.detailValue}>04</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Trim</Text>
                <Text style={styles.detailValue}>---</Text>
              </View>
            </View>
          </View>

          {/* Seller Info */}
          <View style={styles.sellerSection}>
            <View style={styles.sellerInfo}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                style={styles.avatar}
              />
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>Frances Swann</Text>
                <View style={styles.sellerBadge}>
                  <Text style={styles.sellerBadgeText}>Private Seller</Text>
                </View>
              </View>
            </View>
            <View style={styles.postedInfo}>
              <Text style={styles.postedLabel}>Posted</Text>
              <Text style={styles.postedTime}>Just Now</Text>
            </View>
          </View>

          {/* Report Ad Button */}
          <Pressable style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Report Ad</Text>
          </Pressable>

          {/* Related Ads */}
          <View style={styles.relatedSection}>
            <Text style={styles.relatedSectionTitle}>Related Ads</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
              <Pressable style={styles.relatedCard}>
                <View style={styles.relatedImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' }}
                    style={styles.relatedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.relatedImageBadge}>
                    <Text style={styles.relatedImageBadgeText}>📷 +4 images</Text>
                  </View>
                </View>
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedTitle}>BMW 520 M Sport</Text>
                  <Text style={styles.relatedPrice}>$20,000</Text>
                  <View style={styles.relatedSeller}>
                    <Image
                      source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                      style={styles.relatedAvatar}
                    />
                    <Text style={styles.relatedSellerName}>Frances Swann</Text>
                  </View>
                  <View style={styles.relatedLocation}>
                    <SvgXml xml={locationIcon} width={12} height={12} />
                    <Text style={styles.relatedLocationText}>Ikotun</Text>
                  </View>
                </View>
              </Pressable>

              <Pressable style={styles.relatedCard}>
                <View style={styles.relatedImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400' }}
                    style={styles.relatedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.relatedImageBadge}>
                    <Text style={styles.relatedImageBadgeText}>📷 +8 images</Text>
                  </View>
                </View>
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedTitle}>BMW 520 M Sport</Text>
                  <Text style={styles.relatedPrice}>$25,000</Text>
                  <View style={styles.relatedSeller}>
                    <Image
                      source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
                      style={styles.relatedAvatar}
                    />
                    <Text style={styles.relatedSellerName}>Sarah Wilson</Text>
                  </View>
                  <View style={styles.relatedLocation}>
                    <SvgXml xml={locationIcon} width={12} height={12} />
                    <Text style={styles.relatedLocationText}>Lekki</Text>
                  </View>
                </View>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
