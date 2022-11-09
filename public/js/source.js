  async function getInfo1(){

    let mot = document.getElementById('mot').value

    let a = await getMotDb(mot)
    if (a.length == 0){
    await axios.get('http://localhost:8080/source1?nom='+ mot, {})
    .then( (res) => {
      if(res.data.response == undefined){
        document.getElementById('resultat').innerHTML = ""
        $('#resultat').append('Pas de résultats pour votre recherche')
      } else {
      let a = 0
      document.getElementById('resultat').innerHTML = ""
      $('#resultat').append('Il y a '+ res.data.response.docs.length +' résultats pour votre recherche (archive HAL)')
      for(let i=0; i<res.data.response.docs.length; i++){
       
        $('#resultat').append('<div class="test"> Le document a pour nom <a href="'+ res.data.response.docs[i].uri_s+'">'+ res.data.response.docs[i].label_s+'"</a></div>')
        addMot1(mot, res.data.response.docs[i].uri_s, res.data.response.docs[i].label_s)
        a++
      }
    }
 })
    .catch((err) => {
      throw err
    })
  } else {
    let b = 0
    document.getElementById('resultat').innerHTML = ""
    $('#resultat').append('Il y a '+ a.length +' résultats pour votre recherche (base de donnée)')
    for(let i=0; i<a.length; i++){
    b++
    $('#resultat').append('<div class="test"> Le document a pour nom <a href="'+ a[i].url +'">'+ a[i].titre +'"</a></div>')
  }
  }
  }

  async function getInfo2(){

    let mot = document.getElementById('mot2').value

    let a = await getMotDb2(mot)
    if (a.length == 0){
    await axios.get('http://localhost:8080/source2?nom='+ mot, {})
    .then( (res) => {
      if(res.data.length == 0){
        document.getElementById('resultat').innerHTML = ""
        $('#resultat').append('Pas de résultats pour votre recherche')
      } else {
      let a = 0
      document.getElementById('resultat').innerHTML = ""
      $('#resultat').append('Il y a '+ res.data.length +' résultats pour votre recherche (archive arXiv)')
      for(let i=0; i<res.data.length; i++){
        addMot2(mot, res.data[i].link[0].href[0], res.data[i].title)
        $('#resultat').append('<div class="test"> Le document a pour nom <a href="'+ res.data[i].link[0].href[0]+'">'+ res.data[i].title+'"</a></div>')
        a++
      }
    }
 })

} else {
    let b = 0
    document.getElementById('resultat').innerHTML = ""
    $('#resultat').append('Il y a '+ a.length +' résultats pour votre recherche (base de donnée)')
    for(let i=0; i<a.length; i++){
    b++
    $('#resultat').append('<div class="test"> Le document a pour nom <a href="'+ a[i].url +'">'+ a[i].titre +'"</a></div>')
}

  }
}
  
  async function inscription(){
   
    let user = document.getElementById('iuser').value
    let mdp = document.getElementById('imdp').value
    
   await axios.post('http://localhost:8080/inscrire?user='+ user +'&mdp='+ mdp, {})
    .then( (res) => {
      document.location.href = ("/")
      return res  })
    .catch((err) => {
      throw err
    })


  }

  async function connection(){
  
    let user = document.getElementById('user').value
    let mdp = document.getElementById('mdp').value
    
   await axios.post('http://localhost:8080/login?user='+ user +'&mdp='+ mdp, {})
    .then( (res) => {
      if (res.data.msg == 'ok'){
        document.location.href = ("/menu")
      }
    })
    .catch((err) => {
      throw err
    })

  }

  async function deconnexion(){
    await axios.post('http://localhost:8080/deconnexion',{})
    .then((res)=>{
      document.location.href = ("/")
    })
  }

  async function getComparaison(){

    let mot = document.getElementById('mot3').value

    let l1
    let l2

    await axios.get('http://localhost:8080/source1?nom='+ mot, {})
    .then( (res) => {
      if(res.data.response == undefined){
       l1 = 0
      } else {
      l1 = res.data.response.docs.length
      }
    })
    .catch((err) => {
      throw err
    })

    await axios.get('http://localhost:8080/source2?nom='+ mot, {})
    .then((res) => {
      l2 = res.data.length
    })

    document.getElementById('resultat').innerHTML = ""
    $('#resultat').append('<div class="test"> L\'archive HAL comporte '+l1+' résultats et l\'archive arXiv comporte '+l2+' résultats</div>')

  }

  async function getMotDb(mot){
    return await axios.get('http://localhost:8080/getMot?mot='+mot,{})
    .then((res)=>{
      return res.data
    })
  }

  async function getMotDb2(mot){
    return await axios.get('http://localhost:8080/getMot2?mot='+mot,{})
    .then((res)=>{
      return res.data
    })
  }

  async function addMot1(mot, url, titre){
    await axios.post('http://localhost:8080/addMot1?mot='+mot+'&url='+url+'&titre='+titre,{})
    .then((res)=>{})
  }

  async function addMot2(mot, url, titre){
    await axios.post('http://localhost:8080/addMot2?mot='+mot+'&url='+url+'&titre='+titre,{})
    .then((res)=>{})
  }

  async function getCo(){

    let co = document.getElementById('nomco').value
    
    await axios.get('http://localhost:8080/sourceAuteur?nom='+co,{})
    .then((res)=>{
      var result = res.data
      for(let i=0; i<result.length; i++){
        $('#resultat').append('<div class="test"> L\'auteur a pour co auteur '+ result[i]+'</div>')
      }
    })



  }