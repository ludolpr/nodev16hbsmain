# 12-Swagger

Par le passé, en raison des multiples technologies et langages de programmation existants, la description des API était très complexe. Une première grande étape dans le processus d’organisation des API a été la création du paradigme de programmation REST...

source: https://www.ionos.fr/digitalguide/sites-internet/developpement-web/quest-ce-que-swagger/

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# Installation 
```
npm i swagger-ui-express express-oas-generator
```

## Génération du json
```
 const expressOasGenerator = require('express-oas-generator');
 expressOasGenerator.init(app, {})
```

puis aller sur localhost:port/api-docs
choisisez votre version (V2 ou V3) puis copier le contenu
Aller ensuite dans le json que vous avez crée au préalable dans back/config/api/swagger.json
Vous devez ensuite définir la route sur laquel vous aller pouvoir accéder a votre Documentation d'API

## Route pour utilisez l'API swagger
```
app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

## Run
```
npm run swagger
```

# DOC

  ### Swagger
  - https://www.npmjs.com/package/swagger-ui-express
  - https://www.npmjs.com/package/express-oas-generator
  - https://forge.etsi.org/swagger/editor/
  - https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
  - https://swagger.io/docs/specification/2-0/basic-structure/

# Voici un example de site qui utilise swagger pour la documentation de son API
  - Coingecko: https://www.coingecko.com/fr/api/documentation