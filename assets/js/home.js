import { renderNavbar } from './navbar.js';
import { initializeChatbot } from './chatbot.js';
import { initCineBot } from '../gemini/gemini.js';

export async function renderHomePage(user) {
  $("#app").html(`
    <div class="min-h-screen text-white flex flex-col animated-gradient">
      ${renderNavbar(user)}

      <!-- Mobile Sidebar -->
      <div id="mobileMenu"
        class="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white transform translate-x-full transition-transform duration-300 z-50 md:hidden shadow-xl flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-purple-700">
          <h2 class="text-xl font-bold">Menu</h2>
          <button id="menuClose" class="text-2xl"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <nav class="flex flex-col space-y-6 px-6 mt-8 text-lg font-medium flex-grow">
          <a href="#home" class="hover:text-yellow-400">Home</a>
          <a href="#about" class="hover:text-yellow-400">About</a>
          <a href="#features" class="hover:text-yellow-400">Features</a>
          <a href="#faq" class="hover:text-yellow-400">FAQ</a>
          <a href="#testimony" class="hover:text-yellow-400">Testimony</a>
          <a href="#search" class="hover:text-yellow-400">Search</a>
        </nav>
        <div class="p-6 border-t border-purple-700">
          <button id="logoutBtn"
            class="w-full py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition">
            <i class="fa-solid fa-right-from-bracket mr-2"></i> Logout
          </button>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="relative flex flex-col justify-center items-center text-white text-center min-h-screen px-6 z-10">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')] 
                    bg-cover bg-center brightness-50"></div>
        <div class="relative z-10">
          <h2 class="text-5xl md:text-6xl font-extrabold mb-6">Welcome to Cineview 🎬</h2>
          <p class="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Discover, search, and explore movies from around the world. Your next favorite film is just a click away.
          </p>
          <a href="#search" 
            class="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-bold shadow-lg transition transform hover:scale-105">
            Start Searching
          </a>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-20 px-6 bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-950 text-white z-10">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold mb-6">About Us</h2>
            <p class="text-lg leading-relaxed text-gray-200">
              Cineview is your go-to movie database platform. From Hollywood blockbusters 
              to indie gems, we provide you with detailed information, ratings, 
              and reviews — all in one place.
            </p>
          </div>
          <img src="../assets/img/icon-movie.png" 
               alt="About Cineview" class="w-80 mx-auto drop-shadow-lg">
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 px-6 bg-gradient-to-r from-purple-950 via-violet-900 to-indigo-950 text-white z-10">
        <div class="max-w-6xl mx-auto text-center mb-12">
          <h2 class="text-4xl font-bold">Why Choose Cineview?</h2>
          <p class="text-lg text-gray-300 mt-4">Discover what makes Cineview your best choice for exploring movies.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="bg-white/10 rounded-2xl p-8 shadow-lg hover:scale-105 transition transform text-center">
            <i class="fa-solid fa-film text-yellow-400 text-4xl mb-4"></i>
            <h3 class="text-2xl font-bold mb-3">Extensive Database</h3>
            <p class="text-gray-300">From blockbusters to hidden gems, explore thousands of movies in one place.</p>
          </div>
          <div class="bg-white/10 rounded-2xl p-8 shadow-lg hover:scale-105 transition transform text-center">
            <i class="fa-solid fa-star text-yellow-400 text-4xl mb-4"></i>
            <h3 class="text-2xl font-bold mb-3">Trusted Ratings</h3>
            <p class="text-gray-300">Check reliable ratings and reviews before deciding your next watch.</p>
          </div>
          <div class="bg-white/10 rounded-2xl p-8 shadow-lg hover:scale-105 transition transform text-center">
            <i class="fa-solid fa-magnifying-glass text-yellow-400 text-4xl mb-4"></i>
            <h3 class="text-2xl font-bold mb-3">Fast Search</h3>
            <p class="text-gray-300">Find movies quickly with our smart and lightning-fast search engine.</p>
          </div>
        </div>
      </section>

      <!-- Testimony Section (Carousel) -->
      <section id="testimony" class="py-20 px-6 bg-gradient-to-r from-indigo-950 via-purple-950 to-violet-930 text-white z-10">
        <h2 class="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
        <div class="relative max-w-3xl mx-auto overflow-hidden">
          <div id="carousel" class="flex transition-transform duration-700 ease-in-out">
            <div class="min-w-full flex flex-col items-center text-center px-6">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4" />
              <p class="italic text-lg">"Cineview makes it so easy to find my next movie night pick!"</p>
              <h4 class="mt-4 font-bold text-yellow-400">– Sarah M.</h4>
            </div>
            <div class="min-w-full flex flex-col items-center text-center px-6">
              <img src="https://randomuser.me/api/portraits/men/46.jpg" class="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4" />
              <p class="italic text-lg">"I love the clean design and how fast the search works."</p>
              <h4 class="mt-4 font-bold text-yellow-400">– David K.</h4>
            </div>
            <div class="min-w-full flex flex-col items-center text-center px-6">
              <img src="https://randomuser.me/api/portraits/women/50.jpg" class="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4" />
              <p class="italic text-lg">"Hands down the best movie search site I’ve ever used."</p>
              <h4 class="mt-4 font-bold text-yellow-400">– Emily R.</h4>
            </div>
          </div>
          <div class="flex justify-center gap-3 mt-8">
            <button class="dot w-3 h-3 rounded-full bg-yellow-400" data-index="0"></button>
            <button class="dot w-3 h-3 rounded-full bg-gray-400 hover:bg-yellow-400" data-index="1"></button>
            <button class="dot w-3 h-3 rounded-full bg-gray-400 hover:bg-yellow-400" data-index="2"></button>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="py-20 px-6 bg-gradient-to-r from-indigo-950 via-purple-900 to-violet-950 z-10">
        <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start text-white">
          <div class="md:col-span-2">
            <h1 class="text-4xl font-bold mb-3">Any Questions?</h1>
            <h2 class="text-4xl font-bold mb-6">We got you.</h2>
            <p class="mb-8">Find answers to frequently asked questions about using Cineview.</p>
            <div class="space-y-4">
              <div class="border rounded-xl overflow-hidden">
                <button class="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 bg-white hover:bg-gray-100 faq-toggle">
                  What is Cineview?
                  <i class="fa-solid fa-chevron-down transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 py-4 bg-gray-50 text-gray-700">
                  Cineview is a movie database platform that provides detailed information, ratings, and reviews for various types of movies.
                </div>
              </div>
              <div class="border rounded-xl overflow-hidden">
                <button class="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 bg-white hover:bg-gray-100 faq-toggle">
                  Who can use Cineview?
                  <i class="fa-solid fa-chevron-down transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 py-4 bg-gray-50 text-gray-700">
                  Everyone who wants to search for, explore, or review movies.
                </div>
              </div>
              <div class="border rounded-xl overflow-hidden">
                <button class="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 bg-white hover:bg-gray-100 faq-toggle">
                  Is my personal data secure?
                  <i class="fa-solid fa-chevron-down transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 py-4 bg-gray-50 text-gray-700">
                  Yes, we protect your data with encryption and multi-layered protection systems.
                </div>
              </div>
            </div>
          </div>
          <div class="bg-red-50 p-8 rounded-2xl shadow-md">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Have another question?</h3>
            <p class="text-gray-700 mb-6">We are ready to assist you. Please feel free to contact our team anytime.</p>
            <a href="#contact" class="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-20 px-6 bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-950 text-white z-10">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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

      <!-- Chatbot Button -->
      <button id="chatbotToggle" class="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 z-100 pointer-events-auto">
        <i class="fa-solid fa-robot text-2xl"></i>
      </button>

      <!-- Chatbot Popup -->
      <div id="chatbotPopup" class="hidden fixed bottom-20 right-6 w-96 max-w-[90vw] h-[500px] bg-gray-800 rounded-xl shadow-2xl z-100 flex flex-col pointer-events-auto">
        <div class="bg-gradient-to-r from-[#4C1D95] to-[#DB2777] px-4 py-3 flex justify-between items-center rounded-t-xl">
          <h3 class="text-white font-bold text-lg">CineBot 🤖</h3>
          <button id="chatbotClose" class="text-white hover:text-yellow-300 text-xl font-semibold transition-colors pointer-events-auto">✖</button>
        </div>
        <div id="chatbotMessages" class="flex-1 p-4 overflow-y-auto bg-gray-900 text-gray-200 flex flex-col gap-3">
          <div class="bg-gray-800 p-2 rounded-lg max-w-[80%]">Loading...</div>
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
              class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 pointer-events-auto"
            >
              <i class="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="py-6 text-center bg-gray-900 text-gray-400 z-10">
        <p>&copy; 2025 Cineview 🎬. All Rights Reserved.</p>
        <div class="flex justify-center gap-4 mt-3">
          <a href="#"><i class="fa-brands fa-facebook text-xl hover:text-white"></i></a>
          <a href="#"><i class="fa-brands fa-twitter text-xl hover:text-white"></i></a>
          <a href="#"><i class="fa-brands fa-instagram text-xl hover:text-white"></i></a>
        </div>
      </footer>
    </div>
  `);

  // Add CSS for animations and glossy glass effect
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animated-gradient {
      background: radial-gradient(circle at 30% 50%, #0B0214 0%, #2A0549 50%, #4C1D95 150%);
      background-size: 300% 300%;
      animation: gradient-flow 8s ease-in-out infinite;
      position: relative;
    }
    .animated-gradient::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: -1;
    }
    #chatbotPopup.hidden {
      display: none;
    }
    #chatbotPopup {
      pointer-events: auto;
    }
    #chatbotMessages {
      min-height: 0;
      scroll-behavior: smooth;
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
    #chatbotToggle, #chatbotClose, #chatbotSend {
      user-select: none;
      cursor: pointer;
    }
    @supports not (backdrop-filter: blur(10px)) {
      .animated-gradient::before {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize chatbot after CineBot model is ready
  try {
    console.log("🚀 renderHomePage: Initializing CineBot");
    await initCineBot();
    console.log("✅ renderHomePage: CineBot model ready");
    initializeChatbot();
  } catch (err) {
    console.error("❌ renderHomePage: Failed to initialize CineBot:", err);
    initializeChatbot(); // Proceed with UI for partial functionality
  }

  // Navbar Mobile
  $("#menuToggle").on("click", function () {
    console.log("🚀 Mobile menu toggle clicked");
    $("#mobileMenu").removeClass("translate-x-full").addClass("translate-x-0");
  });
  $("#menuClose").on("click", function () {
    console.log("🔒 Mobile menu close clicked");
    $("#mobileMenu").removeClass("translate-x-0").addClass("translate-x-full");
  });
  $("#mobileMenu a").on("click", function () {
    console.log("🔗 Mobile menu link clicked:", $(this).attr("href"));
    $("#mobileMenu").removeClass("translate-x-0").addClass("translate-x-full");
  });

  // Profile Dropdown
  $("#profileBtn").off("click").on("click", function (e) {
    console.log("👤 Profile button clicked");
    e.stopPropagation();
    $("#profileMenu").toggleClass("hidden");
  });
  $(document).off("click.profile").on("click.profile", function (e) {
    if (!$(e.target).closest("#profileBtn, #profileMenu").length) {
      console.log("🖱️ Clicked outside profile menu");
      $("#profileMenu").addClass("hidden");
    }
  });
  $(document).off("keydown.profile").on("keydown.profile", function (e) {
    if (e.key === "Escape") {
      console.log("🔙 Escape key pressed for profile menu");
      $("#profileMenu").addClass("hidden");
    }
  });

  // Carousel
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
  $(".dot").on("click", function () {
    console.log("🔵 Carousel dot clicked:", $(this).data("index"));
    moveCarousel($(this).data("index"));
  });
  setInterval(function () {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveCarousel(currentSlide);
  }, 5000);
  updateDots();

  // Profile & Logout
  $("#viewProfile").on("click", () => {
    console.log("📄 View profile clicked");
    alert("Profile page belum dibuat, bisa ditambahkan hash #profile nanti.");
  });
  $("#logoutBtn").on("click", () => {
    console.log("🚪 Logout clicked");
    localStorage.removeItem("cineviewUser");
    window.location.hash = "#login";
  });

  // Contact Form
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    console.log("📩 Contact form submitted");
    alert("Message sent! We'll get back to you soon.");
    $(this).trigger("reset");
  });

  // FAQ Toggle
  $(".faq-toggle").on("click", function () {
    console.log("❓ FAQ toggle clicked");
    $(this).find(".fa-chevron-down").toggleClass("rotate-180");
    $(this).next(".faq-content").slideToggle(300);
  });
}