function renderHomePage(user) {
  $("#app").html(`
    <header class="absolute top-0 left-0 w-full px-4 py-2 flex items-center justify-between z-50 
                  bg-black/40 backdrop-blur-sm transition-colors duration-300">
      <!-- Navbar kiri -->
      <nav class="flex gap-2 md:gap-6 items-center">
        <button class="text-2xl text-white">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div>
          <img src="assets/img/Logo.png" alt="cineview" class="w-24 h-auto">
        </div>
      </nav>

      <div class="flex items-center gap-3 relative">
        <!-- Tombol Search (Mobile) -->
        <button id="mobileSearchBtn" class="block md:hidden text-gray-300 text-xl">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        <!-- Search Box -->
        <div id="searchBox" 
            class="flex absolute md:static right-12 md:right-0 transition-all duration-300 transform scale-x-0 md:scale-x-100 origin-right z-50 w-40 md:w-auto">
          <input type="text" placeholder="Search"
            class="input-keyword bg-gray-800 px-4 py-1 rounded-2xl text-gray-300 focus:outline-none w-full" />
        </div>

        <!-- User -->
        <button id="openBtn" class="flex items-center justify-center gap-3">
          <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400" />
        </button>
      </div>
    </header>

    <div id="popupOverlay" class="fixed bg-black bg-opacity-60 top-0 left-0 w-screen h-screen hidden justify-center items-center z-50">
      <div class="flex flex-col gap-4 justify-center items-center 
                  bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)] 
                  p-6 sm:p-10 md:p-16 lg:p-20 
                  w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 
                  h-auto rounded-2xl text-center">
        
        <!-- Foto user -->
        <div class="flex justify-center items-center">
          <img src="${user.photo}" class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-yellow-400 object-cover" />
        </div>

        <!-- Nama user -->
        <span class="text-xl text-2xl font-semibold text-white">
          Hi, ${user.name}!
        </span>

        <!-- Tombol -->
        <div class="flex gap-3 mt-4 flex-wrap justify-center">
          <button id="logoutBtn" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm sm:text-base">
            Logout
          </button>
          <button id="closeBtn" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl text-sm sm:text-base">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Hero -->
    <section class="bg-[url('https://idseducation.com/wp-content/uploads/2024/10/Contoh-desain-grafis-dan-film-poster-film-inception-840x430.jpg')] 
                    h-[70vh] bg-cover bg-center">
    </section>


    <!-- Movie Cards -->
    <section class="px-6 mt-10">
      <div class="movie-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
    </section>

    <!-- Modal -->
    <div id="movieDetailModal" class="modal hidden fixed inset-0 bg-black/70 items-center justify-center z-50 p-4">
      <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl max-w-5xl w-full text-gray-200 shadow-2xl overflow-hidden">
        <div class="flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h2 class="font-bold text-2xl text-white">🎥 Movie Details</h2>
          <button class="close-modal text-white font-bold hover:text-yellow-300 text-2xl">✖</button>
        </div>
        <div class="modal-body p-6 max-h-[75vh] overflow-y-auto"></div>
      </div>
    </div>
  `);

  // Navbar
  const mobileSearchBtn = document.getElementById("mobileSearchBtn");
  const searchBox = document.getElementById("searchBox");

  // Klik tombol search → icon hilang, searchbar muncul
  mobileSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // biar ga langsung ketutup
    mobileSearchBtn.classList.add("hidden");
    searchBox.classList.remove("hidden", "scale-x-0");
    searchBox.classList.add("flex", "scale-x-100");
  });

  // Klik di luar searchbar → tutup searchbar, icon balik
  document.addEventListener("click", (e) => {
  if (window.innerWidth < 768) { // cuma di mobile
    if (!searchBox.contains(e.target) && !mobileSearchBtn.contains(e.target)) {
      searchBox.classList.remove("flex", "scale-x-100");
      searchBox.classList.add("hidden", "scale-x-0");
      mobileSearchBtn.classList.remove("hidden");
    }
  }
});


  const $popupOverlay = $("#popupOverlay");

  // buka popup
  $("#openBtn").on("click", function () {
    $popupOverlay.removeClass("hidden").addClass("flex");
  });

  // tutup popup
  $("#closeBtn").on("click", function () {
    $popupOverlay.addClass("hidden").removeClass("flex");
  });

  // klik luar card → tutup popup
  $popupOverlay.on("click", function (e) {
    if (e.target === this) {
      $popupOverlay.addClass("hidden").removeClass("flex");
    }
  });

  // logout
  $("#logoutBtn").on("click", function () {
    localStorage.removeItem("cineviewUser");
    window.location.hash = "#login";
  });

  // event search
  $(".search-button").on("click", function () {
    searchMovies($(".input-keyword").val());
  });

  $(".input-keyword").on("keyup", function () {
    clearTimeout(window.typingTimer);
    window.typingTimer = setTimeout(() => {
      searchMovies($(this).val());
    }, 500);
  });

  // close modal detail movie
  $(document).on("click", ".close-modal", function () {
    $("#movieDetailModal").addClass("hidden").removeClass("flex");
  });
}
