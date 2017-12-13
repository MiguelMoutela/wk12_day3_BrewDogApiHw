
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
  console.log("lets see beers", beers);

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

const appendElements = function(beerList, name, image) {
  beerList.appendChild(name);
  beerList.appendChild(image);
}

document.addEventListener('DOMContentLoaded', app);
