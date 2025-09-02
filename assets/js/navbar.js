export function renderNavbar(user) {
  return `
    <header class="px-6 py-3 flex items-center justify-between bg-gradient-to-r from-transparent to-indigo-950/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <!-- Logo -->
      <h1 class="text-2xl font-extrabold text-white cursor-pointer tracking-wide" id="logoBtn">
        Cine<span id="logoBtn" class="text-yellow-400">view.</span>
      </h1>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex flex-1 justify-center gap-6 text-gray-300 font-medium">
        <a href="#home" class="hover:text-yellow-400 transition">Home</a>
        <a href="#about" class="hover:text-yellow-400 transition">About</a>
        <a href="#features" class="hover:text-yellow-400 transition">Features</a>
        <a href="#testimony" class="hover:text-yellow-400 transition">Testimony</a>
        <a href="#faq" class="hover:text-yellow-400 transition">FAQ</a>
      </nav>

      <!-- Search and Profile -->
      <div class="hidden md:flex items-center gap-4">
        <a href="#search" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1 rounded-full font-medium transition">Search Movies</a>
        <div class="relative">
          <button id="profileBtn" class="flex items-center gap-2">
            <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md" />
          </button>
          <div id="profileMenu" 
             class="hidden absolute right-0 mt-2 bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden min-w-fit">
            <div class="px-4 py-3 border-b border-gray-700">
              <p class="font-semibold whitespace-nowrap">${user.email}</p>
            </div>
            <button id="logoutBtn" class="block w-full text-left px-4 py-2 hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white text-2xl" id="menuToggle">
        <i class="fa-solid fa-bars"></i>
      </button>
    </header>
  `;
}