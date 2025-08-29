function renderHomePage(user) {
  $("#app").html(`
    <header class="px-4 py-2 text-center flex items-center justify-between sticky">
      <!-- Navbar -->
      <nav class="flex gap-2 amd:gap-4 items-center">
        <button class="text-2xl">
          <i class="fa-solid fa-bars"></i>
        </button>
        <h1 class="text-2xl font-extrabold drop-shadow-lg">
          Cine<span class="text-yellow-300">view</span>🎬
        </h1>
      </nav>

      <!-- Search -->
        <div class="flex w-1/4 ">
          <input type="text" placeholder="Search"
            class="input-keyword px-4 py-1 rounded-l-2xl text-gray-800 focus:outline-none" />
          <button class="search-button bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded-r-2xl font-bold text-gray-900">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

      <!-- User -->
      <button id="openBtn" class="flex items-center justify-center gap-3">
        <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400" />
      </button>
    </header>

    <!-- Pop up User -->
    <div id="popupOverlay" class="fixed bg-black bg-opacity-60 top-0 left-0 w-screen h-screen hidden justify-center items-center">
      <div class="flex flex-col gap-2 justify-center items-center bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)] p-10 w-1/3 h-1/3 rounded-2xl ">
        <div class="flex justify-center items-center h-full">
          <img src="${user.photo}" class="w-13 h-13 rounded-full border-2 border-yellow-400" />
        </div>
        <span class="text-2x1 font-semibold">Hi, ${user.name}!</span>
        <button id="logoutBtn" class=" px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl">Logout</button>
        <button id="closeBtn" class="">Close</button>
      </div>
    </div>

    <!-- Hero -->
    <section class="">
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