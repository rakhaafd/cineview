import { searchMovies } from "./movies.js";
import { initializeChatbot } from "./chatbot.js";

export function renderSearchPage(user) {
  $("#app").html(`
    <div class="min-h-screen bg-[radial-gradient(circle_at_30%_50%,_#0B0214_0%,_#2A0549_50%,_#3D0A6D_150%)] text-white flex flex-col animated-gradient relative">
      <!-- Vibrant blurred gradient overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(135deg,_#4C1D95/30,_#DB2777/10,_transparent_50%)] backdrop-blur-sm opacity-30 z-0"></div>

      <!-- Search Section -->
      <section id="searchSection" class="flex-1 flex flex-col items-center justify-center text-center py-20 transition-all duration-500 z-10">
        <h1 class="text-5xl font-extrabold mb-4">
          Cine<span class="text-yellow-300">view</span> 🎬
        </h1>
        <p class="text-gray-300 mb-8 text-lg max-w-md">
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
        <div class="flex gap-6 mt-8 flex-wrap justify-center">
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
      <section id="resultsSection" class="px-6 py-12 hidden z-10">
        <h2 class="text-3xl font-bold mb-6">Your Movie Picks 🍿</h2>
        <div class="movie-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
      </section>

      <!-- Modal -->
      <div id="movieDetailModal" class="modal hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-gradient-to-br from-[#1A0033] via-[#2A0549] to-[#3D0A6D] rounded-3xl max-w-5xl w-full text-gray-200 shadow-2xl overflow-hidden">
          <div class="flex justify-between items-center bg-gradient-to-r from-[#4C1D95] to-[#DB2777] px-6 py-4">
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
      <div id="chatbotPopup" class="hidden fixed bottom-20 right-6 w-80 max-w-[90vw] bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col">
        <div class="bg-gradient-to-r from-[#4C1D95] to-[#DB2777] px-4 py-3 flex justify-between items-center rounded-t-xl">
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

  // Add CSS for animations (only gradient-flow, no entry animations)
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animated-gradient {
      background: radial-gradient(circle at 30% 50%, #0B0214 0%, #2A0549 50%, #3D0A6D 150%);
      background-size: 300% 300%;
      animation: gradient-flow 8s ease-in-out infinite;
    }
    #chatbotMessages > div {
      padding: 8px 12px;
      border-radius: 8px;
      max-width: 80%;
      word-wrap: break-word;
    }
    #chatbotMessages > div.bg-gray-700 {
      margin-left: auto;
      background-color: #4B5563;
      color: #FFFFFF;
    }
    #chatbotMessages > div.bg-gray-800 {
      margin-right: auto;
      background-color: #1F2937;
      color: #E5E7EB;
    }
  `;
  document.head.appendChild(style);

  initializeChatbot();

  // ===== Utility: Debounce =====
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ===== Handle Search =====
  function handleSearch() {
    const keyword = $("#searchInput").val();
    const genre = $("#genreFilter").val();
    const year = $("#yearFilter").val();
    const country = $("#countryFilter").val();

    if (!keyword.trim()) {
      // reset tampilan kalau kosong
      $("#resultsSection").addClass("hidden");
      $("#searchSection")
        .removeClass("py-6 border-b border-gray-700")
        .addClass("flex-1 justify-center");
      $(".movie-container").html("");
      return;
    }

    // kalau ada keyword
    $("#searchSection")
      .removeClass("flex-1 justify-center")
      .addClass("py-6 border-b border-gray-700");

    $("#resultsSection").removeClass("hidden");

    searchMovies(keyword, genre, year, country);
  }

  const debouncedSearch = debounce(handleSearch, 400);

  // ===== Event Binding =====
  $("#searchBtn").on("click", handleSearch);

  $("#searchInput").on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });

  // ✅ live search ketika ketik
  $("#searchInput").on("input", debouncedSearch);

  // close modal
  $(document).on("click", ".close-modal", () => {
    $("#movieDetailModal").addClass("hidden").removeClass("flex");
  });
}