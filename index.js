"use strict";
class City {
    constructor(cityName, country, population) {
        this.cityName = cityName;
        this.country = country;
        this.population = population;
    }
}
const cities = JSON.parse(localStorage.getItem("cities") || "[]");
function addCity(city) {
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
}
function renderList(cityList = cities) {
    const list = document.getElementById("list");
    list.innerHTML = "";
    for (const city of cityList) {
        const li = document.createElement("li");
        li.textContent = `${city.cityName}, ${city.country}, ${city.population}`;
        list.appendChild(li);
    }
}
const addForm = document.getElementById("addForm");
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = document.getElementById("cityName")
        .value;
    const country = document.getElementById("country")
        .value;
    const population = document.getElementById("population")
        .valueAsNumber;
    addCity(new City(cityName, country, population));
    renderList(cities);
});
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredCities = cities.filter((city) => {
        return (city.cityName.toLowerCase().includes(searchValue) ||
            city.country.toLowerCase().includes(searchValue));
    });
    renderList(filteredCities);
});
