import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { Button } from '../../../components/ui/Button';
import { SvgXml } from 'react-native-svg';
import { arrowBack, chevronDown16 } from '../../../assets/svg/Index';
import { HomeStackScreenProps } from '../../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilter, clearFilters } from '../../../store/slices/filterSlice';
import { styles } from './styles';

const categories = [
  'SUV',
  'Sedan',
  'Coupe',
  'Hatchback',
  'Convertible',
  'Truck',
  'Van',
  'Wagon',
];

const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());

const locations = [
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Glasgow',
  'Liverpool',
  'Newcastle',
  'Sheffield',
];

const countries = [
  'United Kingdom',
  'United States',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'South Korea',
];

export default function Filters({ navigation }: HomeStackScreenProps<'Filters'>) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filter);

  const [localFilters, setLocalFilters] = useState(filters);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showYearMinDropdown, setShowYearMinDropdown] = useState(false);
  const [showYearMaxDropdown, setShowYearMaxDropdown] = useState(false);
  const [showPriceMinDropdown, setShowPriceMinDropdown] = useState(false);
  const [showPriceMaxDropdown, setShowPriceMaxDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const closeAllDropdowns = () => {
    setShowCategoryDropdown(false);
    setShowYearMinDropdown(false);
    setShowYearMaxDropdown(false);
    setShowPriceMinDropdown(false);
    setShowPriceMaxDropdown(false);
    setShowLocationDropdown(false);
    setShowCountryDropdown(false);
  };

  const updateLocalFilter = (key: keyof typeof localFilters, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    dispatch(setFilter(localFilters));
    navigation.goBack();
  };

  const handleClearAll = () => {
    const cleared = {
      category: '',
      yearMin: '',
      yearMax: '',
      priceMin: '',
      priceMax: '',
      location: '',
      country: '',
    };
    setLocalFilters(cleared);
    dispatch(clearFilters());
  };

  const downIcon = <SvgXml xml={chevronDown16} width={16} height={16} />;

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Filter</Text>
        <Pressable onPress={handleClearAll} hitSlop={12}>
          <Text style={styles.clearButton}>Clear All</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Category */}
          <View style={[styles.section, showCategoryDropdown && styles.sectionActive]}>
            <Text style={styles.label}>Category</Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                const next = !showCategoryDropdown;
                closeAllDropdowns();
                setShowCategoryDropdown(next);
              }}
            >
              <Text style={localFilters.category ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {localFilters.category || 'Select Category'}
              </Text>
              {downIcon}
            </Pressable>
            {showCategoryDropdown && (
              <View style={styles.dropdownMenu}>
                {categories.map((cat) => (
                  <Pressable
                    key={cat}
                    style={styles.dropdownItem}
                    onPress={() => {
                      updateLocalFilter('category', cat);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{cat}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Year */}
          <View style={[styles.section, (showYearMinDropdown || showYearMaxDropdown) && styles.sectionActive]}>
            <Text style={styles.label}>Year</Text>
            <View style={styles.row}>
              <View style={[styles.halfWidth, showYearMinDropdown && styles.halfWidthActive]}>
                <Pressable
                  style={styles.dropdown}
                  onPress={() => {
                    const next = !showYearMinDropdown;
                    closeAllDropdowns();
                    setShowYearMinDropdown(next);
                  }}
                >
                  <Text style={localFilters.yearMin ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.yearMin || 'Min Year'}
                  </Text>
                  {downIcon}
                </Pressable>
                {showYearMinDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={styles.dropdownScroll}>
                      {years.map((year) => (
                        <Pressable
                          key={year}
                          style={styles.dropdownItem}
                          onPress={() => {
                            updateLocalFilter('yearMin', year);
                            setShowYearMinDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{year}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={[styles.halfWidth, showYearMaxDropdown && styles.halfWidthActive]}>
                <Pressable
                  style={styles.dropdown}
                  onPress={() => {
                    const next = !showYearMaxDropdown;
                    closeAllDropdowns();
                    setShowYearMaxDropdown(next);
                  }}
                >
                  <Text style={localFilters.yearMax ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.yearMax || 'Max Year'}
                  </Text>
                  {downIcon}
                </Pressable>
                {showYearMaxDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={styles.dropdownScroll}>
                      {years.map((year) => (
                        <Pressable
                          key={year}
                          style={styles.dropdownItem}
                          onPress={() => {
                            updateLocalFilter('yearMax', year);
                            setShowYearMaxDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{year}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Price */}
          <View style={[styles.section, (showPriceMinDropdown || showPriceMaxDropdown) && styles.sectionActive]}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.row}>
              <View style={[styles.halfWidth, showPriceMinDropdown && styles.halfWidthActive]}>
                <Pressable
                  style={styles.dropdown}
                  onPress={() => {
                    const next = !showPriceMinDropdown;
                    closeAllDropdowns();
                    setShowPriceMinDropdown(next);
                  }}
                >
                  <Text style={localFilters.priceMin ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.priceMin || 'Min Price'}
                  </Text>
                  {downIcon}
                </Pressable>
                {showPriceMinDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={styles.dropdownScroll}>
                      {['5000', '10000', '15000', '20000', '25000', '30000', '40000', '50000'].map((price) => (
                        <Pressable
                          key={price}
                          style={styles.dropdownItem}
                          onPress={() => {
                            updateLocalFilter('priceMin', price);
                            setShowPriceMinDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>${price}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={[styles.halfWidth, showPriceMaxDropdown && styles.halfWidthActive]}>
                <Pressable
                  style={styles.dropdown}
                  onPress={() => {
                    const next = !showPriceMaxDropdown;
                    closeAllDropdowns();
                    setShowPriceMaxDropdown(next);
                  }}
                >
                  <Text style={localFilters.priceMax ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.priceMax || 'Max Price'}
                  </Text>
                  {downIcon}
                </Pressable>
                {showPriceMaxDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={styles.dropdownScroll}>
                      {['10000', '20000', '30000', '40000', '50000', '75000', '100000', '150000'].map((price) => (
                        <Pressable
                          key={price}
                          style={styles.dropdownItem}
                          onPress={() => {
                            updateLocalFilter('priceMax', price);
                            setShowPriceMaxDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>${price}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={[styles.section, showLocationDropdown && styles.sectionActive]}>
            <Text style={styles.label}>Location</Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                const next = !showLocationDropdown;
                closeAllDropdowns();
                setShowLocationDropdown(next);
              }}
            >
              <Text style={localFilters.location ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {localFilters.location || 'Select Location'}
              </Text>
              {downIcon}
            </Pressable>
            {showLocationDropdown && (
              <View style={styles.dropdownMenu}>
                {locations.map((loc) => (
                  <Pressable
                    key={loc}
                    style={styles.dropdownItem}
                    onPress={() => {
                      updateLocalFilter('location', loc);
                      setShowLocationDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{loc}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Current Country of Registration */}
          <View style={[styles.section, showCountryDropdown && styles.sectionActive]}>
            <Text style={styles.label}>Current Country of Registration</Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                const next = !showCountryDropdown;
                closeAllDropdowns();
                setShowCountryDropdown(next);
              }}
            >
              <Text style={localFilters.country ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {localFilters.country || 'Select Current Country of Registration'}
              </Text>
              {downIcon}
            </Pressable>
            {showCountryDropdown && (
              <View style={styles.dropdownMenu}>
                {countries.map((country) => (
                  <Pressable
                    key={country}
                    style={styles.dropdownItem}
                    onPress={() => {
                      updateLocalFilter('country', country);
                      setShowCountryDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{country}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footer}>
        <Button label="Apply" onPress={handleApply} />
      </View>
    </Screen>
  );
}
