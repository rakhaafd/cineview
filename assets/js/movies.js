import { loadComments } from "./comments.js";

const apiKey = "44388df1";

export function searchMovies(keyword, genre = "", year = "", country = "") {
  if (keyword.trim() === "") {
    $(".movie-container").html("");
    return;
  }

  $(".movie-container").html("<p class='text-center text-gray-300 text-lg animate-pulse'>Loading...</p>");

  $.ajax({
    url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`,
    success: (results) => {
      if (results.Response === "True") {
        const requests = results.Search.map(f =>
          $.ajax({ url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${f.imdbID}` })
        );

        $.when(...requests).done((...details) => {
          let movies = details.map(d => Array.isArray(d) ? d[0] : d);

          // Apply filters
          if (genre) movies = movies.filter(m => m.Genre && m.Genre.includes(genre));
          if (year) movies = movies.filter(m => m.Year && m.Year.includes(year));
          if (country) movies = movies.filter(m => m.Country && m.Country.includes(country));

          if (movies.length) {
            $(".movie-container").html(movies.map(showCards).join(""));
            attachDetailButtons();
          } else {
            $(".movie-container").html(`<p class="col-span-full text-center text-xl font-semibold text-yellow-300">❌ No movies found</p>`);
          }
        });
      } else {
        $(".movie-container").html(`<p class="col-span-full text-center text-xl font-semibold text-yellow-300">❌ Movie not found</p>`);
      }
    }
  });
}

function showCards(m) {
  return `
    <div class="bg-gray-900 text-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 relative group">
      <div class="relative">
        <img src="${m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x400"}" 
             alt="${m.Title}" class="w-full h-80 object-cover">
        <div class="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-300"></div>
        <span class="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          ⭐ ${m.imdbRating || 'N/A'}
        </span>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-bold truncate text-yellow-300">${m.Title}</h3>
        <p class="text-sm text-gray-400">${m.Year}</p>
        <button data-imdbid="${m.imdbID}" 
                class="modal-detail-button mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-colors">
          Movie Details
        </button>
      </div>
    </div>
  `;
}

function showMovieDetail(m) {
  let ratings = m.Ratings?.length
    ? m.Ratings.map(r => `<li class="mb-2 text-gray-200"><span class="font-semibold text-pink-400">${r.Source}:</span> ${r.Value}</li>`).join("")
    : "<li class='text-gray-400'>No ratings available</li>";

  return `
    <div class="flex flex-col md:flex-row gap-6 p-4">
      <div class="flex-shrink-0 relative">
        <img src="${m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x400"}" 
             alt="${m.Title}" class="w-64 h-96 object-cover rounded-2xl shadow-lg border-4 border-purple-600/50 transition-transform duration-300 hover:scale-105">
      </div>
      <div class="flex-1 space-y-4">
        <h3 class="text-3xl font-extrabold text-yellow-300">${m.Title} <span class="text-gray-300 text-xl">(${m.Year})</span></h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p class="text-gray-200"><span class="font-semibold text-purple-400">⭐ IMDB:</span> ${m.imdbRating || 'N/A'} (${m.imdbVotes || 'N/A'} votes)</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">🎬 Rated:</span> ${m.Rated || 'N/A'}</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">📅 Released:</span> ${m.Released || 'N/A'}</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">⏱️ Runtime:</span> ${m.Runtime || 'N/A'}</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">🎭 Genre:</span> ${m.Genre || 'N/A'}</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">🎥 Director:</span> ${m.Director || 'N/A'}</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">✍️ Writer:</span> ${m.Writer || 'N/A'}</p>
          <p class="text-gray-200"><span class="font-semibold text-purple-400">🌟 Actors:</span> ${m.Actors || 'N/A'}</p>
        </div>
        <p class="text-gray-200"><span class="font-semibold text-purple-400">🏆 Awards:</span> ${m.Awards || 'None'}</p>
        <div class="mt-4">
          <h4 class="font-semibold text-lg text-pink-400">📊 Ratings</h4>
          <ul class="list-disc ml-6 mt-2">${ratings}</ul>
        </div>
        <p class="mt-4 text-gray-300"><span class="font-semibold text-purple-400">📜 Plot:</span> ${m.Plot || 'No plot available'}</p>
      </div>
    </div>
    <div class="mt-6 border-t border-gray-700 pt-4">
      <h4 class="text-xl font-bold text-yellow-300 mb-4">💬 Comments</h4>
      <div id="commentsList" class="space-y-4 mb-4"></div>
      <form id="commentForm" class="flex gap-3 items-center">
        <input type="text" id="commentInput" placeholder="Write a comment..." 
               class="flex-1 px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all" required>
        <button type="submit" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors">
          <i class="fa-solid fa-paper-plane mr-2"></i>Send
        </button>
      </form>
    </div>
  `;
}

function attachDetailButtons() {
  $(".modal-detail-button").off("click").on("click", function () {
    const imdbID = $(this).data("imdbid");
    $.ajax({
      url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`,
      success: m => {
        $(".modal-body").html(showMovieDetail(m));
        $("#movieDetailModal").removeClass("hidden").addClass("flex");
        loadComments(imdbID);
      }
    });
  });
}