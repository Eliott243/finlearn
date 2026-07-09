export interface ETFLearningStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ETF_READING_STEPS: ETFLearningStep[] = [
  {
    id: 'index',
    title: 'Indice répliqué',
    description:
      'Vérifiez quel marché l\'ETF couvre (MSCI World, S&P 500…). C\'est le facteur n°1 de votre exposition géographique et sectorielle.',
    icon: '🌍',
  },
  {
    id: 'ter',
    title: 'TER (frais annuels)',
    description:
      'Le Total Expense Ratio indique les frais prélevés chaque année. Plus il est bas, moins il grignote votre rendement sur le long terme.',
    icon: '💰',
  },
  {
    id: 'replication',
    title: 'Type de réplication',
    description:
      'Physique = le fonds achète les titres. Synthétique = utilise des produits dérivés. La réplication physique est plus transparente pour débuter.',
    icon: '🔄',
  },
  {
    id: 'region',
    title: 'Zone géographique',
    description:
      'Combien de pays et de secteurs sont couverts ? Un ETF monde diversifie plus qu\'un ETF concentré sur un seul pays.',
    icon: '🗺️',
  },
  {
    id: 'isin',
    title: 'ISIN et nom',
    description:
      'L\'ISIN identifie le produit de manière unique. Utilisez-le pour éviter les confusions entre fonds au nom similaire.',
    icon: '🔖',
  },
];

export const ETF_SHEET_QUIZ = [
  {
    id: 'etf-q1',
    question: 'Quel élément impacte directement le rendement net d\'un ETF ?',
    options: ['Le nom du fonds', 'Le TER', 'La couleur du logo', 'Le jour d\'achat'],
    correctIndex: 1,
    explanation:
      'Le TER (frais annuels) est déduit chaque année de la performance. Un TER de 0,20 % coûte 20 € par an pour 10 000 € investis.',
  },
  {
    id: 'etf-q2',
    question: 'Que signifie une réplication « physique » ?',
    options: [
      'Le fonds achète réellement les titres de l\'indice',
      'Le fonds garantit un rendement fixe',
      'Le fonds n\'investit que dans l\'immobilier',
      'Le fonds est sans frais',
    ],
    correctIndex: 0,
    explanation:
      'La réplication physique signifie que le gestionnaire détient les actions ou obligations de l\'indice (ou un échantillon).',
  },
  {
    id: 'etf-q3',
    question: 'Pourquoi comparer l\'indice répliqué entre deux ETF ?',
    options: [
      'Pour connaître le prix de l\'action Apple',
      'Pour savoir quels marchés et entreprises vous exposez',
      'Pour calculer vos impôts',
      'Pour connaître la date de dividende',
    ],
    correctIndex: 1,
    explanation:
      'L\'indice détermine votre exposition : un S&P 500 = États-Unis, un MSCI World = monde développé.',
  },
];
