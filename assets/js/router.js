// router.js
function router() {
  const hash = window.location.hash || "#login";
  const user = getUser();

  if (hash === "#login") {
    if (user) {
      window.location.hash = "#home";
      return;
    }
    renderLoginPage();
  }

  if (hash === "#home") {
    if (!user) {
      window.location.hash = "#login";
      return;
    }
    renderHomePage(user);
  }
}

function renderLoginPage() {
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

  $("#googleLoginBtn").on("click", () => {
    loginWithGoogle()
      .then(result => {
        saveUser(result.user);
        window.location.hash = "#home";
      })
      .catch(err => {
        console.error("Login gagal:", err);
        alert("Login gagal, coba lagi!");
      });
  });
}

function renderHomePage(user) {
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

  $("#logoutBtn").on("click", () => {
    logout();
    window.location.hash = "#login";
  });

  $(".search-button").on("click", () => searchMovies($(".input-keyword").val()));

  let typingTimer;
  $(".input-keyword").on("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => searchMovies($(this).val()), 500);
  });

  $(document).on("click", ".close-modal", () => {
    $("#movieDetailModal").addClass("hidden").removeClass("flex");
  });
}
