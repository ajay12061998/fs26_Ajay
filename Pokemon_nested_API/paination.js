let limit = 10;
let currentPage = 1;
const typesURL = `https://pokeapi.co/api/v2/type/?limit=${limit}`;
const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
let finalData = [];

const select = document.querySelector("select");
const pokemonsDiv = document.querySelector("#pokemons");
const search = document.querySelector("#search");
const prevPage = document.querySelector("#prevPage");
const nextPage = document.querySelector("#nextPage");
const pageNumber = document.querySelector("#pageNumber");
const loadingDiv = document.querySelector("#loading");
const count = document.querySelector("#count");

getTypes();
getPokemons(pokemonURL);

async function getDataFromURL(url) {
  const response = await fetch(url);
  return response.json();
}

async function getPokemons(url) {
  pokemonsDiv.innerHTML = "<h2>Loading...</h2>"; // Show loading text
  let data = await getDataFromURL(url);
  let pokemons = data.results;

  const promises = pokemons.map((obj) => getDataFromURL(obj.url));
  finalData = await Promise.all(promises); // Replace finalData with new page data

  displayData(finalData);
  updateCount(finalData);
}

function displayData(data) {
  pokemonsDiv.innerHTML = ""; // Clear previous data

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

  pokemonsDiv.append(fragment);
}

async function getTypes() {
  let typesData = await getDataFromURL(typesURL);
  createOptions(typesData.results);
}

function createOptions(types) {
  const fragment = document.createDocumentFragment();
  types.forEach((obj) => {
    const option = document.createElement("option");
    option.value = obj.name;
    option.innerText = obj.name;
    fragment.append(option);
  });
  select.append(fragment);
}

select.addEventListener("change", (e) => {
  const selectedType = e.target.value;
  if (selectedType === "all") {
    displayData(finalData);
    updateCount(finalData);
  } else {
    const filteredData = finalData.filter((pokemon) =>
      pokemon.types.some((type) => type.type.name === selectedType)
    );
    displayData(filteredData);
    updateCount(filteredData);
  }
});

search.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  if (searchTerm.length === 0) {
    displayData(finalData);
    updateCount(finalData);
  } else if (searchTerm.length > 2) {
    const searchedPokemons = finalData.filter((obj) => obj.name.includes(searchTerm));
    pokemonsDiv.innerHTML = searchedPokemons.length
      ? ""
      : "<h1>No Pokemon Found</h1>";
    displayData(searchedPokemons);
    updateCount(searchedPokemons);
  }
});

// Pagination Logic
prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPage();
  }
});

nextPage.addEventListener("click", () => {
  currentPage++;
  fetchPage();
});

function fetchPage() {
  let offset = (currentPage - 1) * limit;
  pageNumber.textContent = currentPage; // Update UI
  getPokemons(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
}

function updateCount(data) {
  count.textContent = data.length;
}
