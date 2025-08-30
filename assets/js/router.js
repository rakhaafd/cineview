//router.js
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
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-xl shadow-lg text-gray-800 w-full max-w-md">
          <h1 class="text-3xl font-bold mb-6 text-center text-purple-600">Login</h1>

          <!-- Email Login -->
          <form id="emailLoginForm" class="space-y-3">
            <input type="email" id="loginEmail" placeholder="Email" 
              class="w-full px-4 py-2 rounded-xl border focus:outline-none" required>
            <input type="password" id="loginPassword" placeholder="Password" 
              class="w-full px-4 py-2 rounded-xl border focus:outline-none" required>
            <button type="submit" 
              class="w-full px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold">
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
            class="w-full px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold mb-4">
            Sign in with Google
          </button>

          <p class="mt-2 text-sm text-center text-gray-600">
            Don't have an account? <a href="#register" id="registerLink" class="text-purple-600 font-semibold">Register</a>
          </p>
        </div>
      </div>
    `);

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
  if (hash === "#genre") {
    renderGenrePage();
  }
}

// ============ REGISTER FORM ============
function renderRegisterForm() {
  $("#app").html(`
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-xl shadow-lg text-gray-800 w-full max-w-md">
        <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">Create Account</h1>
        <form id="registerForm" class="space-y-3">
          <input type="email" id="regEmail" placeholder="Email" 
            class="w-full px-4 py-2 rounded-xl border focus:outline-none" required>
          <input type="password" id="regPassword" placeholder="Password" 
            class="w-full px-4 py-2 rounded-xl border focus:outline-none" required>
          <button type="submit" 
            class="w-full px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">
            Register
          </button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account? <a href="#login" class="text-purple-600 font-semibold">Login</a>
        </p>
      </div>
    </div>
  `);

  // Event register
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#regEmail").val();
    const pass = $("#regPassword").val();
    handleEmailRegister(email, pass)
      .then(() => {
        alert("Registration successful! Please login.");
        window.location.hash = "#login"; // ⬅️ balik ke login
      })
      .catch(err => {
        alert("Registration failed: " + err.message);
      });
  });
}
