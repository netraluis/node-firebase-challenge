const { db } = require('../firebase/index')
const rawData = require('../../sentences.json');

const create = async (newJob) => {
	await db.ref('jobs').push(newJob).then(res=>{
	  console.log({res:JSON.stringify(res)})
	});
  }
  
const deleteAll = () => {
  db.ref('jobs/').remove().then(res=>{
    console.log({res:JSON.stringify(res)})
  })
}
(async function(){
	await deleteAll()
	
	for(let i = 0; i < rawData.length; i++){

		// The format of the categories is change to an array of objects
		let catsArray = [];
		for(let cat in rawData[i].cats){
			catsArray.push({cat, value:rawData[i].cats[cat]})
		}

		rawData[i].cats = catsArray
		
		await create(rawData[i])
		console.log(i)
	}
	
	process.exit(1);

})()