export type TontineFrequency = 'weekly' | 'monthly';

export interface TontineInput {
  participants: number;
  contribution: number;
  frequency: TontineFrequency;
  receiveRank: number;
}

export interface TontineRound {
  round: number;
  recipientRank: number;
  potAmount: number;
  yourContribution: number;
  cumulativePaid: number;
  isYourRound: boolean;
}

export interface TontineResult {
  periodsUntilReceive: number;
  durationLabel: string;
  totalPaidAtReceive: number;
  potReceived: number;
  individualSavingsAtReceive: number;
  earlyAccessGap: number;
  totalPaidFullCycle: number;
  rounds: TontineRound[];
  insight: string;
}

const FREQUENCY_LABELS: Record<TontineFrequency, { unit: string; plural: string }> = {
  weekly: { unit: 'semaine', plural: 'semaines' },
  monthly: { unit: 'mois', plural: 'mois' },
};

export function calculateTontine(input: TontineInput): TontineResult | null {
  const { participants, contribution, frequency, receiveRank } = input;

  if (participants < 2 || contribution <= 0 || receiveRank < 1 || receiveRank > participants) {
    return null;
  }

  const potReceived = participants * contribution;
  const totalPaidAtReceive = receiveRank * contribution;
  const individualSavingsAtReceive = receiveRank * contribution;
  const earlyAccessGap = potReceived - individualSavingsAtReceive;

  const freq = FREQUENCY_LABELS[frequency];
  const durationLabel =
    receiveRank === 1
      ? `1 ${freq.unit}`
      : `${receiveRank} ${freq.plural}`;

  const rounds: TontineRound[] = [];
  for (let round = 1; round <= participants; round++) {
    rounds.push({
      round,
      recipientRank: round,
      potAmount: potReceived,
      yourContribution: contribution,
      cumulativePaid: round * contribution,
      isYourRound: round === receiveRank,
    });
  }

  let insight: string;
  if (receiveRank === 1) {
    insight =
      'En recevant en premier, vous accédez tôt à une somme importante. Utile pour un projet urgent, mais vous devez continuer à cotiser après — la discipline reste essentielle.';
  } else if (receiveRank === participants) {
    insight =
      'En recevant en dernier, vous avez financé la cagnotte des autres avant la vôtre. C\'est une forme d\'épargne forcée — comparez avec une épargne individuelle autonome.';
  } else if (receiveRank <= participants / 2) {
    insight =
      'Votre rang intermédiaire-précoce vous donne accès à la cagnotte avant d\'avoir versé la totalité. Bon compromis si vous avez un besoin de liquidité modéré.';
  } else {
    insight =
      'Votre rang tardif signifie que vous cotisez longtemps avant de recevoir. Assurez-vous que le groupe est fiable et que vous pouvez tenir vos engagements.';
  }

  return {
    periodsUntilReceive: receiveRank,
    durationLabel,
    totalPaidAtReceive,
    potReceived,
    individualSavingsAtReceive,
    earlyAccessGap,
    totalPaidFullCycle: participants * contribution,
    rounds,
    insight,
  };
}

export function formatAmount(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
