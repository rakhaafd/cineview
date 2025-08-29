// Auth related
function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      saveUser(user);
      window.location.hash = "#home";

      // ✅ SweetAlert success
      showSuccess("Welcome back, " + (user.displayName || user.email) + "!");
    })
    .catch(err => {
      console.error("Google login gagal:", err);
      showError("Google login gagal, coba lagi!");
    });
}

function handleEmailLogin(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;
      saveUser(user);
      window.location.hash = "#home";

      // ✅ SweetAlert success
      showSuccess("Login berhasil! Selamat datang " + (user.displayName || user.email));
    })
    .catch(err => {
      console.error("Email login gagal:", err);
      showError(err.message);
    });
}

function handleEmailRegister(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function saveUser(user) {
  localStorage.setItem("cineviewUser", JSON.stringify({
    name: user.displayName || user.email,  // kalau email login, default pakai email
    email: user.email,
    photo: user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.email)
  }));
}

function handleLogout() {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("cineviewUser");
    showSuccess("Logout berhasil!"); // ✅ notifikasi toast di kanan atas
    window.location.hash = "#login";
  }).catch(err => {
    console.error("Logout gagal:", err);
    showError("Logout gagal: " + err.message);
  });
}