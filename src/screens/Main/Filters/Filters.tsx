import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
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
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showYearMinDropdown, setShowYearMinDropdown] = useState(false);
  const [showYearMaxDropdown, setShowYearMaxDropdown] = useState(false);
  const [showPriceMinDropdown, setShowPriceMinDropdown] = useState(false);
  const [showPriceMaxDropdown, setShowPriceMaxDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const categoryRef = useRef<View | null>(null);
  const yearMinRef = useRef<View | null>(null);
  const yearMaxRef = useRef<View | null>(null);
  const priceMinRef = useRef<View | null>(null);
  const priceMaxRef = useRef<View | null>(null);
  const locationRef = useRef<View | null>(null);
  const countryRef = useRef<View | null>(null);

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

  const measureAndOpen = (ref: React.RefObject<View | null>, setter: (v: boolean) => void, current: boolean) => {
    if (current) {
      setter(false);
      return;
    }
    closeAllDropdowns();
    ref.current?.measureInWindow((x, y, width, height) => {
      setDropdownPosition({ x, y, width, height });
      setter(true);
    });
  };

  const renderDropdownModal = (visible: boolean, options: string[], onSelect: (value: string) => void) => (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={closeAllDropdowns}>
      <Pressable style={styles.modalOverlay} onPress={closeAllDropdowns}>
        <View
          style={[
            styles.dropdownMenu,
            {
              position: 'absolute',
              top: dropdownPosition.y + dropdownPosition.height,
              left: dropdownPosition.x,
              width: dropdownPosition.width,
            },
          ]}
        >
          <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
            {options.map((option) => (
              <Pressable
                key={option}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(option);
                  closeAllDropdowns();
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );

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
              ref={categoryRef}
              style={styles.dropdown}
              onPress={() => {
                measureAndOpen(categoryRef, setShowCategoryDropdown, showCategoryDropdown);
              }}
            >
              <Text style={localFilters.category ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {localFilters.category || 'Select Category'}
              </Text>
              {downIcon}
            </Pressable>
            {renderDropdownModal(showCategoryDropdown, categories, (cat) => updateLocalFilter('category', cat))}
          </View>

          {/* Year */}
          <View style={[styles.section, (showYearMinDropdown || showYearMaxDropdown) && styles.sectionActive]}>
            <Text style={styles.label}>Year</Text>
            <View style={styles.row}>
              <View style={[styles.halfWidth, showYearMinDropdown && styles.halfWidthActive]}>
                <Pressable
                  ref={yearMinRef}
                  style={styles.dropdown}
                  onPress={() => {
                    measureAndOpen(yearMinRef, setShowYearMinDropdown, showYearMinDropdown);
                  }}
                >
                  <Text style={localFilters.yearMin ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.yearMin || 'Min Year'}
                  </Text>
                  {downIcon}
                </Pressable>
                {renderDropdownModal(showYearMinDropdown, years, (year) => updateLocalFilter('yearMin', year))}
              </View>

              <View style={[styles.halfWidth, showYearMaxDropdown && styles.halfWidthActive]}>
                <Pressable
                  ref={yearMaxRef}
                  style={styles.dropdown}
                  onPress={() => {
                    measureAndOpen(yearMaxRef, setShowYearMaxDropdown, showYearMaxDropdown);
                  }}
                >
                  <Text style={localFilters.yearMax ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.yearMax || 'Max Year'}
                  </Text>
                  {downIcon}
                </Pressable>
                {renderDropdownModal(showYearMaxDropdown, years, (year) => updateLocalFilter('yearMax', year))}
              </View>
            </View>
          </View>

          {/* Price */}
          <View style={[styles.section, (showPriceMinDropdown || showPriceMaxDropdown) && styles.sectionActive]}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.row}>
              <View style={[styles.halfWidth, showPriceMinDropdown && styles.halfWidthActive]}>
                <Pressable
                  ref={priceMinRef}
                  style={styles.dropdown}
                  onPress={() => {
                    measureAndOpen(priceMinRef, setShowPriceMinDropdown, showPriceMinDropdown);
                  }}
                >
                  <Text style={localFilters.priceMin ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.priceMin || 'Min Price'}
                  </Text>
                  {downIcon}
                </Pressable>
                {renderDropdownModal(
                  showPriceMinDropdown,
                  ['5000', '10000', '15000', '20000', '25000', '30000', '40000', '50000'],
                  (price) => updateLocalFilter('priceMin', price),
                )}
              </View>

              <View style={[styles.halfWidth, showPriceMaxDropdown && styles.halfWidthActive]}>
                <Pressable
                  ref={priceMaxRef}
                  style={styles.dropdown}
                  onPress={() => {
                    measureAndOpen(priceMaxRef, setShowPriceMaxDropdown, showPriceMaxDropdown);
                  }}
                >
                  <Text style={localFilters.priceMax ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {localFilters.priceMax || 'Max Price'}
                  </Text>
                  {downIcon}
                </Pressable>
                {renderDropdownModal(
                  showPriceMaxDropdown,
                  ['10000', '20000', '30000', '40000', '50000', '75000', '100000', '150000'],
                  (price) => updateLocalFilter('priceMax', price),
                )}
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={[styles.section, showLocationDropdown && styles.sectionActive]}>
            <Text style={styles.label}>Location</Text>
            <Pressable
              ref={locationRef}
              style={styles.dropdown}
              onPress={() => {
                measureAndOpen(locationRef, setShowLocationDropdown, showLocationDropdown);
              }}
            >
              <Text style={localFilters.location ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {localFilters.location || 'Select Location'}
              </Text>
              {downIcon}
            </Pressable>
            {renderDropdownModal(showLocationDropdown, locations, (loc) => updateLocalFilter('location', loc))}
          </View>

          {/* Current Country of Registration */}
          <View style={[styles.section, showCountryDropdown && styles.sectionActive]}>
            <Text style={styles.label}>Current Country of Registration</Text>
            <Pressable
              ref={countryRef}
              style={styles.dropdown}
              onPress={() => {
                measureAndOpen(countryRef, setShowCountryDropdown, showCountryDropdown);
              }}
            >
              <Text style={localFilters.country ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {localFilters.country || 'Select Current Country of Registration'}
              </Text>
              {downIcon}
            </Pressable>
            {renderDropdownModal(showCountryDropdown, countries, (country) => updateLocalFilter('country', country))}
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
