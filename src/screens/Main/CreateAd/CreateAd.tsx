import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TouchableWithoutFeedback, Image, TouchableOpacity, Alert } from 'react-native';
import { Screen } from '../../../components/layout/Screen';
import { TextInput } from '../../../components/ui/TextInput';
import { Button } from '../../../components/ui/Button';
import { SvgXml } from 'react-native-svg';
import { arrowBack, addIcon, chevronDown16, planCheck, crossIcon } from '../../../assets/svg/Index';
import { HomeStackScreenProps } from '../../../navigation/types';
import { launchImageLibrary } from 'react-native-image-picker';
import * as yup from 'yup';
import { styles } from './styles';

export default function CreateAd({ navigation }: HomeStackScreenProps<'CreateAd'>) {
  const categories = useMemo(
    () => ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Convertible', 'Truck', 'Van', 'Wagon'],
    []
  );
  const currencies = useMemo(() => ['£', '$', '€', '₹'], []);

  const [form, setForm] = useState({
    category: '',
    phoneNumber: '',
    location: '',
    price: '',
    description: '',
    currency: '£',
    title: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    seats: '',
    color: '',
    doors: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [storyImages, setStoryImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const schema = yup.object().shape({
    category: yup.string().required('Category is required'),
    title: yup.string().required('Title is required'),
    phoneNumber: yup.string().required('Phone number is required').matches(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
    location: yup.string().required('Location is required'),
    price: yup.string().required('Price is required').matches(/^[0-9]+$/, 'Price must be a number'),
    description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
    make: yup.string().required('Make is required'),
    model: yup.string().required('Model is required'),
    year: yup.string().required('Year is required').matches(/^[0-9]{4}$/, 'Year must be 4 digits'),
    mileage: yup.string().required('Mileage is required'),
    fuelType: yup.string().required('Fuel type is required'),
    transmission: yup.string().required('Transmission is required'),
  });

  const update = async (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    try {
      await schema.validateAt(key, { ...form, [key]: value });
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } catch (err: any) {
      if (err?.message) {
        setErrors(prev => ({ ...prev, [key]: err.message }));
      }
    }
  };

  const handleSelectCategory = () => setShowCategoryPicker(true);
  const handleSelectCurrency = () => setShowCurrencyPicker(true);

  const handlePreviewStory = () => {
    // TODO: Navigate to story preview
  };

  const handlePreviewAd = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
      if (images.length === 0) {
        Alert.alert('Error', 'Please upload at least one image');
        return;
      }
      setErrors({});
      navigation.navigate('PreviewAd', {
        adData: {
          ...form,
          images,
          storyImages,
        },
      });
    } catch (err: any) {
      const errs: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          if (e.path) errs[e.path] = e.message;
        });
      }
      setErrors(errs);
    }
  };

  const handlePublishAd = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
      if (images.length === 0) {
        Alert.alert('Error', 'Please upload at least one image');
        return;
      }
      setErrors({});
      Alert.alert('Success', 'Ad published successfully!');
    } catch (err: any) {
      const errs: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          if (e.path) errs[e.path] = e.message;
        });
      }
      setErrors(errs);
      Alert.alert('Validation Error', 'Please fill all required fields correctly');
    }
  };

  const handlePickImages = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 20 - images.length,
    });
    if (res.assets) {
      const uris = res.assets.map(asset => asset.uri).filter(Boolean) as string[];
      setImages(prev => [...prev, ...uris]);
    }
  };

  const handlePickStoryImages = async () => {
    const res = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 5 - storyImages.length,
    });
    if (res.assets) {
      const uris = res.assets.map(asset => asset.uri).filter(Boolean) as string[];
      setStoryImages(prev => [...prev, ...uris]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveStoryImage = (index: number) => {
    setStoryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setForm({
      category: '',
      phoneNumber: '',
      location: '',
      price: '',
      description: '',
      currency: '£',
      title: '',
      make: '',
      model: '',
      year: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      seats: '',
      color: '',
      doors: '',
    });
    setImages([]);
    setStoryImages([]);
    setErrors({});
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <SvgXml xml={arrowBack} width={24} height={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Place Ad</Text>
        <Pressable hitSlop={12} onPress={handleReset}>
          <Text style={styles.resetButton}>Reset</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.section}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Enter ad title (e.g., BMW 520 M Sport)"
              value={form.title}
              onChangeText={v => update('title', v)}
              error={errors.title}
            />
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <Pressable style={styles.dropdown} onPress={handleSelectCategory}>
              <Text style={form.category ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {form.category || 'Select Category'}
              </Text>
              <SvgXml xml={chevronDown16} width={16} height={16} />
            </Pressable>
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
          </View>

          {/* Upload Images */}
          <View style={styles.section}>
            <Text style={styles.label}>Upload Images</Text>
            <Text style={styles.helperText}>You can upload up to 20 images</Text>
            <View style={styles.uploadRow}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(index)}
                    hitSlop={8}
                  >
                    <SvgXml xml={crossIcon} width={32} height={32} />
                  </TouchableOpacity>
                </View>
              ))}
              {images.length < 20 && (
                <Pressable style={styles.uploadBox} onPress={handlePickImages}>
                  <SvgXml xml={addIcon} width={24} height={24} color="#CCCCCC" />
                </Pressable>
              )}
            </View>
          </View>

          {/* Upload Story */}
          <View style={styles.section}>
            <Text style={styles.label}>Upload Story</Text>
            <Text style={styles.helperText}>You can upload up to 5 images or videos for story</Text>
            <View style={styles.uploadRow}>
              {storyImages.map((uri, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveStoryImage(index)}
                    hitSlop={8}
                  >
                    <SvgXml xml={crossIcon} width={20} height={20} />
                  </TouchableOpacity>
                </View>
              ))}
              {storyImages.length < 5 && (
                <Pressable style={styles.uploadBox} onPress={handlePickStoryImages}>
                  <SvgXml xml={addIcon} width={24} height={24} color="#CCCCCC" />
                </Pressable>
              )}
            </View>
            <Pressable style={styles.previewButton} onPress={handlePreviewStory}>
              <Text style={styles.previewButtonText}>Preview Story</Text>
            </Pressable>
          </View>

          {/* Vehicle Details */}
          <View style={styles.section}>
            <Text style={styles.label}>Make</Text>
            <TextInput
              placeholder="Enter make (e.g., BMW)"
              value={form.make}
              onChangeText={v => update('make', v)}
              error={errors.make}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Model</Text>
            <TextInput
              placeholder="Enter model (e.g., 520 M Sports)"
              value={form.model}
              onChangeText={v => update('model', v)}
              error={errors.model}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              placeholder="Enter year (e.g., 2024)"
              value={form.year}
              onChangeText={v => update('year', v)}
              keyboardType="numeric"
              error={errors.year}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Mileage</Text>
            <TextInput
              placeholder="Enter mileage (e.g., 80000)"
              value={form.mileage}
              onChangeText={v => update('mileage', v)}
              keyboardType="numeric"
              error={errors.mileage}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Fuel Type</Text>
            <TextInput
              placeholder="Enter fuel type (e.g., Petrol)"
              value={form.fuelType}
              onChangeText={v => update('fuelType', v)}
              error={errors.fuelType}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Transmission</Text>
            <TextInput
              placeholder="Enter transmission (e.g., Automatic)"
              value={form.transmission}
              onChangeText={v => update('transmission', v)}
              error={errors.transmission}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Seats</Text>
            <TextInput
              placeholder="Enter number of seats (e.g., 5)"
              value={form.seats}
              onChangeText={v => update('seats', v)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Color</Text>
            <TextInput
              placeholder="Enter color (e.g., White)"
              value={form.color}
              onChangeText={v => update('color', v)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Doors</Text>
            <TextInput
              placeholder="Enter number of doors (e.g., 4)"
              value={form.doors}
              onChangeText={v => update('doors', v)}
              keyboardType="numeric"
            />
          </View>

          {/* Phone Number */}
          <View style={styles.section}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Input your Phone number"
              value={form.phoneNumber}
              onChangeText={v => update('phoneNumber', v)}
              keyboardType="phone-pad"
              error={errors.phoneNumber}
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              placeholder="Enter your Location"
              value={form.location}
              onChangeText={v => update('location', v)}
              error={errors.location}
            />
          </View>

          {/* Price */}
          <View style={styles.section}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.priceInput}>
              <Pressable style={styles.currencyDropdown} onPress={handleSelectCurrency}>
                <Text style={styles.currencyText}>{form.currency}</Text>
                <SvgXml xml={chevronDown16} width={16} height={16} />
              </Pressable>
              <TextInput
                placeholder="Amount"
                value={form.price}
                onChangeText={v => update('price', v)}
                keyboardType="numeric"
                containerStyle={styles.priceFieldContainer}
                style={styles.priceField}
              />
            </View>
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Write Description"
              value={form.description}
              onChangeText={v => update('description', v)}
              multiline
              numberOfLines={4}
              containerStyle={[styles.descriptionContainer, { width: '100%' }]}
              style={styles.descriptionInput}
              borderless
              error={errors.description}
            />
          </View>

          {/* Subscription & Billing */}
          <View style={styles.subscriptionSection}>
            <Text style={styles.subscriptionTitle}>Subscription & Billing</Text>
            <View style={styles.planCard}>
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planName}>Basic Plan</Text>
                  <Text style={styles.planPrice}>$20/month</Text>
                  <View style={styles.planFeatureRow}>
              <SvgXml xml={planCheck} width={16} height={16} />
              <Text style={styles.planFeatures}>5 Ads, Standard Support</Text>
            </View>
                </View>
                <View style={styles.currentPlanBadge}>
                  <Text style={styles.currentPlanText}>Current Plan</Text>
                </View>
              </View>
              <View style={styles.usageLimits}>
                <Text style={styles.usageText}>USAGE LIMITS</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '60%' }]} />
                </View>
                <Text style={styles.usageInfo}>You have 3 ads left out of 5</Text>
              </View>
              <Pressable style={styles.upgradeButton} onPress={() => {}}>
                <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
              </Pressable>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <View style={styles.actionButton}>
              <Button 
                label="Publish Ad" 
                onPress={handlePublishAd}
              />
            </View>
            <Pressable style={[styles.previewAdButton, styles.actionButton]} onPress={handlePreviewAd}>
              <Text style={styles.previewAdButtonText}>Preview Ad</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Category Picker */}
      <Modal transparent visible={showCategoryPicker} animationType="fade" onRequestClose={() => setShowCategoryPicker(false)}>
        <TouchableWithoutFeedback onPress={() => setShowCategoryPicker(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>Select Category</Text>
          {categories.map(cat => (
            <Pressable
              key={cat}
              style={styles.modalItem}
              onPress={() => {
                update('category', cat);
                setShowCategoryPicker(false);
              }}
            >
              <Text style={styles.modalItemText}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>

      {/* Currency Picker */}
      <Modal transparent visible={showCurrencyPicker} animationType="fade" onRequestClose={() => setShowCurrencyPicker(false)}>
        <TouchableWithoutFeedback onPress={() => setShowCurrencyPicker(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>Select Currency</Text>
          {currencies.map(cur => (
            <Pressable
              key={cur}
              style={styles.modalItem}
              onPress={() => {
                setForm(prev => ({ ...prev, currency: cur }));
                setShowCurrencyPicker(false);
              }}
            >
              <Text style={styles.modalItemText}>{cur}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </Screen>
  );
}
