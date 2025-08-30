const db = firebase.firestore();

function loadComments(imdbID) {
  const commentsRef = db.collection("comments").doc(imdbID).collection("messages").orderBy("timestamp", "asc");

  commentsRef.onSnapshot((snapshot) => {
    let html = "";
    const user = getUser();

    snapshot.forEach((doc) => {
      const c = doc.data();
      const isOwner = user && c.userEmail === user.email; // hanya bisa edit/hapus komentarnya sendiri
      const editedLabel = c.edited ? `<span class="text-xs text-gray-400">(edited)</span>` : "";

      html += `
        <div class="bg-gray-800 p-3 rounded-xl relative group">
          <div class="flex items-center gap-2">
            <img src="${c.userPhoto}" class="w-8 h-8 rounded-full" />
            <span class="font-bold text-purple-300">${c.userName}</span>
            ${editedLabel}
          </div>
          <p class="ml-10 text-gray-200 break-words" id="comment-text-${doc.id}">${c.text}</p>
          ${
            isOwner
              ? `
            <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button class="edit-comment-btn text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded" data-id="${doc.id}">Edit</button>
              <button class="delete-comment-btn text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded" data-id="${doc.id}">Delete</button>
            </div>`
              : ""
          }
        </div>
      `;
    });

    $("#commentsList").html(html || "<p class='text-gray-400'>No comments yet.</p>");
  });

  // Submit komentar baru
  $(document).off("submit", "#commentForm").on("submit", "#commentForm", function (e) {
    e.preventDefault();
    const user = getUser();
    const text = $("#commentInput").val().trim();
    if (!text) return;

    db.collection("comments").doc(imdbID).collection("messages").add({
      userName: user.name,
      userEmail: user.email, // simpan email untuk cek pemilik komentar
      userPhoto: user.photo,
      text: text,
      edited: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    $("#commentInput").val("");
  });

  // Edit komentar
  $(document).off("click", ".edit-comment-btn").on("click", ".edit-comment-btn", function () {
    const id = $(this).data("id");
    const $textEl = $(`#comment-text-${id}`);
    const currentText = $textEl.text();

    // ubah ke mode edit (input + save button)
    $textEl.replaceWith(`
      <div id="edit-form-${id}" class="ml-10 flex gap-2">
        <input type="text" id="edit-input-${id}" value="${currentText}" class="flex-1 px-2 py-1 rounded text-black">
        <button class="save-edit-btn bg-green-600 hover:bg-green-700 px-2 rounded text-white text-sm" data-id="${id}">Save</button>
        <button class="cancel-edit-btn bg-gray-600 hover:bg-gray-700 px-2 rounded text-white text-sm" data-id="${id}">Cancel</button>
      </div>
    `);
  });

  // Save edit
  $(document).off("click", ".save-edit-btn").on("click", ".save-edit-btn", function () {
    const id = $(this).data("id");
    const newText = $(`#edit-input-${id}`).val().trim();
    if (!newText) return;

    db.collection("comments").doc(imdbID).collection("messages").doc(id).update({
      text: newText,
      edited: true,
    });
  });

  // Cancel edit
  $(document).off("click", ".cancel-edit-btn").on("click", ".cancel-edit-btn", function () {
    const id = $(this).data("id");
    // reload snapshot → otomatis refresh komentar ke text awal
    loadComments(imdbID);
  });

  // Delete komentar
  $(document).off("click", ".delete-comment-btn").on("click", ".delete-comment-btn", function () {
    const id = $(this).data("id");
    if (confirm("Delete this comment?")) {
      db.collection("comments").doc(imdbID).collection("messages").doc(id).delete();
    }
  });
}
