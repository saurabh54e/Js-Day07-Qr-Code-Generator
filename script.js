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

const downloadBtn = document.createElement("button");
downloadBtn.id = "downloadBtn";
downloadBtn.innerText = "Download QR";
downloadBtn.style.display = "none"; // hide initially

document.querySelector(".main").appendChild(downloadBtn);

downloadBtn.addEventListener("click", downloadQRCode);

function generateQRCode() {
  if (qrText.value.trim() === "") {
    alert("Enter text first");
    return;
  }
  imgBox.classList.remove("show-img");
  downloadBtn.style.display = "none";
  qrBtn.disabled = true;
  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(qrText.value);
}

qrBtn.addEventListener("click", generateQRCode);

qrText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateQRCode();
  }
});

async function downloadQRCode(){
  if(!qrImage.src){
    alert("Generate QR first");
    return;
  }

  try{
    const response = await fetch(qrImage.src, {mode:"cors"});
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${Date.now()}.png`;

    document.body.appendChild(link);
    link.click();

    setTimeout(()=>{
      URL.revokeObjectURL(url);
      link.remove();
    },100);

  }catch{
    alert("Download failed. Try again.");
  }
}

qrImage.onload = () => {
  imgBox.classList.add("show-img");
  downloadBtn.style.display = "block";
    qrBtn.disabled = false;
};
qrImage.onerror = ()=>{
  alert("Failed to generate QR. Try again.");
  downloadBtn.style.display="none";
  qrBtn.disabled=false;
};