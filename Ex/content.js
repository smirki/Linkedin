function waitForElement(selector, callback) {
  const element = document.querySelector(selector);

  if (element) {
    callback(element);
  } else {
    setTimeout(() => {
      waitForElement(selector, callback);
    }, 100);
  }
}

function populateMessage() {
  const nameElement = document.querySelector('h2[id="send-invite-modal"]');
  const messageBox = document.querySelector("#custom-message");

  const schoolElement = document.querySelector(
    ".pv-education-entity__school-name"
  );
  const school = schoolElement
    ? schoolElement.textContent.trim()
    : "your school";

  const industryElement = document.querySelector(
    ".pv-text-details__right-panel .pv-text-details__right-panel-item:nth-child(2) .inline-show-more-text"
  );
  const industry = industryElement
    ? industryElement.textContent.trim()
    : "your industry";

  if (nameElement && messageBox) {
    const name = nameElement.textContent
      .replace("Invite ", "")
      .replace(" to connect", "")
      .trim();
    const companyElement = document.querySelector(
      ".pv-text-details__right-panel .pv-text-details__right-panel-item:first-child .inline-show-more-text"
    );
    const company = companyElement
      ? companyElement.textContent.trim()
      : "your company";

    if (messageBox && !messageBox.value) {
      chrome.storage.sync.get("messageTemplate", (data) => {
        const defaultMessage = `Hello, I'm a MIS major at UNCC with a passion for business analytics, blending a background in both business and tech. I admire your work in this field and would love to learn from your experience. Could we connect for a brief informational interview?`;
        const messageTemplate = data.messageTemplate || defaultMessage;
        messageBox.value = messageTemplate
          .replace(/{name}/gi, name)
          .replace(/{company}/gi, company)
          .replace(/{school}/gi, school)
          .replace(/{industry}/gi, industry);
      });
    }
  }
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      populateMessage();
    }
  }
});

waitForElement("body", (body) => {
  observer.observe(body, { childList: true, subtree: true });
});
