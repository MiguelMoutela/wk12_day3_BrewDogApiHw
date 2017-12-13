let beers = [];

const app = function () {

const getBeerButton = document.querySelector('#get-beer')
select.addEventListener('click', handleButtonClick);

const url = 'https://api.punkapi.com/v2/beers'
makeRequest(url, requestComplete)
}

const handleButtonClick = function() {

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function(){
  if (this.status != 200) return;
  const JsonString = this.responseText;
  const data = JSON.parse(jsonString);
  beers = data;
}
document.addEventListener('DOMContentLoaded', app);
