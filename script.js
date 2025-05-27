const endpoint = "https://api.weather.gov/alerts/active?office=FFC";
const alertList = document.getElementById("alertList");

const categories = {
  "Tornado Warnings": {
    color: "red",
    match: ["Tornado Warning"]
  },
  "Severe T-Storm Warnings": {
    color: "orange",
    match: ["Severe Thunderstorm Warning"]
  },
  "Flood Alerts": {
    color: "green",
    match: [
      "Flood Warning", "Flood Watch",
      "Flash Flood Warning", "Flash Flood Watch"
    ]
  },
  "Cold Weather Alerts": {
    color: "blue",
    match: [
      "Blizzard Warning", "Blizzard Watch",
      "Winter Storm Warning", "Winter Storm Watch", "Winter Weather Advisory",
      "Wind Chill Warning", "Wind Chill Watch", "Wind Chill Advisory",
      "Freeze Warning", "Freeze Watch", "Frost Advisory",
      "Cold Weather Advisory"
    ]
  },
  "Heat Alerts": {
    color: "olive",
    match: [
      "Excessive Heat Warning", "Excessive Heat Watch",
      "Heat Advisory"
    ]
  }
};

function updateAlerts() {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      // Initialize all counts to 0
      const counts = {};
      for (let key in categories) counts[key] = 0;

      // Loop through alerts and match them to categories
      data.features.forEach(alert => {
        const event = alert.properties.event;
        for (let key in categories) {
          if (categories[key].match.includes(event)) {
            counts[key]++;
          }
        }
      });

      // Render all badges (even if 0)
      alertList.innerHTML = "";
      for (let key in categories) {
        const count = counts[key];
        const div = document.createElement("div");
        div.className = "alert-item";
        div.innerHTML = `<span>${key}</span><span class="alert-badge ${categories[key].color}">${count}</span>`;
        alertList.appendChild(div);
      }
    });
}

updateAlerts();
setInterval(updateAlerts, 60000);
