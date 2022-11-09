const axios = require('axios')
const { createNullProtoObjWherePossible } = require('ejs/lib/utils')
const sqlite3 = require('sqlite3')
const xml2js = require('xml2js')
let dbname = new sqlite3.Database('WebService.db')


class M_Source {

static getInfo1(nom, cb) {

    axios.get('http://api.archives-ouvertes.fr/search/?rows=100&q='+nom, cb, {})
      .then(function (res) {
        cb(res.data)
      })
      .catch(function (error) {
        cb(error.message)
      })        
    }


static getInfo2(nom, cb) {

  axios.get('http://export.arxiv.org/api/query?search_query=all:'+nom+'&max_results=100', cb, {})
    .then((res) => {
      let xml = res.data
      xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
        if (err) {
          cb(err)
        }
        cb(result.feed.entry)
      })
    })
    .catch(function (error) {
      cb(error.message)
    })        
  }

  static getAuteurs(nom, cb) {

    axios.get('http://export.arxiv.org/api/query?search_query=au:'+nom+'&max_results=100', cb, {})
      .then((res) => {
        let xml = res.data
        xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
          if (err) {
            cb(err)
          }
          cb(result.feed.entry)
        })
      })
      .catch(function (error) {
        cb(error.message)
      })        
    }
      
    
static async inscription(userID, userMDP) {
  try {
    dbname.run(`insert into utilisateur (login, mdp) values ("${userID}", "${userMDP}")`)
  } catch (err) {
      throw (err.message)
  }
}

static async connection(userID, userMDP, cb) {

  try{
    dbname.all(`select login,mdp from utilisateur where login="${userID}" and mdp="${userMDP}"`, (err, rows) => {
        cb(rows)
    })	
  } catch (err) {
    throw (err.message)
  }
}

static async getMot(mot, cb) {

  try{
    dbname.all(`select motcle, url, titre from don where motcle="${mot}"`, (err, rows) => {
        cb(rows)
    })	
  } catch (err) {
    throw (err.message)
  }
}

static async getMot2(mot, cb) {

  try{
    dbname.all(`select motcle, url, titre from don2 where motcle="${mot}"`, (err, rows) => {
        cb(rows)
    })	
  } catch (err) {
    throw (err.message)
  }
}

static async addMot1(mot, url, titre) {
  try{
    dbname.all(`insert into don (motcle, url, titre) values ("${mot}", "${url}", "${titre}")`, (err, rows) => {
    })	
  } catch (err) {
    throw (err.message)
  }
}


static async addMot2(mot, url, titre) {
  
  try{
    dbname.all(`insert into don2 (motcle, url, titre) values ("${mot}", "${url}", "${titre}")`, (err, rows) => {
    })	
  } catch (err) {
    throw (err.message)
  }

}


}



module.exports = M_Source
