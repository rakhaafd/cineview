function renderSearchPage(user) {
  $("#app").html(`
    <header class="px-6 py-3 flex items-center justify-between bg-gradient-to-r from-purple-800 to-indigo-900 shadow-lg sticky top-0 z-50">
      <h1 class="text-2xl font-extrabold text-white cursor-pointer" id="logoBtn">
        Cine<span class="text-yellow-300">view</span>🎬
      </h1>
      <nav class="flex gap-6 text-gray-300 font-semibold">
        <a href="#home" class="hover:text-yellow-300">Home</a>
        <a href="#search" class="hover:text-yellow-300">Search Movies</a>
        <a href="#login" class="hover:text-yellow-300">Logout</a>
      </nav>
      <div class="flex items-center gap-2">
        <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400" />
      </div>
    </header>

    <section class="px-6 py-8 text-white">
      <h2 class="text-3xl font-bold mb-6">🔎 Search Movies</h2>
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" id="searchInput" placeholder="Type a movie title..."
          class="flex-1 px-4 py-2 rounded-xl text-gray-800 focus:outline-none" />
        <select id="genreFilter" class="px-4 py-2 rounded-xl text-gray-800">
          <option value="">All Genres</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Romance</option>
          <option>Horror</option>
          <option>Thriller</option>
        </select>
        <input type="number" id="yearFilter" placeholder="Year"
          class="px-4 py-2 rounded-xl text-gray-800 w-32" />
        <input type="text" id="countryFilter" placeholder="Country"
          class="px-4 py-2 rounded-xl text-gray-800 w-40" />
      </div>
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

  // Event search realtime
  $("#searchInput").on("input", function () {
    searchMovies($(this).val());
  });

  // Tutup modal
  $(document).on("click", ".close-modal", () => $("#movieDetailModal").addClass("hidden").removeClass("flex"));
}
