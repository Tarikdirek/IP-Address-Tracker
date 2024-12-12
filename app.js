// Initialize and center the map
var map = L.map('map').setView([37.40599, -122.078514], 13); 

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker
var marker = L.marker([37.40599, -122.078514]).addTo(map);
marker.bindPopup("A simple marker!").openPopup();

let button = document.getElementsByClassName("search-btn")[0]

button.addEventListener("click",()=>{
    let inputValue = document.getElementsByClassName("tracker-ip")[0]
    console.log(inputValue.value)
})