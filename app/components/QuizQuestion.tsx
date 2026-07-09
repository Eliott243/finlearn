import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { text } from '../constants/styles';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  showResult?: boolean;
  correctIndex?: number;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizQuestion({
  question,
  options,
  selectedIndex,
  onSelect,
  showResult = false,
  correctIndex,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isCorrectResult =
    showResult && selectedIndex !== null && selectedIndex === correctIndex;
  const isWrongResult =
    showResult && selectedIndex !== null && selectedIndex !== correctIndex;

  useEffect(() => {
    if (!showResult) return;
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: isCorrectResult ? 1.03 : 0.98,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [showResult, isCorrectResult, scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Text style={text.bodySmall}>
        Question {questionNumber} / {totalQuestions}
      </Text>
      <Text style={[text.h3, { marginTop: 8, marginBottom: 16 }]}>{question}</Text>

      {showResult && (
        <Text style={{ fontSize: 28, textAlign: 'center', marginBottom: 12 }}>
          {isCorrectResult ? '✅' : isWrongResult ? '❌' : ''}
        </Text>
      )}

      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = showResult && correctIndex === index;
        const isWrong = showResult && isSelected && correctIndex !== index;

        let borderColor = '#E2E8F0';
        let bgColor = '#FFFFFF';
        if (isSelected && !showResult) {
          borderColor = '#2D6A6A';
          bgColor = 'rgba(45, 106, 106, 0.05)';
        }
        if (isCorrect) {
          borderColor = '#3D9970';
          bgColor = 'rgba(61, 153, 112, 0.1)';
        }
        if (isWrong) {
          borderColor = '#C45C5C';
          bgColor = 'rgba(196, 92, 92, 0.1)';
        }

        return (
          <TouchableOpacity
            key={index}
            style={{
              borderWidth: 1,
              borderColor,
              backgroundColor: bgColor,
              borderRadius: 12,
              padding: 16,
              marginBottom: 8,
            }}
            onPress={() => !showResult && onSelect(index)}
            disabled={showResult}
            activeOpacity={0.7}
          >
            <Text
              style={[
                text.body,
                (isSelected || isCorrect) && { fontWeight: '600' },
                !isSelected && !isCorrect && { color: '#6B7C8D' },
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
