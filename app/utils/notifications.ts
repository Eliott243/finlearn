import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getTipOfDay } from '../data/tips';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyTipNotification(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const tip = getTipOfDay();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💡 Astuce du jour — FinLearn',
      body: tip.text,
      data: { tipId: tip.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 0,
    },
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-tips', {
      name: 'Astuces quotidiennes',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function cancelDailyNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
