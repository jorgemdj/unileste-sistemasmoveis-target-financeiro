# 🎯 Target — App de Metas Financeiras

Expo SDK 54 · React Native 0.79 · React 19 · Expo Router 4

---

## 🚀 Setup completo (do zero)

### 1. Crie o projeto

```bash
npx create-expo-app@latest target --template blank-typescript
cd target
```

### 2. Instale as dependências nativas via expo install

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-font expo-linear-gradient @expo-google-fonts/inter @react-native-async-storage/async-storage
```

### 3. Instale as dependências de dev

```bash
npm install --save-dev babel-plugin-module-resolver
```

### 4. Substitua os arquivos de configuração

Copie para a raiz do projeto:
- `package.json` (com `"main": "expo-router/entry"`)
- `app.json` (com `scheme`, plugin expo-router, newArchEnabled)
- `tsconfig.json` (com paths `"@/*": ["./src/*"]`)
- `babel.config.js` (com module-resolver)
- `metro.config.js` (com alias `@`)

### 5. Copie a pasta src/

Substitua qualquer pasta src existente pela deste projeto.

### 6. Delete o App.tsx da raiz (se existir)

```bash
rm App.tsx
```

### 7. Rode

```bash
npx expo start --clear
```

---

## ⚠️ Notas importantes sobre compatibilidade

- **SDK 54** usa React 19 e React Native 0.79 — não use versões de bibliotecas do SDK 51/52
- **`react-native-currency-input`** foi removido (versão mais recente `1.1.1` tem problemas com Nova Arquitetura). O `CurrencyInput` é implementado nativamente com `TextInput`
- **`babel-plugin-module-resolver`** resolve o alias `@/` no Metro

---

## 📁 Estrutura

```
src/
├── app/
│   ├── _layout.tsx              # Fontes + Stack navigator
│   ├── index.tsx                # Home
│   ├── target.tsx               # Criar/Editar meta
│   ├── in-progress/[id].tsx     # Detalhes + transações
│   └── transaction/[id].tsx     # Nova transação
├── components/
│   ├── Button/
│   ├── CurrencyInput/           # Input monetário nativo (sem lib externa)
│   ├── HomeHeader/
│   ├── Input/
│   ├── List/
│   ├── Loading/
│   ├── Progress/
│   ├── Separator/
│   ├── Summary/
│   ├── TargetCard/
│   ├── Transaction/
│   └── TransactionType/
├── storage/index.ts             # CRUD com AsyncStorage
├── theme/                       # colors + fontFamily
└── utils/TransactionTypes.ts
```

---

## ✨ Funcionalidades

- ✅ Criar, editar e excluir metas
- ✅ Registrar transações (guardar / resgatar)
- ✅ Barra de progresso com percentual
- ✅ Resumo de entradas e saídas no header
- ✅ Persistência com AsyncStorage
- ✅ Fonte Inter (400/500/600/700)
- ✅ Gradiente com expo-linear-gradient
- ✅ Navegação por arquivo com Expo Router 4
