import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components';
import { useNews } from '../context/NewsContext';
import { formatNewsDate } from '../services/news';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

export function NewsScreen() {
  const { articles, loading, refreshing, error, offline, lastUpdate, refresh } = useNews();

  const openArticle = (url: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  if (loading && articles.length === 0) {
    return (
      <View style={[layout.screen, layout.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 32 }]}
      data={articles}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={Colors.primary}
        />
      }
      ListHeaderComponent={
        <View style={{ marginBottom: 12 }}>
          <Text style={[text.bodySmall, { lineHeight: 22, marginBottom: 8 }]}>
            Titres et accroches des flux RSS — l'article complet s'ouvre dans votre navigateur.
          </Text>
          {lastUpdate && (
            <Text style={text.caption}>
              {offline ? 'Hors ligne — ' : ''}Dernière mise à jour : {formatNewsDate(lastUpdate)}
            </Text>
          )}
          {error && articles.length === 0 && (
            <Card style={{ marginTop: 12, backgroundColor: 'rgba(196,92,92,0.08)' }}>
              <Text style={{ color: Colors.danger }}>{error}</Text>
              <TouchableOpacity onPress={refresh} style={{ marginTop: 8 }}>
                <Text style={[text.body, text.primary, { fontWeight: '600' }]}>Réessayer</Text>
              </TouchableOpacity>
            </Card>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <Card style={{ marginBottom: 12 }}>
          <Text style={[text.label, { color: Colors.primary, marginBottom: 4 }]}>{item.source}</Text>
          <Text style={[text.body, { fontWeight: '700', lineHeight: 22 }]}>{item.title}</Text>
          {item.excerpt ? (
            <Text style={[text.bodySmall, { marginTop: 8, lineHeight: 20 }]} numberOfLines={3}>
              {item.excerpt}
            </Text>
          ) : null}
          <Text style={[text.caption, { marginTop: 8 }]}>{formatNewsDate(item.publishedAt)}</Text>
          <TouchableOpacity
            onPress={() => openArticle(item.url)}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}
          >
            <Text style={[text.bodySmall, text.primary, { fontWeight: '600' }]}>Lire l'article</Text>
            <Ionicons name="open-outline" size={16} color={Colors.primary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </Card>
      )}
      ListEmptyComponent={
        !loading ? (
          <Text style={[text.bodySmall, { textAlign: 'center', marginTop: 24 }]}>
            Aucun article disponible pour le moment.
          </Text>
        ) : null
      }
    />
  );
}
