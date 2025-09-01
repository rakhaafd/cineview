import { getUser } from "./auth.js"

const db = firebase.firestore();

export function loadComments(imdbID) {
  const commentsRef = db.collection("comments")
    .doc(imdbID)
    .collection("messages")
    .orderBy("timestamp", "asc");

  commentsRef.onSnapshot((snapshot) => {
    let html = "";
    const user = getUser();

    snapshot.forEach((doc) => {
      const c = doc.data();
      const id = doc.id;

      html += `
        <div class="bg-gray-800 p-3 rounded-xl relative group mb-3" data-id="${id}">
          <div class="flex items-center gap-2">
            <img src="${c.userPhoto}" class="w-8 h-8 rounded-full" />
            <span class="font-bold text-purple-300">${c.userName}</span>
          </div>
          <p class="ml-10 text-gray-200">${c.text}</p>
          ${
            user && user.name === c.userName
              ? `
              <div class="flex gap-2 mt-2 ml-10">
                <button class="delete-comment px-2 py-1 bg-red-600 text-white rounded text-sm" data-id="${id}" data-imdbid="${imdbID}">Delete</button>
              </div>
              `
              : ""
          }
        </div>
      `;
    });

    $("#commentsList").html(html || "<p class='text-gray-400'>No comments yet.</p>");
  });

  // === Tambah Komentar ===
  $(document).off("submit", "#commentForm").on("submit", "#commentForm", function (e) {
    e.preventDefault();
    const user = getUser();
    const text = $("#commentInput").val().trim();
    if (!text || !user) return;

    db.collection("comments").doc(imdbID).collection("messages").add({
      userName: user.name,
      userPhoto: user.photo,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      showSuccess("Comment added!");
    });

    $("#commentInput").val("");
  });

  // === HAPUS KOMENTAR (SweetAlert confirm) ===
  $(document).off("click", ".delete-comment").on("click", ".delete-comment", function () {
    const id = $(this).data("id");
    const imdb = $(this).data("imdbid");

    Swal.fire({
      title: "Are you sure?",
      text: "This comment will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection("comments").doc(imdb).collection("messages").doc(id).delete()
          .then(() => {
            showSuccess("Comment deleted!");
          })
          .catch(err => {
            showError("Failed to delete: " + err.message);
          });
      }
    });
  });
}