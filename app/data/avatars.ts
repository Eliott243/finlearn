export type AvatarId =
  | 'badge_boss_tontine'
  | 'badge_streak_feu'
  | 'badge_sage_etf'
  | 'badge_credit_dette'
  | 'badge_inflation_maitre'
  | 'badge_budget_pro'
  | 'badge_epargne_pilier';

export type AvatarCondition =
  | { type: 'tontine_simulation' }
  | { type: 'streak'; days: number }
  | { type: 'module_quiz_min'; moduleId: string; minScore: number }
  | { type: 'module_passed'; moduleId: string };

export interface AvatarDefinition {
  id: AvatarId;
  name: string;
  /** Nom du fichier PNG dans assets/avatars/ (sans chemin) */
  imageKey?: string;
  fallbackEmoji: string;
  condition: AvatarCondition;
  unlockHint: string;
}

export const AVATARS: AvatarDefinition[] = [
  {
    id: 'badge_boss_tontine',
    name: 'Boss de la Tontine',
    imageKey: 'badge_boss_tontine.png',
    fallbackEmoji: '🤝',
    condition: { type: 'tontine_simulation' },
    unlockHint: 'Termine une simulation de tontine pour débloquer',
  },
  {
    id: 'badge_streak_feu',
    name: 'Feu de Série',
    imageKey: 'badge_streak_feu.png',
    fallbackEmoji: '🔥',
    condition: { type: 'streak', days: 7 },
    unlockHint: 'Atteins 7 jours de série consécutifs',
  },
  {
    id: 'badge_sage_etf',
    name: "Sage de l'ETF",
    imageKey: 'badge_sage_etf.png',
    fallbackEmoji: '🎓',
    condition: { type: 'module_quiz_min', moduleId: 'n3-etf', minScore: 80 },
    unlockHint: "Valide le module ETF avec 80 % au quiz",
  },
  {
    id: 'badge_credit_dette',
    name: 'Maître du Crédit',
    fallbackEmoji: '💳',
    condition: { type: 'module_passed', moduleId: 'n1-credit-dette' },
    unlockHint: 'Termine le module Crédit & dette',
  },
  {
    id: 'badge_inflation_maitre',
    name: "Chasseur d'Inflation",
    fallbackEmoji: '💸',
    condition: { type: 'module_passed', moduleId: 'n2-inflation' },
    unlockHint: "Termine le module Impact de l'inflation",
  },
  {
    id: 'badge_budget_pro',
    name: 'Pro du Budget',
    fallbackEmoji: '📝',
    condition: { type: 'module_passed', moduleId: 'n1-budget' },
    unlockHint: 'Termine le module Budget',
  },
  {
    id: 'badge_epargne_pilier',
    name: 'Pilier Épargne',
    fallbackEmoji: '🛡️',
    condition: { type: 'module_passed', moduleId: 'n1-epargne-precaution' },
    unlockHint: "Termine le module Épargne de précaution",
  },
];

export const AVATAR_IMAGES: Partial<Record<AvatarId, number>> = {
  badge_boss_tontine: require('../../assets/avatars/badge_boss_tontine.png'),
  badge_streak_feu: require('../../assets/avatars/badge_streak_feu.png'),
  badge_sage_etf: require('../../assets/avatars/badge_sage_etf.png'),
};

export function getAvatarById(id: AvatarId): AvatarDefinition {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
