# 03-Express-Handlebars

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# Handlebars c'est quoi ?

Handlebars est un moteur de templating, qui nous permet de parser (fractionner) les vues HTML.

## Intaller express-handebars
```
npm i express-handlebars
```

Pour commencer nous devons le configurer:
```
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
```
Nous demandons à notre app (express) d'utiliser notre moteur de templating (handlebars)

et grâce à ça nous pourrons rendre des vues compiler et monter par express et handlebars.

Dans notre cas nous utilisons le module `express-handebars` qui est mieux familiariser avec l'ecosystem de `express`.

# Comment cela fonctionne ?

Pour commencer handlebars ce décompose en 4 grosses parties:
  - Les layouts : template / modèle structure de notre page (il contient souvent navbar, footer, sidebar, button call to action, ...)
  - Les views : La page composer de partials
  - Les partials : fragment de code
  - Les register-helpers : function permettant d'ajouter un comportement spécifié. (que nous verrons au chapitre "Layouts-Helper-Each")

# DOC
### Express
  - https://www.npmjs.com/package/express
  - https://expressjs.com/fr/starter/hello-world.html
### Handlebars
  - https://www.npmjs.com/package/express-handlebars
  - https://handlebarsjs.com/
