# 00-Intro

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md
  - Visual Sudio Code: https://code.visualstudio.com/

Vérifier l'install de node
```
node --version
npm --version
```

# Info

Node Js nous permet d'executer du code Javascript directement sur une machine (linux, win, ...). Sa librairie de module nommé NPM (Node Package Manager) nous permettra d'importer de multiple modules que l'on utilisera par la suite (express, bcrypt, nodemailer, ...).

# Creer un dossier Node

1/ Rendez-vous dans le dossier ou vous voulez creer votre projet:
```sh
cd ~/Bureau
```
2/ Ensuite nous allons creer un dossier
```sh
mkdir monprojet
```
3/ Ensuite nous allons entrons dans le dossier du projet
```sh
cd monprojet
```
4/ puis nous allons initialiser notre projet avec node
```sh
npm init
```
(faites entrée sur toutes les questions, vous pourrez modifier les infos plus tard)
(l'on pourrait supprimer les question en ajoutant -y a notre commande `npm init -y` ce qui acceptera toutes les questions `-yes`)

5/ creer un fichier index.js
```sh
vim index.js
```
puis coller cette ligne dans index.js
```sh
console.log('Welcome to Node JS')
```
6/ démarrer le fichier
```sh
node index.js
```

En + / Nous pourrions ajouter un script de démarrage directement dans notre package.json 
```json
  ...
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  ...
```

En + / Install de nodemon pour facilité le développement avec NodeJS.
```sh
sudo npm i -g nodemon
```
(nodemon redémarrera votre application lorsque les fichiers js seront sauvegarder dans Visual Studio Code par exemple (ctrl + s))

# Sources
  - npm : https://www.npmjs.com/
  - w3school : https://www.w3schools.com/nodejs/default.asp
  - nodejs : https://nodejs.org/en/
  - devdocs: https://devdocs.io/node/
