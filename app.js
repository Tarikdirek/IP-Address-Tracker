// Initialize and center the map
var map = L.map("map").setView([37.878563, 41.125728], 13);

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add a marker
var marker = L.marker([37.878563, 41.125728]).addTo(map);
marker.bindPopup("A simple marker!").openPopup();

let button = document.getElementsByClassName("search-btn")[0];

button.addEventListener("click", async () => {
  let inputValue = document.getElementsByClassName("tracker-ip")[0];
  let data = await getLocation(inputValue.value);

  parseData(data);
  let lat = data.location.lat;
  let long = data.location.lng;

  map.setView([lat, long], 13);

  marker
    .setLatLng([lat, long])
    .bindPopup(`Location: ${data.location.city}, ${data.location.region}`)
    .openPopup();
});

async function getLocation(value) {
  let response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_JMS6uGnytQJvAOZitn9SHE7ct2bB2&domain=${value}`
  );
  let data = response.json();
  return data;
}

function parseData(data) {
  let paragraphs = document.querySelectorAll(".data-parse");
  paragraphs[0].innerText = data.ip;
  paragraphs[1].innerText =
    data.location.city + ", " + data.location.region+ data.location.postalCode;
  paragraphs[2].innerText = `UTC${data.location.timezone}`;
  paragraphs[3].innerText = data.isp ? data.isp : "None";
}
