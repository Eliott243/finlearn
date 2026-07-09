import { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Card, ProgressBar } from '../components';
import { QuizQuestion } from '../components/QuizQuestion';
import { etfSheets } from '../data/etf-sheets';
import { ETF_READING_STEPS, ETF_SHEET_QUIZ } from '../data/etf-learning';
import { useProgress } from '../context/ProgressContext';
import { markETFToolQuizPassed } from '../utils/storage';
import type { ToolsStackParamList } from '../data/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

type Nav = NativeStackNavigationProp<ToolsStackParamList, 'ETFSheets'>;

const QUIZ_PASS_THRESHOLD = 60;

export function ETFSheetsScreen() {
  const navigation = useNavigation<Nav>();
  const { progress, refreshProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const scoreRef = useRef(0);

  const viewedCount = progress.viewedETFSheets.length;
  const totalSheets = etfSheets.length;
  const readingProgress = totalSheets > 0 ? (viewedCount / totalSheets) * 100 : 0;
  const allViewed = viewedCount >= totalSheets;
  const currentQuizQuestion = ETF_SHEET_QUIZ[quizIndex];

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizFinished(false);
    setQuizIndex(0);
    setScore(0);
    scoreRef.current = 0;
    setSelectedIndex(null);
    setShowResult(false);
    setFinalScore(0);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizIndex(0);
    setScore(0);
    scoreRef.current = 0;
    setSelectedIndex(null);
    setShowResult(false);
    setQuizFinished(false);
    setFinalScore(0);
  };

  const handleQuizValidate = () => {
    if (selectedIndex === null) return;
    const isCorrect = selectedIndex === currentQuizQuestion.correctIndex;
    const newScore = isCorrect ? scoreRef.current + 1 : scoreRef.current;
    scoreRef.current = newScore;
    setScore(newScore);
    setShowResult(true);
  };

  const handleQuizNext = async () => {
    if (quizIndex < ETF_SHEET_QUIZ.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowResult(false);
      return;
    }

    const percent = Math.round((scoreRef.current / ETF_SHEET_QUIZ.length) * 100);
    setFinalScore(percent);
    if (percent >= QUIZ_PASS_THRESHOLD) {
      await markETFToolQuizPassed();
    }
    await refreshProgress();
    setQuizFinished(true);
  };

  if (showQuiz && !quizFinished) {
    const isCorrect = selectedIndex === currentQuizQuestion.correctIndex;

    return (
      <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
        <Text style={[text.h3, { marginBottom: 8 }]}>Quiz — Lire une fiche ETF</Text>
        <Text style={[text.bodySmall, { marginBottom: 20 }]}>
          Validez vos acquis ({viewedCount}/{totalSheets} fiches consultées).
        </Text>

        <Card>
          <QuizQuestion
            question={currentQuizQuestion.question}
            options={currentQuizQuestion.options}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            showResult={showResult}
            correctIndex={currentQuizQuestion.correctIndex}
            questionNumber={quizIndex + 1}
            totalQuestions={ETF_SHEET_QUIZ.length}
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
              <Text style={text.bodySmall}>{currentQuizQuestion.explanation}</Text>
            </View>
          )}
        </Card>

        {!showResult ? (
          <TouchableOpacity
            style={[components.button, selectedIndex === null && { backgroundColor: Colors.border }]}
            onPress={handleQuizValidate}
            disabled={selectedIndex === null}
          >
            <Text style={[components.buttonText, selectedIndex === null && { color: Colors.textSecondary }]}>
              Valider
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={components.button} onPress={handleQuizNext}>
            <Text style={components.buttonText}>
              {quizIndex < ETF_SHEET_QUIZ.length - 1 ? 'Question suivante' : 'Voir le résultat'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  if (quizFinished) {
    const passed = finalScore >= QUIZ_PASS_THRESHOLD;
    return (
      <View style={[layout.screen, layout.center, { paddingHorizontal: 32 }]}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>{passed ? '🏆' : '📚'}</Text>
        <Text style={text.h2}>{passed ? 'Quiz réussi !' : 'À retravailler'}</Text>
        <Text style={[text.body, { color: Colors.textSecondary, textAlign: 'center', marginTop: 8 }]}>
          Score : {score}/{ETF_SHEET_QUIZ.length} ({finalScore} %)
        </Text>
        {!passed && (
          <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 8 }]}>
            Relisez les fiches ETF puis réessayez (seuil : {QUIZ_PASS_THRESHOLD} %).
          </Text>
        )}
        <TouchableOpacity style={[components.button, { marginTop: 24, alignSelf: 'stretch' }]} onPress={resetQuiz}>
          <Text style={components.buttonText}>Retour aux fiches</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
      <Text style={[text.body, { color: Colors.textSecondary, marginTop: 8, marginBottom: 20 }]}>
        Apprenez à décrypter une fiche ETF en 5 étapes, puis explorez des exemples concrets.
      </Text>

      <Card>
        <Text style={[text.h3, { marginBottom: 12 }]}>Comment lire une fiche ETF</Text>
        {ETF_READING_STEPS.map((step) => (
          <View key={step.id} style={[layout.rowStart, { marginBottom: 14 }]}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>{step.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[text.body, { fontWeight: '600' }]}>{step.title}</Text>
              <Text style={[text.bodySmall, { marginTop: 2, lineHeight: 20 }]}>{step.description}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <ProgressBar progress={readingProgress} label={`Fiches consultées (${viewedCount}/${totalSheets})`} />
        {progress.etfToolQuizPassed && (
          <Text style={[text.bodySmall, { color: Colors.success, marginTop: 8 }]}>
            Quiz validé — vous maîtrisez les bases de lecture d'une fiche ETF.
          </Text>
        )}
      </Card>

      <Text style={[text.h3, { marginBottom: 12 }]}>Fiches exemples</Text>

      {etfSheets.map((etf) => {
        const viewed = progress.viewedETFSheets.includes(etf.id);
        return (
          <Card key={etf.id} onPress={() => navigation.navigate('ETFSheetDetail', { etfId: etf.id })}>
            <View style={layout.rowStart}>
              <View style={{ flex: 1 }}>
                <Text style={[text.body, { fontWeight: '600' }]}>{etf.name}</Text>
                <Text style={[text.bodySmall, { marginTop: 2 }]}>{etf.index}</Text>
                <Text style={text.caption}>TER : {etf.ter}</Text>
              </View>
              {viewed ? (
                <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
              ) : (
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              )}
            </View>
          </Card>
        );
      })}

      <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.06)' }}>
        <Text style={[text.label, text.primary, { marginBottom: 6 }]}>Ce qu'il faut retenir</Text>
        <Text style={[text.bodySmall, { lineHeight: 22 }]}>
          Avant d'investir dans un ETF, vérifiez l'indice répliqué, le TER et la zone géographique.
          Ces trois éléments déterminent l'essentiel de votre exposition.
        </Text>
      </Card>

      {allViewed ? (
        <TouchableOpacity style={components.button} onPress={startQuiz}>
          <Text style={components.buttonText}>
            {progress.etfToolQuizPassed ? 'Refaire le quiz' : 'Passer le quiz de validation'}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 8 }]}>
          Consultez toutes les fiches pour débloquer le quiz de validation.
        </Text>
      )}
    </ScrollView>
  );
}
