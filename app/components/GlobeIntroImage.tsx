import { View, Image, type ImageSourcePropType, type ViewStyle } from 'react-native';

interface GlobeIntroImageProps {
  size: number;
  highlightOpacity?: number;
  style?: ViewStyle;
}

const GLOBE_IMAGE: ImageSourcePropType = require('../../assets/globe-intro.png');

/**
 * Globe intro visual. Replace assets/globe-intro.png with your own image
 * (square PNG, min 512px, Africa-centered view recommended).
 */
export function GlobeIntroImage({ size, highlightOpacity = 0, style }: GlobeIntroImageProps) {
  const radius = size / 2;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius,
          overflow: 'hidden',
          backgroundColor: '#0A1628',
        },
        style,
      ]}
    >
      <Image
        source={GLOBE_IMAGE}
        style={{ width: size, height: size }}
        resizeMode="cover"
      />

      {highlightOpacity > 0 && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: size * 0.28,
            left: size * 0.38,
            width: size * 0.28,
            height: size * 0.42,
            borderRadius: size * 0.08,
            borderWidth: 2.5,
            borderColor: `rgba(255, 229, 102, ${highlightOpacity * 0.95})`,
            backgroundColor: `rgba(255, 214, 64, ${highlightOpacity * 0.12})`,
            shadowColor: '#FFE566',
            shadowOpacity: highlightOpacity * 0.6,
            shadowRadius: 12,
          }}
        />
      )}
    </View>
  );
}
