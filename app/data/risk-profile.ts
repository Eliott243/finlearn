import type { UserProgress } from './types';

export type RiskProfileType = NonNullable<UserProgress['riskProfile']>;

export interface RiskProfileOption {
  label: string;
  scores: Record<RiskProfileType, number>;
  explanation: string;
}

export interface RiskProfileQuestion {
  id: string;
  question: string;
  options: RiskProfileOption[];
}

export const RISK_PROFILE_QUESTIONS: RiskProfileQuestion[] = [
  {
    id: 'horizon',
    question: 'Quel est votre horizon de placement principal ?',
    options: [
      {
        label: 'Moins de 3 ans',
        scores: { prudent: 3, equilibre: 1, dynamique: 0 },
        explanation:
          'Un horizon court impose une prudence accrue : les marchés actions peuvent baisser sur quelques années.',
      },
      {
        label: '3 à 7 ans',
        scores: { prudent: 1, equilibre: 3, dynamique: 1 },
        explanation:
          'Un horizon moyen permet un mélange épargne sécurisée et investissement progressif.',
      },
      {
        label: 'Plus de 7 ans',
        scores: { prudent: 0, equilibre: 1, dynamique: 3 },
        explanation:
          'Sur le long terme, les fluctuations boursières ont historiquement tendance à se lisser.',
      },
    ],
  },
  {
    id: 'reaction',
    question: 'Si votre portefeuille perdait 20 % en un an, que feriez-vous ?',
    options: [
      {
        label: 'Je vendrais tout pour limiter les pertes',
        scores: { prudent: 3, equilibre: 0, dynamique: 0 },
        explanation:
          'Une forte aversion à la baisse oriente vers des placements moins volatils (livrets, obligations).',
      },
      {
        label: 'J\'attendrais sans rien changer',
        scores: { prudent: 1, equilibre: 3, dynamique: 1 },
        explanation:
          'Accepter la volatilité sans paniquer est une attitude typique d\'un profil équilibré.',
      },
      {
        label: 'J\'en profiterais pour investir davantage',
        scores: { prudent: 0, equilibre: 1, dynamique: 3 },
        explanation:
          'Voir une baisse comme une opportunité suppose une forte tolérance au risque et un long horizon.',
      },
    ],
  },
  {
    id: 'objectif',
    question: 'Quel est votre objectif principal ?',
    options: [
      {
        label: 'Préserver mon capital',
        scores: { prudent: 3, equilibre: 1, dynamique: 0 },
        explanation: 'La préservation du capital privilégie la sécurité plutôt que la performance.',
      },
      {
        label: 'Faire croître mon épargne progressivement',
        scores: { prudent: 1, equilibre: 3, dynamique: 1 },
        explanation:
          'Une croissance modérée combine une part de sécurité et une exposition aux marchés.',
      },
      {
        label: 'Maximiser la performance à long terme',
        scores: { prudent: 0, equilibre: 1, dynamique: 3 },
        explanation:
          'Viser la performance maximale implique d\'accepter des variations importantes.',
      },
    ],
  },
  {
    id: 'experience',
    question: 'Quelle est votre expérience en investissement ?',
    options: [
      {
        label: 'Aucune — je débute',
        scores: { prudent: 2, equilibre: 2, dynamique: 0 },
        explanation:
          'Les débutants gagnent à commencer prudemment pour comprendre les mécanismes avant d\'augmenter le risque.',
      },
      {
        label: 'J\'ai déjà un livret ou une assurance-vie',
        scores: { prudent: 2, equilibre: 2, dynamique: 1 },
        explanation:
          'Une expérience limitée aux produits sécurisés correspond souvent à un profil prudent ou équilibré.',
      },
      {
        label: 'J\'investis déjà en actions ou ETF',
        scores: { prudent: 0, equilibre: 1, dynamique: 3 },
        explanation:
          'Une expérience sur les marchés actions/ETF suggère une tolérance au risque plus élevée.',
      },
    ],
  },
  {
    id: 'revenus',
    question: 'Comment décririez-vous la stabilité de vos revenus ?',
    options: [
      {
        label: 'Variables ou incertains',
        scores: { prudent: 3, equilibre: 1, dynamique: 0 },
        explanation:
          'Des revenus instables justifient une épargne de précaution solide avant tout investissement risqué.',
      },
      {
        label: 'Relativement stables',
        scores: { prudent: 1, equilibre: 3, dynamique: 1 },
        explanation:
          'Des revenus stables permettent d\'envisager une allocation plus diversifiée.',
      },
      {
        label: 'Très stables et prévisibles',
        scores: { prudent: 0, equilibre: 2, dynamique: 2 },
        explanation:
          'Une situation financière stable offre plus de marge pour supporter la volatilité des marchés.',
      },
    ],
  },
  {
    id: 'allocation',
    question: 'Quelle répartition vous semble la plus confortable ?',
    options: [
      {
        label: '80 % sécurisé / 20 % actions',
        scores: { prudent: 3, equilibre: 1, dynamique: 0 },
        explanation:
          'Une forte part en actifs sécurisés correspond à un profil prudent.',
      },
      {
        label: '50 % sécurisé / 50 % actions',
        scores: { prudent: 0, equilibre: 3, dynamique: 1 },
        explanation:
          'Un partage égal entre sécurité et dynamisme est typique d\'un profil équilibré.',
      },
      {
        label: '20 % sécurisé / 80 % actions',
        scores: { prudent: 0, equilibre: 0, dynamique: 3 },
        explanation:
          'Une allocation majoritairement en actions reflète un profil dynamique.',
      },
    ],
  },
];

