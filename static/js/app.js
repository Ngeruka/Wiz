// === Theme switch ===
function setTheme(theme) {
  document.body.className = "";
  document.body.classList.add("theme-" + theme);
  localStorage.setItem("theme", theme);
}
document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme");
  if(savedTheme) setTheme(savedTheme);
});

// === Synchronisation automatique toutes les 5s ===
function syncData() {
  fetch("/sync")
    .then(res => res.json())
    .then(data => {
      // Mettre à jour messages et feed
      if(data.messages) {
        let msgBox = document.querySelector("#messages");
        if(msgBox) msgBox.innerHTML = data.messages.map(m => `<p>${m.sender}: ${m.text}</p>`).join("");
      }
      if(data.feed) {
        let feedBox = document.querySelector("#feed");
        if(feedBox) feedBox.innerHTML = data.feed.map(p => `<p>${p.user}: ${p.content}</p>`).join("");
      }
    });
}
setInterval(syncData, 5000);

// === Parrainage automatique ===
function generateReferral() {
  let code = "NGRK" + Math.floor(1000000 + Math.random() * 9000000);
  let refInput = document.querySelector("#referral");
  if(refInput) refInput.value = code;
}
document.addEventListener("DOMContentLoaded", generateReferral);
