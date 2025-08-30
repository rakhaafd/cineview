function router() {
  const hash = window.location.hash || "#login";
  const user = JSON.parse(localStorage.getItem("cineviewUser"));

  // ============ LOGIN PAGE ============
  if (hash === "#login") {
    if (user) {
      window.location.hash = "#home";
      return;
    }

    $("#app").html(`
      <div class="relative flex items-center justify-center min-h-screen overflow-hidden">
        <!-- Background animasi -->
        <div class="absolute inset-0 bg-animated"></div>

        <!-- Card Login -->
        <div class="relative z-10 card-auth bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)]
                    p-8 rounded-xl shadow-lg text-gray-400 w-full max-w-md hover:scale-105 transition-transform duration-300">
          <h1 class="text-3xl font-bold mb-6 text-purple-600">Cineview🎬</h1>
          <h2 class="text-2xl font-bold text-white">Welcome back to Cineview.</h2>
          <p class="text-sm mb-6">
            New here? 
            <a href="#register" id="registerLink" 
              class="text-purple-600 font-semibold hover:text-purple-400">
              Create an account
            </a>
          </p>

          <!-- Email Login -->
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

          <!-- Divider -->
          <div class="my-4 flex items-center">
            <hr class="flex-grow border-gray-300">
            <span class="px-2 text-gray-500 text-sm">or</span>
            <hr class="flex-grow border-gray-300">
          </div>

          <!-- Google Login -->
          <button id="googleLoginBtn" 
            class="flex gap-3 justify-center w-full px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-bold mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
                 class="w-6 h-6" alt="Google"/>
            Sign in with Google
          </button>
        </div>
      </div>
    `);

    // Toggle password (login)
    $("#toggleLoginPass").on("click", function () {
      const passInput = $("#loginPassword");
      const type = passInput.attr("type") === "password" ? "text" : "password";
      passInput.attr("type", type);

      $(this).toggleClass("fa-eye fa-eye-slash");
    });

    // Event Google Login
    $("#googleLoginBtn").on("click", handleGoogleLogin);

    // Event Email Login
    $("#emailLoginForm").on("submit", function (e) {
      e.preventDefault();
      const email = $("#loginEmail").val();
      const pass = $("#loginPassword").val();
      handleEmailLogin(email, pass);
    });
  }

  // ============ REGISTER PAGE ============
  if (hash === "#register") {
    if (user) {
      window.location.hash = "#home";
      return;
    }

    renderRegisterForm();
  }

  // ============ HOME PAGE ============
  if (hash === "#home") {
    if (!user) {
      window.location.hash = "#login";
      return;
    }
    renderHomePage(user);
  }
}

// ============ REGISTER FORM ============
function renderRegisterForm() {
  $("#app").html(`
    <div class="relative flex items-center justify-center min-h-screen overflow-hidden">
      <!-- Background animasi -->
      <div class="absolute inset-0 bg-animated"></div>

      <!-- Card Register -->
      <div class="relative z-10 card-auth bg-[radial-gradient(circle_at_center,_#0B0214_0%,_#3D0A6D_200%)]
                  p-8 rounded-xl shadow-lg text-gray-400 w-full max-w-md hover:scale-105 transition-transform duration-300">
        <h1 class="text-3xl font-bold mb-6 text-purple-600">Cineview🎬</h1>
        <h2 class="text-2xl font-bold text-white">Welcome to Cineview.</h2>
        <p class="mb-6 text-sm">
          Already have an account? 
          <a href="#login" class="text-purple-600 font-semibold hover:text-purple-400">Login</a>
        </p>

        <form id="registerForm" class="flex flex-col">
          <div class="mb-3">
            <p>Email</p>
            <input type="email" id="regEmail" 
              class="w-full px-4 py-2 rounded-xl bg-[#3D0A6D] text-white outline-none" required>
          </div>
          <div class="mb-3 relative">
            <p>Password</p>
            <input type="password" id="regPassword" 
              class="w-full px-4 py-2 rounded-xl bg-[#3D0A6D] text-white outline-none pr-10" required>
            <i id="toggleRegPass" class="fa fa-eye absolute right-3 top-9 cursor-pointer text-gray-400"></i>
          </div>
          <button type="submit" 
            class="w-full px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold mt-4">
            Create account
          </button>
        </form>
      </div>
    </div>
  `);

  // Toggle password (register)
  $("#toggleRegPass").on("click", function () {
    const passInput = $("#regPassword");
    const type = passInput.attr("type") === "password" ? "text" : "password";
    passInput.attr("type", type);

    $(this).toggleClass("fa-eye fa-eye-slash");
  });

  // Event register
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#regEmail").val();
    const pass = $("#regPassword").val();
    handleEmailRegister(email, pass)
      .then(() => {
        showSuccess("Registration successful! Please login.");
        window.location.hash = "#login"; // ⬅️ balik ke login
      })
      .catch((err) => {
        showError("Registration failed: " + err.message);
      });
  });
}

// Init router
$(window).on("hashchange", router);
$(document).ready(router);
