import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Card, ProgressBar } from '../components';
import { getModuleById } from '../data/modules';
import { isMobileMoneyReadyModule } from '../data/mobile-money';
import { useProgress } from '../context/ProgressContext';
import type { ModulesStackParamList } from '../data/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';
import {
  areAllLessonsCompleted,
  getModuleProgressPercent,
  hasPassedQuiz,
  isLessonCompleted,
  isLessonUnlocked,
  isModuleUnlocked,
  isQuizUnlocked,
} from '../utils/progression';

type Route = RouteProp<ModulesStackParamList, 'ModuleDetail'>;
type Nav = NativeStackNavigationProp<ModulesStackParamList, 'ModuleDetail'>;

export function ModuleDetailScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { progress } = useProgress();
  const { moduleId } = route.params;

  const module = getModuleById(moduleId);
  if (!module) {
    return (
      <View style={[layout.screen, layout.center]}>
        <Text style={text.bodySmall}>Module introuvable</Text>
      </View>
    );
  }

  const unlocked = isModuleUnlocked(progress, module);
  const moduleProgress = getModuleProgressPercent(progress, module);
  const quizUnlocked = isQuizUnlocked(progress, module);
  const quizPassed = hasPassedQuiz(progress, module.id);
  const quizScore = progress.quizScores[module.id];

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}
    >
      <View style={layout.rowStart}>
        <Text style={{ fontSize: 40, marginRight: 12 }}>{module.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={text.h2}>{module.title}</Text>
          <Text style={[text.bodySmall, { marginTop: 4 }]}>{module.description}</Text>
          {isMobileMoneyReadyModule(module.id) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(255, 152, 0, 0.12)',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 12, marginRight: 4 }}>📱</Text>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#E65100' }}>Mobile Money Ready</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ marginTop: 20, marginBottom: 24 }}>
        <ProgressBar progress={moduleProgress} label="Progression du module" />
      </View>

      {!unlocked && (
        <Card style={{ backgroundColor: 'rgba(74, 102, 112, 0.08)' }}>
          <View style={layout.rowStart}>
            <Ionicons name="lock-closed" size={20} color={Colors.secondary} />
            <Text style={[text.bodySmall, { marginLeft: 10, flex: 1 }]}>
              Terminez le module précédent pour débloquer ce parcours.
            </Text>
          </View>
        </Card>
      )}

      <Text style={[text.h3, { marginBottom: 12 }]}>Leçons</Text>

      {module.lessons.map((lesson, index) => {
        const completed = isLessonCompleted(progress, lesson.id);
        const lessonUnlocked = isLessonUnlocked(progress, module, lesson.id);

        return (
          <Card
            key={lesson.id}
            onPress={
              lessonUnlocked
                ? () =>
                    navigation.navigate('LessonDetail', {
                      moduleId: module.id,
                      lessonId: lesson.id,
                    })
                : undefined
            }
            style={!lessonUnlocked ? { opacity: 0.55 } : undefined}
          >
            <View style={layout.rowStart}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: completed
                    ? 'rgba(61, 153, 112, 0.15)'
                    : lessonUnlocked
                      ? 'rgba(45, 106, 106, 0.1)'
                      : Colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                {completed ? (
                  <Ionicons name="checkmark" size={18} color={Colors.success} />
                ) : lessonUnlocked ? (
                  <Text style={[text.label, text.primary]}>{index + 1}</Text>
                ) : (
                  <Ionicons name="lock-closed" size={14} color={Colors.textSecondary} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[text.body, { fontWeight: '600' }]}>{lesson.title}</Text>
                <Text style={text.caption}>{lesson.duration}</Text>
              </View>
              {lessonUnlocked && <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />}
            </View>
          </Card>
        );
      })}

      <Text style={[text.h3, { marginTop: 8, marginBottom: 12 }]}>Quiz de validation</Text>

      <Card
        onPress={
          quizUnlocked
            ? () => navigation.navigate('Quiz', { moduleId: module.id })
            : undefined
        }
        style={!quizUnlocked ? { opacity: 0.55 } : undefined}
      >
        <View style={layout.rowStart}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: quizPassed
                ? 'rgba(61, 153, 112, 0.15)'
                : quizUnlocked
                  ? 'rgba(91, 141, 239, 0.15)'
                  : Colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            {quizPassed ? (
              <Ionicons name="checkmark" size={18} color={Colors.success} />
            ) : quizUnlocked ? (
              <Ionicons name="help" size={16} color={Colors.accent} />
            ) : (
              <Ionicons name="lock-closed" size={14} color={Colors.textSecondary} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[text.body, { fontWeight: '600' }]}>Quiz — {module.title}</Text>
            <Text style={text.caption}>
              {quizPassed
                ? `Réussi (${quizScore} %)`
                : quizUnlocked
                  ? 'Disponible — validez vos acquis'
                  : 'Complétez toutes les leçons pour débloquer'}
            </Text>
          </View>
          {quizUnlocked && <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />}
        </View>
      </Card>

      {areAllLessonsCompleted(progress, module) && !quizPassed && (
        <TouchableOpacity
          style={[components.button, { marginTop: 8 }]}
          onPress={() => navigation.navigate('Quiz', { moduleId: module.id })}
        >
          <Text style={components.buttonText}>Passer le quiz</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
