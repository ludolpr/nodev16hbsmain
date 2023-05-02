# 14-Verification de Mail & Mot de passe Oublier

Verif Mail:
  - L'objectif est de confirmez que la personne qui c'est inscrite est bien celle qui possède le mail.
  - C'est pourquoi nous allons envoyer un mail sur l'addresse fournit avec un lien lui permettant de confirmez son mail dans notre application
  - Ensuite nous allons éditer dans notre DB la valeur isVerified en true

Lost Password:
  - L'objectif est de réinitialiser le mot de passe lier au mail de l'utilisateur.
  - C'est pourquoi nous allons lui envoyer un mail sur l'address fournit avec un lien lui permettant de créé un nouveau mot de passe.
  - Ensuite nous allons editer dans notre DB la valeur du mot de passe en prennant soin de bien hasher son nouveau mot de passe.

# Info
Il y a plusieurs manières de réaliser nos fonctionalités, nous pourrions envoyer le mail de confirmation dès l'inscription du nouvelle utilisateur, mais si nous activons une limite de temps après l'inscription alors une fois la limite dépasser un boutton est utile dans la partie profile afin que la personne puisse ce connecter avec son compte non vérifié et peux le vérifié quand elle le désire.

Pour le reset password nous pourrions aussi utiliser un token du style JWT afin de limiter le temps d'action disponible a la réinitialisation du mot de passe, en cas de délai dépasser alors l'utilisateur doit refaire une nouvelle demande d'édition de son mot de passe.

<center>

## Diagram : Verification du mail

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser (client)
    participant MD as Middleware
    participant R as Routeur
    participant C as Controller
    participant R as Routeur
    participant D as Database
    participant M as Boite Mail
    B->>MD: Button Vérifier mon mail
    Note over B,MD: POST /verifmail
    MD->>R: if user (session) not verified 
    MD-->>B: if user (session) isVerified
    R->>C: access controller
    C->>M: envoie du mail
    C->>B: info mail + redirect /profil
    M->>MD: Lien intégrer dans le mail (http://domain.com/verifmail)
    Note over M,MD: GET /verifmail
    MD->>R: if user (session) not verified 
    MD-->>B: if user (session) isVerified
    R->>C: access controller
    C->>B: response redirect /verifmail
    B->>MD: Button Confirmer la verification
    Note over B,MD: PUT /verifmail
    MD->>R: if user (session) OK
    MD-->>B: if user (session) ERROR
    R->>C: access controller
    C->>D: edit user on DB
    D->>C: repsonse db (data)
    C->>B: response redirect /profil
```
## Diagram : Mot de passe oublier

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser (client)
    participant MD as Middleware
    participant R as Routeur
    participant C as Controller
    participant R as Routeur
    participant D as Database
    participant M as Boite Mail
    B->>MD: Formulaire mot de passe oublier (/connexion)
    Note over B,MD: POST /resetpassword (body: email)
    MD->>R: if visitor (session) 
    MD-->>B: if not visitor (session)
    R->>C: access controller
    C->>M: envoie du mail
    C->>B: info mail + redirect /connexion
    M->>MD: Lien intégrer dans le mail (http://domain.com/resetpassword)
    Note over M,MD: GET /resetpassword
    MD->>R: if visitor (session) 
    MD-->>B: if not visitor (session)
    R->>C: access controller
    C->>B: response redirect /resetpassword
    B->>MD: Formulaire réinitialisation mot de passe
    Note over B,MD: PUT /resetpassword (body: password & confirmPassword)
    MD->>R: if visitor (session) OK
    MD-->>B: if not visitor (session) ERROR
    R->>C: access controller
    C->>D: edit user on DB
    D->>C: repsonse db (data)
    C->>B: response redirect /connexion
```
</center>

(dans visual studio code: click droit avoir un aperçu, si vous ne voyez pas le schema télécharger l'extension "markdown preview mermaid")

# Pré-requis
- Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# DOC

### Architechture MVC
  - https://media.discordapp.net/attachments/917846557112549376/950378341272285184/MVC-arch.png

### Promise
  - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://www.w3schools.com/js/js_promise.asp

### information
  - https://waytolearnx.com/2020/01/quest-ce-que-le-modele-mvc-et-a-quoi-ca-sert.html
