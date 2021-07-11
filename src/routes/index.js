const admin = require('firebase-admin')

// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
const serviceAccount = require('../node-firebase-challenge-firebase-adminsdk-71l7s-24fe56dcc3.json')

// Configuration of the database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-challenge-default-rtdb.europe-west1.firebasedatabase.app/'
});
// db is the database itself
const db = admin.database();

const { Router}= require('express');
const router = Router();


router.get('/', async (req, res) => {
  db.ref('jobs').orderByKey().once('value', snap =>{
    const data = snap.val()
    const jobsArray = [];
    for (let item in data){
      jobsArray.push({...data[item], id:item})
    }
    res.render('pages/index', {
      jobsArray: jobsArray
    });
  })

})

router.get('/add', (req, res) => {

  res.render('pages/addJob', {
    text: "",
    cats: [
      { cat: 'responsibility', value: "" }, 
      { cat: 'benefit', value: "" }, 
      { cat: 'none', value : "" }, 
      { cat: 'education', value : "" }, 
      { cat: 'experience', value : "" }, 
      { cat: 'soft', value : "" },
      { cat: 'tech', value : "" }
    ]
  })
});

router.post('/add', (req, res) => {
  const { text, responsibility = 0, benefit = 0, none = 0, education = 0, experience = 0, soft = 0, tech = 0 } = req.body

  const newJobs = { text, cats: [
    { cat: 'responsibility', value: responsibility }, 
    { cat: 'benefit', value: benefit }, 
    { cat: 'none', value : none }, 
    { cat: 'education', value : education }, 
    { cat: 'experience', value : experience }, 
    { cat: 'soft', value : soft },
    { cat: 'tech', value : tech }  
  ]}
  db.ref('jobs').push(newJobs);
  res.redirect('/');
});

router.get('/edit/(:id)', (req, res)=>{
  let id = req.params.id;
  db.ref('jobs/' + id).once('value', (snapshot) => {
  const data = snapshot.val();
  res.render('pages/editJob', {
    ...data,
    id
  })
});

router.post('/edit/(:id)',  async (req, res, next)=>{
  let id = req.params.id;
  const { text, responsibility, benefit, none, education, experience, soft, tech } = req.body
  const updateJob =  { text, cats: [
    { cat: 'responsibility', value: responsibility }, 
    { cat: 'benefit', value: benefit }, 
    { cat: 'none', value : none }, 
    { cat: 'education', value : education }, 
    { cat: 'experience', value : experience }, 
    { cat: 'soft', value : soft },
    { cat: 'tech', value : tech }  
  ]}
  await db.ref('jobs/' + id ).set(updateJob, (error)=>{
    if (!error) res.redirect('/')
  })    
});


})

router.get('/delete/:id', (req, res) => {
  console.log('llego al delete')
  db.ref('jobs/' + req.params.id).remove();
  res.redirect('/');
});

module.exports = router;