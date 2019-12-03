'use strict';

//Declaro los elementos que voy a necesitar
const elementInputSearch = document.querySelector('#inputSearch');
const elementButton = document.querySelector('#buttonSearch');
const elementContainer = document.querySelector('#seriesContainer');
const elementFavouriteList = document.querySelector('#favouriteList');
const elementFavouriteContainer = document.querySelector('#favouritesContainer');
const elementForm = document.querySelector('#form');

//Meto mi url en una constante
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
//Declaro en una variable mi array vacío
let favouriteSeries = [];

//Función para conectarse a la Api
const connectToApi = () => {
const inputValue = elementInputSearch.value.toLowerCase();
  fetch(urlBase + inputValue)
  .then(response => response.json())
  .then(dataSearch => paintSeries(dataSearch))
};

//Compruebo si mi localStorage está vacío. Si no lo está, le digo que lo parsee, sino le digo que ejecute la función de conectarse a la API
function loadSeriesHandler () {
  if(localStorage.getItem("allFavSeries") !== null){
    favouriteSeries = JSON.parse(localStorage.getItem(allFavSeries));
    addNewFavourite(favouriteSeries);
  } else {
    paintSeries();
    connectToApi();
  };
};


//Creo una función que pinte las series con los datos que recojo de la API.
const paintSeries = (dataSearch) => {
  for (let i = 0; i < dataSearch.length; i++) {
    const serieName = dataSearch[i].show.name;
    const serieImage = dataSearch[i].show.image;
    const elementDiv = document.createElement ('div');
    const elementImg = document.createElement('img');
    const elementSpan = document.createElement('span');
    const spanText = document.createTextNode(serieName);
    elementDiv.classList.add('serie-content');
    elementImg.classList.add('serie-img');
    elementSpan.classList.add('serie-text');

    //Necesito un condicional para la imagen. En caso de que no exista, por defecto píntame esto, sino, pintame la imagen que me traigo de la api.
    if(serieImage === null){
      elementImg.src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      elementImg.src = serieImage.original;
    };

    elementSpan.appendChild(spanText);
    elementDiv.appendChild(elementImg);
    elementDiv.appendChild(elementSpan);
    elementContainer.appendChild(elementDiv);    
    
    //Al pinchar sobre el div que contiene la imagen y el nombre de la serie, tenemos que añadir esta a favoritos.
    elementDiv.addEventListener('click', clickFavourite);
  };
};



//Función para añadir o quitar el fondo de la serie cuando hago click en el div
function clickFavourite (event) {
  const selectSerie = event.currentTarget;
  selectSerie.classList.toggle('click-select');
  const image =  selectSerie.firstChild.src;
  const name = selectSerie.lastChild.innerHTML;
 
  //Declaro mi objeto
  const seriesObject = {
    "name": name,
    "image": image,
  };
  
  //Condicional para que añada el objeto al array cuando tiene la clase seleccionada y la añada a favoritos.
  if(selectSerie.classList.contains('click-select')){
    favouriteSeries.push(seriesObject);
  };
  addNewFavourite();
  
  //Guardo en localStorage mi array.
  localStorage.setItem("allFavSeries",JSON.stringify(favouriteSeries));
};

//Función para que al añadir la serie me añada imagen y título en favoritos.
const addNewFavourite = () =>{
  
  elementFavouriteContainer.innerHTML = '';
  elementFavouriteList.innerHTML = '';
  elementFavouriteList.classList.add('favourite-list');
  elementFavouriteContainer.appendChild(elementFavouriteList);

  for(let item of favouriteSeries){
    const favName = item.name;
    const favImage = item.image;

    const favouriteLi = document.createElement('li');
    const nameFavourite = document.createElement('span');
    const imageFavourite = document.createElement('img');
    const closeFavourite = document.createElement('span');
    const nameContent = document.createTextNode(favName);
    closeFavourite.innerHTML = 'X';
    closeFavourite.classList.add('icon');
    nameFavourite.classList.add('favourite-name');
    imageFavourite.classList.add('favourite-image');
    favouriteLi.classList.add('favourite-content');
    imageFavourite.src = favImage;

    nameFavourite.appendChild(nameContent);
    favouriteLi.appendChild(imageFavourite);
    favouriteLi.appendChild(nameFavourite);
    favouriteLi.appendChild(closeFavourite);
    elementFavouriteList.appendChild(favouriteLi);
  };
}; 

  
//Ejecuto mi listener sobre el elemento, en este caso el botón para que genere la función de conectarse a la Api.
elementButton.addEventListener('click', connectToApi);