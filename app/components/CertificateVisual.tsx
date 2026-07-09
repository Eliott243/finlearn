import { forwardRef } from 'react';
import { View, Text } from 'react-native';
import type { LevelCertificate } from '../utils/certificates';
import { getLevelTitle } from '../utils/certificates';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

interface CertificateVisualProps {
  certificate: LevelCertificate;
}

export const CertificateVisual = forwardRef<View, CertificateVisualProps>(
  function CertificateVisual({ certificate }, ref) {
    const dateLabel = new Date(certificate.earnedAt).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <View
        ref={ref}
        collapsable={false}
        style={{
          backgroundColor: '#FFFDF8',
          borderRadius: 20,
          borderWidth: 2,
          borderColor: Colors.primary,
          padding: 28,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 36, marginBottom: 8 }}>🎓</Text>
        <Text style={[text.caption, { letterSpacing: 2, color: Colors.primary }]}>
          CERTIFICAT FINLEARN
        </Text>
        <Text style={[text.h2, { marginTop: 16, textAlign: 'center' }]}>
          {getLevelTitle(certificate.level)}
        </Text>
        <View
          style={{
            width: '80%',
            height: 1,
            backgroundColor: Colors.border,
            marginVertical: 20,
          }}
        />
        <Text style={[text.bodySmall, { color: Colors.textSecondary }]}>Décerné à</Text>
        <Text style={[text.h3, { marginTop: 6, textAlign: 'center' }]}>
          {certificate.userName}
        </Text>
        <Text style={[text.caption, { marginTop: 20, color: Colors.textSecondary }]}>
          Complété le {dateLabel}
        </Text>
        <Text
          style={[
            text.caption,
            {
              marginTop: 16,
              textAlign: 'center',
              color: Colors.secondary,
              fontStyle: 'italic',
            },
          ]}
        >
          Contenu éducatif — ne constitue pas un diplôme officiel
        </Text>
      </View>
    );
  }
);
