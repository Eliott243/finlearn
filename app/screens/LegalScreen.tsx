import { ScrollView, Text, Linking, TouchableOpacity } from 'react-native';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';
import { PRIVACY_URL, TERMS_URL, SUPPORT_EMAIL } from '../constants/legal';

export function LegalScreen() {
  return (
    <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
      <Text style={[text.h2, { marginTop: 8, marginBottom: 12 }]}>Confidentialité</Text>
      <Text style={[text.bodySmall, { lineHeight: 22, marginBottom: 16 }]}>
        FinLearn ne crée pas de compte en ligne. La progression, les préférences, avatars et
        certificats restent sur cet appareil. Les actualités et taux de change, si vous les
        ouvrez, passent par des flux publics. Rien n’est vendu.
      </Text>
      <Text style={[text.bodySmall, { lineHeight: 22, marginBottom: 16 }]}>
        L’astuce du jour n’est envoyée que si vous activez les notifications. « Supprimer mes
        données » dans Paramètres efface tout le contenu local.
      </Text>
      <Text style={[text.h2, { marginBottom: 12 }]}>Conditions</Text>
      <Text style={[text.bodySmall, { lineHeight: 22, marginBottom: 20 }]}>
        Le contenu est éducatif et ne constitue pas un conseil en investissement. Contact :{' '}
        {SUPPORT_EMAIL}.
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_URL)} style={{ marginBottom: 12 }}>
        <Text style={[text.body, { color: Colors.primary, fontWeight: '600' }]}>
          Politique de confidentialité (web)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(TERMS_URL)}>
        <Text style={[text.body, { color: Colors.primary, fontWeight: '600' }]}>
          Conditions d’utilisation (web)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
