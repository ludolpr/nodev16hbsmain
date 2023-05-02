# 01-Http

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

Le module http dans NodeJS, nous permet de creer un server web (HTTP), afin de distribuer notre application sur un port spécifié de la machine (Linux, Win, ...).
Depuis notre application nous pouvons distribuer les ressources de notre choix, HTML, image/png/..., JSON en casde création d'API, ...

HTTP = Hyper Text Transfert Protocol

## Comment fonctionne le Protocol HTTP ?

Le Protocol HTTP fonctionne sur un principe de requètes et de réponse.

REQUETE (req) = client -> serveur
RÉPONSE (res) = serveur -> client

Example: 
Nous avons un client (navigateur web (brave, mozzilla, chrome, ...)) qui demande (requète) une ressource à un serveur via une URL (IP, DNS) ce qui pointe sur le serveur hébergeur du site web qui nous distribue (réponse) la ressource (Une page html par exemple)

# Sources
  - doc: https://nodejs.org/api/http.html
  - wiki: https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol



