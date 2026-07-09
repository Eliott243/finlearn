import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Parrainage MVP — stockage local uniquement.
 *
 * TODO backend : valider les codes côté serveur, lier parrain/filleul,
 * débloquer les récompenses des deux utilisateurs après inscription confirmée.
 * Le code actuel sert uniquement au partage ; aucune validation n'est effectuée.
 */

const REFERRAL_KEY = '@finlearn_referral_code';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'FL-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function getOrCreateReferralCode(): Promise<string> {
  try {
    const existing = await AsyncStorage.getItem(REFERRAL_KEY);
    if (existing) return existing;

    const code = generateCode();
    await AsyncStorage.setItem(REFERRAL_KEY, code);
    return code;
  } catch {
    return generateCode();
  }
}

export function getReferralShareMessage(code: string): string {
  return (
    `Rejoins-moi sur FinLearn pour apprendre l'épargne et l'investissement ! ` +
    `Utilise mon code de parrainage : ${code}\n\n` +
    `FinLearn — contenu éducatif, pas un conseil en investissement.`
  );
}
