document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");
  const competitionsDiv = document.getElementById("competitions");

  const API_URL = "https://api.football-data.org/v4/competitions";
  const API_KEY = "7b6507c792f74a2b9db41cfc8fd8cf05";

  fetch(API_URL, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("API Error: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      loading.style.display = "none";
      content.classList.remove("hidden");

      const competitions = data.competitions;
      competitions.forEach(comp => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${comp.name}</h3>
          <p><strong>Code:</strong> ${comp.code}</p>
          <p><strong>Area:</strong> ${comp.area.name}</p>
          <p><strong>Plan:</strong> ${comp.plan}</p>
        `;
        competitionsDiv.appendChild(div);
      });
    })
    .catch(error => {
      loading.innerText = "Failed to load data. Check your API key or connection.";
      console.error("Error fetching competitions:", error);
    });
});
