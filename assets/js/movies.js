// movies.js
const apiKey = "44388df1";

function searchMovies(keyword) {
  if (keyword.trim() === "") {
    $(".movie-container").html("");
    return;
  }

  $.ajax({
    url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`,
    success: (results) => {
      if (results.Response === "True") {
        const cards = results.Search.map(showCards).join("");
        $(".movie-container").html(cards);

        $(".modal-detail-button").on("click", function () {
          $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${$(this).data("imdbid")}`,
            success: (m) => {
              $(".modal-body").html(showMovieDetail(m));
              $("#movieDetailModal").removeClass("hidden").addClass("flex");
              loadComments(m.imdbID);
            },
          });
        });
      } else {
        $(".movie-container").html(`<p class="col-span-full text-center text-xl font-semibold">❌ Movie not found</p>`);
      }
    },
  });
}

function showCards(m) {
  return `
    <div class="bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition">
      <img src="${m.Poster != "N/A" ? m.Poster : "https://via.placeholder.com/300x400"}" alt="${m.Title}" class="w-full h-80 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-bold truncate">${m.Title}</h3>
        <p class="text-sm text-gray-600">${m.Year}</p>
        <button data-imdbid="${m.imdbID}" class="modal-detail-button mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl">
          Show Details
        </button>
      </div>
    </div>
  `;
}

function showMovieDetail(m) {
  let ratings = m.Ratings?.length
    ? m.Ratings.map(r => `<li class="mb-1"><span class="font-semibold">${r.Source}:</span> ${r.Value}</li>`).join("")
    : "<li>No ratings available</li>";

  return `
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-shrink-0">
        <img src="${m.Poster != "N/A" ? m.Poster : "https://via.placeholder.com/300x400"}" alt="${m.Title}" class="w-64 rounded-2xl shadow-lg object-cover border-4 border-purple-600">
      </div>
      <div class="flex-1 space-y-3">
        <h3 class="text-3xl font-extrabold text-yellow-300">${m.Title} <span class="text-white">(${m.Year})</span></h3>
        <p><span class="font-semibold text-purple-400">⭐ IMDB:</span> ${m.imdbRating} (${m.imdbVotes} votes)</p>
        <p><span class="font-semibold text-purple-400">Rated:</span> ${m.Rated}</p>
        <p><span class="font-semibold text-purple-400">Released:</span> ${m.Released}</p>
        <p><span class="font-semibold text-purple-400">Runtime:</span> ${m.Runtime}</p>
        <p><span class="font-semibold text-purple-400">Genre:</span> ${m.Genre}</p>
        <p><span class="font-semibold text-purple-400">Director:</span> ${m.Director}</p>
        <p><span class="font-semibold text-purple-400">Writer:</span> ${m.Writer}</p>
        <p><span class="font-semibold text-purple-400">Actors:</span> ${m.Actors}</p>
        <p><span class="font-semibold text-purple-400">Awards:</span> 🏆 ${m.Awards}</p>
        <div class="mt-4">
          <h4 class="font-semibold text-lg text-pink-400">Ratings:</h4>
          <ul class="list-disc ml-5">${ratings}</ul>
        </div>
        <p class="mt-4 text-gray-300"><span class="font-semibold text-purple-400">Plot:</span> ${m.Plot}</p>
      </div>
    </div>
    <div class="mt-8 border-t border-gray-700 pt-4">
      <h4 class="text-xl font-bold text-yellow-300 mb-3">💬 Comments</h4>
      <div id="commentsList" class="space-y-3 mb-4"></div>
      <form id="commentForm" class="flex gap-2">
        <input type="text" id="commentInput" placeholder="Write a comment..." class="flex-1 px-4 py-2 rounded-xl text-gray-800 focus:outline-none" required>
        <button type="submit" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Send</button>
      </form>
    </div>
  `;
}
