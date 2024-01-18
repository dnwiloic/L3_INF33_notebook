# Utilisez une image de base contenant Node.js
FROM node

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de votre application dans le conteneur
COPY . .

# Installez les dépendances
RUN npm install

# Construisez votre application
# RUN npm run build

# Exposez le port sur lequel votre application sera en cours d'exécution
EXPOSE 8080

# Commande pour démarrer votre application
CMD ["npm", "run", "start"]
