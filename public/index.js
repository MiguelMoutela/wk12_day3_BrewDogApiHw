const app = function () {

const getBeerButton = document.querySelector('#get-beer')
getBeerButton.addEventListener('click', handleButtonClick);

beers = JSON.parse(localStorage.getItem('beer-data')) || [];
}

const handleButtonClick = function() {
  const url = 'https://api.punkapi.com/v2/beers'
  makeRequest(url, requestComplete);
  populateBeerList(beers)
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
    const elements = appendElements(beerList, name, image, ingredient);
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
  const ingredientSection = document.createElement('div');
  const malt = createMalt(beer);
  ingredientSection.appendChild(malt);
  const hop = createHops(beer);
  ingredientSection.appendChild(hop);
  const yeast = getYeast(beer);
  ingredientSection.appendChild(yeast);
  // const hops = createHops(beer);
  // console.log('yay', beer.ingredients);
  return ingredientSection;
}

const createMalt = function(beer){
  const div = document.createElement('div');
  const maltNames = getMalt(beer);
  const header = document.createElement('h3');
  header.innerText = 'malt names';
  div.appendChild(header);
  maltNames.forEach(function(maltName){
  const li = document.createElement('li');
    li.innerText = maltName;
    div.appendChild(li);
  });
  return div;
}

const getMalt = function(beer){
  return beer.ingredients.malt.map(function(singleMalt){
    return singleMalt.name;
  });
}

const createHops = function(beer){
  const div = document.createElement('div');
  const hopNames = getHops(beer);
  const header = document.createElement('h3');
  header.innerText = 'hop names';
  div.appendChild(header);
  hopNames.forEach(function(hopName){
    const li = document.createElement('li');
    li.innerText = hopName;
    div.appendChild(li);
  })
  return div;
}

const getHops = function(beer) {
  return beer.ingredients.hops.map(function(singleHop){
    return singleHop.name;
  });
}

const getYeast = function(beer){
  const div = document.createElement('div');
  const header = document.createElement('h3')
  header.innerText = 'yeast'
  div.appendChild(header);
  const p = document.createElement('p');
  p.innerText = beer.ingredients.yeast;
  div.appendChild(p);
  return div;
}

const appendElements = function(beerList, name, image, ingredients) {
  beerList.appendChild(name);
  beerList.appendChild(image);
  beerList.appendChild(ingredients);
}

document.addEventListener('DOMContentLoaded', app);
