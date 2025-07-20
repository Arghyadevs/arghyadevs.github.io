// Medium articles loader
const mediumUsername = "@arghyadevs"; // Replace with your Medium username
const feedContainer = document.getElementById("medium-feed");

fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`)
  .then(res => res.json())
  .then(data => {
    const articles = data.items.slice(0, 5); // Latest 5 articles
    let html = "<ul>";
    articles.forEach(item => {
      html += `<li><a href="${item.link}" target="_blank">${item.title}</a><br/><small>${new Date(item.pubDate).toDateString()}</small></li>`;
    });
    html += "</ul>";
    feedContainer.innerHTML = html;
  })
  .catch(err => {
    feedContainer.innerHTML = "Failed to load Medium articles.";
    console.error(err);
  });

// Dark/Light Mode Toggle with Persistence
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