export const RISK_PROFILE_DETAILS: Record<
  RiskProfileType,
  { title: string; emoji: string; description: string; traits: string[]; suggestions: string[] }
> = {
  prudent: {
    title: 'Profil prudent',
    emoji: '🛡️',
    description:
      'Vous privilégiez la sécurité et la stabilité. Vous préférez limiter les fluctuations de votre épargne, même si cela signifie un rendement plus modeste.',
    traits: [
      'Faible tolérance aux pertes temporaires',
      'Horizon court à moyen terme',
      'Priorité à la préservation du capital',
    ],
    suggestions: [
      'Constituer une épargne de précaution solide (3 à 6 mois)',
      'Privilégier livrets réglementés et fonds euros',
      'N\'investir en actions qu\'après avoir sécurisé vos bases',
    ],
  },
  equilibre: {
    title: 'Profil équilibré',
    emoji: '⚖️',
    description:
      'Vous cherchez un compromis entre sécurité et performance. Vous acceptez une volatilité modérée pour faire croître votre épargne sur le moyen-long terme.',
    traits: [
      'Tolérance modérée à la volatilité',
      'Horizon moyen à long terme',
      'Recherche de diversification',
    ],
    suggestions: [
      'Maintenir une épargne de précaution avant d\'investir',
      'Envisager un mix obligations / ETF diversifiés',
      'Investir régulièrement (DCA) pour lisser les fluctuations',
    ],
  },
  dynamique: {
    title: 'Profil dynamique',
    emoji: '🚀',
    description:
      'Vous acceptez une forte volatilité en échange d\'un potentiel de rendement plus élevé sur le long terme. Les baisses temporaires ne vous font pas paniquer.',
    traits: [
      'Forte tolérance aux fluctuations',
      'Horizon long terme (7 ans+)',
      'Orientation performance et croissance',
    ],
    suggestions: [
      'Garder tout de même une épargne de précaution',
      'Diversifier géographiquement via des ETF mondiaux',
      'Ne pas investir de l\'argent nécessaire à court terme',
    ],
  },
};

export function computeRiskProfile(
  answers: Record<string, number>
): RiskProfileType {
  const totals: Record<RiskProfileType, number> = {
    prudent: 0,
    equilibre: 0,
    dynamique: 0,
  };

  RISK_PROFILE_QUESTIONS.forEach((question) => {
    const optionIndex = answers[question.id];
    if (optionIndex === undefined) return;
    const option = question.options[optionIndex];
    if (!option) return;
    totals.prudent += option.scores.prudent;
    totals.equilibre += option.scores.equilibre;
    totals.dynamique += option.scores.dynamique;
  });

  const entries = Object.entries(totals) as [RiskProfileType, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}
