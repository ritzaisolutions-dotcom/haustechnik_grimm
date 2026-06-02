# 08 – Kontaktformular

---

## Wann Kontaktformular vs. nur Telefon?

| Kunde | Empfehlung |
|---|---|
| Telefonscheu, immer im Außendienst | Formular Pflicht |
| Hat Sekretariat / Büromitarbeiter | Telefon reicht |
| Will dokumentierte Anfragen | Formular Pflicht |
| Will Bilder vom Schaden vorab | Formular mit Upload |

**Default: Formular UND Telefon nebeneinander.**

---

## Felder – Was rein, was raus

```
PFLICHT:
□ Name (Vor- und Nachname kombiniert)
□ E-Mail
□ Telefon
□ Nachricht (Textarea)

EMPFOHLEN:
□ Betreff / Anliegen (Dropdown)
□ PLZ (für regionale Triage)
□ Datenschutz-Checkbox (PFLICHT für DSGVO)

OPTIONAL:
□ Bevorzugte Kontaktart (Telefon/E-Mail)
□ Bilder hochladen (max 3, je 5MB)
□ Bevorzugte Zeit für Rückruf

NIEMALS:
✗ Geburtsdatum
✗ Adresse vollständig (erst nach Erstkontakt)
✗ Honoraranfrage / Budget (zu invasiv)
```

---

## HTML Template

```html
<form class="contact-form" 
      id="contact-form"
      method="POST"
      action="/api/contact"
      novalidate>
  
  <!-- Honeypot (Spam-Schutz) -->
  <div style="position:absolute;left:-9999px" aria-hidden="true">
    <label for="website">Website</label>
    <input type="text" name="website" id="website" tabindex="-1" autocomplete="off">
  </div>
  
  <!-- Name -->
  <div class="form-field">
    <label for="name">Name *</label>
    <input type="text" 
           id="name" 
           name="name" 
           required 
           autocomplete="name"
           minlength="2"
           maxlength="100">
    <span class="form-error" aria-live="polite"></span>
  </div>
  
  <!-- E-Mail -->
  <div class="form-field">
    <label for="email">E-Mail *</label>
    <input type="email" 
           id="email" 
           name="email" 
           required 
           autocomplete="email"
           maxlength="254">
    <span class="form-error" aria-live="polite"></span>
  </div>
  
  <!-- Telefon -->
  <div class="form-field">
    <label for="phone">Telefon *</label>
    <input type="tel" 
           id="phone" 
           name="phone" 
           required 
           autocomplete="tel"
           pattern="[0-9\s\+\-\(\)/]{6,20}">
    <span class="form-error" aria-live="polite"></span>
  </div>
  
  <!-- Anliegen -->
  <div class="form-field">
    <label for="topic">Mein Anliegen</label>
    <select id="topic" name="topic">
      <option value="">Bitte wählen</option>
      <option value="badsanierung">Badsanierung / Renovierung</option>
      <option value="fliesenverlegung">Fliesenverlegung neu</option>
      <option value="reparatur">Reparatur</option>
      <option value="beratung">Allgemeine Beratung</option>
      <option value="sonstiges">Sonstiges</option>
    </select>
  </div>
  
  <!-- PLZ -->
  <div class="form-field">
    <label for="zip">PLZ</label>
    <input type="text" 
           id="zip" 
           name="zip"
           pattern="[0-9]{5}"
           maxlength="5"
           inputmode="numeric"
           autocomplete="postal-code">
  </div>
  
  <!-- Nachricht -->
  <div class="form-field">
    <label for="message">Ihre Nachricht *</label>
    <textarea id="message" 
              name="message" 
              required 
              rows="5"
              minlength="10"
              maxlength="2000"></textarea>
    <span class="form-error" aria-live="polite"></span>
    <span class="form-hint" id="message-counter">0 / 2000 Zeichen</span>
  </div>
  
  <!-- Datenschutz Checkbox -->
  <div class="form-field form-field--checkbox">
    <input type="checkbox" 
           id="privacy" 
           name="privacy" 
           required>
    <label for="privacy">
      Ich habe die <a href="/datenschutz.html" target="_blank">
      Datenschutzerklärung</a> zur Kenntnis genommen. 
      Ich stimme zu, dass meine Angaben zur Bearbeitung 
      meiner Anfrage gespeichert werden. *
    </label>
  </div>
  
  <!-- Submit -->
  <button type="submit" class="btn btn-primary btn-block">
    <span class="btn-text">Anfrage senden</span>
    <span class="btn-loader" hidden>...</span>
  </button>
  
  <!-- Status Messages -->
  <div class="form-status" role="status" aria-live="polite"></div>
  
</form>
```

---

## CSS

