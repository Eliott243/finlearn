import { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  savePreferences,
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  type CurrencyCode,
} from '../utils/preferences';
import {
  requestNotificationPermission,
  scheduleDailyTipNotification,
} from '../utils/notifications';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '🎓',
    title: 'Bienvenue sur FinLearn',
    body: 'Apprenez l\'épargne, le budget et l\'investissement à votre rythme. Contenu 100 % éducatif — aucun conseil personnalisé.',
  },
  {
    emoji: '⚠️',
    title: 'Notre mission',
    body: 'Vous donner les bases pour décider en connaissance de cause. FinLearn ne remplace pas un conseiller financier agréé.',
  },
  {
    emoji: '🌍',
    title: 'Personnalisez vos exemples',
    body: 'Choisissez votre pays et votre devise pour des montants adaptés à votre contexte.',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [page, setPage] = useState(0);
  const [country, setCountry] = useState('France');
  const [currency, setCurrency] = useState<CurrencyCode>('XOF');
  const [notifications, setNotifications] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const isLast = page === SLIDES.length - 1;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(index);
  };

  const goNext = () => {
    if (isLast) return;
    scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    setPage(page + 1);
  };

  const handleFinish = async () => {
    if (notifications) {
      const granted = await requestNotificationPermission();
      if (granted) await scheduleDailyTipNotification();
    }
    await savePreferences({
      onboardingComplete: true,
      country,
      currency,
      dailyNotifications: notifications,
    });
    onComplete();
  };

  return (
    <SafeAreaView style={[layout.screen, { backgroundColor: Colors.background }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {SLIDES.map((slide, i) => (
          <View key={i} style={{ width, paddingHorizontal: 28, paddingTop: 48 }}>
            <View style={{ alignItems: 'center', marginBottom: 24, minHeight: 120, justifyContent: 'center' }}>
              {i === 0 ? (
                <Image
                  source={require('../../assets/icon.png')}
                  style={{ width: 120, height: 120, borderRadius: 28 }}
                />
              ) : (
                <Text style={{ fontSize: 64 }}>{slide.emoji}</Text>
              )}
            </View>
            <Text style={[text.h1, { textAlign: 'center', marginBottom: 12 }]}>{slide.title}</Text>
            <Text style={[text.body, { textAlign: 'center', color: Colors.textSecondary, lineHeight: 26 }]}>
              {slide.body}
            </Text>

            {i === 2 && (
              <View style={{ marginTop: 32 }}>
                <Text style={[text.label, { marginBottom: 8 }]}>Pays</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                  {COUNTRY_OPTIONS.map((c) => (
                    <TouchableOpacity
                      key={c}
                      onPress={() => setCountry(c)}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderRadius: 20,
                        marginRight: 8,
                        backgroundColor: country === c ? Colors.primary : Colors.surface,
                        borderWidth: 1,
                        borderColor: country === c ? Colors.primary : Colors.border,
                      }}
                    >
                      <Text style={{ color: country === c ? '#FFF' : Colors.textPrimary, fontSize: 14 }}>
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={[text.label, { marginBottom: 8 }]}>Devise</Text>
                {CURRENCY_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.code}
                    onPress={() => setCurrency(opt.code)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 14,
                      marginBottom: 8,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: currency === opt.code ? Colors.primary : Colors.border,
                      backgroundColor: currency === opt.code ? 'rgba(45, 106, 106, 0.08)' : Colors.surface,
                    }}
                  >
                    <Text style={[text.body, currency === opt.code && { fontWeight: '600' }]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  onPress={() => setNotifications((n) => !n)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 16,
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: Colors.border,
                    backgroundColor: Colors.surface,
                  }}
                >
                  <Text style={{ fontSize: 20, marginRight: 10 }}>{notifications ? '🔔' : '🔕'}</Text>
                  <Text style={text.bodySmall}>
                    Recevoir l'astuce du jour à 9h (optionnel)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 28, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === page ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === page ? Colors.primary : Colors.border,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {isLast ? (
          <TouchableOpacity style={components.button} onPress={handleFinish}>
            <Text style={components.buttonText}>Commencer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={components.button} onPress={goNext}>
            <Text style={components.buttonText}>Suivant</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
