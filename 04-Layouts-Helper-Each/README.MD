# 04-Layouts-Helper-Each

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# Layouts Helpers Each c'est quoi ?

Le layout nous permettra de creer un modèle de page, par exemple nous pourrions creer un layout main (par default avec handlebars) qui nous permettra de recevoir les visiteurs, puis nous pourrions creer un layout admin pour tout ce qui est gestion/administration du site, un espace qui serait réserver pour les admin et modérateur.

Les helpers sont des ajouts de mécanique logique dans notre code tel que forcer la mise en majuscule d'un texte, limiter l'affichage d'un tableau à un nombre précis, limiter une chaine de charactère à un certains nombre.

Les each sont des ajouts de mécanique logique dans notre HTML, par exemple nous pourrions avoir un tableau d'objet et répété un fragement de code à l'intérieur ce qui nous faciliterais les taches répété. Nous pourrions aussi utiliser des if, with, ... ce sont des helpers par default dans handlebars, ceux que nous ferions à la main serait aussi des register helpers

# DOC
### Express
  - https://www.npmjs.com/package/express
  - https://expressjs.com/fr/starter/hello-world.html

### Handlebars
  - https://www.npmjs.com/package/express-handlebars
  - https://handlebarsjs.com/