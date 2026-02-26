
const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);


function updateThemeIcon(){
  themeToggle.innerText =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
}



if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
}
updateThemeIcon();
themeToggle.addEventListener("click",()=>{

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );

  updateThemeIcon();
});
