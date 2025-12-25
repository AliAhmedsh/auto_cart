import React, { useMemo, useRef, useState } from 'react';
import { ImageBackground, Text, View, useWindowDimensions, Pressable, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthStackScreenProps } from '../../../navigation/types';
import { spacing } from '../../../theme/spacing';
import { useLayoutConfig } from '../../../context/LayoutContext';
import { styles } from './styles';

const slides = Array.from({ length: 4 }).map(() => ({
  title: 'Easy way to buy your dream car',
  subtitle: 'By using the car, you can move quickly from one place to another in your daily life.',
}));

export default function OnboardingCarousel({ navigation }: AuthStackScreenProps<'OnboardingCarousel'>) {
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const { backgroundColor, safeAreaEdges } = useLayoutConfig();
  const insets = useSafeAreaInsets();

  const indicators = useMemo(() => slides.map((_, i) => i), []);

  const handleNext = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      navigation.navigate('SelectAccountType');
    }
  };

  const handleMomentumEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / width);
    setIndex(currentIndex);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ height }}
      >
        {slides.map((slide, i) => (
          <ImageBackground
            key={i}
            source={require('../../../assets/images/on-boarding-1.png')}
            style={{ width, height: height + insets.top, justifyContent: 'flex-end', transform: [{ scaleX: -1 }] }}
          >
            <View style={[styles.overlay, { top: spacing.xl * 2 + insets.top, transform: [{ scaleX: -1 }] }]}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: spacing.xl + insets.bottom }]}>
        <View style={styles.dots}>
          {indicators.map(i => (
            <View
              key={i}
              style={[styles.dot, index === i ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>
        <Pressable onPress={handleNext} hitSlop={10}>
          <Text style={styles.next}>{index === slides.length - 1 ? 'Start' : 'Next'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
