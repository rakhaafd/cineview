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
  
  // Show default message immediately
  appendMessage("bot", "Hi there! How can I help you find a movie, TV series, or anime today?");

  $("#chatbotToggle").on("click", () => {
    $("#chatbotPopup").toggleClass("hidden flex");
  });

  $("#chatbotClose").on("click", () => {
    $("#chatbotPopup").addClass("hidden").removeClass("flex");
  });

  $("#chatbotSend").on("click", handleSend);
  $("#chatbotInput").on("keypress", function (e) {
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

    const userMessage = $("#chatbotInput").val().trim();
    if (!userMessage) return;

    $("#chatbotInput").val("");
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
        $("#chatbotMessages").scrollTop($("#chatbotMessages")[0].scrollHeight);
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
    $("#chatbotMessages").append(bubble);
    $("#chatbotMessages").scrollTop($("#chatbotMessages")[0].scrollHeight);
    return bubble;
  }

  function appendLoader() {
    const loaderId = "loader-" + Date.now();
    const loader = $(
      `<div id="${loaderId}" class="p-2 rounded-lg bg-gray-800 text-gray-400 mr-auto">⏳ Typing...</div>`
    );
    $("#chatbotMessages").append(loader);
    return loaderId;
  }

  function removeLoader(id) {
    $(`#${id}`).remove();
  }
}