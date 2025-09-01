import { initCineBot } from "../gemini/gemini.js";

let model = null;
let messages = { history: [] };

(async () => {
  await initCineBot();
  model = window.CineBotModel;
  console.log("✅ CineBot ready to use");
})();

export function initializeChatbot() {
  console.log("🎬 CineBot UI initialized");

  const $popup = $("#chatbotPopup");
  const $messages = $("#chatbotMessages");
  const $input = $("#chatbotInput");

  // Show default message immediately
  appendMessage("bot", "Hi there! How can I help you find a movie, TV series, or anime today?");

  // Toggle popup
  $("#chatbotToggle").on("click", () => {
    if ($popup.hasClass("hidden")) {
      $popup.removeClass("hidden").addClass("flex");
      // Scroll to bottom after visible
      setTimeout(() => {
        $messages.scrollTop($messages[0].scrollHeight);
      }, 50);
    } else {
      $popup.removeClass("flex").addClass("hidden");
    }
  });

  $("#chatbotClose").on("click", () => {
    $popup.removeClass("flex").addClass("hidden");
  });

  $("#chatbotSend").on("click", handleSend);
  $input.on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });

  async function handleSend() {
    if (!model) {
      appendMessage("bot", "⚠️ Model not ready. Please wait a moment...");
      return;
    }

    const userMessage = $input.val().trim();
    if (!userMessage) return;

    $input.val("");
    appendMessage("user", userMessage);

    const loaderId = appendLoader();

    try {
      const chat = model.startChat(messages);
      const result = await chat.sendMessageStream(userMessage);

      removeLoader(loaderId);
      const botBubble = appendMessage("bot", "");
      let botText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        botText += chunkText;
        $(botBubble).html(botText);
        $messages.scrollTop($messages[0].scrollHeight);
      }

      messages.history.push({ role: "user", parts: [{ text: userMessage }] });
      messages.history.push({ role: "model", parts: [{ text: botText }] });
    } catch (err) {
      console.error("Gemini error:", err);
      removeLoader(loaderId);
      appendMessage("bot", "⚠️ The message could not be sent. Please try again.");
    }
  }

  function appendMessage(sender, message) {
    const msgClass =
      sender === "user"
        ? "bg-gray-700 text-white ml-auto"
        : "bg-gray-800 text-gray-200 mr-auto";

    const bubble = $(
      `<div class="p-2 rounded-lg ${msgClass} max-w-[80%] whitespace-pre-wrap">${message}</div>`
    );
    $messages.append(bubble);
    $messages.scrollTop($messages[0].scrollHeight);
    return bubble;
  }

  function appendLoader() {
    const loaderId = "loader-" + Date.now();
    const loader = $(
      `<div id="${loaderId}" class="p-2 rounded-lg bg-gray-800 text-gray-400 mr-auto">⏳ Typing...</div>`
    );
    $messages.append(loader);
    return loaderId;
  }

  function removeLoader(id) {
    $(`#${id}`).remove();
  }
}