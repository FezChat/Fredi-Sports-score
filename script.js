document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const competitionsContainer = document.getElementById("competitions-container");
  const API_KEY = "7b6507c792f74a2b9db41cfc8fd8cf05";
  const BASE_URL = "https://api.football-data.org/v4";

  fetch(`${BASE_URL}/competitions`, {
    headers: { "X-Auth-Token": API_KEY }
  })
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";

      data.competitions.forEach(comp => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${comp.name}</h3>
          <p><strong>Code:</strong> ${comp.code}</p>
          <p><strong>Area:</strong> ${comp.area.name}</p>
        `;
        competitionsContainer.appendChild(card);
      });
    })
    .catch(err => {
      loading.textContent = "❌ Failed to load competitions.";
      console.error(err);
    });
});

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
}
