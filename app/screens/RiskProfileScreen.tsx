import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '../components';
import { useProgress } from '../context/ProgressContext';
import { saveRiskProfile } from '../utils/storage';
import {
  RISK_PROFILE_QUESTIONS,
  RISK_PROFILE_DETAILS,
  computeRiskProfile,
  type RiskProfileType,
} from '../data/risk-profile';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

type Phase = 'intro' | 'quiz' | 'result';

export function RiskProfileScreen() {
  const { progress, refreshProgress } = useProgress();
  const [phase, setPhase] = useState<Phase>(progress.riskProfileCompleted ? 'result' : 'intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [resultProfile, setResultProfile] = useState<RiskProfileType | null>(
    progress.riskProfile ?? null
  );

  const currentQuestion = RISK_PROFILE_QUESTIONS[questionIndex];
  const selectedOption =
    selectedIndex !== null ? currentQuestion?.options[selectedIndex] : null;

  const handleStart = () => {
    setPhase('quiz');
    setQuestionIndex(0);
    setAnswers({});
    setSelectedIndex(null);
    setShowExplanation(false);
    setResultProfile(null);
  };

  const handleValidate = () => {
    if (selectedIndex === null || !currentQuestion) return;
    setShowExplanation(true);
  };

  const handleNext = async () => {
    if (selectedIndex === null || !currentQuestion) return;

    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedIndex };

    if (questionIndex < RISK_PROFILE_QUESTIONS.length - 1) {
      setAnswers(updatedAnswers);
      setQuestionIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowExplanation(false);
      return;
    }

    const profile = computeRiskProfile(updatedAnswers);
    await saveRiskProfile(profile);
    await refreshProgress();
    setResultProfile(profile);
    setPhase('result');
  };

  const profile = resultProfile ?? progress.riskProfile;
  const details = profile ? RISK_PROFILE_DETAILS[profile] : null;

  if (phase === 'intro') {
    return (
      <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
        <Text style={[text.body, { color: Colors.textSecondary, marginTop: 8, marginBottom: 20 }]}>
          Ce questionnaire éducatif vous aide à comprendre votre rapport au risque financier.
          Il ne constitue pas un conseil en investissement.
        </Text>

        <Card>
          <Text style={[text.h3, { marginBottom: 12 }]}>Pourquoi connaître son profil ?</Text>
          <Text style={[text.body, { lineHeight: 24, marginBottom: 12 }]}>
            Tous les investisseurs ne réagissent pas pareil face aux fluctuations des marchés.
            Connaître votre profil aide à choisir une allocation cohérente avec votre situation.
          </Text>
          <Text style={[text.bodySmall, { lineHeight: 22 }]}>
            • 6 questions avec explications{'\n'}
            • Résultat : prudent, équilibré ou dynamique{'\n'}
            • Suggestions pédagogiques personnalisées
          </Text>
        </Card>

        {progress.riskProfileCompleted && details && (
          <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.06)' }}>
            <Text style={[text.label, text.primary, { marginBottom: 4 }]}>Dernier résultat</Text>
            <Text style={text.h3}>
              {details.emoji} {details.title}
            </Text>
          </Card>
        )}

        <TouchableOpacity style={components.button} onPress={handleStart}>
          <Text style={components.buttonText}>
            {progress.riskProfileCompleted ? 'Refaire le questionnaire' : 'Commencer le quiz'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (phase === 'result' && details) {
    return (
      <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={{ fontSize: 56 }}>{details.emoji}</Text>
          <Text style={[text.h1, { fontSize: 24, marginTop: 12 }]}>{details.title}</Text>
        </View>

        <Card>
          <Text style={[text.body, { lineHeight: 26 }]}>{details.description}</Text>
        </Card>

        <Card>
          <Text style={[text.h3, { marginBottom: 12 }]}>Vos caractéristiques</Text>
          {details.traits.map((trait) => (
            <Text key={trait} style={[text.bodySmall, { marginBottom: 8, lineHeight: 22 }]}>
              • {trait}
            </Text>
          ))}
        </Card>

        <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.06)', borderColor: 'rgba(45, 106, 106, 0.2)' }}>
          <Text style={[text.label, text.primary, { marginBottom: 8 }]}>Ce qu'il faut retenir</Text>
          {details.suggestions.map((suggestion) => (
            <Text key={suggestion} style={[text.body, { marginBottom: 10, lineHeight: 24 }]}>
              → {suggestion}
            </Text>
          ))}
        </Card>

        <Card>
          <Text style={[text.bodySmall, { textAlign: 'center', lineHeight: 22 }]}>
            Ce profil est indicatif et éducatif. Consultez un professionnel pour toute décision
            d'investissement personnalisée.
          </Text>
        </Card>

        <TouchableOpacity style={components.button} onPress={handleStart}>
          <Text style={components.buttonText}>Refaire le questionnaire</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
      <Text style={[text.bodySmall, { marginBottom: 16 }]}>
        Question {questionIndex + 1} / {RISK_PROFILE_QUESTIONS.length}
      </Text>

      <Card>
        <Text style={[text.h3, { marginBottom: 16 }]}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={option.label}
              style={{
                borderWidth: 1,
                borderColor: isSelected ? Colors.primary : Colors.border,
                backgroundColor: isSelected ? 'rgba(45, 106, 106, 0.05)' : Colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 8,
              }}
              onPress={() => !showExplanation && setSelectedIndex(index)}
              disabled={showExplanation}
            >
              <Text style={[text.body, isSelected && { fontWeight: '600' }]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}

        {showExplanation && selectedOption && (
          <View
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: Colors.background,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={[text.label, text.primary, { marginBottom: 6 }]}>Pourquoi c'est important</Text>
            <Text style={text.bodySmall}>{selectedOption.explanation}</Text>
          </View>
        )}
      </Card>

      {!showExplanation ? (
        <TouchableOpacity
          style={[components.button, selectedIndex === null && { backgroundColor: Colors.border }]}
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
        <TouchableOpacity style={components.button} onPress={handleNext}>
          <Text style={components.buttonText}>
            {questionIndex < RISK_PROFILE_QUESTIONS.length - 1
              ? 'Question suivante'
              : 'Voir mon profil'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
