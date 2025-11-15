// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initializeAnimations();
  initializeModelSelection();
  initializeInteractions();
  initializeResponsive();
  initializeCarousel();
  initializeModeSelection();
  initializeChat();
});

// Animation System
function initializeAnimations() {
  // Add floating animation to characters
  const characters = document.querySelectorAll(
    ".character-main, .character-small"
  );
  characters.forEach((char, index) => {
    char.style.animationDelay = `${index * 0.5}s`;
    char.classList.add("float-animation");
  });

  // Add pulse animation to CTA button
  const ctaButton = document.querySelector('[data-translate="cta_button"]');
  if (ctaButton) {
    ctaButton.classList.add("pulse-soft");
  }

  // Intersection Observer for scroll animations - optimized to prevent forced reflows
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    // Batch all style changes together using requestAnimationFrame
    requestAnimationFrame(() => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });
  }, observerOptions);

  // Observe all cards and sections - Use CSS classes to prevent forced reflow
  const animatedElements = document.querySelectorAll(".card, .hero-section");
  animatedElements.forEach((el) => {
    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  });
}

// Model Selection System
function initializeModelSelection() {
  const modelOptions = document.querySelectorAll(".model-option");

  // Set first option as active by default
  if (modelOptions.length > 0) {
    modelOptions[0].classList.add("active");
  }

  modelOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      modelOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // Get model type
      const modelType = this.querySelector(".text-sm").textContent;

      // Update main character based on selection
      updateMainCharacter(modelType);

      // Show selection feedback
      showSelectionFeedback(modelType);
    });
  });
}

// Update main character based on model selection
function updateMainCharacter(modelType) {
  const mainCharacter = document.querySelector(".character-main span");
  if (!mainCharacter) return;

  const characterEmojis = {
    Friendly: "😊",
    Tutor: "🎓",
    Funny: "😄",
    Flirty: "😘",
  };

  const emoji = characterEmojis[modelType] || "😊";
  mainCharacter.textContent = emoji;

  // Add bounce effect
  mainCharacter.parentElement.style.transform = "scale(1.2)";
  setTimeout(() => {
    mainCharacter.parentElement.style.transform = "scale(1)";
  }, 200);
}

// Show selection feedback
function showSelectionFeedback(modelType) {
  // Create temporary feedback message
  const feedback = document.createElement("div");
  feedback.className =
    "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
  feedback.textContent = `تم اختيار نموذج ${modelType}`;

  document.body.appendChild(feedback);

  // Animate in
  feedback.style.transform = "translateX(100%)";
  setTimeout(() => {
    feedback.style.transform = "translateX(0)";
    feedback.style.transition = "transform 0.3s ease";
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    feedback.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 300);
  }, 3000);
}

// Interactive Elements
function initializeInteractions() {
  // CTA Button interaction
  const ctaButton = document.querySelector('[data-translate="cta_button"]');
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      handleCTAClick();
    });
  }

  // Character interactions
  const characters = document.querySelectorAll(
    ".character-main, .character-small"
  );
  characters.forEach((character) => {
    character.addEventListener("click", function () {
      playCharacterSound();
      showCharacterMessage();
    });
  });

  // Speech bubble interactions
  const speechBubbles = document.querySelectorAll(".speech-bubble");
  speechBubbles.forEach((bubble) => {
    bubble.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    bubble.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
}

// Handle CTA button click
function handleCTAClick() {
  // Show loading state
  const button = document.querySelector('[data-translate="cta_button"]');
  const originalText = button.textContent;

  button.innerHTML = '<span class="loading"></span> جاري التحميل...';
  button.disabled = true;

  // Simulate loading
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;

    // Show welcome modal or redirect
    showWelcomeModal();
  }, 2000);
}

