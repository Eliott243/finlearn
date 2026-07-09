import { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AvatarImage } from '../components/ProfileAvatar';
import { useAvatars } from '../context/AvatarContext';
import { AVATARS } from '../data/avatars';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

const COLS = 2;

export function AvatarsScreen() {
  const { state, refreshAvatars, selectAvatar, isUnlocked } = useAvatars();

  useFocusEffect(
    useCallback(() => {
      refreshAvatars();
    }, [refreshAvatars])
  );

  return (
    <FlatList
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 32 }]}
      data={AVATARS}
      keyExtractor={(item) => item.id}
      numColumns={COLS}
      columnWrapperStyle={{ gap: 12 }}
      ListHeaderComponent={
        <Text style={[text.bodySmall, { marginBottom: 16, lineHeight: 22 }]}>
          Débloquez des avatars en progressant. Appuyez sur un avatar débloqué pour l'utiliser
          comme photo de profil.
        </Text>
      }
      renderItem={({ item }) => {
        const unlocked = isUnlocked(item.id);
        const active = state.activeAvatarId === item.id;

        return (
          <TouchableOpacity
            style={{
              flex: 1,
              marginBottom: 12,
              padding: 14,
              borderRadius: 16,
              borderWidth: active ? 2 : 1,
              borderColor: active ? Colors.primary : Colors.border,
              backgroundColor: active ? 'rgba(45, 106, 106, 0.06)' : Colors.surface,
              alignItems: 'center',
            }}
            disabled={!unlocked}
            onPress={() => unlocked && selectAvatar(item.id)}
            activeOpacity={0.8}
          >
            <View style={{ position: 'relative' }}>
              <AvatarImage
                avatarId={item.id}
                size={88}
                locked={!unlocked}
                fallbackEmoji={item.fallbackEmoji}
              />
              {!unlocked && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    backgroundColor: Colors.surface,
                    borderRadius: 12,
                    padding: 2,
                  }}
                >
                  <Ionicons name="lock-closed" size={18} color={Colors.textSecondary} />
                </View>
              )}
            </View>

            <Text
              style={[
                text.bodySmall,
                {
                  fontWeight: '700',
                  marginTop: 10,
                  textAlign: 'center',
                  color: unlocked ? Colors.textPrimary : Colors.textSecondary,
                },
              ]}
            >
              {item.name}
            </Text>

            {active && (
              <Text style={[text.caption, { color: Colors.primary, marginTop: 4 }]}>
                Actif
              </Text>
            )}

            {!unlocked && (
              <Text
                style={[
                  text.caption,
                  {
                    marginTop: 6,
                    textAlign: 'center',
                    lineHeight: 16,
                    color: Colors.textSecondary,
                  },
                ]}
              >
                {item.unlockHint}
              </Text>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
}
