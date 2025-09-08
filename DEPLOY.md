# 🚀 Guia Completo de Deploy - MeowFlix

Este guia te levará do zero ao deploy completo do MeowFlix no Netlify em **menos de 10 minutos**!

---

## 📋 Pré-requisitos

Antes de começar, você precisa de:

- ✅ Conta no [GitHub](https://github.com)
- ✅ Conta no [Netlify](https://netlify.com) (grátis)
- ✅ Conta no [Google AI Studio](https://ai.google.dev) (grátis)
- ✅ Conta no [TMDB](https://www.themoviedb.org) (grátis)

---

## 🔑 Passo 1: Configurar as APIs

### 🤖 Google Gemini AI

1. **Acesse**: [Google AI Studio](https://ai.google.dev)
2. **Faça login** com sua conta Google
3. **Clique em** "Get API Key"
4. **Crie uma nova API Key**
5. **⚠️ IMPORTANTE**: Copie e salve a chave (você só verá uma vez!)

```
Sua API Key será algo assim:
AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

### 🎬 TMDB (The Movie Database)

1. **Acesse**: [TMDB](https://www.themoviedb.org)
2. **Crie uma conta** (gratuita)
3. **Vá para**: Settings > API
4. **Aceite os termos** de uso da API
5. **Copie o Bearer Token** (NÃO a API Key!)

```
Seu Bearer Token será algo assim:
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3ODkwYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoiLCJzdWIiOiI2MGY5...
```

---

## 📁 Passo 2: Preparar o Repositório

### Option A: Fork este repositório

1. **Fork** este repositório no GitHub
2. **Clone** seu fork localmente:
```bash
git clone https://github.com/ipierette/meowflix-ai-mood-matcher.git
cd meowflix-ai-mood-matcher
```

### Option B: Upload manual

1. **Baixe** ou clone este repositório
2. **Crie um novo repositório** no seu GitHub
3. **Faça upload** dos arquivos

---

## 🌐 Passo 3: Deploy no Netlify

### 3.1 Conectar Repositório

1. **Acesse**: [Netlify](https://netlify.com) e faça login
2. **Clique em**: "New site from Git"
3. **Escolha**: GitHub
4. **Autorize** o Netlify a acessar seus repositórios
5. **Selecione** o repositório do MeowFlix

### 3.2 Configurar Build

O Netlify detectará automaticamente as configurações do `netlify.toml`, mas confirme:

```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

### 3.3 Adicionar Variáveis de Ambiente

**ANTES DE FAZER O DEPLOY**, adicione as variáveis:

1. **Vá para**: Site settings > Environment variables
2. **Adicione as duas variáveis**:

| Variable | Value |
|----------|-------|
| `GOOGLE_GEMINI_API_KEY` | Sua API Key do Google Gemini |
| `TMDB_API_TOKEN` | Seu Bearer Token do TMDB |

### 3.4 Finalizar Deploy

1. **Clique em**: "Deploy site"
2. **Aguarde** o build (3-5 minutos)
3. **🎉 Pronto!** Seu site estará no ar

---

## ✅ Passo 4: Verificar o Deploy

### 4.1 Testando as Funcionalidades

1. **Acesse** seu site no Netlify
2. **Digite** uma mensagem de humor no campo de texto
3. **Clique** em "Encontrar meu filme"
4. **Verifique** se:
   - ✅ A IA responde em português
   - ✅ O filme tem poster, sinopse e detalhes
   - ✅ Os dados estão corretos

### 4.2 Verificar Functions

1. **Vá para**: Functions tab no Netlify
2. **Verifique** se `recommend-movie` está ativa
3. **Confira** os logs em caso de erro

---

## 🐛 Solução de Problemas

### ❌ Erro: "Function not found"

**Causa**: Função não foi deployada corretamente

**Solução**:
1. Verifique se a pasta `netlify/functions/` existe
2. Confirme que `netlify.toml` está na raiz
3. Redeploy manual: "Deploys" > "Trigger deploy" > "Deploy site"

### ❌ Erro: "API Key inválida"

**Causa**: Variáveis de ambiente incorretas

**Solução**:
1. Vá para "Site settings" > "Environment variables"
2. Verifique se os nomes estão exatos:
   - `GOOGLE_GEMINI_API_KEY`
   - `TMDB_API_TOKEN`
3. Regenere as chaves se necessário
4. Redeploy após alterar variáveis

### ❌ Erro: "Movie not found"

**Causa**: TMDB não encontrou o filme

**Solução**:
1. Verifique se o Bearer Token do TMDB está correto
2. Teste com prompts mais específicos
3. Confirme se a API do TMDB está funcionando

### ❌ Erro de CORS

**Causa**: Problemas de domínio/origem

**Solução**:
1. Verifique se está acessando pelo domínio correto do Netlify
2. Aguarde alguns minutos para propagação
3. Limpe cache do navegador

---

## 🔄 Atualizações Futuras

### Deploy Automático

Toda vez que você fizer push para o branch principal:

1. **Netlify detecta** automaticamente
2. **Executa** novo build
3. **Deploy** automático em ~3 minutos

### Deploy Manual

Para forçar um novo deploy:

1. **Netlify Dashboard** > seu site
2. **"Deploys"** > "Trigger deploy" > "Deploy site"

---

## 📊 Monitoramento

### Analytics

1. **Netlify Analytics**: Vá para "Analytics" no dashboard
2. **Functions**: Monitore uso em "Functions" > "recommend-movie"
3. **Logs**: Verifique erros em tempo real

### Limites Gratuitos

- **Netlify**: 100GB banda/mês, 300 min build/mês
- **Google Gemini**: 60 requests/minuto (gratuito)
- **TMDB**: 40 requests/10s (gratuito)

---

## 🎯 Domínio Personalizado (Opcional)

### Configurar Domínio Próprio

1. **Compre** um domínio (ex: Namecheap, GoDaddy)
2. **Netlify** > "Domain settings" > "Add custom domain"
3. **Configure** DNS apontando para Netlify
4. **SSL automático** será configurado

### Subdomínio Netlify Customizado

1. **Site settings** > "Domain management"
2. **"Change site name"**
3. **Escolha**: `meu-meowflix.netlify.app`

---

## 🚀 Pronto para Produção!

Seu MeowFlix agora está:

- ✅ **No ar** 24/7 com CDN global
- ✅ **SSL** automático (HTTPS)
- ✅ **Escalável** automaticamente
- ✅ **Monitorado** com analytics
- ✅ **Deploy contínuo** via Git

### 📞 Suporte

Se tiver problemas:

1. **Verifique** este guia novamente
2. **Consulte** os logs do Netlify
3. **Abra uma issue** no GitHub do projeto
4. **Documente** o erro com screenshots

---

<div align="center">
  
  **🎉 Parabéns! Seu MeowFlix está no ar! 🎉**
  
  *Agora é só compartilhar e começar a recomendar filmes! 🍿*
  
</div>
