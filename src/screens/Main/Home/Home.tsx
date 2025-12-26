import React, { useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { AdCard } from '../../../components/ui/AdCard';
import { HomeStackScreenProps } from '../../../navigation/types';
import { useAppSelector } from '../../../store/hooks';
import { styles } from './styles';
import { Button } from '../../../components/ui/Button';

const mockAds = [
  {
    id: '1',
    title: 'BMW 520 M Sport',
    category: 'Sedan',
    year: 2024,
    price: 20000,
    location: 'London',
    country: 'United Kingdom',
    locationDisplay: '2614 Sweetwood Drive, Arvada, CO 80002',
    priceDisplay: '$20,000',
    pricePerMonth: '$430/mo',
    description: 'Lorem ipsum dolor sit amet consectetur. Ultricorper imperdiet fermentum mattis ut blandit mattis pretium magna. Laoreet.',
    mainImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    thumbnails: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=200',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200',
    ],
    views: '20k',
    likes: '10k',
    shares: '237',
    sellerName: 'Frances Swann',
    sellerType: 'trade' as const,
    postedTime: '2 mins ago',
  },
  {
    id: '2',
    title: 'Tesla Model X',
    category: 'SUV',
    year: 2023,
    price: 37000,
    location: 'Manchester',
    country: 'United Kingdom',
    locationDisplay: 'No 2 Sangotedo, Ajah, Lagos',
    priceDisplay: '$37,000',
    description: 'Lorem ipsum dolor sit amet consectetur. Ultricorper imperdiet fermentum mattis ut blandit mattis pretium magna. Laoreet.',
    mainImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    thumbnails: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200',
      'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=200',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=200',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200',
    ],
    views: '17k',
    likes: '3k',
    shares: '15',
    sellerName: 'Sarah Wilson',
    sellerType: 'private' as const,
    postedTime: '4d ago',
  },
  {
    id: '3',
    title: 'Audi A4 Coupe',
    category: 'Coupe',
    year: 2022,
    price: 28000,
    location: 'Birmingham',
    country: 'United Kingdom',
    locationDisplay: 'Birmingham City Centre',
    priceDisplay: '$28,000',
    pricePerMonth: '$380/mo',
    description: 'Stunning Audi A4 in excellent condition with full service history.',
    mainImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    thumbnails: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=200',
      'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=200',
    ],
    views: '12k',
    likes: '5k',
    shares: '89',
    sellerName: 'John Smith',
    sellerType: 'trade' as const,
    postedTime: '1 week ago',
  },
];

export default function Home({ navigation }: HomeStackScreenProps<'HomeScreen'>) {
  const filters = useAppSelector(state => state.filter);

  const filteredAds = useMemo(() => {
    return mockAds.filter(ad => {
      // Category filter
      if (filters.category && ad.category !== filters.category) {
        return false;
      }

      // Year filter
      if (filters.yearMin && ad.year < parseInt(filters.yearMin)) {
        return false;
      }
      if (filters.yearMax && ad.year > parseInt(filters.yearMax)) {
        return false;
      }

      // Price filter
      if (filters.priceMin && ad.price < parseInt(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && ad.price > parseInt(filters.priceMax)) {
        return false;
      }

      // Location filter
      if (filters.location && ad.location !== filters.location) {
        return false;
      }

      // Country filter
      if (filters.country && ad.country !== filters.country) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <Screen style={styles.container}>
      {filteredAds.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Post your first ad to kick off your selling journey.</Text>
          <Text style={styles.emptySubtitle}>The sooner you start, the faster you sell.</Text>
          <View style={styles.emptyButtonWrapper}>
            <Button
              label="Post Your First Ad"
              onPress={() => navigation.navigate('CreateAd')}
            />
          </View>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredAds.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              location={ad.locationDisplay}
              price={ad.priceDisplay}
              pricePerMonth={ad.pricePerMonth}
              description={ad.description}
              mainImage={ad.mainImage}
              thumbnails={ad.thumbnails}
              views={ad.views}
              likes={ad.likes}
              shares={ad.shares}
              sellerName={ad.sellerName}
              sellerType={ad.sellerType}
              postedTime={ad.postedTime}
              onPress={() => navigation.navigate('AdDetail', { adId: ad.id })}
            />
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}
