import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Card, ProgressBar } from '../components';
import { LEVEL_LABELS, getLevelModules } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import type { ModulesStackParamList } from '../data/types';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';
import {
  getModuleProgressPercent,
  hasPassedQuiz,
  isModuleCompleted,
  isModuleUnlocked,
} from '../utils/progression';

type Nav = NativeStackNavigationProp<ModulesStackParamList, 'Modules'>;

export function ModulesScreen() {
  const navigation = useNavigation<Nav>();
  const { progress } = useProgress();

  const levels = [1, 2, 3];

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={layout.scrollContent}
    >
      <Text style={[text.body, { color: '#6B7C8D', marginTop: 8, marginBottom: 20 }]}>
        Progressez à travers 3 niveaux. Chaque module se débloque après validation du précédent.
      </Text>

      {levels.map((level) => {
        const levelModules = getLevelModules(level);
        const levelUnlocked =
          level === 1 || getLevelModules(level - 1).every((m) => isModuleCompleted(progress, m));

        return (
          <View key={level} style={{ marginBottom: 24 }}>
            <View style={[layout.row, { marginBottom: 12 }]}>
              <Text style={[text.h3, { flex: 1 }]}>{LEVEL_LABELS[level]}</Text>
              {!levelUnlocked && (
                <Ionicons name="lock-closed" size={18} color={Colors.textSecondary} />
              )}
            </View>

            {!levelUnlocked && (
              <Text style={[text.bodySmall, { marginBottom: 12 }]}>
                Terminez tous les modules du niveau {level - 1} pour débloquer ce niveau.
              </Text>
            )}

            {levelModules.map((mod) => {
              const unlocked = isModuleUnlocked(progress, mod);
              const completed = isModuleCompleted(progress, mod);
              const moduleProgress = getModuleProgressPercent(progress, mod);
              const quizPassed = hasPassedQuiz(progress, mod.id);

              return (
                <Card
                  key={mod.id}
                  onPress={
                    unlocked
                      ? () => navigation.navigate('ModuleDetail', { moduleId: mod.id })
                      : undefined
                  }
                  style={!unlocked ? { opacity: 0.55 } : undefined}
                >
                  <View style={layout.rowStart}>
                    <Text style={{ fontSize: 28, marginRight: 12 }}>{mod.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <View style={layout.row}>
                        <Text style={[text.body, { fontWeight: '600', flex: 1 }]}>{mod.title}</Text>
                        {completed ? (
                          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                        ) : !unlocked ? (
                          <Ionicons name="lock-closed" size={18} color={Colors.textSecondary} />
                        ) : null}
                      </View>
                      <Text style={[text.bodySmall, { marginTop: 2 }]}>{mod.description}</Text>
                      <Text style={[text.caption, { marginTop: 4 }]}>
                        {mod.lessons.length} leçons · Quiz {quizPassed ? 'réussi' : 'inclus'}
                      </Text>
                      <View style={{ marginTop: 12 }}>
                        <ProgressBar progress={moduleProgress} label="Progression" />
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}
