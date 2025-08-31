// home.js (Landing Page dengan Profile + Logout)
export function renderHomePage(user) {
  $("#app").html(`
    <!-- Navbar -->
    <header class="px-6 py-3 flex items-center justify-between bg-gradient-to-r from-purple-800 to-indigo-900 shadow-lg sticky top-0 z-50">
      <h1 class="text-2xl font-extrabold text-white cursor-pointer" id="logoBtn">
        Cine<span class="text-yellow-300">view</span>🎬
      </h1>
      <nav class="flex gap-6 text-gray-300 font-semibold">
        <a href="#home" class="hover:text-yellow-300">Home</a>
        <a href="#about" class="hover:text-yellow-300">About</a>
        <a href="#testimony" class="hover:text-yellow-300">Testimony</a>
        <a href="#contact" class="hover:text-yellow-300">Contact</a>
        <a href="#search" class="hover:text-yellow-300">Search Movies</a>
        <a href="#login" class="hover:text-yellow-300">Login/Register</a>
      </nav>

      <!-- Profile Dropdown -->
      <div class="relative">
        <button id="profileBtn" class="flex items-center gap-2">
          <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400" />
        </button>
        <div id="profileMenu" class="hidden absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          <div class="px-4 py-3 border-b border-gray-700">
            <p class="font-semibold">${user.email}</p>
          </div>
          <button id="viewProfile" class="block w-full text-left px-4 py-2 hover:bg-purple-700">Profile</button>
          <button id="logoutBtn" class="block w-full text-left px-4 py-2 hover:bg-red-600">Logout</button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)] text-white py-24 px-6 text-center">
      <h2 class="text-5xl font-extrabold mb-6">Welcome to Cineview 🎬</h2>
      <p class="text-lg max-w-2xl mx-auto mb-8">Discover, search, and explore movies from around the world with just one click. Your favorite films are just a search away.</p>
      <a href="#search" class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold">Start Searching</a>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 px-6 text-center bg-gray-100 text-gray-900">
      <h2 class="text-3xl font-bold mb-6">About Us</h2>
      <p class="max-w-3xl mx-auto text-lg">
        Cineview is your go-to movie database platform. From Hollywood blockbusters to indie gems, 
        we provide you with detailed information, ratings, and reviews — all in one place.
      </p>
    </section>

    <!-- Testimony Section -->
    <section id="testimony" class="py-20 px-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center">
      <h2 class="text-3xl font-bold mb-12">What Our Users Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
          <p class="italic">"Cineview makes it so easy to find my next movie night pick!"</p>
          <h4 class="mt-4 font-bold">– Sarah M.</h4>
        </div>
        <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
          <p class="italic">"I love the clean design and how fast the search works."</p>
          <h4 class="mt-4 font-bold">– David K.</h4>
        </div>
        <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
          <p class="italic">"Hands down the best movie search site I’ve ever used."</p>
          <h4 class="mt-4 font-bold">– Emily R.</h4>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-6 bg-gray-100 text-gray-900 text-center">
      <h2 class="text-3xl font-bold mb-6">Contact Us</h2>
      <p class="mb-6">We’d love to hear from you. Reach out anytime!</p>
      <form id="contactForm" class="max-w-lg mx-auto space-y-4">
        <input type="text" placeholder="Your Name" class="w-full px-4 py-2 rounded-xl border border-gray-300" required>
        <input type="email" placeholder="Your Email" class="w-full px-4 py-2 rounded-xl border border-gray-300" required>
        <textarea placeholder="Your Message" class="w-full px-4 py-2 rounded-xl border border-gray-300" rows="5" required></textarea>
        <button type="submit" class="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold">Send Message</button>
      </form>
    </section>

    <!-- Footer -->
    <footer class="py-6 text-center bg-gray-900 text-gray-400">
      <p>&copy; 2025 Cineview 🎬. All Rights Reserved.</p>
    </footer>
  `);

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

  // Contact form event
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    $(this).trigger("reset");
  });
}