// Show welcome modal
function showWelcomeModal() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold text-dark-gray mb-4">مرحباً بك!</h3>
            <p class="text-medium-gray mb-6">استعد لبدء رحلة تعلم ممتعة مع ليبية</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="bg-primary-red text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                ابدأ الآن
            </button>
        </div>
    `;

  document.body.appendChild(modal);

  // Animate in
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.opacity = "1";
    modal.style.transition = "opacity 0.3s ease";
  }, 10);
}

// Character interaction effects
function playCharacterSound() {
  // Create audio feedback (visual feedback for now)
  const soundWave = document.createElement("div");
  soundWave.className =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl z-50";
  soundWave.textContent = "🔊";
  soundWave.style.pointerEvents = "none";

  document.body.appendChild(soundWave);

  // Animate
  soundWave.style.opacity = "0";
  soundWave.style.transform = "translate(-50%, -50%) scale(0.5)";
  setTimeout(() => {
    soundWave.style.opacity = "1";
    soundWave.style.transform = "translate(-50%, -50%) scale(1)";
    soundWave.style.transition = "all 0.3s ease";
  }, 10);

  setTimeout(() => {
    soundWave.style.opacity = "0";
    soundWave.style.transform = "translate(-50%, -50%) scale(1.5)";
    setTimeout(() => {
      document.body.removeChild(soundWave);
    }, 300);
  }, 1000);
}

// Show character message
function showCharacterMessage() {
  const messages = [
    "مرحباً! كيف يمكنني مساعدتك؟",
    "هيا نتعلم معاً!",
    "أنا هنا لمساعدتك في تعلم اللغات",
    "لنبدأ رحلة التعلم!",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const messageDiv = document.createElement("div");
  messageDiv.className =
    "fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50";
  messageDiv.innerHTML = `
        <div class="flex items-center space-x-2 space-x-reverse">
            <div class="w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                <span class="text-white text-sm">😊</span>
            </div>
            <p class="text-sm text-dark-gray">${randomMessage}</p>
        </div>
    `;

  document.body.appendChild(messageDiv);

  // Auto remove after 4 seconds
  setTimeout(() => {
    messageDiv.style.transform = "translateY(100%)";
    messageDiv.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 4000);
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll utility
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Local storage utilities
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
}

function loadFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
    return null;
  }
}

// Character Cards Carousel System
let currentCardIndex = 0;
const cardData = [
  {
    id: "card-friendly",
    name: "Friendly",
    color: "red",
    title: "ليبية هي مديرتك الذكية متعددة اللغات",
    description:
      "بفضل قدرة ليبية على التكيف لتوفير، يمكنك التواصل معها بفضل قدرات ليبية الفائقة في التعامل مع مختلف اللغات.",
  },
  {
    id: "card-tutor",
    name: "Tutor",
    color: "blue",
    title: "المعلم الذكي",
    description: "التعلم المنهجي والمنظم",
  },
  {
    id: "card-funny",
    name: "Funny",
    color: "green",
    title: "المرح والفكاهة",
    description: "التعلم بالمتعة والضحك",
  },
];

function initializeCarousel() {
  // Initialize description visibility
  initializeDescriptionVisibility();

  // Auto-rotate carousel every 5 seconds
  setInterval(() => {
    const nextIndex = (currentCardIndex + 1) % cardData.length;
    showCard(nextIndex);
  }, 5000);
}

function initializeDescriptionVisibility() {
  // Hide all descriptions initially
  const allDescriptions = document.querySelectorAll(".card-description");
  allDescriptions.forEach((desc) => {
    desc.classList.add("hidden");
  });

  // Show description only for the active card (index 0 by default)
  const activeCard = document.getElementById(cardData[currentCardIndex].id);
  if (activeCard) {
    const activeDescription = activeCard.querySelector(".card-description");
    if (activeDescription) {
      activeDescription.classList.remove("hidden");
    }
  }
}

function showCard(index) {
  if (index < 0 || index >= cardData.length) return;

  const previousIndex = currentCardIndex;
  currentCardIndex = index;

  // Update pagination dots
  for (let i = 0; i < cardData.length; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      if (i === index) {
        dot.className =
          "w-3 h-3 bg-gray-800 rounded-full cursor-pointer transition-colors";
      } else {
        dot.className =
          "w-3 h-3 bg-gray-300 rounded-full cursor-pointer transition-colors";
      }
    }
  }

  // Animate card transition
  animateCardTransition(previousIndex, index);
}

function animateCardTransition(fromIndex, toIndex) {
  const fromCard = document.getElementById(cardData[fromIndex].id);
  const toCard = document.getElementById(cardData[toIndex].id);

  if (!fromCard || !toCard || fromIndex === toIndex) {
    // If same card or cards not found, just position normally
    positionAllCards(toIndex);
    return;
  }

  // Step 1: Move current card to back
  if (fromCard) {
    fromCard.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    fromCard.style.transform = "translateX(-250px) scale(0.75)";
    fromCard.style.opacity = "0.6";
    fromCard.style.zIndex = "15";
  }

  // Step 2: Bring new card to front (with slight delay for better effect)
  setTimeout(() => {
    if (toCard) {
      toCard.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      toCard.style.transform = "translateX(0) scale(1)";
      toCard.style.opacity = "1";
      toCard.style.zIndex = "30";
      toCard.style.width = "400px";
      toCard.style.height = "280px";

      // Show description for the new active card
      const newDescription = toCard.querySelector(".card-description");
      if (newDescription) {
        newDescription.classList.remove("hidden");
      }
    }

    // Hide description for the old card
    if (fromCard) {
      const oldDescription = fromCard.querySelector(".card-description");
      if (oldDescription) {
        oldDescription.classList.add("hidden");
      }
    }

    // Position other cards
    cardData.forEach((card, i) => {
      if (i !== fromIndex && i !== toIndex) {
        const cardElement = document.getElementById(card.id);
        if (cardElement) {
          const position = getCardPosition(i, toIndex);
          cardElement.style.transition =
            "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
          applyCardTransform(cardElement, position);
        }
      }
    });
  }, 150);

  // Step 3: Final positioning after animation
  setTimeout(() => {
    positionAllCards(toIndex);
  }, 600);
}

function positionAllCards(activeIndex) {
  cardData.forEach((card, i) => {
    const cardElement = document.getElementById(card.id);
    if (!cardElement) return;

    const position = getCardPosition(i, activeIndex);
    cardElement.style.transition = "all 0.3s ease-in-out";
    applyCardTransform(cardElement, position);
  });
}

function getCardPosition(cardIndex, activeIndex) {
  const diff = cardIndex - activeIndex;

  if (diff === 0) {
    // Active card - front and center
    return {
      type: "active",
      transform: "translateX(0) scale(1)",
      zIndex: 30,
      opacity: 1,
    };
  } else if (diff === -1 || (diff === 2 && activeIndex === 0)) {
    // Left card - behind and to the left
    return {
      type: "left",
      transform: "translateX(-220px) scale(0.85)",
      zIndex: 20,
      opacity: 0.75,
    };
  } else if (diff === 1 || (diff === -2 && activeIndex === 2)) {
    // Right card - behind and to the right
    return {
      type: "right",
      transform: "translateX(220px) scale(0.85)",
      zIndex: 20,
      opacity: 0.75,
    };
  } else {
    // Hidden card - far back
    return {
      type: "hidden",
      transform: "translateX(0) scale(0.7)",
      zIndex: 10,
      opacity: 0.4,
    };
  }
}

function applyCardTransform(cardElement, position) {
  cardElement.style.transform = position.transform;
  cardElement.style.zIndex = position.zIndex;
  cardElement.style.opacity = position.opacity;

  // Get the description element within this card
  const description = cardElement.querySelector(".card-description");

  // Update card size and description visibility based on position
  if (position.type === "active") {
    cardElement.style.width = "400px";
    cardElement.style.height = "280px";
    cardElement.classList.remove("hidden");

    // Show description for active card
    if (description) {
      description.classList.remove("hidden");
    }
  } else {
    cardElement.style.width = "320px";
    cardElement.style.height = "240px";
    cardElement.classList.remove("hidden");

    // Hide description for non-active cards
    if (description) {
      description.classList.add("hidden");
    }
  }

  if (position.type === "hidden") {
    // Don't actually hide, just make very transparent and small
    cardElement.style.opacity = "0.2";

    // Ensure description is hidden for hidden cards
    if (description) {
      description.classList.add("hidden");
    }
  }
}

// Navigation functions for dots
window.showCard = showCard;

// Mode Selection System
let currentMode = "friendly"; // Default mode

const modeData = {
  friendly: {
    name: "Friendly",
    nameAr: "ودود",
    emoji: "😊",
    color: "orange",
  },
  tutor: {
    name: "Tutor",
    nameAr: "معلم",
    emoji: "🎓",
    color: "blue",
  },
  funny: {
    name: "Funny",
    nameAr: "مضحك",
    emoji: "😄",
    color: "green",
  },
  flirty: {
    name: "Flirty",
    nameAr: "غزلي",
    emoji: "💕",
    color: "pink",
  },
};

function initializeModeSelection() {
  // Get all mode option containers for desktop sidebar
  const modeOptions = document.querySelectorAll(".mode-options > div");

  modeOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      const modes = ["friendly", "tutor", "funny", "flirty"];
      changeMode(modes[index]);
    });
  });

  // Get all mode option containers for mobile sidebar
  const mobileModeOptions = document.querySelectorAll(
    ".mobile-mode-options > div"
  );

  mobileModeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const mode = option.getAttribute("data-mode");
      if (mode) {
        changeMode(mode);
        // Close mobile menu after selection
        closeMobileMenu();
      }
    });
  });

  // Set default selection to friendly mode
  updateSidebarModeSelection("friendly");
  updateMobileSidebarModeSelection("friendly");
}

function changeMode(newMode) {
  if (!modeData[newMode] || currentMode === newMode) return;

  const oldMode = currentMode;
  currentMode = newMode;

  // Update sidebar selection
  updateSidebarModeSelection(newMode);
  updateMobileSidebarModeSelection(newMode);

  // Show mode change feedback
  showModeChangeFeedback(modeData[newMode]);

  console.log(`Mode changed from ${oldMode} to ${newMode}`);
}

function updateSidebarModeSelection(selectedMode) {
  const modeOptions = document.querySelectorAll(".mode-options > div");
  modeOptions.forEach((option, index) => {
    const modes = ["friendly", "tutor", "funny", "flirty"];
    const mode = modes[index];
    const radio = option.querySelector(
      ".model-radio-active, .model-radio-inactive"
    );

    if (mode === selectedMode) {
      // Activate selected mode
      option.classList.remove("border-gray-200", "hover:bg-gray-50");
      option.classList.add(
        `bg-${modeData[mode].color}-50`,
        `border-${modeData[mode].color}-200`
      );

      if (radio) {
        radio.className = "model-radio-active";
      }
    } else {
      // Deactivate other modes
      option.classList.remove(
        `bg-${modeData[modes[index]].color}-50`,
        `border-${modeData[modes[index]].color}-200`
      );
      option.classList.add("border-gray-200", "hover:bg-gray-50");

      if (radio) {
        radio.className = "model-radio-inactive";
      }
    }
  });
}

function updateMobileSidebarModeSelection(selectedMode) {
  const mobileModeOptions = document.querySelectorAll(
    ".mobile-mode-options > div"
  );

  mobileModeOptions.forEach((option) => {
    const mode = option.getAttribute("data-mode");
    const radio = option.querySelector(".mobile-mode-radio");
    const span = option.querySelector("span");

    if (mode === selectedMode) {
      // Activate selected mode
      option.classList.remove("border-gray-200", "hover:bg-gray-50");
      option.classList.add(
        `bg-${modeData[mode].color}-50`,
        `border-${modeData[mode].color}-200`
      );

      // Update radio button
      if (radio) {
        radio.className = `w-3 h-3 bg-${modeData[mode].color}-500 rounded-full gap-3 mobile-mode-radio`;
      }

      // Update text color
      if (span) {
        span.className = `text-${modeData[mode].color}-800 font-medium`;
      }
    } else {
      // Deactivate other modes
      option.classList.remove(
        `bg-${modeData.friendly.color}-50`,
        `border-${modeData.friendly.color}-200`,
        `bg-${modeData.tutor.color}-50`,
        `border-${modeData.tutor.color}-200`,
        `bg-${modeData.funny.color}-50`,
        `border-${modeData.funny.color}-200`,
        `bg-${modeData.flirty.color}-50`,
        `border-${modeData.flirty.color}-200`
      );
      option.classList.add("border-gray-200", "hover:bg-gray-50");

      // Update radio button
      if (radio) {
        radio.className =
          "w-3 h-3 border-2 border-gray-300 rounded-full mobile-mode-radio";
      }

      // Update text color
      if (span) {
        span.className = "text-gray-700";
      }
    }
  });
}

function showModeChangeFeedback(modeInfo) {
  const feedback = document.createElement("div");

  // Check current language from URL path
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("-en");

  // Position feedback based on language - right for English, left for Arabic
  const positionClass = isEnglish ? "right-4" : "left-4";
  const spacingClass = isEnglish ? "space-x-3" : "space-x-3 space-x-reverse";

  feedback.className = `fixed top-4 ${positionClass} bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center ${spacingClass}`;

  // Show appropriate text based on language
  const feedbackText = isEnglish
    ? `${modeInfo.name} mode activated`
    : `تم تفعيل النمط ${modeInfo.nameAr}`;

  feedback.innerHTML = `
        <span class="text-2xl">${modeInfo.emoji}</span>
        <div>
            <div class="font-semibold">${modeInfo.name}</div>
            <div class="text-sm text-gray-600">${feedbackText}</div>
        </div>
    `;

  document.body.appendChild(feedback);

  // Animate in - slide from appropriate direction
  const slideDirection = isEnglish ? "translateX(100%)" : "translateX(-100%)";
  feedback.style.transform = slideDirection;
  feedback.style.opacity = "0";
  setTimeout(() => {
    feedback.style.transform = "translateX(0)";
    feedback.style.opacity = "1";
    feedback.style.transition = "all 0.3s ease";
  }, 10);

  // Remove after 3 seconds - slide to appropriate direction
  setTimeout(() => {
    feedback.style.transform = slideDirection;
    feedback.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(feedback)) {
        document.body.removeChild(feedback);
      }
    }, 300);
  }, 3000);
}

// Export functions for global access
window.changeMode = changeMode;

// Chat System
let chatMessages = [];
let isTyping = false;

function initializeChat() {
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");

  if (!chatInput || !sendButton) return; // Not on chat page

  // Initialize file attachment functionality
  initializeFileAttachment();

  // Enter key to send message
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize input
  chatInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  // Focus input on page load
  chatInput.focus();
}

function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");
  const messageText = chatInput.value.trim();

  if ((!messageText && attachedFiles.length === 0) || isTyping) return;

  // Show loading state on send button
  const originalButtonContent = sendButton.innerHTML;
  sendButton.disabled = true;
  sendButton.innerHTML = `
    <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;

  // Add 1-second delay for loading visibility
  setTimeout(() => {
    // Clear input
    chatInput.value = "";
    chatInput.style.height = "auto";

    // Add user message with files if any
    if (attachedFiles.length > 0) {
      addMessageWithFiles(messageText, attachedFiles);
      // Clear attached files after sending
      attachedFiles = [];
      updateAttachedFilesPreview();
    } else {
      addMessage(messageText, "user");
    }

    // Show typing indicator
    showTypingIndicator();

    // Restore send button
    sendButton.disabled = false;
    sendButton.innerHTML = originalButtonContent;

    // Simulate AI response after delay
    setTimeout(() => {
      hideTypingIndicator();
      generateAIResponse(messageText);
    }, 1500 + Math.random() * 1000);
  }, 1000); // 1-second delay for loading
}

