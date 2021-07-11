const rawData = require('../../sentences.json');

// concatenate all the different items in one text
const creatingArrayReducer = (acc, currentText) => acc + currentText.text;

// All the text is converted to uppercase and some characters that we do not want to ha into account are deleted
// with the split method we convert the text into an array 
// the spaces back and front of the items are deleted and the items with an empty value are deleted with the filter
const totalStringArray = rawData.reduce(creatingArrayReducer, '')
.toUpperCase()
.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()”“"…]/g, '')
.split(' ')
.map(string=>string.trim())
.filter(item => item)


// if the word is in the object one is sumed otherwise is created
const creatingObjectCounterReducer = (acc, word) => {
  if(acc[word]){
    acc[word] +=1
  }else{
    acc[word] = 1
  }
  return acc;
}
const counts = totalStringArray.reduce(creatingObjectCounterReducer, {})

// the object is converted into an array to be sorted
let sortable = [];
for (let word in counts) {
  sortable.push({word, repeat:counts[word]});
}

// The items are sorted by the repeat value
const sort = sortable.sort(function(a, b) {
    return  b.repeat - a.repeat;
});

// only the first 100 words are returned
console.log({sort: sort.slice(0,100)})
return sort.slice(0,100)