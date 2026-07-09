import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ModulesStackParamList } from '../data/types';
import { ModulesScreen } from '../screens/ModulesScreen';
import { ModuleDetailScreen } from '../screens/ModuleDetailScreen';
import { LessonDetailScreen } from '../screens/LessonDetailScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { getModuleById } from '../data/modules';
import { Colors } from '../constants/colors';

const Stack = createNativeStackNavigator<ModulesStackParamList>();

export function ModulesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerShadowVisible: false,
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="Modules"
        component={ModulesScreen}
        options={{ title: 'Parcours' }}
      />
      <Stack.Screen
        name="ModuleDetail"
        component={ModuleDetailScreen}
        options={({ route }) => ({
          title: getModuleById(route.params.moduleId)?.title ?? 'Module',
        })}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ title: 'Leçon' }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Quiz' }}
      />
    </Stack.Navigator>
  );
}
