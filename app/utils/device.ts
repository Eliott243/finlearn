import { Platform } from 'react-native';
import Constants from 'expo-constants';

/** iPhone Simulator cannot reliably run the Reanimated globe intro in Expo Go. */
export function isIosSimulator(): boolean {
  if (Platform.OS !== 'ios') return false;
  return Constants.platform?.ios?.simulator === true;
}
