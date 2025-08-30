//genre.js
// Menampilkan halaman genre
function renderGenrePage() {
  $("#app").html(`
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6 text-purple-600">Choose a Genre</h1>
      <div id="genreContainer" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>
    </div>
  `);

  const sampleKeywords = ["love","action","adventure","comedy","drama"];
  const allGenres = new Set();

  sampleKeywords.forEach(keyword => {
    $.ajax({
      url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`,
      success: (res) => {
        if (res.Response === "True") {
          res.Search.forEach(f => {
            $.ajax({
              url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${f.imdbID}`,
              success: (detail) => {
                detail.Genre.split(", ").forEach(g => allGenres.add(g));
                renderGenreButtons([...allGenres]);
              }
            });
          });
        }
      }
    });
  });
}

// Render tombol genre
function renderGenreButtons(genres) {
  const container = $("#genreContainer");
  container.html("");
  genres.forEach(g => {
    const btn = $(`<button class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">${g}</button>`);
    btn.on("click", () => {
      // Simpan genre yang dipilih
      localStorage.setItem("selectedGenre", g);
      window.location.hash = "#home"; // pindah ke home
    });
    container.append(btn);
  });
}
