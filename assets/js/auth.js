// Auth related
function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      saveUser(user);
      window.location.hash = "#home";
    })
    .catch(err => {
      console.error("Google login gagal:", err);
      alert("Google login gagal, coba lagi!");
    });
}

function handleEmailLogin(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;
      saveUser(user);
      window.location.hash = "#home";
    })
    .catch(err => {
      console.error("Email login gagal:", err);
      alert(err.message);
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
    window.location.hash = "#login";
  });
}

// Ambil user dari localStorage
function getUser() {
  const userData = localStorage.getItem("cineviewUser");
  return userData ? JSON.parse(userData) : null;
}
