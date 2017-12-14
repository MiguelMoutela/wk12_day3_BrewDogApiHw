const app = function () {

const getBeerButton = document.querySelector('#get-beer')
getBeerButton.addEventListener('click', handleButtonClick);

beers = JSON.parse(localStorage.getItem('beer-data')) || [];
// let url = 'https://api.punkapi.com/v2/beers'
// makeRequest(url, requestComplete)
}

const handleButtonClick = function() {
  const url = 'https://api.punkapi.com/v2/beers'
  makeRequest(url, requestComplete);
  populateBeerList(beers)
  // console.log("lets see beers", beers);

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function(){
  if (this.status != 200) return;
  const jsonString = this.responseText;
  localStorage.setItem('beer-data', jsonString);
  const beers = JSON.parse(jsonString);
}

const populateBeerList = function(beers) {

  const beerList = document.getElementById('beer-list');
  beers.forEach(function(beer){
    const name = createName(beer);
    const image = createImage(beer);
    const ingredient = createIngredient(beer);
    const elements = appendElements(beerList, name, image);
  })
}
const createName = function(beer){
  const beerName = document.createElement('li')
  beerName.innerText = beer.name;
  return beerName;
}
const createImage = function(beer){
  const li = document.createElement('li')
  li.style.listStyle = "none";
  const beerImage = document.createElement('img')
  beerImage.src = beer.image_url;
  beerImage.style.width = "50px";
  beerImage.style.height = "175px";
  li.appendChild(beerImage);
  return li;
}

const createIngredient = function(beer){
  const malt = createMalt(beer);
  // const hops = createHops(beer);
  // const yeast = getYeast(beer);
  // console.log('yay', beer.ingredients);
}

const createMalt = function(beer){

  // const maltNames = getMalt(beer);
  // const header = document.createElement('h3')
  // header.innerText = 'malt names'
  //
  // maltNames.forEach(function(maltName){
  // const li = document.createElement('li')
  // li.innerText = maltName;
  // })
}

const getMalt = function(beer){
  // console.log('gimme malt', beer.ingredients.malt)
  //
  // beer.ingredients.malt.forEach(function(singleMalt){
  //   return singleMalt.name;
  //   console.log(singleMalt.name)
  // })
}

// const createHops = function(beer){
//   for(i=0;i<3;i++){
//   return beer.hops[i].name
//   console.log(beer.hops[i].name);
//   }
// }
//
// const getYeast = function(beer){
//   return beer.yeast;
//   console.log('gimme yeast', beer.yeast);
// }

const appendElements = function(beerList, name, image) {
  beerList.appendChild(name);
  beerList.appendChild(image);
}

document.addEventListener('DOMContentLoaded', app);
