# FinLearn

Application mobile d'éducation financière pensée pour la francophonie et l'Afrique de 
l'Ouest et centrale. FinLearn accompagne l'utilisateur d'« je ne sais pas épargner » à 
« je comprends pourquoi je choisis cet ETF » — à travers un parcours progressif, des 
simulateurs interactifs, et des outils qui partent des réalités locales (mobile money, 
tontines) plutôt que d'importer des produits financiers occidentaux inadaptés.

Contenu 100% éducatif — FinLearn ne fournit aucun conseil en investissement personnalisé.

## Fonctionnalités
- Parcours progressif par niveaux (épargne → investissement → choix des supports)
- Simulateurs : intérêts composés, tontine digitale, impact de l'inflation
- Fiches pédagogiques ETF
- Comparateur de taux de change
- Fil d'actualité financière africaine
- Fonctionne hors ligne (offline-first)

## Stack technique
React Native (Expo) · React Navigation · NativeWind · AsyncStorage

## Play Store
- Package Android (définitif) : `com.finlearn.app`
- Site public : https://eliott243.github.io/finlearn/
- Politique de confidentialité : https://eliott243.github.io/finlearn/privacy.html
- Conditions : https://eliott243.github.io/finlearn/terms.html
- AAB production : `npx eas-cli login` puis `npx eas-cli build -p android --profile production`
