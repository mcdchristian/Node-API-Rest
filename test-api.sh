#!/bin/bash
# 📋 Script de test de l'API Pokédex
# Usage: bash test-api.sh

API_URL="http://localhost:3001/api"

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Test de l'API Pokédex${NC}\n"

# ==================== LOGIN ====================
echo -e "${BLUE}1️⃣  LOGIN - Obtenir un token${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "pikachu",
    "password": "pikachu"
  }')

echo "$LOGIN_RESPONSE" | jq .

# Extraire le token
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ Erreur: Impossible d'obtenir le token${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Token obtenu: ${TOKEN:0:50}...${NC}\n"

# ==================== GET ALL POKEMONS ====================
echo -e "${BLUE}2️⃣  GET ALL - Récupérer tous les Pokémons${NC}"
curl -s -X GET "$API_URL/pokemons" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n"

# ==================== SEARCH POKEMONS ====================
echo -e "${BLUE}3️⃣  SEARCH - Rechercher des Pokémons${NC}"
curl -s -X GET "$API_URL/pokemons?name=pi&limit=5" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n"

# ==================== GET ONE POKEMON ====================
echo -e "${BLUE}4️⃣  GET BY ID - Récupérer un Pokémon par ID${NC}"
curl -s -X GET "$API_URL/pokemons/1" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n"

# ==================== CREATE POKEMON ====================
echo -e "${BLUE}5️⃣  CREATE - Créer un nouveau Pokémon${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/pokemons" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raichu",
    "hp": 60,
    "cp": 90,
    "picture": "https://example.com/raichu.png",
    "types": "electric"
  }')

echo "$CREATE_RESPONSE" | jq .

# Extraire l'ID du nouveau Pokémon (optionnel)
NEW_POKEMON_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id')
echo -e "${GREEN}Nouveau Pokémon créé avec l'ID: $NEW_POKEMON_ID${NC}\n"

# ==================== UPDATE POKEMON ====================
if [ "$NEW_POKEMON_ID" != "null" ] && [ -n "$NEW_POKEMON_ID" ]; then
  echo -e "${BLUE}6️⃣  UPDATE - Mettre à jour le Pokémon${NC}"
  curl -s -X PUT "$API_URL/pokemons/$NEW_POKEMON_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "hp": 75,
      "cp": 120
    }' | jq .

  echo -e "\n"

  # ==================== DELETE POKEMON ====================
  echo -e "${BLUE}7️⃣  DELETE - Supprimer le Pokémon${NC}"
  curl -s -X DELETE "$API_URL/pokemons/$NEW_POKEMON_ID" \
    -H "Authorization: Bearer $TOKEN" | jq .

  echo -e "\n"
fi

# ==================== HEALTH CHECK ====================
echo -e "${BLUE}8️⃣  HEALTH - Vérifier l'état du serveur${NC}"
curl -s -X GET "http://localhost:3001/health" | jq .

echo -e "\n${GREEN}✅ Tests terminés!${NC}\n"