function addMessage(text, sender) {
  const chatMessagesContainer = document.getElementById("chatMessages");
  if (!chatMessagesContainer) return;

  const messageDiv = document.createElement("div");
  const timestamp = new Date().toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  if (sender === "user") {
    messageDiv.className = "flex justify-end";
    messageDiv.innerHTML = `
            <div class="bg-red-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs shadow-sm">
                <p class="text-sm">${text}</p>
                <div class="flex items-center justify-end mt-2 space-x-1 space-x-reverse">
                    <span class="text-xs text-red-200">${timestamp}</span>
                    <div class="w-4 h-4 rounded-full overflow-hidden">
                        <img src="assets/img/user-avatar.png" alt="User" class="w-full h-full object-cover" onerror="this.style.display='none'">
                    </div>
                </div>
            </div>
        `;
  } else {
    messageDiv.className = "flex justify-start";
    messageDiv.innerHTML = `
            <div class="bg-white rounded-2xl rounded-bl-md px-4 py-3 max-w-md shadow-sm border border-gray-200">
                <p class="text-sm text-gray-800 leading-relaxed">${text}</p>
                <div class="flex items-center justify-start mt-2 space-x-1 space-x-reverse">
                    <div class="w-4 h-4 rounded-full overflow-hidden">
                        <img src="assets/img/Characters1.png" alt="AI" class="w-full h-full object-cover" onerror="this.style.display='none'">
                    </div>
                    <span class="text-xs text-gray-500">${timestamp}</span>
                </div>
            </div>
        `;
  }

  // Add message with animation
  messageDiv.style.opacity = "0";
  messageDiv.style.transform = "translateY(20px)";
  chatMessagesContainer.appendChild(messageDiv);

  // Animate in
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
    messageDiv.style.transition = "all 0.3s ease";
  }, 10);

  // Scroll to bottom with smooth animation - multiple attempts to ensure it works
  setTimeout(() => {
    scrollToBottom();
  }, 100);

  // Additional scroll attempt after a longer delay
  setTimeout(() => {
    scrollToBottom();
  }, 300);

  // Store message
  chatMessages.push({ text, sender, timestamp });
}

