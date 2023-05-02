# 11-TestUnitaire

# Pré-requis
- Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# Installation

```shell
npm i mocha chai chai-http
```
# Edit package.json
...
  "mocha": "nodemon --exec 'mocha ./tu/mocha.js'",
  "chai": "nodemon --exec 'mocha ./tu/chai.js'"
...

## Info

Dans un premier temps nous devons concevoir les fonctionnalité à partir de test unitaire, généralement fais avec mocha, puis une fois la fonctionnalitée tester et prête à être implémenter alors nous pourrons tester l'implémentation avec chai qui nous permet de tester les routes de notre app.


## A quoi sert Mocha?
Mocha nous permet des testé les fonctionnalité de notre controller en modifiant testant depuis notre API

## A quoi sert Chai & Chai-http?
Chai nous sert à testé les routes de notre Application mais nous allons l'utiliser sur notre API

--

Avec son interface de style "BDD" par défaut, Mocha fournit les hooks before(), after(), beforeEach() et afterEach(). Ceux-ci doivent être utilisés pour configurer les conditions préalables afin d'éffectuer vos tests


# DOC

### Express

- https://www.npmjs.com/package/express
- https://expressjs.com/fr/starter/hello-world.html

### Handlebars

- https://www.npmjs.com/package/express-handlebars
- https://handlebarsjs.com/

### Bcrypt

- https://www.npmjs.com/package/bcrypt

### Mysql Jointures

- https://sql.sh/cours/jointures

### Nodemailer

- https://stackoverflow.com/questions/62302054/smtp-error-535-5-7-8-username-and-password-not-accepted-for-gmail-in-go
- https://devanswers.co/create-application-specific-password-gmail/

### Moment

- https://momentjs.com/

### Test Unitaire

 - dev-docs: https://devdocs.io/mocha/index#hooks
 - mocha: https://mochajs.org/#installation
 - chai: https://www.chaijs.com/guide/styles/#expect
 - assert: https://www.w3schools.com/nodejs/ref_assert.asp