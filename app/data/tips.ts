export type TipCategory = 'epargne' | 'dette' | 'investissement' | 'budget';

export interface Tip {
  id: string;
  category: TipCategory;
  text: string;
}

export const TIP_CATEGORY_LABELS: Record<TipCategory, string> = {
  epargne: 'Épargne',
  dette: 'Dette',
  investissement: 'Investissement',
  budget: 'Budget',
};

export const TIPS: Tip[] = [
  { id: 't1', category: 'budget', text: 'Avant une envie de plus de 30 €, attends 48 h : la moitié des achats impulsifs disparaissent.' },
  { id: 't2', category: 'epargne', text: 'Programme un virement automatique le jour de ta paie, même 25 € : la régularité bat le montant.' },
  { id: 't3', category: 'dette', text: 'Rembourse d\'abord la dette au taux d\'intérêt le plus élevé — chaque euro évité en intérêts est un gain net.' },
  { id: 't4', category: 'budget', text: 'Note tes dépenses 7 jours sans juger. La prise de conscience précède toujours le changement.' },
  { id: 't5', category: 'investissement', text: 'Ne investis jamais de l\'argent dont tu pourrais avoir besoin dans les 3 prochaines années.' },
  { id: 't6', category: 'epargne', text: 'Sépare ton compte courant de ton épargne : ce que tu ne vois pas, tu le dépenses moins.' },
  { id: 't7', category: 'dette', text: 'Un crédit à la consommation pour un voyage ou un téléphone coûte souvent 2× le prix affiché.' },
  { id: 't8', category: 'budget', text: 'La règle des 3 enveloppes : besoins, envies, épargne. Ajuste les % à ta réalité, pas l\'inverse.' },
  { id: 't9', category: 'investissement', text: 'Compare toujours le TER d\'un ETF avant d\'acheter : 0,5 % de différence = des milliers d\'euros sur 20 ans.' },
  { id: 't10', category: 'epargne', text: 'Ton épargne de précaution doit couvrir 3 à 6 mois de dépenses essentielles, pas de loisirs.' },
  { id: 't11', category: 'budget', text: 'Revoyez vos abonnements chaque trimestre : un service à 9,99 €/mois = 120 €/an.' },
  { id: 't12', category: 'dette', text: 'Négocier son découvert ou son taux de crédit est possible — une simple demande peut économiser des centaines d\'euros.' },
  { id: 't13', category: 'investissement', text: 'Diversifier ne veut pas dire compliquer : 2-3 ETF bien choisis suffisent pour débuter.' },
  { id: 't14', category: 'epargne', text: 'Via mobile money : crée un « sous-compte » ou étiquette « épargne » et ne le touche pas.' },
  { id: 't15', category: 'budget', text: 'Fixe un plafond hebdomadaire pour les sorties et tiens-toi-y avec un compteur visible sur ton téléphone.' },
  { id: 't16', category: 'dette', text: 'Consolider plusieurs petites dettes en une seule n\'est avantageux que si le nouveau taux est plus bas.' },
  { id: 't17', category: 'investissement', text: 'Les marchés baissent régulièrement — c\'est normal. L\'horizon long terme est ton meilleur allié.' },
  { id: 't18', category: 'epargne', text: 'Augmente ton épargne automatique de 5 % chaque année, le jour de ton anniversaire professionnel.' },
  { id: 't19', category: 'budget', text: 'Prépare tes repas le dimanche : économie moyenne de 80-150 €/mois vs livraisons quotidiennes.' },
  { id: 't20', category: 'dette', text: 'Avant de contracter un crédit, calcule le coût total (mensualités × durée) — pas seulement la mensualité.' },
  { id: 't21', category: 'investissement', text: 'L\'inflation grignote ton épargne non investie : 3 %/an sur 10 ans = -26 % de pouvoir d\'achat.' },
  { id: 't22', category: 'epargne', text: 'Dans une tontine, choisis ton rang selon ton besoin réel de liquidité, pas par pression sociale.' },
  { id: 't23', category: 'budget', text: 'Méthode zero-based : chaque euro du salaire a une mission avant le 1er du mois.' },
  { id: 't24', category: 'dette', text: 'Le bon endettement finance un actif (logement, formation). Le mauvais finance une consommation passée.' },
  { id: 't25', category: 'investissement', text: 'Commence par comprendre ton profil de risque avant de choisir un placement.' },
  { id: 't26', category: 'epargne', text: 'Orange Money, Wave, MTN MoMo : active les alertes de solde pour repérer les dépenses qui dérapent.' },
  { id: 't27', category: 'budget', text: 'Paie-toi en premier : transfère l\'épargne avant de payer les factures discrétionnaires.' },
  { id: 't28', category: 'dette', text: 'Si tu ne peux rembourser que le minimum sur ta carte, arrête de l\'utiliser jusqu\'à désendettement.' },
  { id: 't29', category: 'investissement', text: 'Un PEA devient fiscalement intéressant après 5 ans — planifie en conséquence.' },
  { id: 't30', category: 'epargne', text: 'Constitue ton épargne de précaution AVANT d\'investir en bourse, pas l\'inverse.' },
  { id: 't31', category: 'budget', text: 'Utilise des enveloppes numériques (Revolut Vaults, etc.) pour isoler chaque objectif d\'épargne.' },
  { id: 't32', category: 'dette', text: 'Un taux d\'endettement au-delà de 35 % de tes revenus est un signal d\'alerte sérieux.' },
  { id: 't33', category: 'investissement', text: 'Les frais bancaires sur un CTO (dépôt, ordres) s\'accumulent — compare les tarifs avant d\'ouvrir.' },
  { id: 't34', category: 'epargne', text: 'Arrondis automatiques : chaque achat arrondi au supérieur alimente une micro-épargne invisible.' },
  { id: 't35', category: 'budget', text: 'Le budget n\'est pas une punition : c\'est une permission de dépenser sans culpabilité sur ce qui est prévu.' },
  { id: 't36', category: 'dette', text: 'Refinancer un crédit immobilier peut économiser des milliers d\'euros si les taux ont baissé de 0,5 %+.' },
  { id: 't37', category: 'investissement', text: 'Ne suis pas le bruit médiatique sur les marchés : ton plan compte plus que l\'actualité du jour.' },
  { id: 't38', category: 'epargne', text: 'Fixe un objectif chiffré (« 2 000 € d\'ici décembre ») plutôt qu\'un vague « épargner plus ».' },
  { id: 't39', category: 'budget', text: 'Catégorise tes dépenses en fixes (loyer) et variables (courses) — les variables sont là où tu peux agir.' },
  { id: 't40', category: 'dette', text: 'Livret de dettes : liste tout ce que tu dois, le taux et le minimum. La clarté réduit le stress.' },
  { id: 't41', category: 'investissement', text: 'DCA (versements réguliers) réduit le risque d\'investir au pire moment.' },
  { id: 't42', category: 'epargne', text: 'Garde 1 mois d\'épargne sur mobile money liquide, le reste sur un support plus sécurisé si possible.' },
  { id: 't43', category: 'budget', text: 'Prévois une enveloppe « imprévus » de 5-10 % du budget — les surprises ne sont pas des échecs.' },
  { id: 't44', category: 'dette', text: 'Méfie-toi du « paiement en 4 fois sans frais » : il encourage des achats que tu n\'aurais pas faits autrement.' },
  { id: 't45', category: 'investissement', text: 'Lis la fiche ETF avant d\'acheter : indice, TER, zone géographique — 3 minutes qui changent tout.' },
  { id: 't46', category: 'epargne', text: 'Célèbre chaque palier d\'épargne atteint (500 €, 1 000 €…) pour maintenir la motivation.' },
  { id: 't47', category: 'budget', text: 'Compare ton budget réel vs prévu chaque fin de mois — 15 minutes pour éviter les dérives.' },
  { id: 't48', category: 'dette', text: 'Si un proche te demande un prêt, fixe des termes écrits pour préserver la relation.' },
  { id: 't49', category: 'investissement', text: 'L\'assurance-vie est utile pour la transmission — renseigne-toi sur les abattements après 8 ans.' },
  { id: 't50', category: 'epargne', text: 'Automatise un virement hebdomadaire de 10 € — imperceptible au quotidien, 520 €/an au final.' },
  { id: 't51', category: 'budget', text: 'Identifie tes 3 plus gros postes de dépenses : c\'est là que 80 % de ton argent part.' },
  { id: 't52', category: 'dette', text: 'Un crédit étudiant à taux zéro est du bon endettement si la formation augmente tes revenus futurs.' },
  { id: 't53', category: 'investissement', text: 'Ne mets pas tous tes œufs dans une seule action, même si « tout le monde en parle ».' },
  { id: 't54', category: 'epargne', text: 'Vérifie les frais de retrait mobile money : ils peuvent grignoter 1-2 % de ton épargne mensuelle.' },
  { id: 't55', category: 'budget', text: 'La méthode des enveloppes physiques fonctionne aussi en numérique — une étiquette par catégorie.' },
  { id: 't56', category: 'dette', text: 'Avant un achat à crédit, demande-toi : « l\'aurais-je acheté si je devais payer cash aujourd\'hui ? »' },
  { id: 't57', category: 'investissement', text: 'Rééquilibre ton portefeuille une fois par an pour maintenir ta allocation cible.' },
  { id: 't58', category: 'epargne', text: 'Ton épargne de précaution n\'est pas un échec d\'investissement — c\'est ta fondation.' },
  { id: 't59', category: 'budget', text: 'Prépare un budget « mois difficile » à l\'avance : tu sauras quoi couper sans paniquer.' },
  { id: 't60', category: 'investissement', text: 'L\'intérêt composé fonctionne aussi sur les compétences : 20 min/jour d\'apprentissage financier changent ta trajectoire.' },
];

export function getTipOfDay(date = new Date()): Tip {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return TIPS[dayOfYear % TIPS.length];
}
