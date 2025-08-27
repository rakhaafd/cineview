$(document).ready(function () {
  const apiKey = "b90a5a49";
  let typingTimer;

  // Firestore reference
  const db = firebase.firestore();

  // Router
  function router() {
    const hash = window.location.hash || "#login";
    const user = JSON.parse(localStorage.getItem("cineviewUser"));

    if (hash === "#login") {
      if (user) {
        window.location.hash = "#home";
        return;
      }

      $("#app").html(`
        <div class="flex items-center justify-center min-h-screen">
          <div class="bg-white p-8 rounded-xl shadow-lg text-gray-800 w-full max-w-md text-center">
            <h1 class="text-3xl font-bold mb-4">Welcome to <span class="text-purple-600">Cineview 🎬</span></h1>
            <p class="mb-6">Sign in with Google to continue</p>
            <button id="googleLoginBtn" class="w-full px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold">
              Sign in with Google
            </button>
          </div>
        </div>
      `);

      // Event login
      $("#googleLoginBtn").on("click", function () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => {
            const user = result.user;
            localStorage.setItem("cineviewUser", JSON.stringify({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
            }));
            window.location.hash = "#home";
          })
          .catch(err => {
            console.error("Login gagal:", err);
            alert("Login gagal, coba lagi!");
          });
      });
    }

    if (hash === "#home") {
      if (!user) {
        window.location.hash = "#login";
        return;
      }

      $("#app").html(`
        <header class="py-6 text-center">
          <h1 class="text-5xl font-extrabold drop-shadow-lg">
            Cine<span class="text-yellow-300">view</span> 🎬
          </h1>
          <p class="mt-2 text-lg opacity-90">Find your favorite movies instantly</p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400" />
            <span>Welcome, ${user.name}</span>
            <button id="logoutBtn" class="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl">Logout</button>
          </div>
        </header>

        <!-- Search -->
        <section class="flex justify-center mt-6">
          <div class="flex w-3/4 md:w-1/2">
            <input type="text" placeholder="Search movie..."
              class="input-keyword flex-1 px-4 py-3 rounded-l-2xl text-gray-800 focus:outline-none" />
            <button class="search-button bg-yellow-400 hover:bg-yellow-500 px-5 py-3 rounded-r-2xl font-bold text-gray-900">
              Search
            </button>
          </div>
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

      // Logout
      $("#logoutBtn").on("click", function () {
        localStorage.removeItem("cineviewUser");
        window.location.hash = "#login";
      });

      // Event Search
      $(".search-button").on("click", function () {
        searchMovies($(".input-keyword").val());
      });

      $(".input-keyword").on("keyup", function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          searchMovies($(this).val());
        }, 500);
      });

      // Close modal
      $(document).on("click", ".close-modal", function () {
        $("#movieDetailModal").addClass("hidden").removeClass("flex");
      });
    }
  }

  // Movie search
  function searchMovies(keyword) {
    if (keyword.trim() === "") {
      $(".movie-container").html("");
      return;
    }

    $.ajax({
      url: "https://www.omdbapi.com/?apikey=" + apiKey + "&s=" + keyword,
      success: (results) => {
        if (results.Response === "True") {
          const movies = results.Search;
          let cards = "";
          movies.forEach((m) => {
            cards += showCards(m);
          });
          $(".movie-container").html(cards);

          // Detail button
          $(".modal-detail-button").on("click", function () {
            $.ajax({
              url: "https://www.omdbapi.com/?apikey=" + apiKey + "&i=" + $(this).data("imdbid"),
              success: (m) => {
                const movieDetail = showMovieDetail(m);
                $(".modal-body").html(movieDetail);
                $("#movieDetailModal").removeClass("hidden").addClass("flex");

                // 🔥 load komentar per imdbID
                loadComments(m.imdbID);
              },
            });
          });
        } else {
          $(".movie-container").html(
            `<p class="col-span-full text-center text-xl font-semibold">❌ Movie not found</p>`
          );
        }
      },
    });
  }

  // Movie card
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

  // Movie detail modal + komentar
  function showMovieDetail(m) {
    let ratings = "";
    if (m.Ratings && m.Ratings.length > 0) {
      ratings = m.Ratings.map(
        (r) => `<li class="mb-1"><span class="font-semibold">${r.Source}:</span> ${r.Value}</li>`
      ).join("");
    } else {
      ratings = "<li>No ratings available</li>";
    }

    return `
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-shrink-0">
          <img src="${m.Poster != "N/A" ? m.Poster : "https://via.placeholder.com/300x400"}" 
               alt="${m.Title}" 
               class="w-64 rounded-2xl shadow-lg object-cover border-4 border-purple-600">
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

      <!-- Komentar -->
      <div class="mt-8 border-t border-gray-700 pt-4">
        <h4 class="text-xl font-bold text-yellow-300 mb-3">💬 Comments</h4>
        <div id="commentsList" class="space-y-3 mb-4"></div>
        <form id="commentForm" class="flex gap-2">
          <input type="text" id="commentInput" placeholder="Write a comment..." 
            class="flex-1 px-4 py-2 rounded-xl text-gray-800 focus:outline-none" required>
          <button type="submit" 
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Send</button>
        </form>
      </div>
    `;
  }

  // 🔥 Load & submit komentar
  function loadComments(imdbID) {
    const commentsRef = db.collection("comments").doc(imdbID).collection("messages").orderBy("timestamp", "asc");

    commentsRef.onSnapshot((snapshot) => {
      let html = "";
      snapshot.forEach((doc) => {
        const c = doc.data();
        html += `
          <div class="bg-gray-800 p-3 rounded-xl">
            <div class="flex items-center gap-2">
              <img src="${c.userPhoto}" class="w-8 h-8 rounded-full" />
              <span class="font-bold text-purple-300">${c.userName}</span>
            </div>
            <p class="ml-10 text-gray-200">${c.text}</p>
          </div>
        `;
      });
      $("#commentsList").html(html || "<p class='text-gray-400'>No comments yet.</p>");
    });

    // Submit komentar
    $(document).off("submit", "#commentForm").on("submit", "#commentForm", function (e) {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("cineviewUser"));
      const text = $("#commentInput").val().trim();
      if (!text) return;

      db.collection("comments").doc(imdbID).collection("messages").add({
        userName: user.name,
        userPhoto: user.photo,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      $("#commentInput").val("");
    });
  }

  // Init router
  router();
  $(window).on("hashchange", router);
});
