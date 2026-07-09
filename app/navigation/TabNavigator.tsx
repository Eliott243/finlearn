import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { TabParamList } from '../data/types';
import { Colors } from '../constants/colors';
import { HomeStack } from './HomeStack';
import { ModulesStack } from './ModulesStack';
import { ToolsStack } from './ToolsStack';
import { ProfileStack } from './ProfileStack';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<
  keyof TabParamList,
  { outline: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }
> = {
  Accueil: { outline: 'home-outline', filled: 'home' },
  Parcours: { outline: 'book-outline', filled: 'book' },
  Outils: { outline: 'calculator-outline', filled: 'calculator' },
  Profil: { outline: 'person-outline', filled: 'person' },
};

function TabIcon({
  route,
  color,
  focused,
}: {
  route: keyof TabParamList;
  color: string;
  focused: boolean;
}) {
  const icons = TAB_ICONS[route];
  return (
    <View
      style={{
        width: 32,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons
        name={focused ? icons.filled : icons.outline}
        size={24}
        color={color}
      />
    </View>
  );
}

export function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 0 : 8);
  const tabBarHeight = 52 + bottomInset;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarIcon: ({ color, focused }) => (
          <TabIcon route={route.name as keyof TabParamList} color={color} focused={focused} />
        ),
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingTop: 6,
          paddingBottom: bottomInset,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 0,
          marginBottom: Platform.OS === 'ios' ? 2 : 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Parcours" component={ModulesStack} />
      <Tab.Screen name="Outils" component={ToolsStack} />
      <Tab.Screen name="Profil" component={ProfileStack} />
    </Tab.Navigator>
  );
}
