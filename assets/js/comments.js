// comments.js
const db = firebase.firestore();

function loadComments(imdbID) {
  const commentsRef = db.collection("comments").doc(imdbID).collection("messages").orderBy("timestamp", "asc");

  commentsRef.onSnapshot((snapshot) => {
    let html = "";
    snapshot.forEach((doc) => {
      const c = doc.data();
      html += `
        <div class="bg-gray-800 p-3 rounded-xl">
          <div class="flex items-center gap-2">
            <img src="${c.userPhoto}" class="w-8 h-8 rounded-full" />
            <span class="font-bold text-purple-300">${c.userName}</span>
          </div>
          <p class="ml-10 text-gray-200">${c.text}</p>
        </div>
      `;
    });
    $("#commentsList").html(html || "<p class='text-gray-400'>No comments yet.</p>");
  });

  $(document).off("submit", "#commentForm").on("submit", "#commentForm", function (e) {
    e.preventDefault();
    const user = getUser();
    const text = $("#commentInput").val().trim();
    if (!text) return;

    db.collection("comments").doc(imdbID).collection("messages").add({
      userName: user.name,
      userPhoto: user.photo,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    $("#commentInput").val("");
  });
}
