import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NewsArticle } from '../services/news/types';
import { formatRelativeNewsDate } from '../services/news';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.72;
const CARD_GAP = 12;
const HORIZONTAL_PADDING = 20;

const ACCENT_COLORS = [Colors.primary, Colors.secondary, Colors.accent, Colors.success];

interface NewsCarouselProps {
  articles: NewsArticle[];
  loading?: boolean;
  onSeeAll: () => void;
}

function accentForIndex(index: number): string {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const accent = accentForIndex(index);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => article.url && Linking.openURL(article.url).catch(() => {})}
      style={{
        width: CARD_WIDTH,
        marginRight: CARD_GAP,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
      }}
    >
      <View style={{ height: 6, backgroundColor: accent }} />
      <View style={{ padding: 14, minHeight: 130 }}>
        <Text style={[text.caption, { color: accent, fontWeight: '600', marginBottom: 6 }]}>
          {article.source}
        </Text>
        <Text
          style={[text.body, { fontWeight: '700', lineHeight: 22, flex: 1 }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {article.title}
        </Text>
        <Text style={[text.caption, { marginTop: 10, color: Colors.textSecondary }]}>
          {formatRelativeNewsDate(article.publishedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function SeeAllCard({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        width: CARD_WIDTH * 0.55,
        marginRight: HORIZONTAL_PADDING,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        backgroundColor: 'rgba(45, 106, 106, 0.04)',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 136,
        padding: 16,
      }}
    >
      <Ionicons name="newspaper-outline" size={28} color={Colors.primary} />
      <Text style={[text.body, text.primary, { fontWeight: '700', marginTop: 10 }]}>
        Voir tout
      </Text>
      <Text style={[text.caption, { marginTop: 4, textAlign: 'center' }]}>
        Tous les articles
      </Text>
    </TouchableOpacity>
  );
}

export function NewsCarousel({ articles, loading, onSeeAll }: NewsCarouselProps) {
  const preview = articles.slice(0, 8);
  const showCarousel = loading || preview.length > 0;

  if (!showCarousel) return null;

  const data: ({ type: 'article'; article: NewsArticle; index: number } | { type: 'seeAll' })[] = [
    ...preview.map((article, index) => ({ type: 'article' as const, article, index })),
    { type: 'seeAll' as const },
  ];

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          paddingHorizontal: HORIZONTAL_PADDING,
        }}
      >
        <Text style={text.h3}>Actualité</Text>
        {!loading && preview.length > 0 && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={[text.bodySmall, text.primary, { fontWeight: '600' }]}>Voir tout</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && preview.length === 0 ? (
        <View style={{ height: 136, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, i) =>
            item.type === 'seeAll' ? 'see-all' : item.article.id
          }
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_GAP}
          snapToAlignment="start"
          contentContainerStyle={{ paddingLeft: HORIZONTAL_PADDING, paddingRight: 4 }}
          renderItem={({ item }) =>
            item.type === 'seeAll' ? (
              <SeeAllCard onPress={onSeeAll} />
            ) : (
              <NewsCard article={item.article} index={item.index} />
            )
          }
        />
      )}
    </View>
  );
}
