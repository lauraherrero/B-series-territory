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
    paintList();
    connectToApi();
  }
}


//Creo una función que pinte las series con los datos que recojo de la API.
const paintSeries = (dataSearch) => {
  for (let i = 0; i < dataSearch.length; i++) {
    const serieName = dataSearch[i].show.name;
    const serieImage = dataSearch[i].show.image;

    const elementDiv = document.createElement ('div');
    const elementImg = document.createElement('img');
    const elementSpan = document.createElement('span');
    const spanText = document.createTextNode(serieName);
    
    elementImg.style = 'width: 100px';

    //Necesito un condicional para la imagen. En caso de que no exista, por defecto píntame esto, sino, pintame la imagen que me traigo de la api (mediano u original).
    if(serieImage === null){
      elementImg.src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      elementImg.src = serieImage.original || serieImage.medium;
    }

    elementSpan.appendChild(spanText);
    elementDiv.appendChild(elementSpan);
    elementDiv.appendChild(elementImg);
    elementContainer.appendChild(elementDiv);    
    
    //Al pinchar sobre el div que contiene la imagen y el nombre de la serie, tenemos que añadir esta a favoritos.
    elementDiv.addEventListener('click', addNewFavourite);

    const seriesObject = {
      "name" : serieName,
      "image" : serieImage,
    }
    favouriteSeries.push(seriesObject);

  };
  
}

const paintList = (array) => {
  for(let item of array) {
    addNewFavourite(item)
  }
}

const addNewFavourite = (obj) =>{
  const favouriteLi = document.createElement('li');
  favouriteLi.innerHTML = `<img src=${obj.img}><span>${obj.name}</span>`;
  elementFavouriteList.appendChild(favouriteLi);

  

  localStorage.setItem("allFavSeries",JSON.stringify(favouriteSeries));

};

  // for(let item of favouriteSeries){
  //   const favImgData = item.img;
  //   const favNameData = item.name;

  //   const favouriteLi = document.createElement('li');
  //   const favouriteName = document.createElement('span');
  //   const favouriteImage = document.createElement('img');
  //   favouriteName.classList.add('fav-name');
  //   favouriteImage.classList.add('fav-image');
  //   favouriteLi.classList.add('item');
  //   favouriteImage.src = favImgData;
  //   favouriteName.innerHTML = favNameData;
  //   favouriteLi.appendChild(favouriteImage);
  //   favouriteLi.appendChild(favouriteName);
  //   elementFavouriteList.appendChild(favouriteLi);
    

    
    // const newElement = event.currentTarget;
    // const selectSpan = newElement.querySelector('.fav-name');
    // const selectImg = newElement.querySelector('.fav-image');
    // newElement.classList.toggle('color-brackground');
    // if(newElement.classList.contains('color-brackground')){
    //   const seriesObject = {
    //     "name" : selectSpan.innerHTML,
    //     "img" : selectImg.src,
    //   }
    // } 
  
    

// const addNewSerie = (seriesObject) =>{
//   elementFavouriteList.innerHTML = `<img src=${seriesObject.Image}><span>${seriesObject.Name}</span>`
// }

//Función para hacer la búsqueda cuando pulso enter
const submitHandler = (event) => {
  event.preventDefault();
  connectToApi();
}

elementForm.addEventListener('submit', submitHandler);
elementButton.addEventListener('click', connectToApi);
//# sourceMappingURL=main.js.map
