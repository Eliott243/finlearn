import type { Lesson } from './types';
import { section } from './content-helpers';

export const LESSON_SUPPLEMENTS: Record<string, Lesson[]> = {
  'n1-epargne-precaution': [
    {
      id: 'n1-epargne-precaution-l4',
      title: 'Où placer son épargne de précaution',
      duration: '4 min',
      illustration: '🏦',
      content: [
        section('intro', 'L\'épargne de précaution doit rester accessible et sûre — pas investie en actions.'),
        section('example', 'Livret A, LDDS ou compte épargne à taux garanti : en France, jusqu\'à 22 950 € sur le Livret A. En zone UEMOA, vérifiez les offres bancaires locales et mobile money sécurisé.'),
        section('key', 'Priorité : liquidité (retrait sous 48 h) et capital garanti. Le rendement est secondaire.'),
        section('transition', 'Vous maîtrisez l\'épargne de précaution. Passez au budget pour structurer vos dépenses.'),
      ],
      summary: 'Placez l\'épargne de précaution sur un support liquide et garanti, pas en bourse.',
    },
  ],
  'n1-budget': [
    {
      id: 'n1-budget-l4',
      title: 'Ajuster son budget dans le temps',
      duration: '3 min',
      illustration: '📊',
      content: [
        section('intro', 'Un budget n\'est pas figé : il évolue avec votre vie (salaire, famille, projets).'),
        section('example', 'Chaque trimestre, comparez budget prévu vs réel. Si les courses dépassent de 15 % trois mois de suite, augmentez l\'enveloppe courses et réduisez les loisirs.'),
        section('key', 'L\'objectif n\'est pas la perfection mais la visibilité et l\'ajustement progressif.'),
        section('transition', 'Budget maîtrisé — automatisez votre épargne pour ne plus dépendre de la volonté.'),
      ],
      summary: 'Revoyez votre budget chaque trimestre et ajustez les enveloppes selon la réalité.',
    },
  ],
  'n1-automatisation': [
    {
      id: 'n1-automatisation-l3',
      title: 'Augmenter progressivement son épargne',
      duration: '4 min',
      illustration: '📈',
      content: [
        section('intro', 'Commencer petit puis augmenter régulièrement est plus durable qu\'un gros effort ponctuel.'),
        section('example', 'Règle des +10 % : chaque année, augmentez votre virement automatique de 10 %. De 100 € à 110 €, puis 121 € — imperceptible mais puissant sur 10 ans.'),
        section('key', 'Synchronisez l\'augmentation avec une hausse de salaire ou une dépense supprimée (abonnement résilié).'),
        section('transition', 'Prochaine étape : comprendre le crédit pour éviter les pièges de la dette.'),
      ],
      summary: 'Augmentez votre épargne automatique de 10 % par an ou à chaque hausse de revenus.',
    },
    {
      id: 'n1-automatisation-l4',
      title: 'Pièges à éviter avec l\'automatisation',
      duration: '3 min',
      illustration: '⚠️',
      content: [
        section('intro', 'L\'automatisation aide, mais mal configurée elle peut créer des découverts.'),
        section('example', 'Si votre virement épargne tombe avant le salaire ou en cas de mois difficile, vous risquez des agios. Gardez une marge sur le compte courant.'),
        section('key', 'Vérifiez vos soldes après chaque virement automatique les 3 premiers mois.'),
        section('transition', 'Vous êtes prêt pour explorer le crédit et la gestion de la dette.'),
      ],
      summary: 'Surveillez les soldes après les virements automatiques pour éviter le découvert.',
    },
  ],
  'n2-risque-rendement': [
    {
      id: 'n2-risque-rendement-l4',
      title: 'Votre horizon de placement',
      duration: '4 min',
      illustration: '⏳',
      content: [
        section('intro', 'Plus votre horizon est long, plus vous pouvez accepter de volatilité à court terme.'),
        section('example', 'À 25 ans pour la retraite, une baisse de 20 % du marché est gérable. À 2 ans d\'un achat immobilier, ce n\'est pas le cas.'),
        section('key', 'Horizon court = placements prudents. Horizon long = diversification actions possible.'),
        section('transition', 'Reliez risque et horizon avant de passer aux intérêts composés.'),
      ],
      summary: 'Adaptez le niveau de risque à la date à laquelle vous aurez besoin de l\'argent.',
    },
  ],
  'n2-interets-composes': [
    {
      id: 'n2-interets-composes-l4',
      title: 'Intérêts composés et inflation',
      duration: '4 min',
      illustration: '🔄',
      content: [
        section('intro', 'Les intérêts composés travaillent pour vous, mais l\'inflation peut grignoter le résultat réel.'),
        section('example', '7 % brut sur 20 ans avec 3 % d\'inflation ≈ 4 % réel. Utilisez le simulateur d\'inflation dans Outils pour visualiser.'),
        section('key', 'Pensez toujours en pouvoir d\'achat, pas seulement en euros nominaux.'),
        section('transition', 'Approfondissons l\'impact de l\'inflation sur votre épargne.'),
      ],
      summary: 'Soustrayez l\'inflation du rendement pour connaître votre gain réel.',
    },
  ],
  'n2-inflation': [
    {
      id: 'n2-inflation-l4',
      title: 'Protéger son épargne de l\'inflation',
      duration: '4 min',
      illustration: '🛡️',
      content: [
        section('intro', 'L\'épargne non investie perd du pouvoir d\'achat chaque année.'),
        section('example', 'À 4 % d\'inflation, 10 000 € valent l\'équivalent de 6 756 € en pouvoir d\'achat après 10 ans s\'ils dorment sur un compte à 0 %.'),
        section('key', 'Épargne de précaution d\'abord, puis placements diversifiés pour battre l\'inflation sur le long terme.'),
        section('transition', 'Niveau 2 validé ? Passez au niveau 3 pour les ETF et l\'investissement.'),
      ],
      summary: 'Investir prudemment sur le long terme est une réponse à l\'érosion inflationniste.',
    },
  ],
  'n3-etf': [
    {
      id: 'n3-etf-l4',
      title: 'Acheter son premier ETF',
      duration: '5 min',
      illustration: '🛒',
      content: [
        section('intro', 'Un ETF s\'achète comme une action via un courtier ou une banque en ligne.'),
        section('example', 'Ouvrez un PEA ou CTO, déposez des fonds, recherchez le ticker (ex. CW8 pour MSCI World), passez un ordre au marché ou limité.'),
        section('key', 'Vérifiez les frais de courtage, le TER de l\'ETF et la devise du fonds avant d\'acheter.'),
        section('transition', 'Découvrez les enveloppes fiscales pour optimiser votre investissement.'),
      ],
      summary: 'Achetez un ETF via un courtier en vérifiant frais, TER et enveloppe fiscale adaptée.',
    },
  ],
  'n3-enveloppes': [
    {
      id: 'n3-enveloppes-l4',
      title: 'Choisir entre PEA, CTO et assurance-vie',
      duration: '5 min',
      illustration: '📋',
      content: [
        section('intro', 'Chaque enveloppe a des règles fiscales et des frais différents.'),
        section('example', 'PEA : actions européennes, exonération après 5 ans. CTO : tout actif, imposé chaque année. Assurance-vie : transmission avantageuse.'),
        section('key', 'Commencez souvent par un PEA pour les ETF actions, complétez selon vos objectifs.'),
        section('transition', 'Apprenez à lire une fiche ETF avant d\'investir.'),
      ],
      summary: 'PEA pour ETF actions long terme, assurance-vie pour transmission, CTO pour flexibilité totale.',
    },
  ],
  'n3-fiche-etf': [
    {
      id: 'n3-fiche-etf-l4',
      title: 'Comparer deux ETF similaires',
      duration: '4 min',
      illustration: '⚖️',
      content: [
        section('intro', 'Deux ETF sur le même indice peuvent différer par le TER, la réplication et la taille.'),
        section('example', 'MSCI World : comparez TER (0,12 % vs 0,38 %), encours (liquidité) et méthode de réplication (physique vs synthétique).'),
        section('key', 'À indice égal, privilégiez le TER le plus bas et un encours confortable (> 100 M€).'),
        section('transition', 'Terminez par la diversification pour assembler un portefeuille cohérent.'),
      ],
      summary: 'Comparez TER, encours et réplication pour choisir entre ETF similaires.',
    },
  ],
  'n3-diversification': [
    {
      id: 'n3-diversification-l4',
      title: 'Construire un portefeuille simple',
      duration: '5 min',
      illustration: '🎯',
      content: [
        section('intro', 'Un portefeuille débutant peut tenir en 2-3 ETF : monde, émergents, obligations.'),
        section('example', 'Profil équilibré : 70 % MSCI World + 20 % émergents + 10 % obligations. Rééquilibrez une fois par an.'),
        section('key', 'La simplicité bat la complexité : moins de lignes = moins de frais et plus de clarté.'),
        section('transition', 'Félicitations ! Validez le quiz final du niveau 3.'),
      ],
      summary: '2-3 ETF bien choisis et un rééquilibrage annuel suffisent pour débuter.',
    },
  ],
};

export function applyLessonSupplements<T extends { id: string; lessons: Lesson[] }>(module: T): T {
  const extra = LESSON_SUPPLEMENTS[module.id];
  if (!extra?.length) return module;
  return { ...module, lessons: [...module.lessons, ...extra] };
}
