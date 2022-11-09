let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.render("connection")
})

app.get('/connection', (req, res) => {
    res.render("connection")
})


app.get('/livre', (req, res) => {
    if(req.session.userID == undefined) {
        res.redirect('/')
    } else {
    res.render("livre")}
})

app.get('/livre2', (req, res) => {
    if(req.session.userID == undefined) {
        res.redirect('/')
    } else {
    res.render("livre2")}
})

app.get('/menu', (req, res) => {
    if(req.session.userID == undefined) {
        res.redirect('/')
    } else {
    res.render("menu")}
})

app.get('/coauteur', (req, res) => {
    if(req.session.userID == undefined) {
        res.redirect('/')
    } else {
    res.render("coauteur")}
})

app.get('/comparer', (req, res) => {
    if(req.session.userID == undefined) {
        res.redirect('/')
    } else {
    res.render("comparer")}
})

app.get('/inscription', (req, res) => {
    res.render("inscription")
})

app.get('/source1', (req, res) => {
    let nom = req.query.nom
    let don = require('../models/données')
    don.getInfo1(nom, cb => {
        res.json(cb)
    })
})

app.get('/source2', (req, res) => {
    let nom = req.query.nom
    let don = require('../models/données')
    don.getInfo2(nom, cb => {
        res.json(cb)
    })
})

app.get('/sourceAuteur', (req, res) => {
    
    let nom = req.query.nom
    let don = require('../models/données')
    don.getAuteurs(nom, cb => {
        let tab = []
        for (let i = 0; i< cb.length; i++) {
            if(cb[i].author.length > 0){
                for(let j = 0; j<cb[i].author.length ; j++){          
                    tab.push(cb[i].author[j].name)}
            }       
        }
       
      
        res.json(tab)
    })
    })

app.get('/getMot', (req, res) => {
    let mot = req.query.mot
    let don = require('../models/données')
    don.getMot(mot, cb => {
        res.json(cb)
    })
})

app.get('/getMot2', (req, res) => {
    let mot = req.query.mot
    let don = require('../models/données')
    don.getMot2(mot, cb => {
        res.json(cb)
    })
})

app.post('/addMot1', (req,res) => {

    let mot = req.query.mot
    let url = req.query.url
    let titre = req.query.titre
    let don = require('../models/données')
    don.addMot1(mot, url, titre)
    .then((result) => {
        res.json('ajout effectué')
    })
    
})

app.post('/addMot2', (req,res) => {

    let mot = req.query.mot
    let url = req.query.url
    let titre = req.query.titre
    let don = require('../models/données')
    don.addMot2(mot, url, titre)
    .then((result) => {
        res.json('ajout effectué')
    })
    
})
app.post('/inscrire', (req,res) => {

    let user = req.query.user
    let mdp = req.query.mdp

    let don = require('../models/données')
    don.inscription(user, mdp)
    .then((result) => {
        res.redirect('/')
    })
    
})

app.post('/login', (req,res) => {

    let user = req.query.user
    let mdp = req.query.mdp
   
    let don = require('../models/données')
    don.connection(user, mdp, (cb) => {
        for(row of cb) {
            if(row.login == user && row.mdp==mdp)
                req.session.userID = row.login
                return res.json({"msg": "ok"})
        } 
    })
    })

    app.post('/deconnexion', (req,res) => {
        req.session.userID = undefined
        res.redirect("/")
    })

        
module.exports = app