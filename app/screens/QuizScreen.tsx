import { useEffect, useMemo, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuizQuestion } from '../components/QuizQuestion';
import { Card } from '../components';
import { getModuleById } from '../data/modules';
import { saveQuizScore, unlockBadge } from '../utils/storage';
import { useProgress } from '../context/ProgressContext';
import { useAvatars } from '../context/AvatarContext';
import type { ModulesStackParamList } from '../data/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  hasPassedQuiz,
  isQuizUnlocked,
  QUIZ_PASS_THRESHOLD,
} from '../utils/progression';
import { checkNewlyCompletedLevel } from '../utils/certificates';
import { getUserDisplayName } from '../utils/userDisplay';
import { checkAvatarsOnQuizComplete, checkAvatarsOnStreak } from '../utils/avatarUnlock';

type Route = RouteProp<ModulesStackParamList, 'Quiz'>;
type Nav = NativeStackNavigationProp<ModulesStackParamList, 'Quiz'>;

export function QuizScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { moduleId } = route.params;
  const { progress, refreshProgress } = useProgress();
  const { queueUnlocks } = useAvatars();

  const module = getModuleById(moduleId);
  const initialStreak = useMemo(() => progress.streak ?? 0, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const scoreRef = useRef(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newCertificateLevel, setNewCertificateLevel] = useState<number | null>(null);
  const streakScale = useSharedValue(1);

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

  const quizUnlocked = isQuizUnlocked(progress, module);
  if (!quizUnlocked) {
    return (
      <View style={[layout.screen, layout.center, { paddingHorizontal: 32 }]}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>🔒</Text>
        <Text style={text.h3}>Quiz verrouillé</Text>
        <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 8 }]}>
          Complétez toutes les leçons de ce module avant de passer le quiz.
        </Text>
        <TouchableOpacity
          style={[components.button, { marginTop: 24, alignSelf: 'stretch' }]}
          onPress={() => navigation.navigate('ModuleDetail', { moduleId })}
        >
          <Text style={components.buttonText}>Revoir les leçons</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const questions = module.quiz;
  const currentQuestion = questions[currentIndex];
  const passed = finished && finalScore >= QUIZ_PASS_THRESHOLD;
  const alreadyPassed = hasPassedQuiz(progress, moduleId);

  const streakAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: streakScale.value }] };
  });

  const triggerStreakBounce = () => {
    streakScale.value = withSequence(
      withTiming(1.1, { duration: 140, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 220, easing: Easing.out(Easing.cubic) })
    );
  };

  useEffect(() => {
    if (!finished || !passed) return;
    if (alreadyPassed) return;

    const { width } = Dimensions.get('window');
    setShowConfetti(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );

    const t = setTimeout(() => {
      triggerStreakBounce();
      // stop rendering cannon once it's done
      setTimeout(() => setShowConfetti(false), 800);
    }, 2600);

    return () => clearTimeout(t);
  }, [finished, passed, alreadyPassed]);

  const handleValidate = async () => {
    if (selectedIndex === null) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const newScore = isCorrect ? scoreRef.current + 1 : scoreRef.current;
    scoreRef.current = newScore;
    setScore(newScore);
    setShowResult(true);
  };

  const handleNextQuestion = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowResult(false);
      return;
    }

    const percent = Math.round((scoreRef.current / questions.length) * 100);
    setFinalScore(percent);
    const updated = await saveQuizScore(moduleId, percent);
    if (percent >= QUIZ_PASS_THRESHOLD) {
      await unlockBadge(`badge-${moduleId}`);
      const avatarUnlocks = await checkAvatarsOnQuizComplete(moduleId, percent);
      const streakUnlocks = await checkAvatarsOnStreak(updated.streak ?? 0);
      queueUnlocks([...avatarUnlocks, ...streakUnlocks]);
      const name = await getUserDisplayName();
      const cert = await checkNewlyCompletedLevel(updated, module.level, name);
      if (cert) setNewCertificateLevel(module.level);
    }
    await refreshProgress();
    setFinished(true);
  };

  if (finished) {
    const currentStreak = progress.streak ?? 0;
    const streakDelta = Math.max(0, currentStreak - initialStreak);
    return (
      <View style={[layout.screen, layout.center, { paddingHorizontal: 32 }]}>
        {showConfetti && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <ConfettiCannon
              count={120}
              origin={{ x: Dimensions.get('window').width / 2, y: -10 }}
              fadeOut
              fallSpeed={2800}
              explosionSpeed={450}
            />
          </View>
        )}

        <Text style={{ fontSize: 48, marginBottom: 16 }}>{passed ? '🏆' : '📚'}</Text>
        <Text style={text.h2}>{passed ? 'Quiz réussi !' : 'Quiz à retravailler'}</Text>
        <Text style={[text.body, { color: Colors.textSecondary, textAlign: 'center', marginTop: 8 }]}>
          Score : {score}/{questions.length} ({finalScore} %)
        </Text>
        {passed ? (
          <Text style={[text.bodySmall, { color: Colors.success, marginTop: 8, textAlign: 'center' }]}>
            {alreadyPassed ? 'Module validé !' : 'Badge débloqué ! 🎖️'} Vous pouvez passer au module suivant.
          </Text>
        ) : (
          <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 8 }]}>
            Il faut au moins {QUIZ_PASS_THRESHOLD} % pour valider le module. Revoyez les leçons
            puis réessayez le quiz.
          </Text>
        )}

        {passed && !alreadyPassed && (progress.streak ?? 0) > 0 && (
          <Animated.View style={[{ marginTop: 14 }, streakAnimatedStyle]}>
            <View
              style={{
                backgroundColor: 'rgba(45, 106, 106, 0.10)',
                borderRadius: 999,
                paddingHorizontal: 14,
                paddingVertical: 10,
                alignItems: 'center',
              }}
            >
              <Text style={[text.bodySmall, { fontWeight: '700', color: Colors.primary }]}>
                Streak : {currentStreak} jour{currentStreak > 1 ? 's' : ''}
                {streakDelta > 0 ? ` (+${streakDelta})` : ''}
              </Text>
            </View>
          </Animated.View>
        )}

        {newCertificateLevel !== null && passed && (
          <TouchableOpacity
            style={[components.button, { marginTop: 16, alignSelf: 'stretch' }]}
            onPress={() =>
              navigation.getParent()?.navigate('Profil', {
                screen: 'CertificateCelebration',
                params: { level: newCertificateLevel },
              })
            }
          >
            <Text style={components.buttonText}>🎓 Voir mon certificat de niveau</Text>
          </TouchableOpacity>
        )}

        {!passed && (
          <TouchableOpacity
            style={[components.button, { marginTop: 24, alignSelf: 'stretch' }]}
            onPress={() => navigation.navigate('ModuleDetail', { moduleId })}
          >
            <Text style={components.buttonText}>Revoir les leçons</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            passed ? components.button : { paddingVertical: 14, alignItems: 'center' },
            { marginTop: 12, alignSelf: 'stretch' },
          ]}
          onPress={() => navigation.navigate('Modules')}
        >
          <Text style={passed ? components.buttonText : [text.body, text.primary]}>
            Retour au parcours
          </Text>
        </TouchableOpacity>

        {!passed && (
          <TouchableOpacity
            style={{ marginTop: 12, paddingVertical: 12 }}
            onPress={() => {
              scoreRef.current = 0;
              setCurrentIndex(0);
              setSelectedIndex(null);
              setShowResult(false);
              setScore(0);
              setFinished(false);
              setFinalScore(0);
            }}
          >
            <Text style={[text.bodySmall, text.primary]}>Réessayer le quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  const isCorrect = selectedIndex === currentQuestion.correctIndex;

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingTop: 16, paddingBottom: 40 }]}
    >
      <Text style={[text.bodySmall, { marginBottom: 16 }]}>Quiz — {module.title}</Text>

      <Card style={{ marginBottom: 24 }}>
        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          showResult={showResult}
          correctIndex={currentQuestion.correctIndex}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
        />

        {showResult && (
          <View
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: isCorrect ? 'rgba(61, 153, 112, 0.08)' : 'rgba(196, 92, 92, 0.08)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isCorrect ? 'rgba(61, 153, 112, 0.3)' : 'rgba(196, 92, 92, 0.3)',
            }}
          >
            <Text style={[text.label, { color: isCorrect ? Colors.success : Colors.danger, marginBottom: 6 }]}>
              {isCorrect ? 'Bonne réponse' : 'Réponse incorrecte'}
            </Text>
            <Text style={text.bodySmall}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </Card>

      {!showResult ? (
        <TouchableOpacity
          style={[
            components.button,
            selectedIndex === null && { backgroundColor: Colors.border },
          ]}
          onPress={handleValidate}
          disabled={selectedIndex === null}
        >
          <Text
            style={[
              components.buttonText,
              selectedIndex === null && { color: Colors.textSecondary },
            ]}
          >
            Valider
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={components.button} onPress={handleNextQuestion}>
          <Text style={components.buttonText}>
            {currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir le résultat'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
