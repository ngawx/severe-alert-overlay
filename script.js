const endpoint = "https://api.weather.gov/alerts/active?office=FFC"; // Peachtree City Office
const alertList = document.getElementById("alertList");

const categories = {
  "Tornado Warning": "red",
  "Severe Thunderstorm Warning": "orange",
  "Flood Warning": "green",
  "Flood Watch": "olive"
};

function updateAlerts() {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      const counts = {};

      data.features.forEach(alert => {
        const event = alert.properties.event;
        if (categories[event]) {
          counts[event] = (counts[event] || 0) + 1;
        }
      });

      alertList.innerHTML = "";
      for (let event in categories) {
        const count = counts[event] || 0;
        const color = categories[event];
        const div = document.createElement("div");
        div.className = "alert-item";
        div.innerHTML = `<span>${event}</span><span class="alert-badge ${color}">${count}</span>`;
        alertList.appendChild(div);
      }
    });
}

// Update every 60 seconds
updateAlerts();
setInterval(updateAlerts, 60000);
