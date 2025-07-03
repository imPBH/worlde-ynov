# Wordle - Tests Ynov

Un clone de Wordle développé avec **Express.js** (backend) et **React + Vite + TypeScript** (frontend).

---

## 🚀 Fonctionnalités

✅ Vérification des mots (longueur dynamique, uniquement lettres alphabétiques)  
✅ Feedback par lettre : `green`, `yellow`, `gray`  
✅ Gestion des tentatives et des conditions de victoire/défaite  
✅ Test coverage > 95% (unitaires + API)  
✅ Frontend interactif avec historique des essais sous forme de grille  
✅ API prête pour des améliorations : score, modes supplémentaires

---

## 🛠️ Stack technique

- **Backend** : Node.js + Express + TypeScript
- **Frontend** : React + Vite + TypeScript
- **Tests** : Jest + Supertest
- **API routes** :
  - `POST /new-game` : démarre une nouvelle partie
  - `POST /guess` : soumet un mot à deviner

---

## ⚡ Lancer le projet

### Backend

```bash
cd backend
npm install
npm run build
npm start
```

➡ Démarre sur `http://localhost:3000`

---

### Frontend

```bash
cd wordle-frontend
npm install
npm run dev
```

➡ Démarre sur `http://localhost:5173`

---

## ✅ Exécution des tests

```bash
# Backend
cd backend
npm run test
```

---

## 🌟

Projet réalisé dans le cadre du module Méthodologies de tests et tests unitaires.