function showTypingIndicator() {
  if (isTyping) return;
  isTyping = true;

  const chatMessagesContainer = document.getElementById("chatMessages");
  if (!chatMessagesContainer) return;

  const typingDiv = document.createElement("div");
  typingDiv.id = "typingIndicator";
  typingDiv.className = "flex justify-start";
  typingDiv.innerHTML = `
        <div class="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-200">
            <div class="flex items-center space-x-2 space-x-reverse">
                <div class="w-4 h-4 rounded-full overflow-hidden">
                    <img src="assets/img/Characters1.png" alt="AI" class="w-full h-full object-cover" onerror="this.style.display='none'">
                </div>
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        </div>
    `;

  chatMessagesContainer.appendChild(typingDiv);
  scrollToBottom();
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
  isTyping = false;
}

function generateAIResponse(userMessage) {
  const responses = {
    greetings: [
      "مرحباً بك! كيف يمكنني مساعدتك اليوم؟",
      "أهلاً وسهلاً! أنا هنا لمساعدتك.",
      "مرحباً! سعيدة بلقائك، كيف حالك؟",
    ],
    questions: [
      "هذا سؤال رائع! دعني أفكر في الإجابة المناسبة.",
      "سؤال مثير للاهتمام، سأحاول الإجابة عليه بأفضل ما أستطيع.",
      "أقدر فضولك، هذا ما أعرفه عن هذا الموضوع...",
    ],
    help: [
      "بالطبع! أنا هنا لمساعدتك في أي شيء تحتاجه.",
      "سأكون سعيدة لمساعدتك، ما الذي تريد معرفته؟",
      "لا تتردد في السؤال، أنا هنا لخدمتك!",
    ],
    default: [
      "شكراً لك على رسالتك. هل يمكنك توضيح أكثر؟",
      "فهمت، هل تريد المزيد من التفاصيل حول هذا الموضوع؟",
      "مثير للاهتمام! أخبرني المزيد عن ذلك.",
      "أقدر مشاركتك، كيف يمكنني مساعدتك أكثر؟",
    ],
  };

  let responseCategory = "default";
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("مرحبا") ||
    lowerMessage.includes("السلام") ||
    lowerMessage.includes("أهلا")
  ) {
    responseCategory = "greetings";
  } else if (
    lowerMessage.includes("؟") ||
    lowerMessage.includes("ما") ||
    lowerMessage.includes("كيف") ||
    lowerMessage.includes("متى")
  ) {
    responseCategory = "questions";
  } else if (
    lowerMessage.includes("مساعدة") ||
    lowerMessage.includes("ساعد") ||
    lowerMessage.includes("أريد")
  ) {
    responseCategory = "help";
  }

  const responseArray = responses[responseCategory];
  const randomResponse =
    responseArray[Math.floor(Math.random() * responseArray.length)];

  addMessage(randomResponse, "ai");
}

