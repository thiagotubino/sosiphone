# Design Spec: Tema Alternativo com Cores Amarelo Neon e Cinza

## Visão Geral
Criar uma versão alternativa da landing page SOS iPhone com paleta de cores diferente para comparação visual. O tema alternativo usa amarelo neon (#D4FF00) como cor de destaque e cinza escuro (#1A1A1A) como fundo, substituindo o vermelho vivo (#FF2D2D) e near-black (#08080C) originais.

## Objetivo
- Permitir que o usuário compare visualmente duas paletas de cores diferentes
- Manter a mesma hierarquia visual e contraste
- Fornecer mecanismo fácil para alternar entre os temas

## Paleta de Cores

### Tema Original (Vermelho)
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#08080C` | Fundo principal |
| `--bg-surface` | `#101018` | Superfícies |
| `--bg-raised` | `#18182A` | Elementos elevados |
| `--text` | `#F0F0F5` | Texto principal |
| `--text-secondary` | `#8888A0` | Texto secundário |
| `--red` | `#FF2D2D` | Cor primária |
| `--red-hover` | `#FF4D4D` | Hover primário |
| `--red-glow` | `rgba(255, 45, 45, 0.15)` | Efeitos glow |

### Tema Alternativo (Amarelo Neon)
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#1A1A1A` | Fundo principal |
| `--bg-surface` | `#2D2D2D` | Superfícies |
| `--bg-raised` | `#3D3D3D` | Elementos elevados |
| `--text` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#B0B0B0` | Texto secundário |
| `--red` | `#D4FF00` | Cor primária (amarelo neon) |
| `--red-hover` | `#E5FF00` | Hover primário |
| `--red-glow` | `rgba(212, 255, 0, 0.15)` | Efeitos glow |

## Implementação Técnica

### 1. Arquivo CSS Alternativo
- **Localização:** `css/alt-theme.css`
- **Conteúdo:** Variáveis CSS do tema alternativo dentro de `.alt-theme`
- **Carregamento:** Condicional via JavaScript

### 2. Estrutura CSS
```css
.alt-theme {
  --bg: #1A1A1A;
  --bg-surface: #2D2D2D;
  --bg-raised: #3D3D3D;
  --border: #404040;
  --border-hover: #505050;
  --text: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-muted: #808080;
  --red: #D4FF00;
  --red-hover: #E5FF00;
  --red-glow: rgba(212, 255, 0, 0.15);
}
```

### 3. Mecanismo de Alternância
- **Botão Toggle:** Ícone de lua/sol no canto superior direito da nav
- **Posição:** `position: fixed; top: 1rem; right: 1rem;`
- **Estilo:** Fundo semi-transparente, borda arredondada, tamanho 40px
- **Funcionamento:** 
  1. Adiciona/remove classe `alt-theme` no `<body>`
  2. Salva preferência no `localStorage`
  3. Carrega tema salvo ao inicializar

### 4. JavaScript
```javascript
// Função para alternar tema
function toggleTheme() {
  const body = document.body;
  const isAlt = body.classList.toggle('alt-theme');
  localStorage.setItem('sos-iphone-theme', isAlt ? 'alt' : 'original');
}

// Carregar tema salvo
function loadSavedTheme() {
  const saved = localStorage.getItem('sos-iphone-theme');
  if (saved === 'alt') {
    document.body.classList.add('alt-theme');
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadSavedTheme);
```

## Impactos Visuais

### CTAs e Botões
- Botões principais: amarelo neon (#D4FF00) ao invés de vermelho (#FF2D2D)
- Hover: amarelo mais claro (#E5FF00) ao invés de vermelho claro (#FF4D4D)
- Efeitos glow: brilho amarelo ao invés de vermelho

### Fundo e Superfícies
- Fundo principal: cinza escuro (#1A1A1A) ao invés de near-black (#08080C)
- Cards e superfícies: cinza médio (#2D2D2D) ao invés de #101018
- Bordas: cinza (#404040) ao invés de #1E1E30

### Texto
- Texto principal: branco puro (#FFFFFF) ao invés de off-white (#F0F0F5)
- Texto secundário: cinza claro (#B0B0B0) ao invés de #8888A0

### Elementos Especiais
- WhatsApp botão: mantém verde (#22C55E) - não afetado
- Ícones de serviço (na seção #servicos): usam nova cor de destaque (#D4FF00)
- Efeitos de partículas (hero): usam nova cor de destaque (#D4FF00)
- Ícones gerais (nav, footer): mantêm cores atuais (branco/cinza)

## Restrições

1. **Contraste:** Manter WCAG AA mínimo (4.5:1 para texto corpo)
2. **Hierarquia:** Manter mesma importância visual entre elementos
3. **Consistência:** Todos os componentes devem usar a nova paleta
4. **Compatibilidade:** Tema original deve continuar funcionando normalmente

## Critérios de Sucesso

1. Usuário pode alternar entre temas com um clique
2. Preferência é salva e restaurada em visitas futuras
3. Todos os componentes visuais usam a nova paleta
4. Contraste e hierarquia visual são mantidos
5. Não há quebras de layout ou funcionamento

## Fora do Escopo

- Alterações na estrutura HTML
- Novos componentes ou funcionalidades
- Alterações no conteúdo textual
- Modificações no JavaScript existente (além do toggle)
