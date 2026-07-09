import { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { useCurrency } from '../hooks/useCurrency';
import {
  clearSavingsGoal,
  getSavingsGoal,
  getSavingsProgress,
  saveSavingsGoal,
  type SavingsGoal,
} from '../utils/savingsGoal';
import { text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

export function SavingsGoalSection() {
  const { format, suffix } = useCurrency();
  const [goal, setGoal] = useState<SavingsGoal | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [current, setCurrent] = useState('');
  const [deadline, setDeadline] = useState('');

  const load = useCallback(() => {
    getSavingsGoal().then((g) => {
      setGoal(g);
      if (g) {
        setName(g.name);
        setTarget(String(g.targetAmount));
        setCurrent(String(g.currentAmount));
        setDeadline(g.deadline ?? '');
      }
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const startCreate = () => {
    setEditing(true);
    setName('');
    setTarget('');
    setCurrent('0');
    setDeadline('');
  };

  const save = async () => {
    const targetAmount = parseFloat(target) || 0;
    const currentAmount = parseFloat(current) || 0;
    if (!name.trim() || targetAmount <= 0) {
      Alert.alert('Objectif incomplet', 'Indiquez un nom et un montant cible valide.');
      return;
    }

    const next: SavingsGoal = {
      name: name.trim(),
      targetAmount,
      currentAmount,
      deadline: deadline.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };
    await saveSavingsGoal(next);
    setGoal(next);
    setEditing(false);
  };

  const updateProgress = async () => {
    if (!goal) return;
    const currentAmount = parseFloat(current) || 0;
    const next = { ...goal, currentAmount, updatedAt: new Date().toISOString() };
    await saveSavingsGoal(next);
    setGoal(next);
  };

  const remove = () => {
    Alert.alert('Supprimer l\'objectif', 'Voulez-vous supprimer cet objectif d\'épargne ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await clearSavingsGoal();
          setGoal(null);
          setEditing(false);
        },
      },
    ]);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={text.h3}>Objectif d'épargne</Text>
        {goal && !editing && (
          <TouchableOpacity onPress={() => setEditing(true)}>
            <Text style={[text.bodySmall, { color: Colors.primary, fontWeight: '600' }]}>Modifier</Text>
          </TouchableOpacity>
        )}
      </View>

      {!goal && !editing ? (
        <>
          <Text style={[text.bodySmall, { marginBottom: 16, lineHeight: 22 }]}>
            Définissez un objectif et suivez votre progression manuellement — sans connexion bancaire.
          </Text>
          <TouchableOpacity style={components.button} onPress={startCreate}>
            <Text style={components.buttonText}>Créer un objectif</Text>
          </TouchableOpacity>
        </>
      ) : editing ? (
        <>
          <Text style={[text.label, { marginBottom: 6 }]}>Nom de l'objectif</Text>
          <TextInput
            style={components.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex. Fonds d'urgence"
            placeholderTextColor={Colors.textSecondary}
          />
          <Text style={[text.label, { marginTop: 12, marginBottom: 6 }]}>Montant cible ({suffix})</Text>
          <TextInput
            style={components.input}
            value={target}
            onChangeText={setTarget}
            keyboardType="numeric"
            placeholder="100000"
            placeholderTextColor={Colors.textSecondary}
          />
          <Text style={[text.label, { marginTop: 12, marginBottom: 6 }]}>
            Montant épargné actuel ({suffix})
          </Text>
          <TextInput
            style={components.input}
            value={current}
            onChangeText={setCurrent}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={Colors.textSecondary}
          />
          <Text style={[text.label, { marginTop: 12, marginBottom: 6 }]}>Échéance (optionnel)</Text>
          <TextInput
            style={components.input}
            value={deadline}
            onChangeText={setDeadline}
            placeholder="Ex. Décembre 2026"
            placeholderTextColor={Colors.textSecondary}
          />
          <TouchableOpacity style={[components.button, { marginTop: 16 }]} onPress={save}>
            <Text style={components.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
          {goal && (
            <TouchableOpacity style={{ marginTop: 12, alignItems: 'center' }} onPress={() => setEditing(false)}>
              <Text style={text.bodySmall}>Annuler</Text>
            </TouchableOpacity>
          )}
        </>
      ) : goal ? (
        <>
          <Text style={[text.body, { fontWeight: '700', marginBottom: 4 }]}>{goal.name}</Text>
          {goal.deadline ? (
            <Text style={[text.caption, { marginBottom: 12 }]}>Échéance : {goal.deadline}</Text>
          ) : null}
          <ProgressBar
            progress={getSavingsProgress(goal)}
            label={`${format(goal.currentAmount)} / ${format(goal.targetAmount)}`}
          />
          <Text style={[text.label, { marginTop: 16, marginBottom: 6 }]}>
            Mettre à jour le montant épargné ({suffix})
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TextInput
              style={[components.input, { flex: 1, marginBottom: 0 }]}
              value={current}
              onChangeText={setCurrent}
              keyboardType="numeric"
              placeholderTextColor={Colors.textSecondary}
            />
            <TouchableOpacity
              style={[components.button, { paddingHorizontal: 20, marginTop: 0 }]}
              onPress={updateProgress}
            >
              <Text style={components.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginTop: 16, alignItems: 'center' }} onPress={remove}>
            <Text style={{ color: Colors.danger, fontSize: 14 }}>Supprimer l'objectif</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </Card>
  );
}