function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  if (chatMessages) {
    // Force scroll to the very bottom with a small delay to ensure content is rendered
    setTimeout(() => {
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight + 100, // Add extra pixels to ensure we reach the bottom
        behavior: "smooth",
      });
    }, 50);
  }
}

// Quick action functions
function quickAction(action) {
  const chatInput = document.getElementById("chatInput");
  if (!chatInput) return;

  const actions = {
    "تقصير النص": "يرجى تقصير النص التالي: ",
    "إطالة النص": "يرجى إطالة وتوسيع النص التالي: ",
    تحسين: "يرجى تحسين وتطوير النص التالي: ",
    ترجمة: "يرجى ترجمة النص التالي: ",
  };

  if (actions[action]) {
    chatInput.value = actions[action];
    chatInput.focus();
  }
}

// Floating quick actions functions
function toggleQuickActions() {
  const floatingMenu = document.getElementById("floatingQuickActions");
  if (floatingMenu) {
    if (floatingMenu.classList.contains("hidden")) {
      // Show menu with animation
      floatingMenu.classList.remove("hidden");
      floatingMenu.style.opacity = "0";
      floatingMenu.style.transform = "translateY(20px) scale(0.95)";

      setTimeout(() => {
        floatingMenu.style.opacity = "1";
        floatingMenu.style.transform = "translateY(0) scale(1)";
        floatingMenu.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      }, 10);
    } else {
      // Hide menu with animation
      floatingMenu.style.opacity = "0";
      floatingMenu.style.transform = "translateY(20px) scale(0.95)";
      floatingMenu.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";

      setTimeout(() => {
        floatingMenu.classList.add("hidden");
        floatingMenu.style.transform = "";
        floatingMenu.style.transition = "";
      }, 200);
    }
  }
}

// Multi-language support for quick actions
function getQuickActionText(actionKey, language = null) {
  // Auto-detect language if not provided
  if (!language) {
    const htmlLang = document.documentElement.lang || "ar";
    const htmlDir = document.documentElement.dir || "rtl";

    if (htmlLang === "en" || htmlDir === "ltr") {
      language = "en";
    } else if (htmlLang === "es") {
      language = "es";
    } else {
      language = "ar";
    }
  }

  const actionTexts = {
    shorten: {
      ar: "يرجى تقصير النص التالي: ",
      en: "Please shorten the following text: ",
      es: "Por favor, acorta el siguiente texto: ",
    },
    lengthen: {
      ar: "يرجى إطالة وتوسيع النص التالي: ",
      en: "Please expand and lengthen the following text: ",
      es: "Por favor, expande y alarga el siguiente texto: ",
    },
    improve: {
      ar: "يرجى تحسين وتطوير النص التالي: ",
      en: "Please improve and enhance the following text: ",
      es: "Por favor, mejora y perfecciona el siguiente texto: ",
    },
    translate: {
      ar: "يرجى ترجمة النص التالي: ",
      en: "Please translate the following text: ",
      es: "Por favor, traduce el siguiente texto: ",
    },
  };

  return actionTexts[actionKey] && actionTexts[actionKey][language]
    ? actionTexts[actionKey][language]
    : actionTexts[actionKey]["ar"]; // Fallback to Arabic
}

