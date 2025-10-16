// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAnimations();
    initializeModelSelection();
    initializeInteractions();
    initializeResponsive();
    initializeLanguageDropdown();
    initializeCarousel();
    initializeModeSelection();
});

// Animation System
function initializeAnimations() {
    // Add floating animation to characters
    const characters = document.querySelectorAll('.character-main, .character-small');
    characters.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.5}s`;
        char.classList.add('float-animation');
    });

    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('[data-translate="cta_button"]');
    if (ctaButton) {
        ctaButton.classList.add('pulse-soft');
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card, .hero-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Model Selection System
function initializeModelSelection() {
    const modelOptions = document.querySelectorAll('.model-option');
    
    // Set first option as active by default
    if (modelOptions.length > 0) {
        modelOptions[0].classList.add('active');
    }

    modelOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            modelOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get model type
            const modelType = this.querySelector('.text-sm').textContent;
            
            // Update main character based on selection
            updateMainCharacter(modelType);
            
            // Show selection feedback
            showSelectionFeedback(modelType);
        });
    });
}

// Update main character based on model selection
function updateMainCharacter(modelType) {
    const mainCharacter = document.querySelector('.character-main span');
    if (!mainCharacter) return;

    const characterEmojis = {
        'Friendly': '😊',
        'Tutor': '🎓',
        'Funny': '😄',
        'Flirty': '😘'
    };

    const emoji = characterEmojis[modelType] || '😊';
    mainCharacter.textContent = emoji;

    // Add bounce effect
    mainCharacter.parentElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        mainCharacter.parentElement.style.transform = 'scale(1)';
    }, 200);
}

// Show selection feedback
function showSelectionFeedback(modelType) {
    // Create temporary feedback message
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    feedback.textContent = `تم اختيار نموذج ${modelType}`;
    
    document.body.appendChild(feedback);
    
    // Animate in
    feedback.style.transform = 'translateX(100%)';
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
        feedback.style.transition = 'transform 0.3s ease';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.transform = 'translateX(100%)';
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
        ctaButton.addEventListener('click', function() {
            handleCTAClick();
        });
    }

    // Character interactions
    const characters = document.querySelectorAll('.character-main, .character-small');
    characters.forEach(character => {
        character.addEventListener('click', function() {
            playCharacterSound();
            showCharacterMessage();
        });
    });

    // Speech bubble interactions
    const speechBubbles = document.querySelectorAll('.speech-bubble');
    speechBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
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
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
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
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.3s ease';
    }, 10);
}

// Character interaction effects
function playCharacterSound() {
    // Create audio feedback (visual feedback for now)
    const soundWave = document.createElement('div');
    soundWave.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl z-50';
    soundWave.textContent = '🔊';
    soundWave.style.pointerEvents = 'none';
    
    document.body.appendChild(soundWave);
    
    // Animate
    soundWave.style.opacity = '0';
    soundWave.style.transform = 'translate(-50%, -50%) scale(0.5)';
    setTimeout(() => {
        soundWave.style.opacity = '1';
        soundWave.style.transform = 'translate(-50%, -50%) scale(1)';
        soundWave.style.transition = 'all 0.3s ease';
    }, 10);
    
    setTimeout(() => {
        soundWave.style.opacity = '0';
        soundWave.style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => {
            document.body.removeChild(soundWave);
        }, 300);
    }, 1000);
}

// Show character message
function showCharacterMessage() {
    const messages = [
        'مرحباً! كيف يمكنني مساعدتك؟',
        'هيا نتعلم معاً!',
        'أنا هنا لمساعدتك في تعلم اللغات',
        'لنبدأ رحلة التعلم!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50';
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
        messageDiv.style.transform = 'translateY(100%)';
        messageDiv.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 4000);
}

// Responsive behavior
function initializeResponsive() {
    // Handle sidebar visibility on mobile
    function handleResize() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            if (window.innerWidth < 1024) {
                sidebar.style.display = 'none';
            } else {
                sidebar.style.display = 'block';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    }
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
        behavior: 'smooth',
        block: 'start'
    });
}

// Local storage utilities
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
    }
}

function loadFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.warn('Failed to load from localStorage:', error);
        return null;
    }
}

// Language Dropdown System
function initializeLanguageDropdown() {
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('languageDropdown');
        const button = document.getElementById('languageSelector');
        
        if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Select language from dropdown
function selectLanguage(langCode, langName) {
    const button = document.getElementById('languageSelector');
    const dropdown = document.getElementById('languageDropdown');
    
    if (button && dropdown) {
        // Update button text
        const span = button.querySelector('span');
        if (span) {
            span.textContent = langName;
        }
        
        // Hide dropdown
        dropdown.classList.add('hidden');
        
        // Save selected language
        saveToStorage('selectedLanguage', { code: langCode, name: langName });
        
        // Show selection feedback
        showLanguageSelectionFeedback(langName);
    }
}

// Show language selection feedback
function showLanguageSelectionFeedback(langName) {
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    feedback.textContent = `تم تغيير اللغة إلى ${langName}`;
    
    document.body.appendChild(feedback);
    
    // Animate in
    feedback.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
        feedback.style.transition = 'transform 0.3s ease';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            if (document.body.contains(feedback)) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Character Cards Carousel System
let currentCardIndex = 0;
const cardData = [
    {
        id: 'card-friendly',
        name: 'Friendly',
        color: 'red',
        title: 'ليبية هي مديرتك الذكية متعددة اللغات',
        description: 'بفضل قدرة ليبية على التكيف لتوفير، يمكنك التواصل معها بفضل قدرات ليبية الفائقة في التعامل مع مختلف اللغات.'
    },
    {
        id: 'card-tutor',
        name: 'Tutor',
        color: 'blue',
        title: 'المعلم الذكي',
        description: 'التعلم المنهجي والمنظم'
    },
    {
        id: 'card-funny',
        name: 'Funny',
        color: 'green',
        title: 'المرح والفكاهة',
        description: 'التعلم بالمتعة والضحك'
    }
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
    const allDescriptions = document.querySelectorAll('.card-description');
    allDescriptions.forEach(desc => {
        desc.classList.add('hidden');
    });
    
    // Show description only for the active card (index 0 by default)
    const activeCard = document.getElementById(cardData[currentCardIndex].id);
    if (activeCard) {
        const activeDescription = activeCard.querySelector('.card-description');
        if (activeDescription) {
            activeDescription.classList.remove('hidden');
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
                dot.className = 'w-3 h-3 bg-gray-800 rounded-full cursor-pointer transition-colors';
            } else {
                dot.className = 'w-3 h-3 bg-gray-300 rounded-full cursor-pointer transition-colors';
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
        fromCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        fromCard.style.transform = 'translateX(-250px) scale(0.75)';
        fromCard.style.opacity = '0.6';
        fromCard.style.zIndex = '15';
    }
    
    // Step 2: Bring new card to front (with slight delay for better effect)
    setTimeout(() => {
        if (toCard) {
            toCard.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            toCard.style.transform = 'translateX(0) scale(1)';
            toCard.style.opacity = '1';
            toCard.style.zIndex = '30';
            toCard.style.width = '400px';
            toCard.style.height = '280px';
            
            // Show description for the new active card
            const newDescription = toCard.querySelector('.card-description');
            if (newDescription) {
                newDescription.classList.remove('hidden');
            }
        }
        
        // Hide description for the old card
        if (fromCard) {
            const oldDescription = fromCard.querySelector('.card-description');
            if (oldDescription) {
                oldDescription.classList.add('hidden');
            }
        }
        
        // Position other cards
        cardData.forEach((card, i) => {
            if (i !== fromIndex && i !== toIndex) {
                const cardElement = document.getElementById(card.id);
                if (cardElement) {
                    const position = getCardPosition(i, toIndex);
                    cardElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
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
        cardElement.style.transition = 'all 0.3s ease-in-out';
        applyCardTransform(cardElement, position);
    });
}

function getCardPosition(cardIndex, activeIndex) {
    const diff = cardIndex - activeIndex;
    
    if (diff === 0) {
        // Active card - front and center
        return { type: 'active', transform: 'translateX(0) scale(1)', zIndex: 30, opacity: 1 };
    } else if (diff === -1 || (diff === 2 && activeIndex === 0)) {
        // Left card - behind and to the left
        return { type: 'left', transform: 'translateX(-220px) scale(0.85)', zIndex: 20, opacity: 0.75 };
    } else if (diff === 1 || (diff === -2 && activeIndex === 2)) {
        // Right card - behind and to the right
        return { type: 'right', transform: 'translateX(220px) scale(0.85)', zIndex: 20, opacity: 0.75 };
    } else {
        // Hidden card - far back
        return { type: 'hidden', transform: 'translateX(0) scale(0.7)', zIndex: 10, opacity: 0.4 };
    }
}

function applyCardTransform(cardElement, position) {
    cardElement.style.transform = position.transform;
    cardElement.style.zIndex = position.zIndex;
    cardElement.style.opacity = position.opacity;
    
    // Get the description element within this card
    const description = cardElement.querySelector('.card-description');
    
    // Update card size and description visibility based on position
    if (position.type === 'active') {
        cardElement.style.width = '400px';
        cardElement.style.height = '280px';
        cardElement.classList.remove('hidden');
        
        // Show description for active card
        if (description) {
            description.classList.remove('hidden');
        }
    } else {
        cardElement.style.width = '320px';
        cardElement.style.height = '240px';
        cardElement.classList.remove('hidden');
        
        // Hide description for non-active cards
        if (description) {
            description.classList.add('hidden');
        }
    }
    
    if (position.type === 'hidden') {
        // Don't actually hide, just make very transparent and small
        cardElement.style.opacity = '0.2';
        
        // Ensure description is hidden for hidden cards
        if (description) {
            description.classList.add('hidden');
        }
    }
}


// Navigation functions for dots
window.showCard = showCard;

// Mode Selection System
let currentMode = 'friendly'; // Default mode

const modeData = {
    friendly: {
        name: 'Friendly',
        nameAr: 'ودود',
        emoji: '😊',
        color: 'orange'
    },
    tutor: {
        name: 'Tutor',
        nameAr: 'معلم',
        emoji: '🎓',
        color: 'blue'
    },
    funny: {
        name: 'Funny',
        nameAr: 'مضحك',
        emoji: '😄',
        color: 'green'
    },
    flirty: {
        name: 'Flirty',
        nameAr: 'غزلي',
        emoji: '💕',
        color: 'pink'
    }
};

function initializeModeSelection() {
    // Get all mode option containers
    const modeOptions = document.querySelectorAll('.space-y-4 > div');
    
    modeOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            const modes = ['friendly', 'tutor', 'funny', 'flirty'];
            changeMode(modes[index]);
        });
    });
    
    // Set default selection to friendly mode
    updateSidebarModeSelection('friendly');
}

function changeMode(newMode) {
    if (!modeData[newMode] || currentMode === newMode) return;
    
    const oldMode = currentMode;
    currentMode = newMode;
    
    // Update sidebar selection
    updateSidebarModeSelection(newMode);
    
    // Show mode change feedback
    showModeChangeFeedback(modeData[newMode]);
    
    console.log(`Mode changed from ${oldMode} to ${newMode}`);
}

function updateSidebarModeSelection(selectedMode) {
    const modeOptions = document.querySelectorAll('.space-y-4 > div');
    
    modeOptions.forEach((option, index) => {
        const modes = ['friendly', 'tutor', 'funny', 'flirty'];
        const mode = modes[index];
        const radio = option.querySelector('.model-radio-active, .model-radio-inactive');
        
        if (mode === selectedMode) {
            // Activate selected mode
            option.classList.remove('border-gray-200', 'hover:bg-gray-50');
            option.classList.add(`bg-${modeData[mode].color}-50`, `border-${modeData[mode].color}-200`);
            
            if (radio) {
                radio.className = 'model-radio-active';
            }
        } else {
            // Deactivate other modes
            option.classList.remove(
                `bg-${modeData[modes[index]].color}-50`, 
                `border-${modeData[modes[index]].color}-200`
            );
            option.classList.add('border-gray-200', 'hover:bg-gray-50');
            
            if (radio) {
                radio.className = 'model-radio-inactive';
            }
        }
    });
}

function showModeChangeFeedback(modeInfo) {
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 left-4 bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 space-x-reverse';
    
    feedback.innerHTML = `
        <span class="text-2xl">${modeInfo.emoji}</span>
        <div>
            <div class="font-semibold">${modeInfo.name}</div>
            <div class="text-sm text-gray-600">تم تفعيل النمط ${modeInfo.nameAr}</div>
        </div>
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    feedback.style.transform = 'translateX(-100%)';
    feedback.style.opacity = '0';
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
        feedback.style.opacity = '1';
        feedback.style.transition = 'all 0.3s ease';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.transform = 'translateX(-100%)';
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(feedback)) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Export functions for global access
window.changeMode = changeMode;
