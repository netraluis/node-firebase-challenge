const { create, deleteAll } = require('../firebase/index')
const rawData = require('../../sentences.json');


(async function(){
	await deleteAll()
	
	for(let i = 0; i < 10; i++){

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