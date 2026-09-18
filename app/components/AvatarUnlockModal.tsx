import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import { useAvatars } from '../context/AvatarContext';
import { AvatarImage } from './ProfileAvatar';
import { getAvatarById } from '../data/avatars';
import { text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

export function AvatarUnlockModal() {
  const { pendingUnlock, dismissPendingUnlock } = useAvatars();
  const [showConfetti, setShowConfetti] = useState(false);
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  const avatar = pendingUnlock ? getAvatarById(pendingUnlock) : null;

  useEffect(() => {
    if (!pendingUnlock) return;

    setShowConfetti(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    scale.setValue(0.6);
    opacity.setValue(0.35);
    Animated.parallel([
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.15, friction: 5, tension: 140, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 6, tension: 160, useNativeDriver: true }),
      ]),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const t = setTimeout(() => setShowConfetti(false), 3200);
    return () => clearTimeout(t);
  }, [pendingUnlock, opacity, scale]);

  if (!avatar) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={dismissPendingUnlock}>
      <View style={styles.overlay}>
        {showConfetti && (
          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <ConfettiCannon
              count={100}
              origin={{ x: Dimensions.get('window').width / 2, y: 0 }}
              fadeOut
              fallSpeed={2600}
              explosionSpeed={400}
            />
          </View>
        )}

        <View style={styles.card}>
          <Text style={[text.caption, { color: Colors.primary, letterSpacing: 1 }]}>
            NOUVEL AVATAR
          </Text>
          <Text style={[text.h2, { marginTop: 8, marginBottom: 20, textAlign: 'center' }]}>
            {avatar.name}
          </Text>

          <Animated.View style={{ transform: [{ scale }], opacity }}>
            <AvatarImage
              avatarId={avatar.id}
              size={140}
              fallbackEmoji={avatar.fallbackEmoji}
            />
          </Animated.View>

          <Text style={[text.bodySmall, { marginTop: 20, textAlign: 'center', lineHeight: 22 }]}>
            Débloqué ! Définissez-le comme photo de profil dans Mes avatars.
          </Text>

          <TouchableOpacity
            style={[components.button, { marginTop: 24, alignSelf: 'stretch' }]}
            onPress={dismissPendingUnlock}
          >
            <Text style={components.buttonText}>Super !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 43, 60, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
});
