import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobeIntroImage } from '../components/GlobeIntroImage';

interface IntroZoomAfricaScreenProps {
  onDone: () => void;
}

export function IntroZoomAfricaScreen({ onDone }: IntroZoomAfricaScreenProps) {
  const [skipVisible, setSkipVisible] = useState(false);
  const globeSize = 280;

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const [highlightVisible, setHighlightVisible] = useState(0);

  useEffect(() => {
    const showSkip = setTimeout(() => setSkipVisible(true), 1000);
    const easing = Easing.out(Easing.cubic);

    Animated.parallel([
      Animated.timing(scale, { toValue: 2.6, duration: 2200, easing, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: -42, duration: 2200, easing, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: -18, duration: 2200, easing, useNativeDriver: true }),
    ]).start();

    const highlightTimer = setTimeout(() => setHighlightVisible(1), 2050);

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 450,
        delay: 2400,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 450,
        delay: 2400,
        easing,
        useNativeDriver: true,
      }),
    ]).start();

    const finish = setTimeout(() => onDone(), 3200);
    return () => {
      clearTimeout(showSkip);
      clearTimeout(highlightTimer);
      clearTimeout(finish);
    };
  }, [onDone, logoOpacity, logoScale, scale, translateX, translateY]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A1628' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {skipVisible && (
          <TouchableOpacity
            onPress={onDone}
            style={{
              position: 'absolute',
              top: 10,
              right: 16,
              zIndex: 10,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.25)',
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#FFFFFF' }}>Passer</Text>
          </TouchableOpacity>
        )}

        <Animated.View
          style={{ transform: [{ translateX }, { translateY }, { scale }] }}
        >
          <GlobeIntroImage size={globeSize} highlightOpacity={highlightVisible} />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 110,
            alignItems: 'center',
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
        >
          <Image
            source={require('../../assets/icon.png')}
            style={{ width: 84, height: 84, borderRadius: 20, marginBottom: 12 }}
          />
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#FFFFFF' }}>FinLearn</Text>
          <Text style={{ fontSize: 14, marginTop: 6, color: 'rgba(255,255,255,0.65)' }}>
            Apprendre, grandir, investir.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
