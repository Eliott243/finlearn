import type { ETFSheet } from './types';

export const etfSheets: ETFSheet[] = [
  {
    id: 'etf-world',
    name: 'ETF Monde (MSCI World)',
    index: 'MSCI World',
    replicationType: 'Physique (échantillonnage)',
    ter: '0,20 %',
    region: 'Monde développé (~1 500 entreprises)',
    description:
      'Réplique les grandes entreprises des pays développés. Idéal pour une exposition globale diversifiée.',
    termDefinitions: {
      'MSCI World': 'Indice regroupant les grandes capitalisations de 23 pays développés.',
      'Réplication physique': 'Le fonds achète réellement les titres composant l\'indice.',
      TER: 'Total Expense Ratio — frais annuels prélevés par le gestionnaire du fonds.',
    },
  },
  {
    id: 'etf-sp500',
    name: 'ETF S&P 500',
    index: 'S&P 500',
    replicationType: 'Physique (complète)',
    ter: '0,07 %',
    region: 'États-Unis (500 grandes entreprises)',
    description:
      'Expose aux 500 plus grandes entreprises américaines. Concentré sur un seul marché.',
    termDefinitions: {
      'S&P 500': 'Indice des 500 plus grandes capitalisations cotées aux États-Unis.',
      'Réplication complète': 'Le fonds détient tous les titres de l\'indice.',
      TER: 'Frais annuels de gestion, plus le TER est bas, moins il impacte le rendement.',
    },
  },
  {
    id: 'etf-europe',
    name: 'ETF Europe (STOXX 600)',
    index: 'STOXX Europe 600',
    replicationType: 'Physique (échantillonnage)',
    ter: '0,18 %',
    region: 'Europe (600 entreprises)',
    description:
      'Couvre les grandes, moyennes et petites capitalisations européennes.',
    termDefinitions: {
      'STOXX Europe 600': 'Indice des 600 plus grandes entreprises européennes.',
      'Échantillonnage': 'Le fonds détient un échantillon représentatif plutôt que tous les titres.',
      TER: 'Frais prélevés chaque année, déduits automatiquement de la valeur du fonds.',
    },
  },
  {
    id: 'etf-obligataire',
    name: 'ETF Obligataire Euro',
    index: 'Bloomberg Euro Aggregate',
    replicationType: 'Physique (complète)',
    ter: '0,09 %',
    region: 'Zone euro (obligations d\'État et d\'entreprise)',
    description:
      'Investit dans des obligations émises en euros. Moins volatile que les actions, rendement plus modéré.',
    termDefinitions: {
      Obligation: 'Titre de dette : vous prêtez de l\'argent à un État ou une entreprise contre des intérêts.',
      'Bloomberg Euro Aggregate': 'Indice d\'obligations libellées en euros, État et entreprises.',
      TER: 'Impact direct sur le rendement net : 0,09 % = 9 € de frais pour 10 000 € investis par an.',
    },
  },
  {
    id: 'etf-emerging',
    name: 'ETF Marchés émergents',
    index: 'MSCI Emerging Markets',
    replicationType: 'Physique (échantillonnage)',
    ter: '0,18 %',
    region: 'Marchés émergents (Chine, Inde, Brésil…)',
    description:
      'Expose aux économies en développement. Potentiel de croissance plus élevé, mais plus volatile.',
    termDefinitions: {
      'Marchés émergents': 'Économies en développement rapide (hors pays développés).',
      Volatilité: 'Amplitude des variations de prix — plus élevée sur les marchés émergents.',
      TER: 'Frais de gestion annuels, à comparer entre fonds similaires.',
    },
  },
];

export function getETFById(id: string) {
  return etfSheets.find((e) => e.id === id);
}
