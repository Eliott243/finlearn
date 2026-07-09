import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Card, MobileMoneyCard } from '../components';
import { getModuleById, SECTION_LABELS } from '../data/modules';
import { getMobileMoneyTip } from '../data/mobile-money';
import { markLessonComplete } from '../utils/storage';
import { useProgress } from '../context/ProgressContext';
import { useAvatars } from '../context/AvatarContext';
import { checkAvatarsOnStreak } from '../utils/avatarUnlock';
import type { ModulesStackParamList } from '../data/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';
import { isLessonUnlocked } from '../utils/progression';

type Route = RouteProp<ModulesStackParamList, 'LessonDetail'>;
type Nav = NativeStackNavigationProp<ModulesStackParamList, 'LessonDetail'>;

const SECTION_ICONS = {
  intro: 'book-outline',
  example: 'bulb-outline',
  key: 'star-outline',
  transition: 'arrow-forward-outline',
} as const;

export function LessonDetailScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { moduleId, lessonId } = route.params;
  const { progress, refreshProgress } = useProgress();
  const { queueUnlocks } = useAvatars();

  const module = getModuleById(moduleId);
  if (!module) {
    return (
      <View style={[layout.screen, layout.center]}>
        <Text style={text.bodySmall}>Module introuvable</Text>
        <TouchableOpacity style={[components.button, { marginTop: 16 }]} onPress={() => navigation.goBack()}>
          <Text style={components.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  const lesson = module.lessons[lessonIndex];
  if (!lesson) {
    return (
      <View style={[layout.screen, layout.center]}>
        <Text style={text.bodySmall}>Leçon introuvable</Text>
        <TouchableOpacity style={[components.button, { marginTop: 16 }]} onPress={() => navigation.goBack()}>
          <Text style={components.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lessonUnlocked = isLessonUnlocked(progress, module, lesson.id);
  if (!lessonUnlocked) {
    return (
      <View style={[layout.screen, layout.center, { paddingHorizontal: 32 }]}>
        <Ionicons name="lock-closed" size={40} color={Colors.textSecondary} />
        <Text style={[text.h3, { marginTop: 16 }]}>Leçon verrouillée</Text>
        <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 8 }]}>
          Terminez la leçon précédente pour débloquer celle-ci.
        </Text>
        <TouchableOpacity
          style={[components.button, { marginTop: 24, alignSelf: 'stretch' }]}
          onPress={() => navigation.navigate('ModuleDetail', { moduleId })}
        >
          <Text style={components.buttonText}>Retour au module</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isLastLesson = lessonIndex === module.lessons.length - 1;
  const nextLesson = !isLastLesson ? module.lessons[lessonIndex + 1] : null;
  const mobileMoneyTip = getMobileMoneyTip(lesson.id);

  const handleComplete = async () => {
    const updated = await markLessonComplete(lesson.id);
    const streakUnlocks = await checkAvatarsOnStreak(updated.streak ?? 0);
    queueUnlocks(streakUnlocks);
    await refreshProgress();

    if (nextLesson) {
      navigation.replace('LessonDetail', {
        moduleId,
        lessonId: nextLesson.id,
      });
    } else {
      navigation.navigate('Quiz', { moduleId });
    }
  };

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}
      showsVerticalScrollIndicator
    >
      <View style={{ alignItems: 'center', paddingVertical: 24 }}>
        <Text style={{ fontSize: 64 }}>{lesson.illustration}</Text>
      </View>

      <Text style={[text.label, text.primary]}>
        {module.title} · Leçon {lessonIndex + 1}/{module.lessons.length}
      </Text>
      <Text style={[text.h1, { fontSize: 24, marginTop: 4 }]}>{lesson.title}</Text>
      <Text style={[text.bodySmall, { marginTop: 4, marginBottom: 24 }]}>
        {lesson.duration}
      </Text>

      {lesson.content.map((section, i) => (
        <View key={i} style={{ marginBottom: 20 }}>
          <View style={[layout.row, { marginBottom: 8 }]}>
            <Ionicons
              name={SECTION_ICONS[section.type]}
              size={16}
              color={Colors.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={[text.label, text.primary]}>{SECTION_LABELS[section.type]}</Text>
          </View>
          <Text style={[text.body, { lineHeight: 26 }]}>{section.text}</Text>
        </View>
      ))}

      <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.08)', borderColor: 'rgba(45, 106, 106, 0.25)' }}>
        <Text style={[text.label, text.primary, { marginBottom: 8 }]}>
          Ce qu'il faut retenir
        </Text>
        <Text style={[text.body, { lineHeight: 24 }]}>{lesson.summary}</Text>
      </Card>

      {mobileMoneyTip && <MobileMoneyCard tip={mobileMoneyTip} />}

      <Card style={{ marginTop: 16, backgroundColor: 'rgba(74, 102, 112, 0.06)' }}>
        <Text style={[text.bodySmall, { textAlign: 'center' }]}>
          Contenu purement éducatif — aucune recommandation personnalisée.
        </Text>
      </Card>

      <TouchableOpacity style={[components.button, { marginTop: 16 }]} onPress={handleComplete}>
        <Text style={components.buttonText}>
          {nextLesson ? 'Leçon suivante' : 'Passer au quiz'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 12, paddingVertical: 12, alignItems: 'center' }}
        onPress={() => navigation.navigate('ModuleDetail', { moduleId })}
      >
        <Text style={[text.bodySmall, text.primary]}>Retour au module</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
