import type { LessonSection, Module } from './types';
import { extraModules } from './modules-extra';
import { applyLessonSupplements } from './lesson-supplements';

const section = (
  type: LessonSection['type'],
  text: string
): LessonSection => ({ type, text });

const baseModules: Module[] = [
  {
    id: 'n1-epargne-precaution',
    level: 1,
    title: 'Épargne de précaution',
    description: 'Comprendre pourquoi et combien mettre de côté avant d\'investir.',
    icon: '🛡️',
    lessons: [
      {
        id: 'n1-epargne-precaution-l1',
        title: 'Qu\'est-ce que l\'épargne de précaution ?',
        duration: '4 min',
        illustration: '🏦',
        content: [
          section(
            'intro',
            'L\'épargne de précaution est une réserve d\'argent disponible immédiatement pour faire face aux imprévus : perte d\'emploi, panne de voiture, frais médicaux ou réparation urgente.'
          ),
          section(
            'example',
            'Imaginez que votre lave-linge tombe en panne un mardi soir. Sans réserve, vous devez emprunter ou reporter d\'autres dépenses. Avec 1 500 € de précaution, vous réglez le problème sans stress ni dette.'
          ),
          section(
            'key',
            'Elle se distingue de l\'épargne projet (vacances, achat) et de l\'investissement long terme : l\'objectif est la sécurité et la liquidité, pas le rendement.'
          ),
          section(
            'transition',
            'Maintenant que le rôle de cette épargne est clair, voyons combien il est raisonnable de mettre de côté.'
          ),
        ],
        summary:
          'L\'épargne de précaution est une réserve liquide pour les imprévus. Elle doit rester accessible et sans risque de perte en capital.',
      },
      {
        id: 'n1-epargne-precaution-l2',
        title: 'Combien mettre de côté ?',
        duration: '4 min',
        illustration: '📊',
        content: [
          section(
            'intro',
            'Il n\'existe pas un montant unique pour tout le monde, mais une règle simple aide à démarrer : viser 3 à 6 mois de dépenses essentielles.'
          ),
          section(
            'example',
            'Si vos dépenses indispensables (loyer, courses, transport, charges) représentent 1 200 € par mois, une réserve de 3 600 à 7 200 € couvre la plupart des situations difficiles.'
          ),
          section(
            'key',
            'Si vos revenus sont variables (freelance, commissions), visez plutôt 6 mois. Commencez petit : même 500 € constituent déjà un coussin utile.'
          ),
          section(
            'transition',
          'Une fois le montant cible défini, la question suivante est : où placer cette épargne en toute sécurité ?'
          ),
        ],
        summary:
          'Visez 3 à 6 mois de dépenses essentielles selon la stabilité de vos revenus. Mieux vaut commencer modestement que ne rien constituer.',
      },
      {
        id: 'n1-epargne-precaution-l3',
        title: 'Où placer cette épargne ?',
        duration: '4 min',
        illustration: '💳',
        content: [
          section(
            'intro',
            'L\'épargne de précaution doit être disponible rapidement et ne pas risquer de perdre en valeur à court terme.'
          ),
          section(
            'example',
            'En France, un livret réglementé (Livret A, LDDS) ou un compte épargne classique permet de retirer l\'argent en quelques jours, sans frais de sortie.'
          ),
          section(
            'key',
            'Évitez d\'y placer de l\'argent destiné à être investi sur le long terme. Ici, l\'objectif n\'est pas le rendement, mais la tranquillité d\'esprit.'
          ),
          section(
            'transition',
            'Vous avez les bases de l\'épargne de précaution : passez au quiz pour valider vos acquis avant le module suivant.'
          ),
        ],
        summary:
          'Placez votre épargne de précaution sur un support sûr et liquide (livret, compte épargne). La disponibilité prime sur le rendement.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quel est l\'objectif principal de l\'épargne de précaution ?',
        options: [
          'Maximiser le rendement',
          'Faire face aux imprévus',
          'Préparer la retraite',
          'Payer moins d\'impôts',
        ],
        correctIndex: 1,
        explanation:
          'L\'épargne de précaution sert à couvrir les dépenses imprévues. Elle n\'a pas pour but de générer un rendement élevé.',
      },
      {
        id: 'q2',
        question: 'Combien de mois de dépenses est-il recommandé de garder en réserve ?',
        options: ['1 mois', '3 à 6 mois', '12 mois', '24 mois'],
        correctIndex: 1,
        explanation:
          'La recommandation standard est de 3 à 6 mois de dépenses essentielles, selon la stabilité de vos revenus.',
      },
      {
        id: 'q3',
        question: 'Où placer l\'épargne de précaution ?',
        options: [
          'En actions',
          'Sur un livret réglementé ou compte épargne',
          'En crypto-monnaies',
          'Dans un PEA',
        ],
        correctIndex: 1,
        explanation:
          'Elle doit rester sans risque de perte en capital et disponible rapidement, ce qui exclut les placements volatils.',
      },
    ],
  },
  {
    id: 'n1-budget',
    level: 1,
    title: 'Budgétisation',
    description: 'Suivre ses revenus et dépenses pour épargner régulièrement.',
    icon: '📝',
    lessons: [
      {
        id: 'n1-budget-l1',
        title: 'Pourquoi budgétiser ?',
        duration: '4 min',
        illustration: '🎯',
        content: [
          section(
            'intro',
            'Un budget est une photographie de vos flux d\'argent : ce qui entre, ce qui sort, et ce qu\'il reste. Sans ce regard, épargner devient difficile.'
          ),
          section(
            'example',
            'Marie gagne 2 000 € nets. Elle pense épargner « ce qui reste », mais finit souvent à 0 €. En notant ses dépenses 30 jours, elle découvre 180 € d\'abonnements oubliés.'
          ),
          section(
            'key',
            'Budgétiser n\'est pas restrictif : c\'est un outil de clarté qui vous aide à décider consciemment où va votre argent.'
          ),
          section(
            'transition',
            'Pour structurer rapidement un budget, une méthode simple existe : la règle 50/30/20.'
          ),
        ],
        summary:
          'Le budget révèle vos habitudes de dépenses et libère de la capacité d\'épargne. Observer avant de couper est la première étape.',
      },
      {
        id: 'n1-budget-l2',
        title: 'La règle 50/30/20',
        duration: '4 min',
        illustration: '🥧',
        content: [
          section(
            'intro',
            'La règle 50/30/20 répartit vos revenus nets en trois catégories pour garder un équilibre durable.'
          ),
          section(
            'example',
            'Sur 2 000 € nets : 1 000 € pour les besoins (loyer, courses), 600 € pour les envies (sorties, loisirs), 400 € pour l\'épargne et le remboursement de dettes.'
          ),
          section(
            'key',
            '50 % besoins essentiels, 30 % envies, 20 % épargne/dettes. Ce cadre est un point de départ : adaptez-le à votre réalité.'
          ),
          section(
            'transition',
            'Pour appliquer cette règle, il faut un suivi simple et régulier — voyons comment le mettre en place.'
          ),
        ],
        summary:
          'La règle 50/30/20 structure vos dépenses en besoins, envies et épargne. Ajustez les pourcentages à votre situation.',
      },
      {
        id: 'n1-budget-l3',
        title: 'Outils simples de suivi',
        duration: '4 min',
        illustration: '📱',
        content: [
          section(
            'intro',
            'Pas besoin d\'un outil complexe : un tableur, un carnet ou une app de suivi suffit pour commencer.'
          ),
          section(
            'example',
            'Chaque soir, notez vos dépenses du jour en 2 minutes. Après 30 jours, classez-les en « besoins », « envies » et « épargne » pour voir l\'écart avec la règle 50/30/20.'
          ),
          section(
            'key',
            'Revoyez votre budget chaque mois : c\'est un processus itératif, pas une contrainte figée une fois pour toutes.'
          ),
          section(
            'transition',
            'Vous savez maintenant structurer et suivre un budget. Le quiz vérifie que vous maîtrisez ces fondamentaux.'
          ),
        ],
        summary:
          'Suivez vos dépenses 30 jours minimum, puis ajustez chaque mois. La régularité compte plus que la perfection.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Dans la règle 50/30/20, que représente le 20 % ?',
        options: ['Les loisirs', 'Les besoins essentiels', 'L\'épargne et remboursement de dettes', 'Les impôts'],
        correctIndex: 2,
        explanation:
          'Les 20 % sont destinés à l\'épargne et au remboursement des dettes, pas aux dépenses courantes.',
      },
      {
        id: 'q2',
        question: 'Quelle est la première étape pour budgétiser efficacement ?',
        options: [
          'Investir en bourse',
          'Suivre ses dépenses pendant un mois',
          'Ouvrir un PEA',
          'Réduire tous ses loisirs',
        ],
        correctIndex: 1,
        explanation:
          'Observer ses dépenses réelles pendant au moins un mois est la base de tout budget efficace.',
      },
      {
        id: 'q3',
        question: 'Pourquoi budgétiser si l\'on veut surtout épargner ?',
        options: [
          'Pour interdire toute dépense plaisir',
          'Pour identifier combien on peut épargner réellement',
          'Pour éviter de payer ses factures',
          'Pour spéculer en bourse',
        ],
        correctIndex: 1,
        explanation:
          'Le budget montre où va l\'argent et révèle une capacité d\'épargne réaliste, au lieu de deviner.',
      },
    ],
  },
  {
    id: 'n1-automatisation',
    level: 1,
    title: 'Automatisation de l\'épargne',
    description: 'Mettre en place des virements automatiques pour épargner sans effort.',
    icon: '⚙️',
    lessons: [
      {
        id: 'n1-automatisation-l1',
        title: 'Épargner avant de dépenser',
        duration: '4 min',
        illustration: '🔄',
        content: [
          section(
            'intro',
            'Le principe « pay yourself first » consiste à épargner dès la réception du salaire, avant les dépenses du mois.'
          ),
          section(
            'example',
            'Thomas programme un virement de 150 € le 2 de chaque mois vers son livret. Même les mois difficiles, son épargne avance — il n\'attend plus « ce qui reste ».'
          ),
          section(
            'key',
            'L\'automatisation supprime la décision répétée. Même 50 € par mois, transférés sans effort, font une vraie différence sur le long terme.'
          ),
          section(
            'transition',
            'Ce principe ne fonctionne que s\'il est configuré concrètement dans votre banque — voyons comment.'
          ),
        ],
        summary:
          'Épargnez en premier via un virement automatique. La régularité bat la motivation ponctuelle.',
      },
      {
        id: 'n1-automatisation-l2',
        title: 'Configurer un virement automatique',
        duration: '4 min',
        illustration: '🏧',
        content: [
          section(
            'intro',
            'Un virement récurrent programme l\'épargne une fois pour toutes : vous n\'avez plus à y penser chaque mois.'
          ),
          section(
            'example',
            'Le jour suivant votre salaire, transférez 10 % vers un compte épargne séparé. Commencez par un montant modeste (50 €), puis augmentez de 20 € tous les 3 mois si possible.'
          ),
          section(
            'key',
            'Séparez vos comptes : un pour les dépenses courantes, un pour l\'épargne. Ce que vous ne voyez pas sur votre compte principal, vous le dépensez moins facilement.'
          ),
          section(
            'transition',
            'Passez au module suivant pour approfondir le crédit et la dette.'
          ),
        ],
        summary:
          'Programmez un virement récurrent dès réception du salaire. Séparez compte courant et compte épargne pour limiter les tentations.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quel principe permet d\'épargner régulièrement ?',
        options: [
          'Épargner ce qui reste en fin de mois',
          'Se payer en premier via virement automatique',
          'Attendre d\'avoir un gros salaire',
          'Ne jamais dépenser',
        ],
        correctIndex: 1,
        explanation:
          'L\'automatisation dès réception du salaire garantit une épargne régulière, indépendamment des envies du moment.',
      },
      {
        id: 'q2',
        question: 'Quand programmer idéalement le virement automatique ?',
        options: [
          'Le dernier jour du mois',
          'Le jour suivant la réception du salaire',
          'Une fois par an',
          'Quand on pense à le faire',
        ],
        correctIndex: 1,
        explanation:
          'Transférer l\'épargne juste après le salaire réduit le risque de tout dépenser avant d\'épargner.',
      },
      {
        id: 'q3',
        question: 'Pourquoi séparer compte courant et compte épargne ?',
        options: [
          'Pour payer moins d\'impôts',
          'Pour réduire la tentation de dépenser l\'épargne',
          'Pour investir en actions',
          'Pour obtenir un crédit bancaire',
        ],
        correctIndex: 1,
        explanation:
          'Un compte épargne séparé rend l\'épargne moins visible au quotidien, ce qui aide à la préserver.',
      },
    ],
  },
  {
    id: 'n2-risque-rendement',
    level: 2,
    title: 'Risque et rendement',
    description: 'Comprendre le lien entre le risque pris et le rendement espéré.',
    icon: '⚖️',
    lessons: [
      {
        id: 'n2-risque-rendement-l1',
        title: 'Le couple risque/rendement',
        duration: '5 min',
        illustration: '📈',
        content: [
          section(
            'intro',
            'En finance, il n\'existe pas de rendement élevé sans accepter un certain niveau de risque. C\'est le compromis fondamental de tout investissement.'
          ),
          section(
            'example',
            'Un livret réglementé rapporte environ 3 % sans risque de perte en capital. Une action peut gagner 20 % ou perdre 15 % la même année. Le potentiel de gain plus élevé s\'accompagne d\'une incertitude plus grande.'
          ),
          section(
            'key',
            'Méfiez-vous des promesses de « rendement garanti élevé » : si c\'était vrai sans risque, tout le monde le ferait.'
          ),
          section(
            'transition',
            'Pour quantifier ce risque au quotidien, un concept essentiel est la volatilité.'
          ),
        ],
        summary:
          'Risque et rendement potentiel sont liés. Plus de rendement espéré implique généralement plus de risque de perte.',
      },
      {
        id: 'n2-risque-rendement-l2',
        title: 'La volatilité',
        duration: '5 min',
        illustration: '🌊',
        content: [
          section(
            'intro',
            'La volatilité mesure l\'amplitude des variations de prix d\'un actif. Plus un actif est volatile, plus ses prix fluctuent.'
          ),
          section(
            'example',
            'En 2020, certains indices actions ont chuté de plus de 30 % en quelques semaines, puis rebondi dans l\'année. Un livret, lui, n\'a pas bougé — zéro volatilité, mais aussi un rendement limité.'
          ),
          section(
            'key',
            'La volatilité n\'est pas un bug : c\'est le prix à payer pour un rendement potentiel plus élevé. Sur le long terme, les marchés diversifiés ont historiquement tendance à se redresser.'
          ),
          section(
            'transition',
            'Avant d\'investir, posez-vous la question : quel niveau de baisse temporaire pouvez-vous supporter sans paniquer ?'
          ),
        ],
        summary:
          'La volatilité mesure les fluctuations de prix. Un horizon long terme aide à traverser les périodes difficiles.',
      },
      {
        id: 'n2-risque-rendement-l3',
        title: 'Connaître sa tolérance au risque',
        duration: '4 min',
        illustration: '🎯',
        content: [
          section(
            'intro',
            'Votre tolérance au risque dépend de votre horizon, vos revenus, votre épargne de précaution et votre réaction émotionnelle face aux baisses.'
          ),
          section(
            'example',
            'Si vous avez besoin de votre argent dans 2 ans pour un achat immobilier, une forte exposition actions est risquée : une baisse pourrait vous empêcher d\'atteindre votre objectif.'
          ),
          section(
            'key',
            'Investir dans une allocation qui dépasse votre tolérance au risque mène souvent à vendre au pire moment, en pleine baisse.'
          ),
          section(
            'transition',
            'Testez votre profil de risque dans l\'onglet Outils, puis validez ce module avec le quiz.'
          ),
        ],
        summary:
          'Adaptez votre allocation à votre horizon et à votre capacité à supporter les baisses, pas seulement à votre envie de rendement.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quelle affirmation est correcte concernant le risque et le rendement ?',
        options: [
          'Plus de risque garantit toujours un rendement plus élevé',
          'Risque et rendement potentiel sont généralement liés',
          'Il n\'y a aucun lien entre risque et rendement',
          'Les actions n\'ont jamais de risque',
        ],
        correctIndex: 1,
        explanation:
          'Le rendement potentiel augmente généralement avec le risque accepté, mais rien n\'est garanti.',
      },
      {
        id: 'q2',
        question: 'Qu\'est-ce que la volatilité ?',
        options: [
          'Le rendement garanti d\'un placement',
          'L\'amplitude des variations de prix d\'un actif',
          'Les frais de gestion d\'un fonds',
          'Le montant des impôts sur les gains',
        ],
        correctIndex: 1,
        explanation:
          'La volatilité mesure à quel point le prix d\'un actif monte et descend dans le temps.',
      },
      {
        id: 'q3',
        question: 'Pourquoi est-il risqué d\'investir au-delà de sa tolérance au risque ?',
        options: [
          'Parce que c\'est illégal',
          'Parce qu\'on risque de vendre en panique lors d\'une baisse',
          'Parce que les banques l\'interdisent',
          'Parce que les frais augmentent',
        ],
        correctIndex: 1,
        explanation:
          'Une allocation trop agressive peut provoquer une vente impulsive en pleine baisse, cristallisant une perte.',
      },
    ],
  },
  {
    id: 'n2-interets-composes',
    level: 2,
    title: 'Intérêts composés',
    description: 'Découvrir l\'effet boule de neige des intérêts composés.',
    icon: '🌱',
    lessons: [
      {
        id: 'n2-interets-composes-l1',
        title: 'Simple vs composé',
        duration: '5 min',
        illustration: '🔢',
        content: [
          section(
            'intro',
            'Les intérêts simples sont calculés uniquement sur le capital initial. Les intérêts composés réinvestissent les gains, qui produisent à leur tour de nouveaux intérêts.'
          ),
          section(
            'example',
            'Avec 10 000 € à 5 % composés : année 1 = 10 500 €, année 2 les intérêts sont calculés sur 10 500 € (pas 10 000 €), soit 10 525 €. La différence semble minime au début.'
          ),
          section(
            'key',
            'C\'est l\'effet boule de neige : les intérêts génèrent eux-mêmes des intérêts, ce qui accélère la croissance de façon exponentielle.'
          ),
          section(
            'transition',
            'Le facteur qui transforme cet effet en levier puissant, c\'est le temps.'
          ),
        ],
        summary:
          'Les intérêts composés réinvestissent les gains. L\'effet semble faible au début, puis s\'accélère fortement.',
      },
      {
        id: 'n2-interets-composes-l2',
        title: 'Le rôle du temps',
        duration: '5 min',
        illustration: '⏳',
        content: [
          section(
            'intro',
            'Le temps est le levier le plus puissant des intérêts composés. Commencer tôt compense souvent un montant investi plus modeste.'
          ),
          section(
            'example',
            'Lucie investit 100 €/mois de 25 à 35 ans (12 000 € versés), puis arrête. Marc investit 100 €/mois de 35 à 65 ans (36 000 € versés). À 7 %/an, Lucie peut avoir plus au final — grâce aux 10 ans d\'avance.'
          ),
          section(
            'key',
            'Les premières années semblent lentes, puis l\'accélération devient spectaculaire. C\'est normal : la courbe est exponentielle, pas linéaire.'
          ),
          section(
            'transition',
            'Visualisez cet effet concrètement avec le simulateur dans l\'onglet Outils.'
          ),
        ],
        summary:
          'Commencer tôt est souvent plus impactant qu\'investir beaucoup plus tard. Le temps bat le montant.',
      },
      {
        id: 'n2-interets-composes-l3',
        title: 'Versements réguliers et intérêts composés',
        duration: '4 min',
        illustration: '💰',
        content: [
          section(
            'intro',
            'Combiner intérêts composés et versements réguliers (DCA) est une stratégie pédagogique courante pour construire un capital progressivement.'
          ),
          section(
            'example',
            '200 €/mois à 7 %/an pendant 25 ans ≈ 158 000 €, dont environ 98 000 € d\'intérêts composés. Sans versements réguliers, le même capital initial ne produirait pas le même résultat.'
          ),
          section(
            'key',
            'La régularité des versements alimente la boule de neige. Même un petit montant mensuel fait une vraie différence sur 15-20 ans.'
          ),
          section(
            'transition',
            'Vous maîtrisez les intérêts composés — passez au quiz, puis explorez le simulateur pour tester vos propres scénarios.'
          ),
        ],
        summary:
          'Versements réguliers + intérêts composés + temps = les trois piliers d\'une croissance patrimoniale progressive.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Qu\'est-ce que les intérêts composés ?',
        options: [
          'Des intérêts calculés uniquement sur le capital initial',
          'Des intérêts qui génèrent eux-mêmes des intérêts',
          'Des intérêts payés une seule fois à la fin',
          'Des intérêts garantis par l\'État',
        ],
        correctIndex: 1,
        explanation:
          'Les intérêts composés réinvestissent les gains, qui produisent à leur tour de nouveaux intérêts.',
      },
      {
        id: 'q2',
        question: 'Pourquoi commencer tôt est-il si important ?',
        options: [
          'Parce que les taux sont toujours plus élevés pour les jeunes',
          'Parce que le temps amplifie l\'effet boule de neige des intérêts composés',
          'Parce que c\'est obligatoire avant 30 ans',
          'Parce que les impôts diminuent avec l\'âge',
        ],
        correctIndex: 1,
        explanation:
          'Plus la durée est longue, plus les intérêts composés ont le temps de s\'accumuler exponentiellement.',
      },
      {
        id: 'q3',
        question: 'Que se passe-t-il quand on combine versements réguliers et intérêts composés ?',
        options: [
          'Le capital stagne',
          'Chaque versement bénéficie aussi des intérêts composés, accélérant la croissance',
          'Les frais augmentent automatiquement',
          'Le rendement est divisé par deux',
        ],
        correctIndex: 1,
        explanation:
          'Les versements réguliers alimentent le capital, et chaque euro investi profite à son tour des intérêts composés.',
      },
    ],
  },
  {
    id: 'n2-inflation',
    level: 2,
    title: 'Inflation',
    description: 'Pourquoi laisser son argent dormir peut le faire perdre de la valeur.',
    icon: '💸',
    lessons: [
      {
        id: 'n2-inflation-l1',
        title: 'Qu\'est-ce que l\'inflation ?',
        duration: '4 min',
        illustration: '🛒',
        content: [
          section(
            'intro',
            'L\'inflation est la hausse générale et durable des prix dans une économie. Votre argent garde le même montant en euros, mais achète moins de biens.'
          ),
          section(
            'example',
            'Un panier de courses à 80 € en 2020 coûte environ 90 € en 2025 avec une inflation moyenne de 3 %/an. Vous n\'avez pas dépensé plus — les prix ont augmenté.'
          ),
          section(
            'key',
            'L\'inflation est mesurée par des indices (comme l\'IPC en France). Une inflation de 2-3 %/an est considérée comme normale dans une économie saine.'
          ),
          section(
            'transition',
            'Comprendre l\'inflation, c\'est comprendre pourquoi « laisser dormir » son argent peut être une perte silencieuse.'
          ),
        ],
        summary:
          'L\'inflation augmente les prix et réduit le pouvoir d\'achat de votre argent au fil du temps.',
      },
      {
        id: 'n2-inflation-l2',
        title: 'L\'impact sur votre épargne',
        duration: '5 min',
        illustration: '📉',
        content: [
          section(
            'intro',
            'Si votre épargne rapporte moins que l\'inflation, vous perdez du pouvoir d\'achat réel, même si le montant en euros augmente légèrement.'
          ),
          section(
            'example',
            '10 000 € sur un livret à 1 %/an avec une inflation de 3 % : en valeur réelle, vous perdez environ 2 % par an. Après 10 ans, votre pouvoir d\'achat équivaut à environ 8 200 € en euros d\'aujourd\'hui.'
          ),
          section(
            'key',
            'Le rendement nominal (affiché) n\'est pas le rendement réel. Rendement réel ≈ rendement nominal − inflation.'
          ),
          section(
            'transition',
            'Face à l\'inflation, l\'épargne de précaution reste nécessaire — mais pour le long terme, d\'autres approches existent.'
          ),
        ],
        summary:
          'Un rendement inférieur à l\'inflation = perte de pouvoir d\'achat réel. Calculez toujours en « euros constants ».',
      },
      {
        id: 'n2-inflation-l3',
        title: 'Protéger son pouvoir d\'achat',
        duration: '5 min',
        illustration: '🛡️',
        content: [
          section(
            'intro',
            'Face à l\'inflation, la stratégie dépend de l\'horizon : court terme (épargne de précaution) vs long terme (investissement diversifié).'
          ),
          section(
            'example',
            'Pour un projet dans 2 ans, un livret reste adapté malgré l\'inflation modérée. Pour la retraite dans 25 ans, se contenter d\'un livret garantit une érosion massive du pouvoir d\'achat.'
          ),
          section(
            'key',
            'L\'investissement en actifs diversifiés (actions, obligations via ETF) est historiquement une réponse à l\'inflation sur le long terme — avec un risque de volatilité à court terme.'
          ),
          section(
            'transition',
            'Vous avez terminé le niveau 2. Validez ce module avec le quiz avant de passer au niveau 3.'
          ),
        ],
        summary:
          'Adaptez votre stratégie à votre horizon : sécurité à court terme, diversification à long terme pour contrer l\'inflation.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Que se passe-t-il si votre épargne rapporte 1 % et l\'inflation est de 3 % ?',
        options: [
          'Vous gagnez du pouvoir d\'achat',
          'Vous perdez du pouvoir d\'achat réel',
          'Rien ne change',
          'Vous doublez votre argent',
        ],
        correctIndex: 1,
        explanation:
          'Un rendement nominal de 1 % avec une inflation de 3 % = une perte de pouvoir d\'achat réel de 2 %/an.',
      },
      {
        id: 'q2',
        question: 'Comment calcule-t-on approximativement le rendement réel ?',
        options: [
          'Rendement nominal + inflation',
          'Rendement nominal − inflation',
          'Rendement nominal × inflation',
          'Inflation ÷ rendement nominal',
        ],
        correctIndex: 1,
        explanation:
          'Le rendement réel est approximativement le rendement affiché moins le taux d\'inflation.',
      },
      {
        id: 'q3',
        question: 'Pour un objectif à 20 ans, pourquoi un livret seul peut être insuffisant ?',
        options: [
          'Parce que les livrets sont illégaux après 10 ans',
          'Parce que l\'inflation érode le pouvoir d\'achat sur le long terme',
          'Parce que les livrets n\'existent plus',
          'Parce que les impôts sont plus élevés',
        ],
        correctIndex: 1,
        explanation:
          'Sur 20 ans, une inflation de 2-3 %/an réduit significativement le pouvoir d\'achat d\'une épargne peu rémunérée.',
      },
    ],
  },
  {
    id: 'n3-etf',
    level: 3,
    title: 'Comprendre les ETF',
    description: 'Les fonds indiciels cotés : simples, diversifiés, accessibles.',
    icon: '📦',
    lessons: [
      {
        id: 'n3-etf-l1',
        title: 'Qu\'est-ce qu\'un ETF ?',
        duration: '5 min',
        illustration: '🗂️',
        content: [
          section(
            'intro',
            'Un ETF (Exchange Traded Fund) est un fonds d\'investissement qui réplique la performance d\'un indice boursier, comme le S&P 500 ou le MSCI World.'
          ),
          section(
            'example',
            'Au lieu d\'acheter 500 actions américaines une par une pour reproduire le S&P 500, vous achetez une seule part d\'ETF qui contient déjà ces 500 entreprises.'
          ),
          section(
            'key',
            'Un ETF se négocie en bourse comme une action, en temps réel, avec un prix qui évolue tout au long de la journée.'
          ),
          section(
            'transition',
            'Pourquoi les ETF sont-ils devenus si populaires auprès des investisseurs particuliers ?'
          ),
        ],
        summary:
          'Un ETF réplique un indice et se trade en bourse. Il offre une diversification instantanée en un seul achat.',
      },
      {
        id: 'n3-etf-l2',
        title: 'Avantages des ETF',
        duration: '5 min',
        illustration: '✅',
        content: [
          section(
            'intro',
            'Les ETF combinent trois atouts majeurs pour le débutant : frais bas, transparence et accessibilité.'
          ),
          section(
            'example',
            'Un ETF MSCI World peut coûter 0,20 %/an (TER), contre souvent 1-2 % pour un fonds actif géré par un gérant qui essaie de battre le marché — et échoue souvent.'
          ),
          section(
            'key',
            'La composition d\'un ETF est publique et vérifiable. Vous savez exactement quelles entreprises ou obligations vous détenez.'
          ),
          section(
            'transition',
            'Avant d\'acheter un ETF, il faut savoir le lire — voyons les éléments clés d\'une fiche produit.'
          ),
        ],
        summary:
          'ETF = frais réduits, transparence totale, accessible dès quelques dizaines d\'euros. Idéal pour débuter.',
      },
      {
        id: 'n3-etf-l3',
        title: 'ETF vs fonds actifs',
        duration: '4 min',
        illustration: '⚔️',
        content: [
          section(
            'intro',
            'Un fonds actif emploie des gérants pour sélectionner les « meilleures » actions. Un ETF passif se contente de répliquer l\'indice — sans chercher à le battre.'
          ),
          section(
            'example',
            'Sur 15 ans, environ 80-90 % des fonds actifs européens ont sous-performé leur indice de référence, selon les études S&P SPIVA — avant même de compter les frais plus élevés.'
          ),
          section(
            'key',
            'L\'ETF ne cherche pas à battre le marché : il le reproduit. C\'est une stratégie humble mais statistiquement efficace sur le long terme.'
          ),
          section(
            'transition',
            'Explorez des fiches ETF concrètes dans l\'onglet Outils, puis validez ce module avec le quiz.'
          ),
        ],
        summary:
          'Les ETF passifs répliquent le marché à faible coût. Les fonds actifs battent rarement l\'indice sur le long terme.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Qu\'est-ce qu\'un ETF ?',
        options: [
          'Une action individuelle d\'une entreprise',
          'Un fonds qui réplique un indice et se négocie en bourse',
          'Un compte épargne réglementé',
          'Une obligation d\'État',
        ],
        correctIndex: 1,
        explanation:
          'Un ETF réplique la performance d\'un indice et se trade en bourse comme une action.',
      },
      {
        id: 'q2',
        question: 'Quel est un avantage principal des ETF par rapport aux fonds actifs ?',
        options: [
          'Ils garantissent un rendement de 10 %/an',
          'Ils ont généralement des frais (TER) plus bas',
          'Ils ne comportent aucun risque',
          'Ils sont réservés aux professionnels',
        ],
        correctIndex: 1,
        explanation:
          'Les ETF passifs ont des frais de gestion bien inférieurs aux fonds activement gérés.',
      },
      {
        id: 'q3',
        question: 'Que fait un ETF passif ?',
        options: [
          'Il essaie de battre le marché en sélectionnant les meilleures actions',
          'Il réplique la performance d\'un indice',
          'Il garantit le capital investi',
          'Il investit uniquement en obligations',
        ],
        correctIndex: 1,
        explanation:
          'Un ETF passif reproduit l\'indice qu\'il suit, sans chercher à le surperformer.',
      },
    ],
  },
  {
    id: 'n3-enveloppes',
    level: 3,
    title: 'PEA, assurance-vie, CTO',
    description: 'Les principales enveloppes fiscales pour investir en France.',
    icon: '📋',
    lessons: [
      {
        id: 'n3-enveloppes-l1',
        title: 'Le PEA',
        duration: '5 min',
        illustration: '🇫🇷',
        content: [
          section(
            'intro',
            'Le Plan d\'Épargne en Actions (PEA) est une enveloppe fiscale française pour investir en actions et ETF européens.'
          ),
          section(
            'example',
            'Vous ouvrez un PEA, y versez 500 €/mois dans un ETF Europe, et après 5 ans de détention, les plus-values sont exonérées d\'impôt sur le revenu (seuls les prélèvements sociaux restent dus).'
          ),
          section(
            'key',
            'Plafond de versement : 150 000 €. Retrait avant 5 ans = clôture du plan et imposition des gains. Idéal pour un horizon long terme.'
          ),
          section(
            'transition',
            'L\'assurance-vie est une autre enveloppe incontournable, plus polyvalente que le PEA.'
          ),
        ],
        summary:
          'Le PEA offre une exonération d\'IR sur les plus-values après 5 ans. Limité aux titres européens, plafond 150 000 €.',
      },
      {
        id: 'n3-enveloppes-l2',
        title: 'L\'assurance-vie',
        duration: '5 min',
        illustration: '🛡️',
        content: [
          section(
            'intro',
            'L\'assurance-vie est une enveloppe fiscale polyvalente qui permet d\'investir à la fois en fonds euros (sécurisé) et en unités de compte (actions, ETF, obligations…).'
          ),
          section(
            'example',
            'Après 8 ans de détention, chaque retrait bénéficie d\'un abattement annuel de 4 600 € (9 200 € pour un couple) sur les gains, avant imposition.'
          ),
          section(
            'key',
            'Utile pour la diversification, la transmission (abattements successoraux) et la fiscalité avantageuse à long terme. Pas de plafond de versement.'
          ),
          section(
            'transition',
            'Pour investir sans restriction géographique, le compte-titres ordinaire complète ces enveloppes.'
          ),
        ],
        summary:
          'L\'assurance-vie combine sécurité (fonds euros) et dynamisme (UC). Avantages fiscaux après 8 ans, idéale pour la transmission.',
      },
      {
        id: 'n3-enveloppes-l3',
        title: 'Le compte-titres (CTO)',
        duration: '5 min',
        illustration: '🌍',
        content: [
          section(
            'intro',
            'Le compte-titres ordinaire (CTO) est le compte standard pour acheter actions et ETF sans restriction géographique ni plafond.'
          ),
          section(
            'example',
            'Vous souhaitez investir dans un ETF S&P 500 américain ? C\'est possible en CTO, mais pas dans un PEA classique qui se limite aux titres européens.'
          ),
          section(
            'key',
            'Pas d\'avantage fiscal spécifique : flat tax de 30 % sur les plus-values et dividendes. En contrepartie, flexibilité totale et aucun plafond.'
          ),
          section(
            'transition',
            'Choisissez votre enveloppe selon votre horizon, vos objectifs et les marchés visés — puis validez avec le quiz.'
          ),
        ],
        summary:
          'Le CTO est flexible et sans plafond, mais sans avantage fiscal. Flat tax 30 %. Idéal pour les ETF non-européens.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quelle enveloppe offre une exonération d\'impôt sur le revenu après 5 ans ?',
        options: ['Assurance-vie', 'PEA', 'CTO', 'Livret A'],
        correctIndex: 1,
        explanation:
          'Le PEA permet une exonération d\'IR sur les plus-values après 5 ans de détention.',
      },
      {
        id: 'q2',
        question: 'Après combien d\'années l\'assurance-vie offre-t-elle un abattement fiscal sur les retraits ?',
        options: ['3 ans', '5 ans', '8 ans', '10 ans'],
        correctIndex: 2,
        explanation:
          'L\'abattement annuel sur les gains s\'applique après 8 ans de détention en assurance-vie.',
      },
      {
        id: 'q3',
        question: 'Dans quel cas le CTO est-il préférable au PEA ?',
        options: [
          'Pour bénéficier d\'avantages fiscaux maximaux',
          'Pour investir dans des ETF non-européens comme le S&P 500',
          'Pour épargner sans risque',
          'Pour éviter tous les impôts',
        ],
        correctIndex: 1,
        explanation:
          'Le CTO n\'a pas de restriction géographique, contrairement au PEA limité aux titres européens.',
      },
    ],
  },
  {
    id: 'n3-fiche-etf',
    level: 3,
    title: 'Lire une fiche ETF',
    description: 'Décrypter les informations clés d\'une fiche produit ETF.',
    icon: '🔍',
    lessons: [
      {
        id: 'n3-fiche-etf-l1',
        title: 'Les éléments essentiels',
        duration: '5 min',
        illustration: '📄',
        content: [
          section(
            'intro',
            'Une fiche ETF (ou KID — Document d\'Informations Clés) contient toutes les informations pour comparer et comprendre un produit avant d\'investir.'
          ),
          section(
            'example',
            'Sur une fiche, vous trouvez : le nom du fonds, l\'ISIN (code unique), l\'indice répliqué, le TER, le type de réplication et la zone géographique.'
          ),
          section(
            'key',
            'Pour un débutant, trois éléments suffisent pour une première sélection : l\'indice répliqué, le TER et la zone géographique.'
          ),
          section(
            'transition',
            'Le TER est souvent l\'élément le plus sous-estimé — voyons pourquoi il compte autant.'
          ),
        ],
        summary:
          'Sur une fiche ETF, lisez d\'abord l\'indice, le TER et la zone géographique. Ce sont les trois critères essentiels.',
      },
      {
        id: 'n3-fiche-etf-l2',
        title: 'Comprendre le TER',
        duration: '5 min',
        illustration: '💰',
        content: [
          section(
            'intro',
            'Le TER (Total Expense Ratio) représente les frais annuels prélevés par le gestionnaire du fonds, déduits automatiquement de la valeur de l\'ETF.'
          ),
          section(
            'example',
            'Un ETF à 0,20 % de TER coûte 20 €/an pour 10 000 € investis. Un fonds actif à 1,50 % coûte 150 €/an pour le même montant. Sur 20 ans, cette différence peut représenter des milliers d\'euros.'
          ),
          section(
            'key',
            'Chaque 0,10 % de TER en moins améliore votre rendement net. Comparez toujours le TER entre ETF similaires (même indice).'
          ),
          section(
            'transition',
            'Le type de réplication est le dernier élément important à vérifier sur une fiche.'
          ),
        ],
        summary:
          'Le TER impacte directement votre rendement net. Privilégiez les ETF avec un TER bas (< 0,30 % pour un indice large).',
      },
      {
        id: 'n3-fiche-etf-l3',
        title: 'Physique vs synthétique',
        duration: '5 min',
        illustration: '🔄',
        content: [
          section(
            'intro',
            'La réplication physique signifie que le fonds achète réellement les titres de l\'indice. La réplication synthétique utilise des produits dérivés (swaps) pour reproduire la performance.'
          ),
          section(
            'example',
            'Un ETF MSCI World en réplication physique détient des actions Apple, Nestlé, LVMH… Un ETF synthétique conclut un contrat avec une banque qui s\'engage à reproduire la performance.'
          ),
          section(
            'key',
            'Pour débuter, la réplication physique est plus transparente. La synthétique peut avoir un risque de contrepartie (la banque partenaire) mais permet parfois d\'accéder à des marchés éloignés.'
          ),
          section(
            'transition',
            'Entraînez-vous avec les fiches ETF de l\'onglet Outils, puis validez ce module avec le quiz.'
          ),
        ],
        summary:
          'Physique = le fonds achète les titres. Synthétique = contrat avec une banque. La physique est recommandée pour débuter.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Que signifie le TER sur une fiche ETF ?',
        options: [
          'Le rendement annuel garanti',
          'Les frais annuels de gestion du fonds',
          'Le nombre de titres détenus',
          'La date de création du fonds',
        ],
        correctIndex: 1,
        explanation:
          'Le TER (Total Expense Ratio) représente les frais annuels prélevés par le gestionnaire.',
      },
      {
        id: 'q2',
        question: 'Un TER de 0,20 % sur 10 000 € investis coûte combien par an ?',
        options: ['2 €', '20 €', '200 €', '2 000 €'],
        correctIndex: 1,
        explanation:
          '0,20 % de 10 000 € = 20 € de frais annuels, déduits automatiquement de la valeur du fonds.',
      },
      {
        id: 'q3',
        question: 'Quelle est la différence entre réplication physique et synthétique ?',
        options: [
          'La physique achète les titres, la synthétique utilise des produits dérivés',
          'La physique est gratuite, la synthétique est payante',
          'La physique est réservée aux professionnels',
          'Il n\'y a aucune différence',
        ],
        correctIndex: 0,
        explanation:
          'La réplication physique achète réellement les titres de l\'indice ; la synthétique passe par des contrats dérivés.',
      },
    ],
  },
  {
    id: 'n3-diversification',
    level: 3,
    title: 'Diversification',
    description: 'Ne pas mettre tous ses œufs dans le même panier.',
    icon: '🧺',
    lessons: [
      {
        id: 'n3-diversification-l1',
        title: 'Pourquoi diversifier ?',
        duration: '5 min',
        illustration: '🌐',
        content: [
          section(
            'intro',
            'La diversification consiste à répartir ses investissements sur plusieurs actifs, secteurs et zones géographiques pour réduire le risque global.'
          ),
          section(
            'example',
            'En 2000, un investisseur 100 % concentré sur la tech a perdu plus de 80 % lors de l\'éclatement de la bulle internet. Un portefeuille diversifié (actions, obligations, zones) a beaucoup moins souffert.'
          ),
          section(
            'key',
            'Diversifier ne garantit pas un rendement, mais réduit le risque qu\'un seul événement détruise une large part de votre patrimoine.'
          ),
          section(
            'transition',
            'La diversification géographique est l\'un des piliers les plus accessibles grâce aux ETF.'
          ),
        ],
        summary:
          'Diversifier réduit le risque de concentration. Un seul actif ne devrait jamais représenter l\'essentiel de votre patrimoine.',
      },
      {
        id: 'n3-diversification-l2',
        title: 'Diversification géographique',
        duration: '5 min',
        illustration: '🗺️',
        content: [
          section(
            'intro',
            'Investir uniquement dans son pays expose à un risque géographique : récession locale, devise, réglementation. La diversification géographique compense ces risques.'
          ),
          section(
            'example',
            'Un Français qui n\'investit qu\'en France rate la croissance des États-Unis, de l\'Asie ou de l\'Europe du Nord. Un ETF MSCI World couvre 23 pays développés en un seul achat.'
          ),
          section(
            'key',
            'Les ETF mondiaux ou régionaux sont le moyen le plus simple pour un débutant de diversifier géographiquement sans acheter des centaines de titres.'
          ),
          section(
            'transition',
            'Comment assembler ces briques en un portefeuille cohérent ? C\'est l\'objet de la dernière leçon.'
          ),
        ],
        summary:
          'Ne concentrez pas tout sur un seul pays. Les ETF mondiaux offrent une diversification géographique instantanée.',
      },
      {
        id: 'n3-diversification-l3',
        title: 'Construire un portefeuille simple',
        duration: '5 min',
        illustration: '🏗️',
        content: [
          section(
            'intro',
            'Un portefeuille simple et diversifié pour débuter peut se composer de quelques ETF bien choisis, alignés avec votre profil de risque et votre horizon.'
          ),
          section(
            'example',
            'Exemple pédagogique (profil équilibré, horizon 15+ ans) : 70 % ETF actions monde (MSCI World) + 20 % ETF obligations + 10 % épargne de précaution. Ce n\'est pas une recommandation personnalisée.'
          ),
          section(
            'key',
            'La simplicité est une force : 2-3 ETF bien choisis suffisent pour débuter. L\'important est la régularité des versements et la cohérence avec votre profil de risque.'
          ),
          section(
            'transition',
            'Félicitations ! Vous avez terminé le parcours FinLearn. Validez ce dernier module avec le quiz.'
          ),
        ],
        summary:
          'Un portefeuille simple (2-3 ETF) + versements réguliers + horizon long = une approche pédagogique solide pour débuter.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quel est l\'objectif principal de la diversification ?',
        options: [
          'Maximiser les gains à court terme',
          'Réduire le risque global du portefeuille',
          'Éviter tous les impôts',
          'Investir dans une seule action performante',
        ],
        correctIndex: 1,
        explanation:
          'Diversifier réduit le risque de concentration sans forcément sacrifier le rendement long terme.',
      },
      {
        id: 'q2',
        question: 'Pourquoi diversifier géographiquement ?',
        options: [
          'Pour payer moins de frais',
          'Pour ne pas dépendre de la performance d\'un seul pays',
          'Pour éviter les impôts à l\'étranger',
          'Pour investir uniquement en France',
        ],
        correctIndex: 1,
        explanation:
          'La diversification géographique protège contre les crises locales et expose à la croissance mondiale.',
      },
      {
        id: 'q3',
        question: 'Combien d\'ETF suffisent pour un portefeuille simple de débutant ?',
        options: [
          'Au moins 20 ETF',
          '2 à 3 ETF bien choisis',
          'Un seul ETF obligatoirement',
          'Aucun, il faut acheter des actions individuelles',
        ],
        correctIndex: 1,
        explanation:
          'La simplicité est efficace : 2-3 ETF couvrant actions, obligations et zones géographiques suffisent pour débuter.',
      },
    ],
  },
];

export const modules: Module[] = [...baseModules, ...extraModules].map(applyLessonSupplements);

export function getAllLessons() {
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, level: m.level }))
  );
}

export function getModuleById(id: string) {
  return modules.find((m) => m.id === id);
}

export function getTotalLessonsCount() {
  return modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export function getLevelModules(level: number) {
  return modules.filter((m) => m.level === level);
}

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Niveau 1 — Épargne',
  2: 'Niveau 2 — Comprendre l\'investissement',
  3: 'Niveau 3 — Sur quoi investir',
};

export const SECTION_LABELS: Record<LessonSection['type'], string> = {
  intro: 'Introduction',
  example: 'Exemple concret',
  key: 'Point clé',
  transition: 'Pour la suite',
};
