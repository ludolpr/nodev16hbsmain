# 06-Session

# Pré-requis
  - Install NodeJS (v14): https://github.com/nodesource/distributions/blob/master/README.md

# C'est quoi une session ?

Une session sers à identifier un visiteur via une information stocker dans sont navigateur plus précisément avec express-session c'est un cookie qui est unique. Il sont stocker dans le debug du navigateur (f12 -> Application ou Appli -> Cookie)

Exemple format de cookie:
`s%3A75pjbGFiVv-MskF49SsxwQj8_ZnLBv67.WKxENBAu8ruROH814%2Bsj5Ahx0WmQaAWJDattBUU6J3M`

# Comment cela fonctionne ?

Au moment ou un visiteur arrive sur notre site alors nous lui assignons un cookie dans la réponse et le stock dans son navigateur ce qui nous permettra de l'identifier. Son cookie sera inscrit dans toutes les requètes executer après sont assignation.

vous pouvez accèder au cookie dans la requète via : `req.headers.cookie`

Lors du login de notre visiteur alors nous allons pouvoir assigner un utilisateur au cookie ce qui nous facilitera sont identification par la suite sur la visite du site.

Nous stockons les sessions dans la db MySQL via le module `express-mysql-session` qui va nous générer une table `sessions` et va nous les stockées automatiquement dans la table prévu à cette effet.

Lorsequ'un utilisateur cherche à ce déconnecter alors nous supprimerons le cookie de sont navigateur et lui réassigner un nouveau cookie avec une session vide, ce qui lui ré-obligera de ce connecter pour avoir plus de droit sur le site.

# Installer

```sh
npm i express-session express-mysql-session bcrypt
```
(bcrypt nous permettra de hasher les mots de passe avant de les stocker en BDD)

# Configurer

Instancier express-session dans notre app express, et instancier express-mysql-session dans notre express-session. Ceci nous permet de générer les cookies pour chaque nouveau visiteur.
```js
// Configuration Express-Session
const sessionStore = new MySQLStore(configDB);
app.use(
  expressSession({
    secret: "securite",
    name: "poti-gato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);
```

Maintenant nous allons pouvoir connecter un visiteur en tant que utilisateur connecté. Nous devons au préalable créé un user, lui hasher son mot de passe et le stocker dans la BDD.

Register
```js
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.redirect('/')
  bcrypt.hash(password, bcrypt_salt, function(err, hash) {
    db.query(`INSERT INTO users SET name="${name}", email="${email}", password="${hash}", isAdmin=0`, function (err, data) {
      if (err) throw err;
      res.redirect('/connexion');
    })
  });
})
```

Login
```js
app.post('/login', (req, res) => {
  const { email, password } = req.body
  db.query(`SELECT * FROM users WHERE email="${email}"`, function(err, data){
    if(err) throw err;

    if (!data[0]) return res.render('/', { flash: "Ce compte n'existe pas"})

    bcrypt.compare(password, data[0].password, function (err, result) {
      if (result === true) {
        let user = data[0];
  
        // Assignation des data user dans la session
        req.session.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            account_create: user.create_time,
            isAdmin: user.isAdmin
        };

        res.redirect('/')
      }
      else return res.render('connexion', { flash: "L\'email ou le mot de passe n\'est pas correct !"})
    });
  })
})
```

Puis nous pouvons définir une variable Global / Locals afin d'y assigner la session, ce qui nous permet de pouvoir récupérer la variable user dans notre handlebars en tant que `{{ user }}`
```js
// Session Connexion for HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
})
```

exemple de code Handlebars avec la variable global `user`

Nav
```html
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/contact">Contact</a></li>
    {{#if user}}
        {{#if user.isAdmin}}
            <li><a href="/admin">Admin</a></li>
        {{/if}}
    <li>
        <form action="/logout" method="post">
             <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Déconnexion</button>      
        </form> 
    </li>
    {{else}}
        <li><a href="/connexion">Connexion</a></li>
    {{/if}}
</ul>
```

Enfin nous pouvons gérer la déconnexion de notre utilisateur avec:
```js
app.post('/logout', (req, res)=>{
  req.session.destroy(() => {
    res.clearCookie('poti-gato');
    console.log("Clear Cookie session :", req.sessionID);
    res.redirect('/');
  })
})
```


# DOC
### Express
  - https://www.npmjs.com/package/express
  - https://expressjs.com/fr/starter/hello-world.html
### Handlebars
  - https://www.npmjs.com/package/express-handlebars
  - https://handlebarsjs.com/
### Bcrypt
  - https://www.npmjs.com/package/bcrypt

## help
user : bruno@br.mail
pass : bruno

user : admin@admin.mail
pass : admin