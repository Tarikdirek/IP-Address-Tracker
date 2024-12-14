

var map = L.map("map").setView([37.878563, 41.125728], 13);

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
  try {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;
    const isIp = ipRegex.test(value); // Check if input is an IP address
    const parameter = isIp ? `ipAddress=${value}` : `domain=${value}`;

    let response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_JMS6uGnytQJvAOZitn9SHE7ct2bB2&${parameter}`
    );

    if (!response.ok) {
      if (response.status === 422) {
        alert("IP address or domain was not found. Please try another one.");
      } else {
        alert(`An error occurred: ${response.statusText}`);
      }
      return null;
    }

    let data = await response.json();
    return data;
  } catch (error) {
    alert("An unexpected error occurred. Please try again.");
    console.error(error);
    return null;
  }
}

function parseData(data) {
  let paragraphs = document.querySelectorAll(".data-parse");
  paragraphs[0].innerText = data.ip;
  paragraphs[1].innerText =
    data.location.city + ", " + data.location.region + data.location.postalCode;
  paragraphs[2].innerText = `UTC${data.location.timezone}`;
  paragraphs[3].innerText = data.isp ? data.isp : "None";
}
