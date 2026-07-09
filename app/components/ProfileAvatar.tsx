import { View, Text, Image, type ViewStyle } from 'react-native';
import { useAvatars } from '../context/AvatarContext';
import { AVATAR_IMAGES, getAvatarById, type AvatarId } from '../data/avatars';
import { Colors } from '../constants/colors';

interface ProfileAvatarProps {
  size?: number;
  style?: ViewStyle;
  /** Affiche l'avatar même si verrouillé (grisé) */
  locked?: boolean;
  avatarId?: AvatarId | null;
  showDefault?: boolean;
}

export function ProfileAvatar({
  size = 80,
  style,
  locked = false,
  avatarId: avatarIdProp,
  showDefault = true,
}: ProfileAvatarProps) {
  const { state } = useAvatars();
  const avatarId = avatarIdProp !== undefined ? avatarIdProp : state.activeAvatarId;
  const imageSource = avatarId ? AVATAR_IMAGES[avatarId] : undefined;

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'rgba(45, 106, 106, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: avatarId && !locked ? 2 : 0,
    borderColor: Colors.primary,
  };

  if (!avatarId || (!imageSource && !showDefault)) {
    return (
      <View style={[containerStyle, style]}>
        <Text style={{ fontSize: size * 0.5 }}>👤</Text>
      </View>
    );
  }

  if (imageSource) {
    return (
      <View style={[containerStyle, style, locked && { opacity: 0.35 }]}>
        <Image
          source={imageSource}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      </View>
    );
  }

  if (avatarId) {
    const def = getAvatarById(avatarId);
    return (
      <View style={[containerStyle, style, locked && { opacity: 0.35 }]}>
        <Text style={{ fontSize: size * 0.45 }}>{def.fallbackEmoji}</Text>
      </View>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <Text style={{ fontSize: size * 0.5 }}>👤</Text>
    </View>
  );
}

interface AvatarImageProps {
  avatarId: AvatarId;
  size: number;
  locked?: boolean;
  fallbackEmoji: string;
  style?: ViewStyle;
}

export function AvatarImage({
  avatarId,
  size,
  locked = false,
  fallbackEmoji,
  style,
}: AvatarImageProps) {
  const imageSource = AVATAR_IMAGES[avatarId];

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: locked ? Colors.border : 'rgba(45, 106, 106, 0.12)',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: locked ? 0.45 : 1,
        },
        style,
      ]}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      ) : (
        <Text style={{ fontSize: size * 0.42 }}>{fallbackEmoji}</Text>
      )}
    </View>
  );
}
