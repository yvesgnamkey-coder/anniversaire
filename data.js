/* ============================================================
   data.js — TOUT LE CONTENU À PERSONNALISER EST ICI
   Tu n'as besoin de modifier que ce fichier (+ ajouter tes photos
   dans le dossier "photos/").
   ============================================================ */

const CONFIG = {
  prenom: "Mon amour",          // Son prénom ou surnom
  auteur: "Gnamkey",            // Ton prénom (affiché en bas)
  sousTitre: "Aujourd'hui, le monde est plus beau parce que tu y es.",
  reponseFinale: "Tu es la plus belle chose qui me soit arrivée. Joyeux anniversaire ma chérie !",

  // Compte à rebours : date d'anniversaire au format "MM-JJ" (ex : "11-15" = 15 novembre).
  // Laisse vide ("") pour masquer le compte à rebours.
  dateAnniversaire: "10-30",

  // Mot de passe d'accès (laisse "" pour désactiver). Choisis un mot que tu es sûr qu'elle connaît.
  // Attention : protection légère, le mot de passe reste lisible dans le code du site.
  motDePasse: "moncoeur",
  indiceMotDePasse: "Indice : comment je t'appelle tout le temps ?",

  // Musique de fond : mets ton fichier dans le dossier "musique/". Laisse "" pour désactiver.
  // Si le fichier est introuvable, le bouton musique disparaît tout seul.
  musique: "musique/chanson.mp3"
};

/* Photos : mets tes images dans le dossier "photos/" puis modifie la liste.
   Si une image est introuvable, un cœur s'affiche à la place. */
const PHOTOS = [
  { src: "photos/Photo1.jfif", legende: "Notre premier souvenir ensemble" },
  { src: "photos/Photo2.jfif", legende: "Ce sourire que j'adore" },
  { src: "photos/Photo3.jfif", legende: "Un moment inoubliable" },
  { src: "photos/Photo5.jfif", legende: "Toi, simplement magnifique" },
  { src: "photos/Photo4.jfif", legende: "Les aventures avec toi" },
  { src: "photos/photo6.jpeg", legende: "Et ce n'est que le début…" }
];

/* Messages d'amour : ajoute, supprime ou modifie à ta guise. */
const MESSAGES = [
  {
    titre: "Merci d'exister",
    texte: "Depuis que tu es dans ma vie, chaque journée a une saveur particulière. Merci d'être celle que tu es."
  },
  {
    titre: "Ton sourire",
    texte: "Ton sourire a le pouvoir d'effacer mes soucis en une seconde. Je voudrais le voir tous les jours de ma vie."
  },
  {
    titre: "Ma promesse",
    texte: "Je te promets d'être là pour toi, dans les moments de joie comme dans les moments difficiles."
  },
  {
    titre: "Mon souhait",
    texte: "Pour ton anniversaire, je te souhaite tout le bonheur du monde, des rêves qui se réalisent et encore plus d'amour."
  }
];

/* Cartes « Pourquoi je t'aime » : une raison par carte (modifie, ajoute, supprime) */
const RAISONS = [
  "Ta façon de rire qui rend tout le monde heureux.",
  "Ta gentillesse, même quand personne ne regarde.",
  "Ta force dans les moments difficiles.",
  "La façon dont tu me comprends sans que je parle.",
  "Ta beauté, dehors comme dedans.",
  "Parce qu'avec toi, je me sens chez moi."
];

/* Réactions proposées sous chaque message */
const REACTIONS = ["❤️", "😍", "🥹", "😘", "🔥"];

/* La question : plus elle refuse, plus la question devient insistante 😄
   (la dernière phrase se répète tant qu'elle n'a pas dit oui) */
const QUESTIONS = [
  "Est-ce que tu m'aimes ? 🥰",
  "Tu es sûre ? Réfléchis bien… 🥺",
  "Allez, dis-moi la vérité : tu m'aimes ? 😏",
  "Je vais continuer à demander, tu sais… 😅",
  "S'il te plaît, dis oui… 🥹",
  "Je ne lâcherai pas l'affaire ! 😂",
  "Mon cœur attend ta réponse… 💔",
  "Le bouton « Oui » est tellement plus beau, non ? 👀",
  "Je peux faire ça toute la nuit ! 🌙",
  "Dis oui et on n'en parle plus ❤️"
];
