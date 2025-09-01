// assets/js/search.js
import { initializeChatbot } from "./chatbot.js";

export function renderSearchPage(user) {
  $("#app").html(`
    <header
      class="px-6 py-3 flex items-center justify-between 
            bg-gradient-to-r from-transparent to-indigo-950/90 
            backdrop-blur-md shadow-lg sticky top-0 z-50">

      <!-- Logo -->
      <h1 class="text-2xl font-extrabold text-white cursor-pointer tracking-wide" id="logoBtn">
        Cine<span class="text-yellow-400">view</span>🎬
      </h1>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex gap-6 text-gray-300 font-medium">
        <a href="#home" class="hover:text-yellow-400 transition">Home</a>
        <a href="#about" class="hover:text-yellow-400 transition">About</a>
        <a href="#testimony" class="hover:text-yellow-400 transition">Testimony</a>
        <a href="#features" class="hover:text-yellow-400 transition">Features</a>
        <a href="#faq" class="hover:text-yellow-400 transition">FAQ</a>
        <a href="#contact" class="hover:text-yellow-400 transition">Contact</a>
        <a href="#search" class="hover:text-yellow-400 transition">Search</a>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white text-2xl" id="menuToggle">
        <i class="fa-solid fa-bars"></i>
      </button>

      <!-- Profile Dropdown -->
        <div class="relative hidden md:block">
          <button id="profileBtn" class="flex items-center gap-2">
            <img src="${
              user.photo
            }" class="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md" />
          </button>
          <div id="profileMenu" 
              class="hidden absolute right-0 mt-2 w-52 bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-700">
             <p class="font-semibold">${user.email}</p>
            </div>
            <button id="viewProfile" class="block w-full text-left px-4 py-2 hover:bg-purple-700">Profile</button>
            <button id="logoutBtn" class="block w-full text-left px-4 py-2 hover:bg-red-600">Logout</button>
          </div>
        </div>
    </header>

    <!-- Mobile Sidebar -->
    <div id="mobileMenu"
      class="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white transform translate-x-full transition-transform duration-300 z-50 md:hidden shadow-xl">
      <div class="flex justify-between items-center p-4 border-b border-purple-700">
        <h2 class="text-xl font-bold">Menu</h2>
        <button id="menuClose" class="text-2xl"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <nav class="flex flex-col space-y-6 px-6 mt-8 text-lg font-medium">
        <a href="#home" class="hover:text-yellow-400">Home</a>
        <a href="#about" class="hover:text-yellow-400">About</a>
        <a href="#testimony" class="hover:text-yellow-400">Testimony</a>
        <a href="#features" class="hover:text-yellow-400 transition">Features</a>
        <a href="#faq" class="hover:text-yellow-400 transition">FAQ</a>
        <a href="#contact" class="hover:text-yellow-400">Contact</a>
        <a href="#search" class="hover:text-yellow-400">Search</a>
      </nav>
    </div>

      <!-- Search Section -->
      <section id="searchSection" class="flex-1 flex flex-col items-center justify-center text-center py-20 transition-all duration-500">
        <h1 class="text-5xl font-extrabold mb-4">
          Cine<span class="text-yellow-300">view</span> 🎬
        </h1>
        <p class="text-gray-300 mb-8 text-lg max-w-md animate-fade-in">
          Craving a movie night? Discover top-rated films with <span class="font-bold text-yellow-300">Cineview</span> in seconds!
        </p>

        <!-- Search Bar -->
        <div class="flex items-center bg-gray-800 rounded-full overflow-hidden shadow-xl w-full max-w-3xl transition-transform duration-300 hover:scale-105">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Find your next blockbuster..." 
            class="flex-1 px-6 py-4 bg-transparent focus:outline-none text-white placeholder-gray-400 text-lg"
          >
          <button 
            id="searchBtn" 
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-4 font-semibold transition-all duration-300 hover:shadow-lg"
          >
            <i class="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>

        <!-- Filters -->
        <div class="flex gap-6 mt-8 flex-wrap justify-center animate-slide-up">
          <!-- Genre -->
          <div class="relative group">
            <i class="fa-solid fa-film absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-300 transition-colors"></i>
            <select 
              id="genreFilter" 
              class="pl-10 pr-4 py-3 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <option value="">Pick a Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Animation">Animation</option>
            </select>
          </div>

          <!-- Year -->
          <div class="relative group">
            <i class="fa-solid fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-300 transition-colors"></i>
            <select 
              id="yearFilter" 
              class="pl-10 pr-4 py-3 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <option value="">Choose a Year</option>
              ${Array.from({ length: 30 }, (_, i) => {
                const year = 2025 - i;
                return `<option value="${year}">${year}</option>`;
              }).join("")}
            </select>
          </div>

          <!-- Country -->
          <div class="relative group">
            <i class="fa-solid fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-300 transition-colors"></i>
            <select 
              id="countryFilter" 
              class="pl-10 pr-4 py-3 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <option value="">Select a Country</option>
              <option value="USA">USA</option>
              <option value="Japan">Japan</option>
              <option value="Korea">Korea</option>
              <option value="India">India</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Results -->
      <section id="resultsSection" class="px-6 py-12 hidden">
        <h2 class="text-3xl font-bold mb-6 animate-fade-in">Your Movie Picks 🍿</h2>
        <div class="movie-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
      </section>

      <!-- Modal -->
      <div id="movieDetailModal" class="modal hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl max-w-5xl w-full text-gray-200 shadow-2xl overflow-hidden animate-zoom-in">
          <div class="flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <h2 class="font-bold text-2xl text-white">🎥 Movie Spotlight</h2>
            <button class="close-modal text-white font-bold hover:text-yellow-300 text-2xl transition-colors">✖</button>
          </div>
          <div class="modal-body p-6 max-h-[75vh] overflow-y-auto"></div>
        </div>
      </div>

      <!-- Chatbot Button -->
      <button id="chatbotToggle" class="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 z-50">
        <i class="fa-solid fa-robot text-2xl"></i>
      </button>

      <!-- Chatbot Popup -->
      <div id="chatbotPopup" class="hidden fixed bottom-20 right-6 w-80 max-w-[90vw] bg-gray-800 rounded-xl shadow-2xl z-50 animate-zoom-in flex flex-col">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex justify-between items-center rounded-t-xl">
          <h3 class="text-white font-bold text-lg">CineBot 🤖</h3>
          <button id="chatbotClose" class="text-white hover:text-yellow-300 text-xl font-semibold transition-colors">✖</button>
        </div>
        <div id="chatbotMessages" class="flex-1 p-4 min-h-[200px] max-h-[400px] overflow-y-auto bg-gray-900 text-gray-200 flex flex-col gap-3">
          <!-- Messages will be appended here -->
        </div>
        <div class="p-4 border-t border-gray-700">
          <div class="flex items-center bg-gray-700 rounded-full overflow-hidden">
            <input 
              type="text" 
              id="chatbotInput" 
              placeholder="Ask about movies..." 
              class="flex-1 px-4 py-2 bg-transparent focus:outline-none text-white placeholder-gray-400 text-sm"
            >
            <button 
              id="chatbotSend" 
              class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2"
            >
              <i class="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `);

  // Navbar Mobile
  // Open sidebar
  $("#menuToggle").on("click", function () {
    $("#mobileMenu").removeClass("translate-x-full").addClass("translate-x-0");
  });

  // Close sidebar
  $("#menuClose").on("click", function () {
    $("#mobileMenu").removeClass("translate-x-0").addClass("translate-x-full");
  });

  // (Opsional) close setelah klik link
  $("#mobileMenu a").on("click", function () {
    $("#mobileMenu").removeClass("translate-x-0").addClass("translate-x-full");
  });

  // Toggle dropdown profile
  $("#profileBtn").on("click", () => {
    $("#profileMenu").toggleClass("hidden");
  });

  // View Profile
  $("#viewProfile").on("click", () => {
    alert("Profile page belum dibuat, bisa ditambahkan hash #profile nanti.");
  });

  // Logout
  $("#logoutBtn").on("click", () => {
    localStorage.removeItem("cineviewUser");
    window.location.hash = "#login";
  });

  // tambahkan style animasi (seperti sebelumnya)
  const style = document.createElement("style");
  style.innerHTML = `...`;
  document.head.appendChild(style);

  // langsung panggil chatbot init
  initializeChatbot();

  // --- Existing functionality (handleSearch, dll) ---
  function handleSearch() {
    const keyword = $("#searchInput").val();
    const genre = $("#genreFilter").val();
    const year = $("#yearFilter").val();
    const country = $("#countryFilter").val();

    if (!keyword) return;

    $("#searchSection")
      .removeClass("flex-1 justify-center")
      .addClass("py-6 border-b border-gray-700");
    $("#resultsSection").removeClass("hidden");

    searchMovies(keyword, genre, year, country);
  }

  $("#searchBtn").on("click", handleSearch);
  $("#searchInput").on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });

  $(document).on("click", ".close-modal", () => {
    $("#movieDetailModal").addClass("hidden").removeClass("flex");
  });
}
