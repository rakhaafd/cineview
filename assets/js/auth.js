// auth.js
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

function saveUser(user) {
  localStorage.setItem("cineviewUser", JSON.stringify({
    name: user.displayName,
    email: user.email,
    photo: user.photoURL
  }));
}

function getUser() {
  return JSON.parse(localStorage.getItem("cineviewUser"));
}

function logout() {
  localStorage.removeItem("cineviewUser");
}