```css
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 600px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-field label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.02em;
}

.form-field input,
.form-field textarea,
.form-field select {
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg);
  font-family: inherit;
  font-size: 1rem;
  color: var(--text);
  transition: border-color var(--duration-fast),
              box-shadow var(--duration-fast);
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(184, 147, 90, 0.15);
}

.form-field input:invalid:not(:placeholder-shown) {
  border-color: var(--error);
}

.form-field--checkbox {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-2);
}

.form-field--checkbox input {
  margin-top: 4px;
  width: 18px;
  height: 18px;
}

.form-field--checkbox label {
  font-size: 0.8rem;
  line-height: 1.5;
}

.form-error {
  color: var(--error);
  font-size: 0.8rem;
  min-height: 1.2em;
}

.form-hint {
  color: var(--text-light);
  font-size: 0.75rem;
}

.form-status {
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.form-status--success {
  background: rgba(45, 106, 79, 0.1);
  color: var(--success);
  border: 1px solid var(--success);
}

.form-status--error {
  background: rgba(197, 48, 48, 0.1);
  color: var(--error);
  border: 1px solid var(--error);
}
```

---

## JavaScript Validation + Submit

```javascript
(() => {
  'use strict';
  
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const statusEl = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
  // Character Counter
  const messageEl = form.querySelector('#message');
  const counterEl = form.querySelector('#message-counter');
  messageEl.addEventListener('input', () => {
    counterEl.textContent = `${messageEl.value.length} / 2000 Zeichen`;
  });
  
  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (form.website.value) {
      console.warn('Bot detected');
      return;
    }
    
    // Manual validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    // UI: Loading state
    submitBtn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;
    statusEl.textContent = '';
    statusEl.className = 'form-status';
    
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Submit failed');
      
      // Success
      statusEl.textContent = '✓ Vielen Dank! Wir melden uns innerhalb von 24 Stunden.';
      statusEl.classList.add('form-status--success');
      form.reset();
      counterEl.textContent = '0 / 2000 Zeichen';
      
    } catch (error) {
      statusEl.textContent = '✗ Etwas ging schief. Bitte rufen Sie uns direkt an.';
      statusEl.classList.add('form-status--error');
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
    }
  });
})();
```

---

## Backend Options

| Lösung | Aufwand | Kosten |
|---|---|---|
| **Formspree** | 5 Min Setup | 0€-9€/Mo |
| **Web3Forms** | 5 Min Setup | 0€ |
| **Netlify Forms** | Wenn Hosting Netlify | 0€ |
| **Eigene PHP-Lösung** | 1h Setup | 0€ |
| **WordPress + WPForms** | Bei WP Site | Plugin-Kosten |

**Default für kleine Handwerker: Web3Forms**

```javascript
// Web3Forms Setup
const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: 'YOUR_ACCESS_KEY',
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    redirect: false
  })
});
```

---

## Spam-Schutz Layered Approach

```
Layer 1: HONEYPOT
  → Verstecktes Feld "website"
  → Bots füllen es aus, Menschen nicht
  → Wenn ausgefüllt: still verwerfen

Layer 2: RATE LIMITING
  → Max 3 Submissions pro IP pro Stunde
  → Über Backend lösen

Layer 3: SUBMISSION DELAY
  → Form-Open Timestamp speichern
  → < 3 Sekunden = Bot
  → Stil verwerfen

Layer 4: CONTENT FILTERING
  → Blacklist: URLs, "viagra", typische Spam-Begriffe
  → Wenn Match: still verwerfen

Layer 5: hCAPTCHA (nur wenn alles andere nicht reicht)
  → Privacy-friendlier als reCAPTCHA
  → DSGVO-konform mit Hetzner-Server
  → Nur einbauen wenn Spam-Problem real

VERMEIDEN: reCAPTCHA (Google, DSGVO-Albtraum)
```

---

## E-Mail Template (was Handwerker bekommt)

```
Betreff: Neue Anfrage - [TOPIC] von [NAME]

────────────────────────────────────
NEUE WEBSEITEN-ANFRAGE
────────────────────────────────────

Name:     [name]
E-Mail:   [email]
Telefon:  [phone]
PLZ:      [zip]
Anliegen: [topic]

Nachricht:
[message]

────────────────────────────────────
Eingegangen: [timestamp]
IP:          [ip]
────────────────────────────────────
```

---

## Anti-Patterns

```
✗ "Captcha" als erste Maßnahme (frustriert Kunden)
✗ Mehr als 8 Felder (Konversion sinkt mit jedem Feld)
✗ Felder ohne Labels (Accessibility!)
✗ Placeholder als Label-Ersatz (verschwinden beim Tippen)
✗ Submit-Button "Senden" (langweilig)
   → Besser: "Anfrage senden" / "Termin anfragen"
✗ Keine Erfolgs-Meldung
✗ Form ohne Lade-Indikator
✗ Reset-Button (verwirrt, niemand klickt es)
✗ Felder im Vertikal-Stack ohne max-width (zu breit)
```
