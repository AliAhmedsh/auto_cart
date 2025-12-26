import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, FlatList, Dimensions, Alert } from 'react-native';
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
  fuelIcon,
  sliderIcon,
} from '../../../assets/svg/Index';
import { HomeStackScreenProps } from '../../../navigation/types';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PreviewAd({ navigation, route }: HomeStackScreenProps<'PreviewAd'>) {
  const { adData } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePublish = () => {
    Alert.alert('Success', 'Ad published successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('HomeScreen') },
    ]);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={{ width: SCREEN_WIDTH }}>
      <Image source={{ uri: item }} style={styles.carImage} resizeMode="cover" />
    </View>
  );

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Preview Ad</Text>
        <Pressable style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish Ad</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Car Image Carousel */}
        <View style={styles.imageContainer}>
          <FlatList
            data={adData.images}
            renderItem={renderImageItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.imageDots}>
            {adData.images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentImageIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          {/* Title and Stats */}
          <View style={styles.titleSection}>
            <Text style={styles.carTitle}>{adData.title}</Text>
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
            <Text style={styles.locationText}>{adData.location}</Text>
          </View>

          {/* Price and Actions */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {adData.currency}{parseInt(adData.price).toLocaleString()}
            </Text>
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
              <Text style={styles.specValue}>{adData.year}</Text>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={shieldOdometerIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>{parseInt(adData.mileage).toLocaleString()}</Text>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={fuelIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>{adData.fuelType}</Text>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIconContainer}>
                <SvgXml xml={sliderIcon} width={24} height={24} />
              </View>
              <Text style={styles.specValue}>{adData.transmission}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{adData.description}</Text>
          </View>

          {/* Vehicle Details */}
          <View style={styles.section}>
            <View style={styles.detailsGrid}>
              {[
                { label: 'Make', value: adData.make },
                { label: 'Model', value: adData.model },
                { label: 'Seats', value: adData.seats ? adData.seats.padStart(2, '0') : '—' },
                { label: 'Color', value: adData.color || '—' },
                { label: 'Door', value: adData.doors ? adData.doors.padStart(2, '0') : '—' },
                { label: 'Trim', value: '---' },
              ].map(item => (
                <View key={item.label} style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Seller Info */}
          <View style={styles.sellerSection}>
            <View style={styles.sellerInfo}>
              <View style={styles.avatar}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                  style={styles.avatarImage}
                />
              </View>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>Frances Swann</Text>
                <View style={styles.sellerBadge}>
                  <Text style={styles.sellerBadgeText}>Trade Seller</Text>
                </View>
              </View>
            </View>
            <View style={styles.postedInfo}>
              <Text style={styles.postedLabel}>Posted</Text>
              <Text style={styles.postedTime}>Just Now</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
