import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobeIntroImage } from '../components/GlobeIntroImage';

interface IntroZoomAfricaScreenProps {
  onDone: () => void;
}

export function IntroZoomAfricaScreen({ onDone }: IntroZoomAfricaScreenProps) {
  const [skipVisible, setSkipVisible] = useState(false);

  const globeSize = 280;

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.92);

  const globeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const [highlightVisible, setHighlightVisible] = useState(0);

  useEffect(() => {
    const showSkip = setTimeout(() => setSkipVisible(true), 1000);

    // Zoom toward Africa (Atlantic-centered globe image)
    scale.value = withTiming(2.6, {
      duration: 2200,
      easing: Easing.out(Easing.cubic),
    });
    translateX.value = withTiming(-42, {
      duration: 2200,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withTiming(-18, {
      duration: 2200,
      easing: Easing.out(Easing.cubic),
    });

    const highlightTimer = setTimeout(() => setHighlightVisible(1), 2050);

    logoOpacity.value = withDelay(
      2400,
      withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) })
    );
    logoScale.value = withDelay(
      2400,
      withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) })
    );

    const finish = setTimeout(() => onDone(), 3200);
    return () => {
      clearTimeout(showSkip);
      clearTimeout(highlightTimer);
      clearTimeout(finish);
    };
  }, [onDone]);

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

        <Animated.View style={globeAnimatedStyle}>
          <GlobeIntroImage size={globeSize} highlightOpacity={highlightVisible} />
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 110,
              alignItems: 'center',
            },
            logoAnimatedStyle,
          ]}
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
