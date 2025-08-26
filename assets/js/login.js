$(document).ready(function () {
  const provider = new firebase.auth.GoogleAuthProvider();

  $("#googleLoginBtn").on("click", function () {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        // simpan user di localStorage
        localStorage.setItem("cineviewUser", JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }));

        // redirect ke home
        window.location.href = "/index.html";
      })
      .catch((err) => {
        console.error("Login gagal:", err);
        alert("Login gagal, coba lagi!");
      });
  });
});