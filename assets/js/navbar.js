const mobileSearchBtn = document.getElementById("mobile-search-btn");
const mobileSearch = document.getElementById("mobile-search");

mobileSearchBtn.addEventListener("click", () => {
  mobileSearch.classList.toggle("hidden");
});