# Tema Alternativo com Cores Amarelo Neon e Cinza - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma versão alternativa da landing page SOS iPhone com paleta de cores amarelo neon (#D4FF00) e cinza escuro (#1A1A1A), permitindo alternância entre o tema original (vermelho) e o alternativo.

**Architecture:** Criar um arquivo CSS separado com as variáveis do tema alternativo, adicionar JavaScript para alternância com persistência no localStorage, e incluir um botão toggle na interface.

**Tech Stack:** CSS Variables, JavaScript vanilla, localStorage API

## Global Constraints

- Tema original (vermelho #FF2D2D, fundo #08080C) deve continuar funcionando normalmente
- Contraste mínimo WCAG AA (4.5:1 para texto corpo) deve ser mantido
- Hierarquia visual deve ser preservada entre os dois temas
- Preferência do usuário deve ser salva no localStorage

---

## Mapeamento de Arquivos

### Arquivos a Criar
- `css/alt-theme.css` - Paleta de cores do tema alternativo
- `js/theme-toggle.js` - JavaScript para alternância de temas

### Arquivos a Modificar
- `index.html` - Adicionar link para CSS alternativo e script de toggle
- `css/styles.css` - Nenhuma modificação necessária (usa variáveis CSS existentes)
- `js/main.js` - Nenhuma modificação necessária

---

## Tarefa 1: Criar Arquivo CSS do Tema Alternativo

**Files:**
- Create: `css/alt-theme.css`

**Interfaces:**
- Consumes: Variáveis CSS existentes em `:root` (definidas em `css/styles.css`)
- Produz: Classe `.alt-theme` com variáveis CSS substituídas

- [ ] **Step 1: Criar arquivo CSS com paleta alternativa**

```css
/* css/alt-theme.css */
/* Tema Alternativo: Amarelo Neon (#D4FF00) + Cinza Escuro (#1A1A1A) */

.alt-theme {
  /* Fundo e Superfícies */
  --bg: #1A1A1A;
  --bg-surface: #2D2D2D;
  --bg-raised: #3D3D3D;
  --border: #404040;
  --border-hover: #505050;

  /* Texto */
  --text: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-muted: #808080;

  /* Cor Primária (Amarelo Neon) */
  --red: #D4FF00;
  --red-hover: #E5FF00;
  --red-glow: rgba(212, 255, 0, 0.15);

  /* Verde (WhatsApp) - não alterado */
  --green: #22C55E;
}
```

- [ ] **Step 2: Verificar se o arquivo foi criado corretamente**

Executar: `dir css\alt-theme.css`
Esperado: Arquivo existe com tamanho > 0

- [ ] **Step 3: Commit**

```bash
git add css/alt-theme.css
git commit -m "feat: adiciona paleta CSS do tema alternativo amarelo neon"
```

---

## Tarefa 2: Criar JavaScript para Alternância de Temas

**Files:**
- Create: `js/theme-toggle.js`

**Interfaces:**
- Consumes: Classe `.alt-theme` definida em `css/alt-theme.css`
- Produz: Funções `toggleTheme()` e `loadSavedTheme()`

- [ ] **Step 1: Criar arquivo JavaScript com funções de alternância**

```javascript
// js/theme-toggle.js

// Função para alternar tema
function toggleTheme() {
  const body = document.body;
  const isAlt = body.classList.toggle('alt-theme');
  localStorage.setItem('sos-iphone-theme', isAlt ? 'alt' : 'original');
  
  // Atualizar ícone do botão
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = isAlt ? '☀️' : '🌙';
    toggleBtn.title = isAlt ? 'Tema Original (Vermelho)' : 'Tema Alternativo (Amarelo Neon)';
  }
}

// Carregar tema salvo
function loadSavedTheme() {
  const saved = localStorage.getItem('sos-iphone-theme');
  if (saved === 'alt') {
    document.body.classList.add('alt-theme');
    // Atualizar ícone após carregar
    setTimeout(() => {
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) {
        toggleBtn.textContent = '☀️';
        toggleBtn.title = 'Tema Original (Vermelho)';
      }
    }, 100);
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedTheme);
} else {
  loadSavedTheme();
}
```

- [ ] **Step 2: Verificar se o arquivo foi criado corretamente**

Executar: `dir js\theme-toggle.js`
Esperado: Arquivo existe com tamanho > 0

- [ ] **Step 3: Commit**

```bash
git add js/theme-toggle.js
git commit -m "feat: adiciona JavaScript para alternância de temas"
```

---

## Tarefa 3: Modificar HTML para Incluir Novos Recursos

**Files:**
- Modify: `index.html` (linhas 10-15 para CSS, linha 200+ para JavaScript)

**Interfaces:**
- Consumes: `css/alt-theme.css` e `js/theme-toggle.js`
- Produz: Elemento HTML para botão toggle

- [ ] **Step 1: Adicionar link CSS alternativo no head**

Localizar a linha `<link rel="stylesheet" href="css/styles.css">` e adicionar após ela:

```html
<link rel="stylesheet" href="css/alt-theme.css">
```

- [ ] **Step 2: Adicionar botão toggle na navegação**

Localizar o elemento `<nav>` e adicionar botão toggle antes do fechamento:

```html
<button id="theme-toggle" 
        onclick="toggleTheme()" 
        style="position: fixed; top: 1rem; right: 1rem; z-index: 1000; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; backdrop-filter: blur(10px);"
        title="Tema Alternativo (Amarelo Neon)">
  🌙
</button>
```

- [ ] **Step 3: Adicionar script JavaScript antes do fechamento da body**

Localizar a linha `</body>` e adicionar antes:

```html
<script src="js/theme-toggle.js"></script>
```

- [ ] **Step 4: Verificar se as alterações foram feitas corretamente**

Executar: `findstr "alt-theme.css" index.html`
Esperado: Encontra a linha com o link CSS

Executar: `findstr "theme-toggle.js" index.html`
Esperado: Encontra a linha com o script JavaScript

Executar: `findstr "theme-toggle" index.html`
Esperado: Encontra o botão toggle

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: adiciona botão toggle e recursos do tema alternativo no HTML"
```

---

## Tarefa 4: Testar Funcionalidade

**Files:**
- Test: Verificar visualmente no navegador

**Interfaces:**
- Consumes: Todos os arquivos criados/modificados nas tarefas anteriores
- Produz: Confirmação de que a alternância funciona

- [ ] **Step 1: Abrir index.html no navegador**

Abrir o arquivo `index.html` em um navegador web

- [ ] **Step 2: Verificar tema original**

Verificar se:
- Fundo é near-black (#08080C)
- CTAs e botões são vermelhos (#FF2D2D)
- Texto é off-white (#F0F0F5)

- [ ] **Step 3: Clicar no botão toggle**

Clicar no botão 🌙 no canto superior direito

- [ ] **Step 4: Verificar tema alternativo**

Verificar se:
- Fundo é cinza escuro (#1A1A1A)
- CTAs e botões são amarelo neon (#D4FF00)
- Texto é branco (#FFFFFF)
- Botão toggle mudou para ☀️

- [ ] **Step 5: Testar persistência**

Recarregar a página e verificar se o tema alternativo continua ativo

- [ ] **Step 6: Testar retorno ao tema original**

Clicar no botão ☀️ e verificar se volta ao tema original (vermelho)

- [ ] **Step 7: Testar persistência do tema original**

Recarregar a página e verificar se o tema original continua ativo

---

## Tarefa 5: Verificação Final e Limpeza

**Files:**
- Verify: Todos os arquivos criados/modificados

**Interfaces:**
- Consumes: Todos os arquivos das tarefas anteriores
- Produz: Confirmação de que tudo está funcionando

- [ ] **Step 1: Verificar ausência de erros no console**

Abrir DevTools do navegador e verificar se não há erros no console

- [ ] **Step 2: Verificar responsividade**

Testar em diferentes tamanhos de tela (desktop, tablet, mobile) para garantir que o botão toggle não quebra o layout

- [ ] **Step 3: Verificar acessibilidade**

Verificar se o botão toggle tem:
- `title` attribute para screen readers
- Contraste adequado com o fundo
- Tamanho adequado para cliques (mínimo 44x44px)

- [ ] **Step 4: Criar commit final**

```bash
git add -A
git commit -m "feat: implementa tema alternativo amarelo neon completo"
```

---

## Notas de Implementação

1. **Variáveis CSS:** O tema alternativo sobrescreve apenas as variáveis necessárias. Outras variáveis (como `--green` para WhatsApp) são mantidas do tema original.

2. **Persistência:** A preferência é salva no `localStorage` com a chave `sos-iphone-theme` e valores `'alt'` ou `'original'`.

3. **Botão Toggle:** Posicionado fixo no canto superior direito, com estilo semi-transparente para não interferir com o conteúdo.

4. **Ícones:** Usa emojis (🌙/☀️) para simplicidade. Pode ser substituído por SVGs ou ícones de biblioteca se necessário.

5. **Performance:** O CSS alternativo é carregado sempre, mas as variáveis só são aplicadas quando a classe `.alt-theme` está presente no `<body>`.
