import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../data/types';
import { HomeScreen } from '../screens/HomeScreen';
import { TipsLibraryScreen } from '../screens/TipsLibraryScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { NewsProvider } from '../context/NewsContext';
import { Colors } from '../constants/colors';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <NewsProvider>
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerShadowVisible: false,
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="TipsLibrary"
        component={TipsLibraryScreen}
        options={{ title: 'Bibliothèque d\'astuces' }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'Actualité' }}
      />
    </Stack.Navigator>
    </NewsProvider>
  );
}
