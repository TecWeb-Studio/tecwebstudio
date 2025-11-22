# AI Chat Setup Guide

La chat AI è stata integrata nel tuo sito. Ecco come configurarla e usarla.

## 🚀 Setup Rapido

### 1. OpenAI API Key
1. Vai su [platform.openai.com](https://platform.openai.com/api/keys)
2. Crea una nuova API key
3. Copia la chiave nel file `.env.local` (già creato):
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

### 2. Aggiungi i tuoi PDF
1. Crea una cartella `public/documents/` (già creata)
2. Aggiungi i tuoi PDF in quella cartella
   - Esempio: `public/documents/company-info.pdf`, `public/documents/services.pdf`
3. Al restart del dev server, i PDF verranno caricati automaticamente

### 3. Avvia il server
```bash
npm run dev
```
Apri http://localhost:3000

## 📁 Struttura File Creati

```
public/
  └─ documents/          # 📄 Metti qui i tuoi PDF
lib/
  └─ pdfLoader.ts        # Utility per parsing PDF
app/
  ├─ api/
  │  └─ chat/
  │     └─ route.ts      # Endpoint API POST /api/chat
  └─ components/
     └─ ChatWidget.tsx   # Componente chat UI
```

## 🔧 Come Funziona

1. **Utente clicca il bottone chat** (in basso a destra, accanto al cambio lingua)
2. **Digita una domanda** (es. "Quali servizi offrite?")
3. **Frontend invia richiesta** a `/api/chat`
4. **Backend:**
   - Carica tutti i PDF da `public/documents/`
   - Cerca il contesto rilevante alla domanda
   - Chiama OpenAI API con il contesto
   - Ritorna la risposta
5. **Chat mostra la risposta** in tempo reale

## 📊 Limitazioni & Features

✅ **Incluso:**
- Retrieval intelligente dei PDF basato su keywords
- Chat persistente durante la sessione (localStorage browser)
- Error handling e loading states
- Supporto lingue multiple (risponde nella lingua della domanda)

⚠️ **Limitazioni:**
- Solo keyword-based retrieval (non semantico)
- Niente database: i messaggi non sono salvati tra i refresh
- Rate limiting consigliato (vedi sotto)

## 🔒 Sicurezza

- La chiave OpenAI è **solo nel backend** (`.env.local` non è committato)
- Gli utenti non possono uploadare documenti (protetto)
- Metti un rate limiter prima di production:

```typescript
// app/api/chat/route.ts
const rateLimit = new Map();

export async function POST(request: NextRequest) {
  const ip = request.ip || "unknown";
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recentRequests = userRequests.filter((t) => now - t < 60000);
  
  if (recentRequests.length > 10) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  // ... rest della logica
}
```

## 💰 Costi

- **OpenAI GPT-4o mini**: ~$0.0003 per chat media
- **Hosting**: Gratis (Vercel serverless)
- 1000 chat/mese ≈ $0.30

## 🐛 Troubleshooting

### "Unable to load documents"
→ Verifica che i PDF siano in `public/documents/`

### "OpenAI API key not configured"
→ Aggiungi `OPENAI_API_KEY` in `.env.local` e restart il dev server

### La chat non risponde
→ Controlla la console (F12) per errori di rete

## 🚀 Prossimi Step (Opzionali)

1. **RAG Semantico**: usa `LangChain` con embeddings per ricerche migliori
2. **Vector DB**: salva embeddings in Pinecone/Supabase
3. **Chat History**: salva conversazioni in un database
4. **Analytics**: monitora domande frequenti
5. **Fine-tuning**: customizza il modello su dati aziendali

Domande? Fai pure sapere! 🚀
