const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);

function updateThemeIcon() {
  themeToggle.innerText = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );

  updateThemeIcon();
});

const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");
const qrBtn = document.getElementById("qrBtn");

function generateQRCode() {
  if(qrText.value.trim() === ""){
    alert("Enter text first");
    return;
  }

  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(qrText.value);

//   imgBox.classList.add("show-img");
}

qrBtn.addEventListener("click", generateQRCode);

qrText.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    generateQRCode();
  }
});
qrImage.onload = ()=> imgBox.classList.add("show-img");
