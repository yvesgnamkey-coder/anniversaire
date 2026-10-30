# Site d'anniversaire ❤️

## Architecture du projet

```
anniversaire/
├── index.html      → Structure des sections
├── style.css       → Thème romantique + responsive (mobile / PC)
├── data.js         → TOUT le contenu à personnaliser
├── script.js       → Logique : galerie, réactions, formulaire, animations
├── README.md       → Ce guide
├── photos/         → Tes images (photo1.jpg, photo2.jpg…)
└── musique/        → Ta chanson (chanson.mp3)
```

## Séparation des responsabilités

| Fichier | Rôle | Tu le modifies ? |
|---|---|---|
| `data.js` | Contenu (textes, photos, messages, raisons, mot de passe, date, musique) | Oui, c'est le seul |
| `index.html` | Squelette de la page | Rarement |
| `style.css` | Couleurs, mise en page | Si tu veux changer le style |
| `script.js` | Comportement | Non |

## Parcours de la visiteuse

0. **Mot de passe** (optionnel) : écran verrouillé avec un indice. Le bon mot lance aussi la musique.
1. **Accueil** : titre « Joyeux anniversaire, [prénom] 🎂 », **compte à rebours** jusqu'à son anniversaire, cœurs flottants.
2. **Photos** : galerie en grille, clic pour agrandir. Une image manquante est remplacée par un cœur.
3. **Messages d'amour** : cartes avec 5 réactions (❤️ 😍 🥹 😘 🔥), mémorisées sur son appareil.
4. **Pourquoi je t'aime** : cartes à retourner, une raison par carte.
5. **Question** : « Est-ce que tu m'aimes ? » Seul « Oui » valide : « Non » fait changer la question à l'infini, « Oui » grossit, « Non » s'enfuit. Réponse finale : « Je t'aime aussi ❤️ » + confettis.

Un bouton 🎵 en bas à droite permet de couper ou relancer la musique.

## Réglages (tout dans `data.js` → `CONFIG`)

| Option | Effet |
|---|---|
| `dateAnniversaire: "11-15"` | Compte à rebours (format `MM-JJ`). `""` pour le masquer. Le jour J, il affiche « C'est aujourd'hui ! ». |
| `motDePasse: "moncoeur"` | Mot secret demandé à l'entrée (majuscules ignorées). `""` pour désactiver. **Pense à le changer.** |
| `indiceMotDePasse` | Indice affiché sous le cadenas. |
| `musique: "musique/chanson.mp3"` | Chemin du fichier audio. `""` pour désactiver. Fichier introuvable = bouton masqué. |
| `RAISONS` | Liste des cartes « Pourquoi je t'aime ». |

## Mise en route

1. Crée le dossier `anniversaire/` avec les 5 fichiers, plus `photos/` et `musique/`.
2. Ajoute tes photos et ta chanson, puis adapte `data.js`.
3. Ouvre `index.html` pour tester (double-clic).
4. Mets en ligne gratuitement : **Netlify Drop** (glisse le dossier sur netlify.com/drop), **GitHub Pages** ou **Vercel**.

## Limites à connaître

- **Mot de passe** : protection légère, pas une vraie sécurité. Le mot est lisible dans `data.js` pour quelqu'un qui inspecte le code. Suffisant pour une surprise, pas pour un secret.
- **Musique** : les navigateurs interdisent le démarrage automatique du son. Elle se lance au clic sur « Ouvrir » (si mot de passe) ou sur le bouton 🎵.
- **Réactions** : enregistrées uniquement sur son appareil. Pour les recevoir, il faudrait un petit backend (Firebase, Supabase).

## Idées d'évolution restantes

- Recevoir ses réactions en temps réel (backend)
- Vidéo-message de ta part
- Carte « Notre histoire » : frise chronologique de vos dates importantes
