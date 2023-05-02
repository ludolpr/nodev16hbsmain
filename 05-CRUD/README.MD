# 05-CRUD

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# C'est quoi un CRUD ?

CRUD est un acronyme définissant les actions de base à réaliser avec une BDD afin de comprendre le mécanisme d'utilisation. CRUD veux dire Create Read Update Delete.

HTTP | SQL | ACTION
 --- | --- | --- 
GET | SELECT | Récupération
POST | INSERT INTO | Ajouter
PUT | UPDATE or SET | Éditer
DELETE | DELETE or DROP | Supprimer


# Mysql
```
sudo apt install mysql-server
cd/yourProjetName
sudo mysql
```

### or

```
mysql -u [user] -p
``` 
### entrer mot de passe de l'utilisateur

## Terminal mysql
### Creation de mon user
`CREATE USER 'tuto'@'localhost' IDENTIFIED BY 'tuto$';`
### Sourcer la DB
`source ./path/to/your/script/sql`
### Donner les droits a mon user sur la DB
`GRANT ALL PRIVILEGES ON mydb.* TO 'tuto'@'localhost' WITH GRANT OPTION;`
### Edit security password
`ALTER USER 'tuto'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tuto$';`
### Refresh
`FLUSH PRIVILEGES;`

## quit mysql terminal
`quit`

## Faire un backup mysql
`mysqldump -u [user] -p your_db > script_output.sql`

# DOC
### Express
  - https://www.npmjs.com/package/express
  - https://expressjs.com/fr/starter/hello-world.html

### Handlebars
  - https://www.npmjs.com/package/express-handlebars
  - https://handlebarsjs.com/