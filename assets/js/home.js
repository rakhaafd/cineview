// home.js (Landing Page dengan Profile + Logout)
export function renderHomePage(user) {
  $("#app").html(`
    <!-- Navbar -->
    <header class="px-6 py-3 flex items-center justify-between 
          bg-gradient-to-r from-purple-900/90 to-indigo-900/90 
          backdrop-blur-md shadow-lg sticky top-0 z-50">
      <h1 class="text-2xl font-extrabold text-white cursor-pointer tracking-wide" id="logoBtn">
        Cine<span class="text-yellow-400">view</span>🎬
      </h1>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex gap-6 text-gray-300 font-medium">
        <a href="#home" class="hover:text-yellow-400 transition">Home</a>
        <a href="#about" class="hover:text-yellow-400 transition">About</a>
        <a href="#testimony" class="hover:text-yellow-400 transition">Testimony</a>
        <a href="#contact" class="hover:text-yellow-400 transition">Contact</a>
        <a href="#search" class="hover:text-yellow-400 transition">Search</a>
        <a href="#login" class="hover:text-yellow-400 transition">Login</a>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white text-2xl" id="menuToggle">
        <i class="fa-solid fa-bars"></i>
      </button>

      <!-- Profile Dropdown -->
      <div class="relative hidden md:block">
        <button id="profileBtn" class="flex items-center gap-2">
          <img src="${user.photo}" class="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md" />
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

    <!-- Hero Section -->
    <section class="relative flex flex-col justify-center items-center text-white text-center min-h-screen px-6">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')] 
                  bg-cover bg-center brightness-50"></div>
      <div class="relative z-10">
        <h2 class="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">Welcome to Cineview 🎬</h2>
        <p class="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200 animate-fade-in-delay">
          Discover, search, and explore movies from around the world. Your next favorite film is just a click away.
        </p>
        <a href="#search" 
          class="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-bold shadow-lg transition transform hover:scale-105">
          Start Searching
        </a>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 px-6 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl font-bold mb-6">About Us</h2>
          <p class="text-lg leading-relaxed text-gray-200">
            Cineview is your go-to movie database platform. From Hollywood blockbusters 
            to indie gems, we provide you with detailed information, ratings, 
            and reviews — all in one place.
          </p>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/744/744502.png" 
            alt="About Cineview" class="w-80 mx-auto animate-float drop-shadow-lg">
      </div>
    </section>

    <!-- Testimony Section (Carousel) -->
    <section id="testimony" class="py-20 px-6 bg-gradient-to-r from-purple-950 to-indigo-900 text-white">
      <h2 class="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
      
      <div class="relative max-w-3xl mx-auto overflow-hidden">
        <!-- Carousel wrapper -->
        <div id="carousel" class="flex transition-transform duration-700 ease-in-out">
          <!-- Slide 1 -->
          <div class="min-w-full flex flex-col items-center text-center px-6">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4" />
            <p class="italic text-lg">"Cineview makes it so easy to find my next movie night pick!"</p>
            <h4 class="mt-4 font-bold text-yellow-400">– Sarah M.</h4>
          </div>
          <!-- Slide 2 -->
          <div class="min-w-full flex flex-col items-center text-center px-6">
            <img src="https://randomuser.me/api/portraits/men/46.jpg" class="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4" />
            <p class="italic text-lg">"I love the clean design and how fast the search works."</p>
            <h4 class="mt-4 font-bold text-yellow-400">– David K.</h4>
          </div>
          <!-- Slide 3 -->
          <div class="min-w-full flex flex-col items-center text-center px-6">
            <img src="https://randomuser.me/api/portraits/women/50.jpg" class="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4" />
            <p class="italic text-lg">"Hands down the best movie search site I’ve ever used."</p>
            <h4 class="mt-4 font-bold text-yellow-400">– Emily R.</h4>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex justify-center gap-3 mt-8">
          <button class="dot w-3 h-3 rounded-full bg-yellow-400" data-index="0"></button>
          <button class="dot w-3 h-3 rounded-full bg-gray-400 hover:bg-yellow-400" data-index="1"></button>
          <button class="dot w-3 h-3 rounded-full bg-gray-400 hover:bg-yellow-400" data-index="2"></button>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-6 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <!-- Contact Info -->
        <div>
          <h2 class="text-4xl font-bold mb-6">Get in Touch</h2>
          <p class="text-lg text-gray-200 mb-6">We’d love to hear from you. Reach out anytime through the form or via our contact details below:</p>
          <ul class="space-y-4">
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-envelope text-yellow-400 text-xl"></i>
              <span>support@cineview.com</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-phone text-yellow-400 text-xl"></i>
              <span>+62 812-3456-7890</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-location-dot text-yellow-400 text-xl"></i>
              <span>Jakarta, Indonesia</span>
            </li>
          </ul>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8 text-gray-900">
          <form id="contactForm" class="space-y-4">
            <input type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none" required>
            <input type="email" placeholder="Your Email" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none" required>
            <textarea placeholder="Your Message" rows="5" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none" required></textarea>
            <button type="submit" class="w-full px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow-md">Send Message</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-6 text-center bg-gray-900 text-gray-400">
      <p>&copy; 2025 Cineview 🎬. All Rights Reserved.</p>
      <div class="flex justify-center gap-4 mt-3">
        <a href="#"><i class="fa-brands fa-facebook text-xl hover:text-white"></i></a>
        <a href="#"><i class="fa-brands fa-twitter text-xl hover:text-white"></i></a>
        <a href="#"><i class="fa-brands fa-instagram text-xl hover:text-white"></i></a>
      </div>
    </footer>
  `);

  // Simple Carousel Script
  $(document).ready(function(){
    let currentSlide = 0;
    const totalSlides = $("#carousel > div").length;

    function moveCarousel(index) {
      currentSlide = index;
      $("#carousel").css("transform", `translateX(-${index * 100}%)`);
      updateDots();
    }

    function updateDots() {
      $(".dot").removeClass("bg-yellow-400").addClass("bg-gray-400");
      $(`.dot[data-index='${currentSlide}']`).removeClass("bg-gray-400").addClass("bg-yellow-400");
    }

    // Dot click
    $(".dot").on("click", function() {
      const index = $(this).data("index");
      moveCarousel(index);
    });

    // Auto slide every 5s
    setInterval(function() {
      currentSlide = (currentSlide + 1) % totalSlides;
      moveCarousel(currentSlide);
    }, 5000);

    // Initial dot update
    updateDots();
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

  // Contact form event
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    $(this).trigger("reset");
  });
}
