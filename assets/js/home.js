function renderHomePage(user) {
  $("#app").html(`
    <!-- Navbar -->
    <header class="px-6 py-3 flex items-center justify-between bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)] shadow-lg sticky top-0 z-50">
      <!-- Left: Logo -->
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-extrabold text-white drop-shadow-lg cursor-pointer" id="logoBtn">
          Cine<span class="text-yellow-300">view</span>🎬
        </h1>
      </div>

      <!-- Middle: Navigation -->
      <nav class="hidden md:flex gap-6 text-gray-300 font-semibold">
        <div class="group relative cursor-pointer" id="menuMovie">
          Movie
          <div class="absolute hidden group-hover:flex flex-col bg-gray-900 mt-2 rounded-lg shadow-lg py-2 w-40">
            <button id="mostWatchedBtn" class="px-4 py-2 hover:bg-purple-700 text-left">Most Watched</button>
            <button id="mostPopularBtn" class="px-4 py-2 hover:bg-purple-700 text-left">Most Popular</button>
          </div>
        </div>
        <button id="menuGenre" class="hover:text-yellow-300">Genre</button>
        <button id="menuYear" class="hover:text-yellow-300">Year</button>
        <button id="menuType" class="hover:text-yellow-300">Type</button>
        <button id="menuCountry" class="hover:text-yellow-300">Country</button>
      </nav>

      <!-- Right: Search + User -->
      <div class="flex items-center gap-4">
        <div class="flex">
          <input type="text" placeholder="Search"
            class="input-keyword px-4 py-1 rounded-l-2xl text-gray-800 focus:outline-none w-40 md:w-56" />
          <button class="search-button bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded-r-2xl font-bold text-gray-900">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button id="openBtn" class="flex items-center justify-center gap-2">
          <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400" />
        </button>
      </div>
    </header>

    <!-- Hero -->
    <section class="px-6 mt-6 text-white">
      <h2 class="text-2xl font-bold mb-4">Featured Movies</h2>
      <div id="featured" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
    </section>

    <section class="px-6 mt-10 text-white">
      <h2 class="text-2xl font-bold mb-4">Anime</h2>
      <div id="anime" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
    </section>

    <section class="px-6 mt-10 text-white">
      <h2 class="text-2xl font-bold mb-4">Korean Drama</h2>
      <div id="kdrama" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
    </section>

    <section class="px-6 mt-10 text-white">
      <h2 class="text-2xl font-bold mb-4">TV Series</h2>
      <div id="tvseries" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
    </section>

    <!-- Profile Modal -->
    <div id="profileModal" class="hidden fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-gray-900 rounded-2xl p-6 w-80 text-white shadow-xl">
        <h2 class="text-xl font-bold mb-4">👤 Profile</h2>
        <p class="mb-2"><span class="font-semibold">Username:</span> ${user.displayName || "User"}</p>
        <p class="mb-4"><span class="font-semibold">Email:</span> ${user.email || "-"}</p>
        <button id="logoutBtn" class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-bold">Logout</button>
        <button id="closeProfileBtn" class="w-full px-4 py-2 mt-2 bg-gray-600 hover:bg-gray-700 rounded-xl">Close</button>
      </div>
    </div>

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

  // === Helper load movies with rating filter ===
  function loadMoviesByKeywords(containerId, keywords) {
    const container = $("#" + containerId);
    container.html("<p>Loading...</p>");
    const allMovies = [];
    let completed = 0;

    keywords.forEach(keyword => {
      $.ajax({
        url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`,
        success: res => {
          completed++;
          if (res.Response === "True") {
            const requests = res.Search.map(f =>
              $.ajax({ url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${f.imdbID}` })
            );

            $.when(...requests).done((...details) => {
              details.forEach(d => {
                const movie = Array.isArray(d) ? d[0] : d;
                if (movie && parseFloat(movie.imdbRating) >= 8.0) { // Filter rating >= 8
                  allMovies.push(movie);
                }
              });

              if (completed === keywords.length) {
                if (allMovies.length) {
                  container.html(allMovies.slice(0, 8).map(showCards).join("")); // max 2 baris (8 film)
                  attachDetailButtons();
                } else {
                  container.html("<p class='col-span-full text-center text-xl font-semibold'>No movies found</p>");
                }
              }
            });
          } else if (completed === keywords.length && allMovies.length === 0) {
            container.html("<p class='col-span-full text-center text-xl font-semibold'>No movies found</p>");
          }
        }
      });
    });
  }

  // === Load all sections ===
  loadMoviesByKeywords("featured", ["love", "adventure", "action"]);
  loadMoviesByKeywords("anime", ["naruto", "one piece", "attack on titan"]);
  loadMoviesByKeywords("kdrama", ["squid game", "crash landing on you", "all of us are dead"]);
  loadMoviesByKeywords("tvseries", ["breaking bad", "game of thrones", "stranger things"]);

  // === Detail Button ===
  function attachDetailButtons() {
    $(".modal-detail-button").off("click").on("click", function () {
      $.ajax({
        url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${$(this).data("imdbid")}`,
        success: m => {
          $(".modal-body").html(showMovieDetail(m));
          $("#movieDetailModal").removeClass("hidden").addClass("flex");
          loadComments(m.imdbID);
        }
      });
    });
  }

  // === Navbar buttons ===
  $("#menuGenre").on("click", () => window.location.hash = "#genre");
  $("#menuYear").on("click", () => window.location.hash = "#year");
  $("#menuType").on("click", () => window.location.hash = "#type");
  $("#menuCountry").on("click", () => window.location.hash = "#country");

  // === Profile Modal ===
  $("#openBtn").on("click", () => $("#profileModal").removeClass("hidden"));
  $("#closeProfileBtn").on("click", () => $("#profileModal").addClass("hidden"));
  $("#logoutBtn").on("click", () => {
    localStorage.removeItem("cineviewUser");
    window.location.hash = "#login";
  });

  // === Close Detail Modal ===
  $(document).on("click", ".close-modal", () => $("#movieDetailModal").addClass("hidden").removeClass("flex"));

  // === Live Search ===
  $(".input-keyword").on("input", () => {
    const keyword = $(".input-keyword").val().trim();
    if (keyword) {
      renderSearchPage(keyword);
    } else {
      window.location.hash = "#home"; // balik ke home kalau kosong
    }
  });
}

/* ===============================
   SEARCH PAGE
=============================== */
function renderSearchPage(keyword) {
  $("#app").html(`
    <header class="px-6 py-3 flex items-center justify-between bg-gray-900 sticky top-0 z-50">
      <h1 class="text-2xl font-extrabold text-white cursor-pointer" id="logoBtn">Cine<span class="text-yellow-300">view</span>🎬</h1>
      <div class="flex">
        <input type="text" value="${keyword}" placeholder="Search" class="input-keyword px-4 py-1 rounded-l-2xl text-gray-800 focus:outline-none w-56" />
        <button class="search-button bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded-r-2xl font-bold text-gray-900">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </header>

    <section class="px-6 mt-6 text-white">
      <h2 class="text-2xl font-bold mb-4">Search Results for "${keyword}"</h2>
      <div class="movie-container grid grid-cols-2 md:grid-cols-4 gap-4"></div>
    </section>
  `);

  // Fetch movies by keyword
  $.ajax({
    url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`,
    success: res => {
      if (res.Response === "True") {
        const requests = res.Search.map(f =>
          $.ajax({ url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${f.imdbID}` })
        );

        $.when(...requests).done((...details) => {
          const movies = details
            .map(d => Array.isArray(d) ? d[0] : d)
            .filter(m => m && parseFloat(m.imdbRating) >= 8.0);

          if (movies.length) {
            $(".movie-container").html(movies.map(showCards).join(""));
            $(".modal-detail-button").off("click").on("click", function () {
              $.ajax({
                url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${$(this).data("imdbid")}`,
                success: m => {
                  $(".modal-body").html(showMovieDetail(m));
                  $("#movieDetailModal").removeClass("hidden").addClass("flex");
                  loadComments(m.imdbID);
                }
              });
            });
          } else {
            $(".movie-container").html("<p class='col-span-full text-center text-xl font-semibold'>❌ No movies found with rating ≥ 8.0</p>");
          }
        });
      } else {
        $(".movie-container").html("<p class='col-span-full text-center text-xl font-semibold'>❌ Movie not found</p>");
      }
    }
  });

  // Live search on search page too
  $(".input-keyword").on("input", () => {
    const newKeyword = $(".input-keyword").val().trim();
    if (newKeyword) {
      renderSearchPage(newKeyword);
    } else {
      window.location.hash = "#home";
    }
  });
}
