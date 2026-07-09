/** Conseils Mobile Money Ready par leçon (modules épargne / budget / mobile) */
export const MOBILE_MONEY_LESSON_IDS = new Set([
  'n1-epargne-precaution-l1', 'n1-epargne-precaution-l2', 'n1-epargne-precaution-l3',
  'n1-budget-l1', 'n1-budget-l2', 'n1-budget-l3',
  'n1-automatisation-l1', 'n1-automatisation-l2',
  'n1-mobile-money-l1', 'n1-mobile-money-l2', 'n1-mobile-money-l3',
  'n1-budget-zero-l1', 'n1-budget-zero-l2', 'n1-budget-zero-l3', 'n1-budget-zero-l4',
  'n1-frais-bancaires-l1', 'n1-frais-bancaires-l2', 'n1-frais-bancaires-l3',
]);

export const MOBILE_MONEY_TIPS: Record<string, string> = {
  'n1-epargne-precaution-l1':
    'Sur Wave ou Orange Money, crée une étiquette « Urgences » et vire ta première épargne de précaution dès aujourd\'hui — même 5 000 FCFA.',
  'n1-epargne-precaution-l2':
    'Calcule 3 mois de dépenses en FCFA, divise par 6 et programme un virement mobile money automatique de ce montant chaque mois.',
  'n1-epargne-precaution-l3':
    'Ne laisse pas toute ton épargne de précaution sur mobile money : transfère l\'excédent vers un livret ou compte séparé si disponible.',
  'n1-budget-l1':
    'Exporte ton historique mobile money du mois dernier : c\'est souvent la base la plus fiable pour commencer un budget.',
  'n1-budget-l2':
    'Crée 3 étiquettes dans ton app mobile money : Besoins, Envies, Épargne — et classe chaque dépense pendant 30 jours.',
  'n1-budget-l3':
    'Active les notifications de dépense sur ton mobile money : chaque alerte est une opportunité de noter la dépense.',
  'n1-automatisation-l1':
    'Programme un virement récurrent mobile money vers un compte « épargne » le jour de réception de ton salaire.',
  'n1-automatisation-l2':
    'Si ton opérateur le permet, active l\'arrondi automatique sur chaque paiement pour micro-épargner sans effort.',
  'n1-mobile-money-l1':
    'Avant de rejoindre une tontine digitale, vérifie l\'identité des participants et fixez les règles par écrit dans le groupe.',
  'n1-mobile-money-l2':
    'Utilise le simulateur de tontine (Outils) pour choisir ton rang selon ton besoin réel de liquidité.',
  'n1-mobile-money-l3':
    'Ne mélange jamais argent personnel et cagnotte tontine sur le même compte mobile money.',
  'n1-budget-zero-l1':
    'Liste tous tes revenus mobile money du mois dernier, puis assigne chaque franc à une catégorie avant le 1er.',
  'n1-budget-zero-l2':
    'Crée une enveloppe mobile money « reste à vivre » avec le solde exact après épargne et factures fixes.',
  'n1-budget-zero-l3':
    'En fin de mois, redirige le surplus de chaque enveloppe vers l\'épargne ou la dette — zéro euro sans mission.',
  'n1-budget-zero-l4':
    'Révise ton budget zero-based chaque mois : 15 min avec ton relevé mobile money suffisent.',
  'n1-frais-bancaires-l1':
    'Dans ton historique mobile money, filtre les lignes « frais » ou « commission » du dernier mois — souvent une surprise.',
  'n1-frais-bancaires-l2':
    'Compare le coût d\'un retrait ATM vs paiement marchand : parfois le paiement direct est gratuit.',
  'n1-frais-bancaires-l3':
    'Pour les transferts internationaux, compare Western Money, Wave et les banques — les écarts peuvent atteindre 5 %.',
  'n1-inflation-devises-l1':
    'Utilisez le calculateur d\'inflation (Outils) avec vos montants en FCFA pour voir l\'impact sur votre épargne.',
  'n1-inflation-devises-l3':
    'Comparez Wave et les transferts bancaires sur un même montant — notez le FCFA net reçu.',
  'n1-epargne-precaution-l4':
    'Gardez 1 mois d\'épargne de précaution sur mobile money liquide, le reste sur un support plus sécurisé.',
  'n1-automatisation-l3':
    'Augmentez votre virement mobile money de 10 % chaque année, le jour de votre anniversaire professionnel.',
};

export function getMobileMoneyTip(lessonId: string): string | null {
  return MOBILE_MONEY_TIPS[lessonId] ?? null;
}

export function isMobileMoneyReadyModule(moduleId: string): boolean {
  return [
    'n1-epargne-precaution',
    'n1-budget',
    'n1-automatisation',
    'n1-mobile-money',
    'n1-budget-zero',
    'n1-frais-bancaires',
    'n1-inflation-devises',
  ].includes(moduleId);
}
