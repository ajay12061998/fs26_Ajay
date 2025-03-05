let offset = 0;
let limit = 40;
const typesURL = `https://pokeapi.co/api/v2/type/?${limit}`;
const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
let types;
let pokemons;
let finalData = [];
let currentPage = 1;

const select = document.querySelector("select");
const pokemonsDiv = document.querySelector("#pokemons");
const search = document.querySelector("#search");
const loadMore = document.querySelector("#loadMore");
const loadingDiv = document.querySelector("#loading");
const count = document.querySelector("#count");

const prevPage = document.querySelector("#prevPage");
const nextPage = document.querySelector("#nextPage");
const pageNumber = document.querySelector("#pageNumber");

getTypes();
getPokemons(pokemonURL);

async function getDataFromURL(url){
  const response = await fetch(url);
  return response.json();
}

async function getPokemons(url) {
  pokemons = await getDataFromURL(url);
  pokemons = pokemons.results;

  const promises = pokemons.map((obj) => getDataFromURL(obj.url));

  const newData = await Promise.all(promises);
  finalData = [...finalData, ...newData]; // Append new data instead of replacing
  count.textContent = finalData.length;
  console.log(finalData);
  displayData(finalData);
}

function displayData(data){
  // loadingDiv.style.display = "block";
  pokemonsDiv.innerHTML = "<h2>Loading...</h2>";
  pokemonsDiv.innerHTML = ""; 

  const fragment = document.createDocumentFragment();
  data.forEach((obj) => {
    const parent = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h2");
    const type = document.createElement("p");

    image.src = obj.sprites.other.dream_world.front_default || obj.sprites.front_default;
    name.innerText = obj.name;

    const types = obj.types.map((t) => t.type.name).join(", ");
    type.innerHTML = `<strong>Type:</strong> ${types}`;

    parent.append(image, name, type);
    fragment.append(parent);
  });

  // loadingDiv.style.display = "none";
  pokemonsDiv.append(fragment);
};

async function getTypes(){
  types = await getDataFromURL(typesURL);
  types = types.results;
  console.log(types);
  createOptions(types);
};

function createOptions(types){
  const fragment = document.createDocumentFragment("option");
  types.forEach((obj) => {
    const option = document.createElement("option");
    option.value = obj.name;
    option.innerText = obj.name;
    fragment.append(option);
  });
  select.append(fragment);
};

select.addEventListener("change", (e) => {
  const selectedType = e.target.value;
  if(selectedType === "all"){
    displayData(finalData);
    updateCount(finalData)
  }else{
    const filteredData = finalData.filter((pokemon) => pokemon.types.some((type) => type.type.name === selectedType));
    displayData(filteredData);
    updateCount(filteredData);
  }
});

search.addEventListener("keyup" , (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  if(searchTerm.length === 0){
    displayData(finalData);
    updateCount(finalData);
  }else if(searchTerm.length > 2){
    const searchedPokemons = finalData.filter((obj) => obj.name.includes(searchTerm));
    if(searchedPokemons.length === 0){
      pokemonsDiv.innerHTML = "<h1>No Pokemon Found</h1>";
    }else{
      displayData(searchedPokemons);
    }
    updateCount(searchedPokemons)
  }
});

loadMore.addEventListener("click", ()=> {
  offset += limit;
  getPokemons(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
})

function updateCount(data) {
  count.textContent = data.length;
}
