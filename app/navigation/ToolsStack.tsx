import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ToolsStackParamList } from '../data/types';
import { ToolsScreen } from '../screens/ToolsScreen';
import { CompoundInterestScreen } from '../screens/CompoundInterestScreen';
import { TontineSimulatorScreen } from '../screens/TontineSimulatorScreen';
import { InflationCalculatorScreen } from '../screens/InflationCalculatorScreen';
import { ExchangeRatesScreen } from '../screens/ExchangeRatesScreen';
import { RiskProfileScreen } from '../screens/RiskProfileScreen';
import { ETFSheetsScreen } from '../screens/ETFSheetsScreen';
import { ETFSheetDetailScreen } from '../screens/ETFSheetDetailScreen';
import { getETFById } from '../data/etf-sheets';
import { Colors } from '../constants/colors';

const Stack = createNativeStackNavigator<ToolsStackParamList>();

export function ToolsStack() {
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
        name="Tools"
        component={ToolsScreen}
        options={{ title: 'Outils' }}
      />
      <Stack.Screen
        name="CompoundInterest"
        component={CompoundInterestScreen}
        options={{ title: 'Intérêts composés' }}
      />
      <Stack.Screen
        name="TontineSimulator"
        component={TontineSimulatorScreen}
        options={{ title: 'Tontine digitale' }}
      />
      <Stack.Screen
        name="InflationCalculator"
        component={InflationCalculatorScreen}
        options={{ title: 'Impact inflation' }}
      />
      <Stack.Screen
        name="ExchangeRates"
        component={ExchangeRatesScreen}
        options={{ title: 'Taux de change' }}
      />
      <Stack.Screen
        name="RiskProfile"
        component={RiskProfileScreen}
        options={{ title: 'Profil de risque' }}
      />
      <Stack.Screen
        name="ETFSheets"
        component={ETFSheetsScreen}
        options={{ title: 'Fiches ETF' }}
      />
      <Stack.Screen
        name="ETFSheetDetail"
        component={ETFSheetDetailScreen}
        options={({ route }) => ({
          title: getETFById(route.params.etfId)?.name ?? 'Fiche ETF',
        })}
      />
    </Stack.Navigator>
  );
}
