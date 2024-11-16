document.addEventListener("DOMContentLoaded", () => {
  const messageTemplate = document.getElementById("messageTemplate");
  const saveButton = document.getElementById("saveButton");
  const status = document.getElementById("status");

  chrome.storage.sync.get("messageTemplate", (data) => {
    messageTemplate.value = data.messageTemplate || "";
  });

  messageTemplate.addEventListener("input", () => {
    const charCount = document.getElementById("charCount");
    charCount.textContent = `${messageTemplate.value.length} / 300`;
  });

  const spamButton = document.getElementById("spamButton");

  spamButton.addEventListener("click", () => {
    spamButton.style.backgroundColor = "#dc3545";
    spamButton.style.borderColor = "#dc3545";
  });

  saveButton.addEventListener("click", () => {
    const message = messageTemplate.value;
    chrome.storage.sync.set({ messageTemplate: message }, () => {
      status.textContent = "Message template saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 2000);
    });
  });
});
