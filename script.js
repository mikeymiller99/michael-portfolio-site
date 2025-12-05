// Simple check to confirm JS is loaded
console.log("Michael's JavaScript is connected ✅");

// Run JS after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // ===========================================================
    // THEME / DARK MODE TOGGLE
    // ===========================================================
    const themeToggleButton = document.getElementById("theme-toggle");
    const rootElement = document.documentElement; // <html>

    function applyTheme(theme) {
        if (theme === "dark") {
            rootElement.classList.add("dark-theme");
            if (themeToggleButton) {
                themeToggleButton.textContent = "☀️ Light Mode";
            }
        } else {
            rootElement.classList.remove("dark-theme");
            if (themeToggleButton) {
                themeToggleButton.textContent = "🌙 Dark Mode";
            }
        }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        applyTheme(savedTheme);
    } else {
        applyTheme("light");
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", function () {
            const isDark = rootElement.classList.contains("dark-theme");
            const newTheme = isDark ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }


    // ===========================================================
    // HERO INTERACTIONS (HOME PAGE)
    // ===========================================================
    const heroTitle = document.getElementById("hero-title");

    if (heroTitle) {
        heroTitle.textContent = "Welcome to Michael's First JavaScript-Powered Site";
    }

    const surpriseButton = document.getElementById("surprise-btn");

    if (surpriseButton) {
        surpriseButton.addEventListener("click", function () {
            alert("You just triggered your first JavaScript event! 🎉");
        });
    }


    // ===========================================================
    // CONTACT FORM INTERACTIONS (CONTACT PAGE)
    // ===========================================================
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            // Form submits normally to Netlify

            const nameValue = contactForm.elements["name"]?.value || "";
            const emailValue = contactForm.elements["email"]?.value || "";
            const messageValue = contactForm.elements["message"]?.value || "";

            console.log("Form submitted with:");
            console.log("Name:", nameValue);
            console.log("Email:", emailValue);
            console.log("Message:", messageValue);

            const successMessageEl = document.getElementById("success-message");

            if (successMessageEl) {
                successMessageEl.textContent =
                    nameValue
                        ? `Thanks, ${nameValue}! Your message is being sent...`
                        : "Thanks! Your message is being sent...";
            }
        });
    }


    // ===========================================================
    // LIVE BTC PRICE (PORTFOLIO PAGE ONLY)
    // ===========================================================

    // Helper: format USD
    function formatUSD(value) {
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    // Helper: update timestamp text
    function updateTimestamp(element) {
        if (!element) return;
        const now = new Date();
        element.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    }

    const btcPriceEl = document.getElementById("btc-price");
    const btcUpdatedEl = document.getElementById("btc-updated");
    const btcButton = document.getElementById("btc-btn");

    async function fetchBitcoinPrice() {
        if (!btcPriceEl) return;
        try {
            btcPriceEl.textContent = "Loading latest BTC price...";
            const response = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const price = data.bitcoin.usd;
            btcPriceEl.textContent = `Bitcoin Price: ${formatUSD(price)} (USD)`;
            updateTimestamp(btcUpdatedEl);
        } catch (error) {
            console.error("Error fetching BTC price:", error);
            btcPriceEl.textContent = "Could not load BTC price. Please try again.";
        }
    }

    if (btcPriceEl && btcButton) {
        // Manual refresh
        btcButton.addEventListener("click", fetchBitcoinPrice);
        // Initial load + auto-refresh every 30 seconds
        fetchBitcoinPrice();
        setInterval(fetchBitcoinPrice, 30000);
    }

});
