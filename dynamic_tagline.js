
// --- Dynamic Tagline Fade Effect (Classic) ---
function initDynamicTagline() {
    const taglineElement = document.querySelector('.hero-tagline');
    if (!taglineElement) return;

    const phrases = [
        "Reduce Team Cost with AI Workforce",
        "Automation is not just for big firms",
        "Automation is not expensive any more",
        "No in-house expertise? No problem.",
        "You focus on business; we handle the tech.",
        "From CRMs to social media, finance, HR, and more",
        "Complex processes become effortless",
        "Turning your current setup into a smooth, automated powerhouse"
    ];

    let phraseIndex = 0;

    function rotateText() {
        // 1. Fade Out
        taglineElement.style.opacity = '0';

        setTimeout(() => {
            // 2. Change Text
            phraseIndex = (phraseIndex + 1) % phrases.length;
            taglineElement.textContent = phrases[phraseIndex];

            // 3. Fade In
            taglineElement.style.opacity = '1';
        }, 500); // Wait for 0.5s fade out (matches CSS transition)
    }

    // Start the rotation loop
    // Initial delay to let the entrance animation finish
    setTimeout(() => {
        setInterval(rotateText, 4000); // Rotate every 4 seconds
    }, 2000);
}

// Initialize dynamic tagline on load
window.addEventListener('load', initDynamicTagline);
