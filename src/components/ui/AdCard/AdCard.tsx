import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from './styles';
import { SvgXml } from 'react-native-svg';
import {
  verifiedIcon,
  locationIcon,
  callIcon,
  chatIcon,
  notificationIcon,
  viewIcon,
  loveIcon,
  shareIcon,
} from '../../../assets/svg/Index';

interface AdCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  pricePerMonth?: string;
  description: string;
  mainImage: string;
  thumbnails: string[];
  views: string;
  likes: string;
  shares: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerType: 'trade' | 'private';
  postedTime: string;
  onPress: () => void;
}

export function AdCard({
  title,
  location,
  price,
  pricePerMonth,
  description,
  mainImage,
  thumbnails,
  views,
  likes,
  shares,
  sellerName,
  sellerAvatar,
  sellerType,
  postedTime,
  onPress,
}: AdCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Seller Info */}
      <View style={styles.sellerHeader}>
        <View style={styles.sellerInfo}>
          <View style={styles.avatar}>
            {sellerAvatar ? (
              <Image source={{ uri: sellerAvatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{sellerName.charAt(0)}</Text>
            )}
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.sellerDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.sellerName}>{sellerName}</Text>
              {sellerType === 'trade' && <SvgXml xml={verifiedIcon} width={14} height={14} />}
            </View>
            <Text style={styles.postedTime}>{postedTime}</Text>
          </View>
        </View>
        <View
          style={[
            styles.sellerBadge,
            sellerType === 'trade' ? styles.sellerBadgeTrade : styles.sellerBadgePrivate,
          ]}
        >
          <Text
            style={[
              styles.sellerBadgeText,
              sellerType === 'trade' ? styles.sellerBadgeTextTrade : styles.sellerBadgeTextPrivate,
            ]}
          >
            {sellerType === 'trade' ? 'Trade Seller' : 'Private Seller'}
          </Text>
        </View>
      </View>

      {/* Main Image */}
      <Image source={{ uri: mainImage }} style={styles.mainImage} resizeMode="cover" />

      {/* Thumbnails */}
      <View style={styles.thumbnails}>
        {thumbnails.slice(0, 3).map((thumb, index) => (
          <View key={index} style={styles.thumbnailWrapper}>
            <Image source={{ uri: thumb }} style={styles.thumbnail} resizeMode="cover" />
            {index === 2 && thumbnails.length > 3 && (
              <View style={styles.thumbnailOverlay}>
                <Text style={styles.thumbnailOverlayText}>+{thumbnails.length - 3}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Ad Info */}
      <View style={styles.adInfo}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationRow}>
          <SvgXml xml={locationIcon} width={16} height={16} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Price and Actions */}
        <View style={styles.footer}>
          <View style={styles.priceSection}>
            <Text style={styles.price}>{price}</Text>
            {pricePerMonth && <Text style={styles.pricePerMonth}>From {pricePerMonth}</Text>}
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.actionButton} onPress={(e) => e.stopPropagation()}>
              <SvgXml xml={callIcon} width={18} height={18} />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={(e) => e.stopPropagation()}>
              <SvgXml xml={chatIcon} width={18} height={18} />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={(e) => e.stopPropagation()}>
              <SvgXml xml={notificationIcon} width={18} height={18} />
            </Pressable>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <SvgXml xml={viewIcon} width={14} height={14} />
            <Text style={styles.statText}>{views}</Text>
          </View>
          <View style={styles.stat}>
            <SvgXml xml={loveIcon} width={14} height={14} />
            <Text style={styles.statText}>{likes}</Text>
          </View>
          <View style={styles.stat}>
            <SvgXml xml={shareIcon} width={14} height={14} />
            <Text style={styles.statText}>{shares}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