function selectQuickAction(action) {
  const chatInput = document.getElementById("chatInput");
  const floatingMenu = document.getElementById("floatingQuickActions");

  if (!chatInput) return;

  // Map display text to action keys for different languages
  const actionKeyMap = {
    // Arabic
    "تقصير النص": "shorten",
    "إطالة النص": "lengthen",
    تحسين: "improve",
    ترجمة: "translate",

    // English
    "Shorten the text": "shorten",
    Shorten: "shorten",
    "Longen the text": "lengthen",
    Longen: "lengthen",
    Improvement: "improve",
    Translation: "translate",

    // Spanish
    "Acortar el texto": "shorten",
    Acortar: "shorten",
    "Alargar el texto": "lengthen",
    Alargar: "lengthen",
    Mejora: "improve",
    Mejorar: "improve",
    Traducción: "translate",
  };

  const actionKey = actionKeyMap[action];

  if (actionKey) {
    // Add selected action feedback
    const selectedButton = event.target.closest("button");
    if (selectedButton) {
      selectedButton.style.transform = "scale(0.95)";
      setTimeout(() => {
        selectedButton.style.transform = "";
      }, 150);
    }

    // Get the appropriate text for current language
    const actionText = getQuickActionText(actionKey);

    // Hide the floating menu with animation
    if (floatingMenu && !floatingMenu.classList.contains("hidden")) {
      floatingMenu.style.opacity = "0";
      floatingMenu.style.transform = "translateY(20px) scale(0.95)";
      floatingMenu.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";

      setTimeout(() => {
        floatingMenu.classList.add("hidden");
        floatingMenu.style.transform = "";
        floatingMenu.style.transition = "";

        // Set input value and focus after menu is hidden
        chatInput.value = actionText;
        chatInput.focus();
      }, 200);
    } else {
      chatInput.value = actionText;
      chatInput.focus();
    }
  }
}

// File attachment preview functions
function updateAttachedFilesPreview() {
  const previewContainer = document.getElementById("attachedFilesPreview");
  const filesList = document.getElementById("attachedFilesList");

  if (!previewContainer || !filesList) return;

  if (attachedFiles.length === 0) {
    previewContainer.classList.add("hidden");
    return;
  }

  previewContainer.classList.remove("hidden");
  filesList.innerHTML = "";

  attachedFiles.forEach((fileData) => {
    const fileItem = document.createElement("div");
    fileItem.className =
      "flex items-center justify-between bg-white rounded-lg p-2 border border-gray-200";

    fileItem.innerHTML = `
      <div class="flex items-center space-x-2 space-x-reverse">
        <div class="text-lg">${getFileIcon(fileData.type)}</div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 truncate max-w-32">${
            fileData.name
          }</p>
          <p class="text-xs text-gray-500">${fileData.size}</p>
        </div>
      </div>
      <button onclick="removeAttachedFile('${
        fileData.id
      }')" class="text-red-500 hover:text-red-700 p-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    `;

    filesList.appendChild(fileItem);
  });
}

function removeAttachedFile(fileId) {
  attachedFiles = attachedFiles.filter((file) => file.id != fileId);
  updateAttachedFilesPreview();
}

function clearAttachedFiles() {
  attachedFiles = [];
  updateAttachedFilesPreview();
}

// File attachment functionality
let attachedFiles = [];

function initializeFileAttachment() {
  // Create hidden file input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "fileInput";
  fileInput.style.display = "none";
  fileInput.accept = "image/*,video/*,audio/*,.pdf,.doc,.docx,.txt";
  fileInput.multiple = true;

  document.body.appendChild(fileInput);

  // Handle file selection
  fileInput.addEventListener("change", handleFileSelection);

  // Close floating menu when clicking outside
  document.addEventListener("click", function (event) {
    const floatingMenu = document.getElementById("floatingQuickActions");
    const quickActionBtn = event.target.closest(
      '[onclick="toggleQuickActions()"]'
    );

    if (
      floatingMenu &&
      !floatingMenu.contains(event.target) &&
      !quickActionBtn &&
      !floatingMenu.classList.contains("hidden")
    ) {
      // Hide with smooth animation
      floatingMenu.style.opacity = "0";
      floatingMenu.style.transform = "translateY(20px) scale(0.95)";
      floatingMenu.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";

      setTimeout(() => {
        floatingMenu.classList.add("hidden");
        floatingMenu.style.transform = "";
        floatingMenu.style.transition = "";
      }, 200);
    }
  });
}

function openFileDialog() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.click();
  }
}

function handleFileSelection(event) {
  const files = event.target.files;
  if (files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    addFileToAttachments(file);
  }

  // Clear the input
  event.target.value = "";
}

function addFileToAttachments(file) {
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (file.size > maxSize) {
    showFileError("حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت");
    return;
  }

  // Add file to attachments array
  const fileId = Date.now() + Math.random();
  const fileData = {
    id: fileId,
    file: file,
    name: file.name,
    size: formatFileSize(file.size),
    type: getFileType(file.type),
  };

  attachedFiles.push(fileData);
  updateAttachedFilesPreview();
}

