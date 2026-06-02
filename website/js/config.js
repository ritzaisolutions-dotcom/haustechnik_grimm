// ============================================================
//  GRIMM HEIZUNG & SANITÄR — Demo-Konfiguration
//  Bilder: logo-client.*, favicon-client.png, hero-poster.*
// ============================================================
const CLIENT = {
  // ── FIRMA ──────────────────────────────────────────────────
  name:                 "Sascha Grimm Heizung & Sanitär",
  nameKurz:             "Grimm",
  seoTitle:             "Sascha Grimm Heizung & Sanitär | SHK-Meisterbetrieb Lahnstein",
  unternehmenstyp:      "Meisterbetrieb",
  handwerksbezeichnung: "SHK-Fachbetrieb",
  berufsbezeichnung:    "Heizungs- und Sanitärinstallateur",
  gruendungsjahr:       "1998",
  slogan:               "Sauber geplant. Transparent kalkuliert. Persönlich umgesetzt.",
  heroEyebrow:          "SHK-Meisterbetrieb · Lahnstein · seit 1998",
  leistungenKurz:       "Bad, Heizung, Haustechnik und Lüftung aus einer Hand",

  // ── KONTAKT & ADRESSE ──────────────────────────────────────
  strasse:        "Eulenhorst 38",
  plz:            "56112",
  ort:            "Lahnstein",
  telefon:        "+4926219474004",
  telefonDisplay: "02621 947 40 04",
  fax:            "",
  faxDisplay:     "",
  email:          "info@grimm-sanitaer.de",

  // ── ONLINE ─────────────────────────────────────────────────
  domain:        "https://www.grimm-sanitaer.de",
  calcomLink:    "https://cal.com/ritzaisolutions/15min",
  web3formsKey:  "demo-key-nicht-aktiv",
  pdfSlug:       "kalkulation",

  // ── WHATSAPP ───────────────────────────────────────────────
  whatsapp:            "+4917621900432",
  whatsappVornachricht: "Hallo, ich interessiere mich für eine Beratung.",
  whatsappFoerderung:   "Ich möchte meine Fördermöglichkeiten prüfen lassen.",

  // ── TERMINBUCHUNG VARIANTE ─────────────────────────────────
  terminVariante: "calcom",

  // ── GOOGLE ─────────────────────────────────────────────────
  googleMapsEmbedUrl:    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.8!2d7.6077!3d50.3359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47859c2f8c8c8c8d%3A0x0!2sEulenhorst%2038%2C%2056112%20Lahnstein!5e0!3m2!1sde!2sde!4v1717000000000!5m2!1sde!2sde",
  googleBewertungsLink:  "https://www.klimatechniker.net/lahnstein/grimm-heizung-sanitaer-aUPsMi",
  googleBewertungAnzahl: "32",
  googleBewertungNote:   "4,8",
  bewertungsQuelleLabel: "Kundenbewertungen",
  bewertungsMetaLabel:   "Bewertungen",
  bewertungenCards: [
    {
      titel: "Zuverlässigkeit",
      text: "Termine, Rückrufe und Absprachen werden für Kunden greifbar, bevor sie ihr Projekt anfragen."
    },
    {
      titel: "Saubere Baustelle",
      text: "Gerade bei Bad und Heizung zählt nicht nur das Ergebnis, sondern auch ein ordentlicher Ablauf im eigenen Zuhause."
    },
    {
      titel: "Klare Kommunikation",
      text: "Ein fester Ansprechpartner reduziert Unsicherheit, Nachfragen und das Gefühl, an mehrere Stellen verwiesen zu werden."
    },
    {
      titel: "Qualität der Arbeit",
      text: "Meisterbetrieb, Markenprodukte und BOSCH Premium Partnerschaft stützen die Entscheidung für langlebige Lösungen."
    }
  ],

  // ── ÖFFNUNGSZEITEN ─────────────────────────────────────────
  oeffnungszeiten: {
    moDoVon: "07:30",
    moDoBis: "16:30",
    frVon:   "07:30",
    frBis:   "13:30"
  },

  // ── LEISTUNGEN (Startseite, 4 Karten) ──────────────────────
  leistung1Titel: "Bad",
  leistung1Text:  "Von der Badmodernisierung bis zum barrierefreien Komfortbad — wir planen und realisieren Ihr Traumbad. Inklusive Förderberatung.",
  leistung2Titel: "Heizung",
  leistung2Text:  "Heizungsmodernisierung, Wärmepumpen und regenerative Systeme. Als BOSCH Premium Partner mit bevorzugter Ersatzteilversorgung.",
  leistung3Titel: "Haustechnik",
  leistung3Text:  "Trinkwasserhygiene, Rohrinstallation und Haustechnik-Service aus einer Hand. Schnell, sauber, zuverlässig.",
  leistung4Titel: "Lüftung",
  leistung4Text:  "Dezentrale und zentrale Wohnraumlüftung sowie Klimaanlagen für Ihr Wohlfühlklima — das ganze Jahr über.",

  // ── WARUM-WIR (Startseite, 4 Punkte) ───────────────────────
  warumLabel:  "Warum Grimm",
  warum1Titel: "Keine Überraschungen",
  warum1Text:  "Sie erhalten vor Beginn eine transparente Kostenaufstellung und eine ehrliche Einschätzung, was wirklich sinnvoll ist.",
  warum2Titel: "Kein Durchreichen",
  warum2Text:  "Von der ersten Anfrage bis zur Übergabe haben Sie einen festen Ansprechpartner und klare Absprachen.",
  warum3Titel: "Keine Billiglösung",
  warum3Text:  "Als SHK-Meisterbetrieb und BOSCH Premium Partner setzen wir auf langlebige Markentechnik statt schnelle Kompromisse.",
  warum4Titel: "Keine Baustellenhektik",
  warum4Text:  "Wir planen sauber, arbeiten ordentlich und stimmen Termine so ab, dass Ihr Alltag möglichst wenig gestört wird.",

  // ── REFERENZEN ─────────────────────────────────────────────
  referenzenIntro: "Auswahl abgeschlossener Projekte aus Lahnstein und Umgebung.",

  // ── ÜBER UNS TEXT ──────────────────────────────────────────
  ueberUns: [
    "Seit 1998 ist Sascha Grimm Heizung & Sanitär in Lahnstein und der Rhein-Lahn-Region zu Hause. Was Kunden an uns schätzen: ein eingespieltes Team, klare Absprachen und handwerklich saubere Arbeit ohne Umwege.",
    "Wir sind kein anonymer Großbetrieb. Sie sprechen mit Menschen, die Ihr Projekt kennen — vom ersten Gespräch über die Planung bis zur fertigen Umsetzung. Deshalb gibt es bei uns transparente Angebote, verlässliche Termine und einen festen Ansprechpartner.",
    "Als SHK-Meisterbetrieb und BOSCH Premium Partner verbinden wir regionales Handwerk mit zuverlässiger Markentechnik. Ob Komplettbad, neue Heizung, Klimaanlage oder Service: Wir sagen ehrlich, was sinnvoll ist, und setzen es ordentlich um."
  ],

  // ── DOKUMENT-BILDER (Über-uns-Sektion) ─────────────────────
  dokBild1: "partner-bosch-premium",
  dokBild2: "partner-bosch-split",
  dokBild3: "",

  // ── TEAM (team.html) ───────────────────────────────────────
  team1Name:  "Sascha Grimm",
  team1Rolle: "Inhaber · Heizung & Sanitär",
  team1Init:  "S",
  team2Name:  "",
  team2Rolle: "",
  team2Init:  "",
  team3Name:  "",
  team3Rolle: "",
  team3Init:  "",

  // ── KOSTENRECHNER ──────────────────────────────────────────
  kostenrechnerAktiv: true,

  // SHK-Kostenrechner (Schritt 3 — implementation_plan2)
  calcShkPreise: {
    bad:         { standard: 550,  komfort: 750,  premium: 1100 },
    heizung:     { standard: 8000, komfort: 12000, premium: 18000 },
    haustechnik: { standard: 800,  komfort: 1200, premium: 1800 },
    lueftung:    { standard: 6000, komfort: 9000, premium: 14000 },
    reparatur:   { standard: 150,  komfort: 150,  premium: 150 }
  },

  preise: {
    standard:           135,
    premium:            240,
    xl:                 330,
    altbelagEntfernen:  45,
    abdichtung:         60,
    fussbodenheizung:   28
  },

  calcProjekte: [
    { id: "bath",    label: "Badsanierung",           multi: 1.3  },
    { id: "floor",   label: "Heizungsmodernisierung", multi: 1.0  },
    { id: "terrace", label: "Lüftung & Klima",        multi: 1.15 },
    { id: "repair",  label: "Service & Reparatur",    multi: 0.9  }
  ],
  calcMaterialien: [
    { id: "standard", label: "Standard", desc: "Solide Ausstattung ca. 135 €/m²" },
    { id: "premium",  label: "Premium",  desc: "Hochwertige Marken ca. 240 €/m²" },
    { id: "xl",       label: "Design",   desc: "Premium-Design ca. 330 €/m²" }
  ],
  calcExtras: [
    { id: "debris",        label: "Demontage Altanlage", desc: "+ ca. 45 €/m²" },
    { id: "waterproofing", label: "Abdichtung",          desc: "+ ca. 60 €/m²" },
    { id: "floorHeating",  label: "Fußbodenheizung",     desc: "+ ca. 28 €/m²" }
  ],

  // ── KONTAKTFORMULAR ────────────────────────────────────────
  kontaktformularAktiv: true,

  kontaktAnliegen: [
    { value: "bad",       label: "Bad / Sanitär"              },
    { value: "heizung",   label: "Heizung / Wärmepumpe"       },
    { value: "service",   label: "Wartung / Service"          },
    { value: "allgemein", label: "Allgemeine Anfrage"         }
  ],

  // ── SOCIAL MEDIA ───────────────────────────────────────────
  facebook:  "https://www.facebook.com/people/Grimm-Heizung-Sanit%C3%A4r/100063651055887/",
  instagram: "https://www.instagram.com/grimmheizungsanitaerklima/",

  // ── FARBEN (Grimm-Logo) ────────────────────────────────────
  colors: {
    primary:      "#3A3A3A",
    primaryDark:  "#2A2A2A",
    primaryMid:   "#454545",
    primaryLight: "#555555",
    accent:       "#4AAEDC",
    accentHover:  "#3A9ECC",
    accentLight:  "#E8F6FC"
  },

  // ── SEO & SCHEMA.ORG ───────────────────────────────────────
  branche:  "HomeAndConstructionBusiness",
  geoLat:   "50.3359",
  geoLng:   "7.6077",

  // ── KAMMER & VERBAND (für Impressum) ───────────────────────
  kammer:      "Handwerkskammer Koblenz",
  fachverband: "SHK-Innung Rhein-Lahn",

  // ── DATENSCHUTZ ────────────────────────────────────────────
  bundesland:           "Rheinland-Pfalz",
  aufsichtsbehoerde:    "Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz",
  aufsichtsbehoerdeUrl: "https://www.datenschutz.rlp.de",

  // ── TEAM & STATS ───────────────────────────────────────────
  jahreErfahrung:    "25",
  teamGroesse:       "8",
  bewertungenAnzahl: "32",
  projekteAnzahl:    "500+",

  // ── INTERN ─────────────────────────────────────────────────
  klaroStorageName: "grimm-consent-v1"
};
