class City {
  cityName: string;
  country: string;
  population: number;
  constructor(cityName: string, country: string, population: number) {
    this.cityName = cityName;
    this.country = country;
    this.population = population;
  }
}

const cities: City[] = JSON.parse(localStorage.getItem("cities") || "[]");

function addCity(city: City) {
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderList(cityList: City[] = cities) {
  const list = document.getElementById("list") as HTMLElement;
  list.innerHTML = "";
  for (const city of cityList) {
    const li = document.createElement("li");
    li.textContent = `${city.cityName}, ${city.country}, ${city.population}`;
    list.appendChild(li);
  }
}

const addForm = document.getElementById("addForm") as HTMLElement;
addForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const cityName = (document.getElementById("cityName") as HTMLInputElement)
    .value;
  const country = (document.getElementById("country") as HTMLInputElement)
    .value;
  const population = (document.getElementById("population") as HTMLInputElement)
    .valueAsNumber;
  addCity(new City(cityName, country, population));
  renderList(cities);
});

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredCities = cities.filter((city) => {
    return (
      city.cityName.toLowerCase().includes(searchValue) ||
      city.country.toLowerCase().includes(searchValue)
    );
  });
  renderList(filteredCities);
});