function addFileMessage(fileName, fileSize, fileType, file) {
  const chatMessagesContainer = document.getElementById("chatMessages");
  if (!chatMessagesContainer) return;

  const messageDiv = document.createElement("div");
  const timestamp = new Date().toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  messageDiv.className = "flex justify-end";
  messageDiv.innerHTML = `
    <div class="bg-red-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs shadow-sm">
      <div class="flex items-center space-x-2 space-x-reverse mb-2">
        <div class="text-lg">${getFileIcon(fileType)}</div>
        <div class="flex-1">
          <p class="text-sm font-medium">${fileName}</p>
          <p class="text-xs text-red-200">${fileSize}</p>
        </div>
      </div>
      ${
        file.type.startsWith("image/")
          ? `<img src="${URL.createObjectURL(
              file
            )}" alt="${fileName}" class="max-w-full h-32 object-cover rounded-lg mb-2">`
          : ""
      }
      <div class="flex items-center justify-end mt-2 space-x-1 space-x-reverse">
        <span class="text-xs text-red-200">${timestamp}</span>
        <div class="w-4 h-4 rounded-full overflow-hidden">
          <img src="assets/img/user-avatar.png" alt="User" class="w-full h-full object-cover" onerror="this.style.display='none'">
        </div>
      </div>
    </div>
  `;

  // Add message with animation
  messageDiv.style.opacity = "0";
  messageDiv.style.transform = "translateY(20px)";
  chatMessagesContainer.appendChild(messageDiv);

  // Animate in
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
    messageDiv.style.transition = "all 0.3s ease";
  }, 10);

  // Scroll to bottom
  setTimeout(() => {
    scrollToBottom();
  }, 100);

  // Simulate AI response to file
  setTimeout(() => {
    const responses = [
      `تم استلام الملف "${fileName}" بنجاح! كيف يمكنني مساعدتك به؟`,
      `شكراً لك على إرسال "${fileName}". هل تريد مني تحليله أو معالجته؟`,
      `تم رفع الملف بنجاح. ما الذي تريد فعله مع "${fileName}"؟`,
    ];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    addMessage(randomResponse, "ai");
  }, 1000);
}

function getFileIcon(fileType) {
  const icons = {
    image: "🖼️",
    video: "🎥",
    audio: "🎵",
    pdf: "📄",
    document: "📝",
    default: "📎",
  };
  return icons[fileType] || icons.default;
}

function getFileType(mimeType) {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("document") || mimeType.includes("text"))
    return "document";
  return "default";
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 بايت";
  const k = 1024;
  const sizes = ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function showFileError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className =
    "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
  errorDiv.textContent = message;

  document.body.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

// Mobile Menu Functions
function toggleMobileMenu() {
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (mobileSidebar && mobileOverlay) {
    // Check if it's LTR version (English or Spanish) by URL
    const isLTR =
      window.location.pathname.includes("-en") ||
      window.location.pathname.includes("-es");
    const closedClass = isLTR ? "-translate-x-full" : "translate-x-full";
    const isOpen = !mobileSidebar.classList.contains(closedClass);

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
}

function openMobileMenu() {
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (mobileSidebar && mobileOverlay) {
    // Check if it's LTR version (English or Spanish) by URL
    const isLTR =
      window.location.pathname.includes("-en") ||
      window.location.pathname.includes("-es");
    const closedClass = isLTR ? "-translate-x-full" : "translate-x-full";

    mobileSidebar.classList.remove(closedClass);
    mobileOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
}

function closeMobileMenu() {
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (mobileSidebar && mobileOverlay) {
    // Check if it's LTR version (English or Spanish) by URL
    const isLTR =
      window.location.pathname.includes("-en") ||
      window.location.pathname.includes("-es");
    const closedClass = isLTR ? "-translate-x-full" : "translate-x-full";

    mobileSidebar.classList.add(closedClass);
    mobileOverlay.classList.add("hidden");
    document.body.style.overflow = ""; // Restore scrolling
  }
}

// Responsive behavior improvements
function handleResponsiveLayout() {
  const chatContainer = document.getElementById("chatContainer");
  const chatInputArea = document.getElementById("chatInputArea");
  const chatMessages = document.getElementById("chatMessages");

  if (window.innerWidth < 1024) {
    // Mobile and tablet
    // Adjust chat messages height for mobile
    if (chatMessages) {
      chatMessages.style.height = "calc(100vh - 120px)";
      chatMessages.style.paddingBottom = "120px";
    }
  } else {
    // Desktop
    // Restore desktop height
    if (chatMessages) {
      chatMessages.style.height = "calc(100vh - 160px)";
      chatMessages.style.paddingBottom = "140px";
    }
  }

  // Force scroll to bottom after layout change
  setTimeout(() => {
    scrollToBottom();
  }, 100);
}

// Initialize responsive behavior
function initializeResponsive() {
  // Handle sidebar visibility on mobile
  function handleResize() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      if (window.innerWidth < 1024) {
        sidebar.style.display = "none";
      } else {
        sidebar.style.display = "block";
      }
    }

    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }

    // Handle responsive layout
    handleResponsiveLayout();
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // Initial call

  // Mobile menu toggle (if needed)
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
      }
    });
  }
}

// Language Dropdown Functions
function toggleLanguageDropdown() {
  const dropdown = document.getElementById("languageDropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

function selectLanguage(langCode, langName) {
  // Update the button text
  const languageSelector = document.getElementById("languageSelector");
  if (languageSelector) {
    const span = languageSelector.querySelector("span");
    if (span) {
      span.textContent = langName;
    }
  }

  // Close the dropdown
  const dropdown = document.getElementById("languageDropdown");
  if (dropdown) {
    dropdown.classList.add("hidden");
  }

  // Store selected language in localStorage
  localStorage.setItem("selectedLanguage", langCode);
  localStorage.setItem("selectedLanguageName", langName);

  // You can add more language switching logic here
  console.log(`Language changed to: ${langName} (${langCode})`);
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const languageSelector = document.getElementById("languageSelector");
  const dropdown = document.getElementById("languageDropdown");

  if (
    languageSelector &&
    dropdown &&
    !languageSelector.contains(event.target)
  ) {
    dropdown.classList.add("hidden");
  }
});

// Initialize language on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedLanguage = localStorage.getItem("selectedLanguageName");
  if (savedLanguage) {
    const languageSelector = document.getElementById("languageSelector");
    if (languageSelector) {
      const span = languageSelector.querySelector("span");
      if (span) {
        span.textContent = savedLanguage;
      }
    }
  }
});

// New function to add message with files
function addMessageWithFiles(text, files) {
  const chatMessagesContainer = document.getElementById("chatMessages");
  if (!chatMessagesContainer) return;

  const messageDiv = document.createElement("div");
  const timestamp = new Date().toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  messageDiv.className = "flex justify-end";

  let filesHTML = "";
  if (files.length > 0) {
    filesHTML = `
      <div class="mb-3">
        ${files
          .map(
            (fileData) => `
          <div class="flex items-center space-x-2 space-x-reverse mb-2 bg-red-700 rounded-lg p-2">
            <div class="text-lg">${getFileIcon(fileData.type)}</div>
            <div class="flex-1">
              <p class="text-xs font-medium text-red-100">${fileData.name}</p>
              <p class="text-xs text-red-200">${fileData.size}</p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  messageDiv.innerHTML = `
    <div class="bg-red-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs shadow-sm">
      ${filesHTML}
      ${text ? `<p class="text-sm">${text}</p>` : ""}
      <div class="flex items-center justify-end mt-2 space-x-1 space-x-reverse">
        <span class="text-xs text-red-200">${timestamp}</span>
        <div class="w-4 h-4 rounded-full overflow-hidden">
          <img src="assets/img/user-avatar.png" alt="User" class="w-full h-full object-cover" onerror="this.style.display='none'">
        </div>
      </div>
    </div>
  `;

  // Add message with animation
  messageDiv.style.opacity = "0";
  messageDiv.style.transform = "translateY(20px)";
  chatMessagesContainer.appendChild(messageDiv);

  // Animate in
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
    messageDiv.style.transition = "all 0.3s ease";
  }, 10);

  // Scroll to bottom
  setTimeout(() => {
    scrollToBottom();
  }, 100);

  setTimeout(() => {
    scrollToBottom();
  }, 300);

  // Store message
  chatMessages.push({ text, files, sender: "user", timestamp });
}

// Export chat functions
window.sendMessage = sendMessage;
window.quickAction = quickAction;
window.openFileDialog = openFileDialog;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.selectLanguage = selectLanguage;
window.toggleQuickActions = toggleQuickActions;
window.selectQuickAction = selectQuickAction;
window.removeAttachedFile = removeAttachedFile;
window.clearAttachedFiles = clearAttachedFiles;

// Theme Toggle Functionality from index.html
function toggleTheme() {
  const body = document.body;
  const themeToggleCircle = document.getElementById("themeToggleCircle");
  const themeIcon = document.getElementById("themeIcon");
  const themeToggle = document.getElementById("themeToggle");

  // Check current theme
  const isDark = body.classList.contains("dark-mode");

  if (isDark) {
    // Switch to light mode
    body.classList.remove("dark-mode");
    themeToggleCircle.style.transform = "translateX(0)";
    themeIcon.textContent = "🌙";
    themeToggle.classList.remove(
      "bg-gradient-to-r",
      "from-red-400",
      "to-pink-400"
    );
    themeToggle.classList.add(
      "bg-gradient-to-r",
      "from-gray-200",
      "to-gray-300"
    );
    localStorage.setItem("theme", "light");
  } else {
    // Switch to dark mode
    body.classList.add("dark-mode");
    themeToggleCircle.style.transform = "translateX(24px)";
    themeIcon.textContent = "☀️";
    themeToggle.classList.remove(
      "bg-gradient-to-r",
      "from-gray-200",
      "to-gray-300"
    );
    themeToggle.classList.add(
      "bg-gradient-to-r",
      "from-red-400",
      "to-pink-400"
    );
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const themeToggleCircle = document.getElementById("themeToggleCircle");
  const themeIcon = document.getElementById("themeIcon");
  const themeToggle = document.getElementById("themeToggle");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleCircle)
      themeToggleCircle.style.transform = "translateX(24px)";
    if (themeIcon) themeIcon.textContent = "☀️";
    if (themeToggle) {
      themeToggle.classList.remove(
        "bg-gradient-to-r",
        "from-gray-200",
        "to-gray-300"
      );
      themeToggle.classList.add(
        "bg-gradient-to-r",
        "from-red-400",
        "to-pink-400"
      );
    }
  }
});

// Back to Top Button Functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show/Hide Back to Top Button
window.addEventListener("scroll", function () {
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove("opacity-0", "invisible");
      backToTopButton.classList.add("opacity-100", "visible");
    } else {
      backToTopButton.classList.add("opacity-0", "invisible");
      backToTopButton.classList.remove("opacity-100", "visible");
    }
  }
});

// Export theme functions
window.toggleTheme = toggleTheme;
window.scrollToTop = scrollToTop;
