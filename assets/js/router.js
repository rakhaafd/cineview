import { renderHomePage } from "./home.js";
import { renderSearchPage } from "./search.js";
import {
  handleGoogleLogin,
  handleEmailLogin,
  handleEmailRegister,
  getUser,
} from "./auth.js";
import { showSuccess, showError } from "./alert.js";

export function router() {
  const hash = window.location.hash || "#login";
  const user = getUser();

  // ============ LOGIN PAGE ============
  if (hash === "#login") {
    if (user) {
      window.location.hash = "#home";
      showSuccess("Already logged in! Redirecting to home...");
      return;
    }
    renderLoginForm();
  }

  // ============ REGISTER PAGE ============
  if (hash === "#register") {
    if (user) {
      window.location.hash = "#home";
      showSuccess("Already logged in! Redirecting to home...");
      return;
    }
    renderRegisterForm();
  }

  // ============ HOME PAGE (Landing) ============
  if (hash === "#home") {
    if (!user) {
      window.location.hash = "#login";
      showError("Please log in to access the home page.");
      return;
    }
    renderHomePage(user); // home.js
  }

  // ============ SEARCH PAGE ============
  if (hash === "#search") {
    if (!user) {
      window.location.hash = "#login";
      showError("Please log in to access the search page.");
      return;
    }
    renderSearchPage(user); // search.js
  }
}

// ============ LOGIN FORM ============
function renderLoginForm() {
  $("#app").html(`
    <div class="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div class="absolute inset-0 bg-animated"></div>
      <div class="relative z-10 card-auth bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)]
                  p-8 rounded-xl shadow-lg text-gray-400 w-full max-w-md hover:scale-105 transition-transform duration-300 mx-5">
        <h1 class="text-3xl font-bold mb-6 text-purple-600">Cineview🎬</h1>
        <h2 class="text-2xl font-bold text-white">Welcome back to Cineview.</h2>
        <p class="text-sm mb-6">
          New here? 
          <a href="#register" id="registerLink" 
            class="text-purple-600 font-semibold hover:text-purple-400">
            Create an account
          </a>
        </p>

        <form id="emailLoginForm" class="flex flex-col">
          <div class="mb-3">
            <p>Email</p>
            <input type="email" id="loginEmail" 
              class="w-full px-4 py-2 rounded-xl bg-[#3D0A6D] text-white outline-none" required>
          </div>
          <div class="mb-3 relative">
            <p>Password</p>
            <input type="password" id="loginPassword" 
              class="w-full px-4 py-2 rounded-xl bg-[#3D0A6D] text-white outline-none pr-10" required>
            <i id="toggleLoginPass" class="fa fa-eye absolute right-3 top-9 cursor-pointer text-gray-400"></i>
          </div>
          <button type="submit" 
            class="w-full px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold mt-4">
            Login
          </button>
        </form>

        <div class="my-4 flex items-center">
          <hr class="flex-grow border-gray-300">
          <span class="px-2 text-gray-500 text-sm">or</span>
          <hr class="flex-grow border-gray-300">
        </div>

        <button id="googleLoginBtn" 
          class="flex gap-3 justify-center w-full px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-bold mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
               class="w-6 h-6" alt="Google"/>
          Sign in with Google
        </button>
      </div>
    </div>
  `);

  // Toggle password visibility
  $("#toggleLoginPass").on("click", function () {
    const passInput = $("#loginPassword");
    const type = passInput.attr("type") === "password" ? "text" : "password";
    passInput.attr("type", type);
    $(this).toggleClass("fa-eye fa-eye-slash");
  });

  // Google login handler
  $("#googleLoginBtn").on("click", handleGoogleLogin);

  // Email login handler
  $("#emailLoginForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#loginEmail").val();
    const pass = $("#loginPassword").val();
    if (!email || !pass) {
      showError("Please enter both email and password.");
      return;
    }
    handleEmailLogin(email, pass);
  });
}

// ============ REGISTER FORM ============
function renderRegisterForm() {
  $("#app").html(`
    <div class="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div class="absolute inset-0 bg-animated"></div>
      <div class="relative z-10 card-auth bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)]
                  p-8 rounded-xl shadow-lg text-gray-400 w-full max-w-md hover:scale-105 transition-transform duration-300 mx-5">
        <h1 class="text-3xl font-bold mb-6 text-purple-600">Cineview🎬</h1>
        <h2 class="text-2xl font-bold text-white">Join Cineview Today!</h2>
        <p class="text-sm mb-6">
          Already have an account? 
          <a href="#login" id="loginLink" 
            class="text-purple-600 font-semibold hover:text-purple-400">
            Sign in
          </a>
        </p>

        <form id="emailRegisterForm" class="flex flex-col">
          <div class="mb-3">
            <p>Email</p>
            <input type="email" id="registerEmail" 
              class="w-full px-4 py-2 rounded-xl bg-[#3D0A6D] text-white outline-none" required>
          </div>
          <div class="mb-3 relative">
            <p>Password</p>
            <input type="password" id="registerPassword" 
              class="w-full px-4 py-2 rounded-xl bg-[#3D0A6D] text-white outline-none pr-10" required>
            <i id="toggleRegisterPass" class="fa fa-eye absolute right-3 top-9 cursor-pointer text-gray-400"></i>
          </div>
          <button type="submit" 
            class="w-full px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold mt-4">
            Register
          </button>
        </form>

        <div class="my-4 flex items-center">
          <hr class="flex-grow border-gray-300">
          <span class="px-2 text-gray-500 text-sm">or</span>
          <hr class="flex-grow border-gray-300">
        </div>

        <button id="googleLoginBtn" 
          class="flex gap-3 justify-center w-full px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-bold mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
               class="w-6 h-6" alt="Google"/>
          Sign in with Google
        </button>
      </div>
    </div>
  `);

  // Toggle password visibility
  $("#toggleRegisterPass").on("click", function () {
    const passInput = $("#registerPassword");
    const type = passInput.attr("type") === "password" ? "text" : "password";
    passInput.attr("type", type);
    $(this).toggleClass("fa-eye fa-eye-slash");
  });

  // Google login handler
  $("#googleLoginBtn").on("click", handleGoogleLogin);

  // Email register handler
  $("#emailRegisterForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#registerEmail").val();
    const pass = $("#registerPassword").val();
    if (!email || !pass) {
      showError("Please enter both email and password.");
      return;
    }
    handleEmailRegister(email, pass);
  });
}

// Router init
$(window).on("hashchange", router);
$(document).ready(router);
