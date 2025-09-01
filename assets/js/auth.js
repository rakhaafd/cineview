import { showSuccess, showError } from "./alert.js";

// ============ GOOGLE LOGIN ============
export function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile email");
  provider.setCustomParameters({ prompt: "select_account" });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      saveUser(user, true);
      window.location.hash = "#home";
      showSuccess("Welcome back, " + (user.displayName || user.email) + "!");
    })
    .catch((err) => {
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/popup-closed-by-user"
      ) {
        // fallback ke redirect kalau popup gagal
        firebase.auth().signInWithRedirect(provider);
      } else {
        showError("Google login gagal: " + err.message);
      }
    });
}

// ============ EMAIL LOGIN ============
export function handleEmailLogin(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      saveUser(user, false);
      window.location.hash = "#home";
      showSuccess(
        "Login berhasil! Selamat datang " + (user.displayName || user.email)
      );
    })
    .catch((err) => {
      showError("Login gagal: " + err.message);
    });
}

// ============ EMAIL REGISTER ============
export function handleEmailRegister(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      saveUser(user, false);
      window.location.hash = "#home";
      showSuccess(
        "Registrasi berhasil! Selamat datang " +
          (user.displayName || user.email)
      );
    })
    .catch((err) => {
      showError("Registrasi gagal: " + err.message);
    });
}

// ============ SAVE USER DATA ============
function saveUser(user, isGoogleLogin) {
  const emailPrefix = user.email ? user.email.split("@")[0] : "user";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    emailPrefix
  )}&background=4C1D95&color=fff&size=128&rounded=true`;

  if (isGoogleLogin && user.photoURL) {
    localStorage.setItem("cineviewGooglePhoto", user.photoURL);
  }

  const photo = isGoogleLogin
    ? user.photoURL ||
      localStorage.getItem("cineviewGooglePhoto") ||
      fallbackAvatar
    : user.photoURL || fallbackAvatar;

  const userData = {
    name: user.displayName || emailPrefix,
    email: user.email || "unknown",
    photo: photo,
  };
  localStorage.setItem("cineviewUser", JSON.stringify(userData));
}

// ============ GET USER ============
export function getUser() {
  const stored = localStorage.getItem("cineviewUser");
  if (!stored) return null;
  try {
    const user = JSON.parse(stored);
    if (!user.photo || user.photo === "undefined" || user.photo === "null") {
      const cachedGooglePhoto = localStorage.getItem("cineviewGooglePhoto");
      user.photo =
        cachedGooglePhoto ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.email.split("@")[0] || "user"
        )}&background=4C1D95&color=fff&size=128&rounded=true`;
      localStorage.setItem("cineviewUser", JSON.stringify(user));
    }
    return user;
  } catch {
    showError("Error retrieving user data");
    return null;
  }
}

// ============ LOGOUT ============
export function handleLogout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem("cineviewUser");
      showSuccess("Logout berhasil!");
      window.location.hash = "#login";
    })
    .catch((err) => {
      showError("Logout gagal: " + err.message);
    });
}

// ============ LISTENER UNTUK REDIRECT LOGIN ============
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    saveUser(user, true); // simpan user
    if (window.location.hash === "#login" || window.location.hash === "#register") {
      window.location.hash = "#home"; // auto redirect ke home
    }
  }
});
