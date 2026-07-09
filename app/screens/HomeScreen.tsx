import { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Card,
  ProgressBar,
  ToolCard,
  DisclaimerBanner,
  StreakBadge,
  TipOfDayCard,
  NewsCarousel,
} from '../components';
import { useProgress } from '../context/ProgressContext';
import { useNews } from '../context/NewsContext';
import { getTipOfDay } from '../data/tips';
import { markTipSeen } from '../utils/storage';
import { layout, text } from '../constants/styles';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const { overallProgress, learningResume, progress, refreshProgress } = useProgress();
  const { articles, loading: newsLoading } = useNews();

  const tipOfDay = getTipOfDay();
  const resumeLesson = learningResume?.type === 'lesson' ? learningResume : null;
  const resumeQuiz = learningResume?.type === 'quiz' ? learningResume : null;

  useEffect(() => {
    markTipSeen(tipOfDay.id).then(() => refreshProgress());
  }, [tipOfDay.id, refreshProgress]);

  return (
    <SafeAreaView style={layout.screen} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={layout.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: 16, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Image
                source={require('../../assets/icon.png')}
                style={{ width: 52, height: 52, borderRadius: 12, marginRight: 14 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={text.bodySmall}>Bienvenue sur</Text>
                <Text style={[text.h1, text.primary, { marginTop: 2, fontSize: 26 }]}>FinLearn</Text>
              </View>
            </View>
            <StreakBadge streak={progress.streak ?? 0} />
          </View>
          <Text style={[text.body, { color: '#6B7C8D', marginTop: 4 }]}>
            Apprenez à épargner et investir, à votre rythme.
          </Text>
        </View>

        <View style={{ marginTop: 16, marginBottom: 12 }}>
          <DisclaimerBanner />
        </View>

        <View style={{ marginBottom: 20 }}>
          <TipOfDayCard
            tip={tipOfDay}
            onPressLibrary={() => navigation.navigate('TipsLibrary')}
          />
        </View>

        <Card>
          <Text style={[text.h3, { marginBottom: 12 }]}>Votre progression</Text>
          <ProgressBar progress={overallProgress} label="Parcours global" />
          <Text style={[text.bodySmall, { marginTop: 12 }]}>
            {progress.completedLessons.length} leçon
            {progress.completedLessons.length !== 1 ? 's' : ''} complétée
            {progress.completedLessons.length !== 1 ? 's' : ''}
          </Text>
        </Card>

        {resumeLesson ? (
          <Card>
            <Text style={[text.label, text.primary, { marginBottom: 4 }]}>Leçon en cours</Text>
            <View style={[layout.rowStart, { marginBottom: 12 }]}>
              <Text style={{ fontSize: 32, marginRight: 12 }}>{resumeLesson.module.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[text.body, { fontWeight: '600' }]}>{resumeLesson.lesson.title}</Text>
                <Text style={text.bodySmall}>
                  {resumeLesson.module.title} · {resumeLesson.lesson.duration}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#2D6A6A',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('Parcours', {
                  screen: 'LessonDetail',
                  params: {
                    moduleId: resumeLesson.module.id,
                    lessonId: resumeLesson.lesson.id,
                  },
                })
              }
              activeOpacity={0.8}
            >
              <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 16 }}>Continuer la leçon</Text>
            </TouchableOpacity>
          </Card>
        ) : resumeQuiz ? (
          <Card>
            <Text style={[text.label, text.primary, { marginBottom: 4 }]}>Quiz à passer</Text>
            <View style={[layout.rowStart, { marginBottom: 12 }]}>
              <Text style={{ fontSize: 32, marginRight: 12 }}>{resumeQuiz.module.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[text.body, { fontWeight: '600' }]}>Quiz — {resumeQuiz.module.title}</Text>
                <Text style={text.bodySmall}>Toutes les leçons sont terminées. Validez le module.</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#2D6A6A',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('Parcours', {
                  screen: 'Quiz',
                  params: { moduleId: resumeQuiz.module.id },
                })
              }
              activeOpacity={0.8}
            >
              <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 16 }}>Passer le quiz</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>🎉</Text>
            <Text style={text.h3}>Parcours terminé !</Text>
            <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 4 }]}>
              Vous avez complété tous les modules disponibles.
            </Text>
          </Card>
        )}

        <NewsCarousel
          articles={articles}
          loading={newsLoading}
          onSeeAll={() => navigation.navigate('News')}
        />

        <Text style={[text.h3, { marginBottom: 12, marginTop: 8 }]}>Accès rapide</Text>

        <ToolCard
          title="Simulateur d'intérêts composés"
          description="Visualisez la croissance de votre capital dans le temps"
          icon="📈"
          onPress={() => navigation.navigate('Outils', { screen: 'CompoundInterest' })}
        />

        <ToolCard
          title="Parcours complet"
          description="14 modules sur 3 niveaux d'apprentissage"
          icon="📚"
          onPress={() => navigation.navigate('Parcours')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
