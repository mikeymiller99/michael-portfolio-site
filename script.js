console.log("Michael's JavaScript loaded! 🚀");

document.addEventListener("DOMContentLoaded", () => {

    /* =======================================
       THEME / DARK MODE
       ======================================= */
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    function applyTheme(theme) {
        root.classList.toggle("dark-theme", theme === "dark");
        if (themeToggle) {
            themeToggle.textContent =
                theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
        }
    }

    applyTheme(localStorage.getItem("theme") || "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const newTheme = root.classList.contains("dark-theme") ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }


    /* =======================================
       HERO SECTION (safe if missing)
       ======================================= */
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) {
        heroTitle.textContent =
            "Welcome to Michael's First JavaScript-Powered Site";
    }

    const surpriseButton = document.getElementById("surprise-btn");
    if (surpriseButton) {
        surpriseButton.addEventListener("click", () => {
            alert("🔥 Surprise! You're actually building real web apps now.");
        });
    }


    /* =======================================
       CONTACT FORM LOGGING
       ======================================= */
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", () => {
            console.log("Contact form submitted.");
        });
    }


    /* =======================================
       BITCOIN LIVE PRICE (PORTFOLIO PAGE)
       ======================================= */
    const btcEl = document.getElementById("btc-price");
    const btcUpdatedEl = document.getElementById("btc-updated");
    const btcBtn = document.getElementById("btc-btn");

    async function getBTC() {
        if (!btcEl) return;

        btcEl.textContent = "Loading...";

        try {
            const r = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
            );
            if (!r.ok) throw new Error("Network response not ok");
            const data = await r.json();
            const price = data.bitcoin.usd;

            btcEl.textContent = `Bitcoin Price: $${price.toLocaleString()}`;
            if (btcUpdatedEl) {
                btcUpdatedEl.textContent =
                    `Last updated: ${new Date().toLocaleTimeString()}`;
            }
        } catch (err) {
            console.error(err);
            btcEl.textContent = "Error loading BTC price.";
        }
    }

    if (btcEl && btcBtn) {
        getBTC();
        setInterval(getBTC, 30000);
        btcBtn.addEventListener("click", getBTC);
    }


    /* =======================================
       CHATBOT WIDGET
       ======================================= */
    const chatWidget = document.getElementById("chat-widget");
    const chatToggleBtn = document.getElementById("chat-toggle");
    const chatCloseBtn = document.getElementById("chat-close");
    const chatInput = document.getElementById("chat-input");
    const chatFormEl = document.getElementById("chat-form");
    const chatMessages = document.getElementById("chat-messages");

    if (chatWidget && chatToggleBtn && chatCloseBtn && chatInput && chatFormEl && chatMessages) {

        function setUnread(state) {
            chatToggleBtn.classList.toggle("chat-toggle-unread", state);
        }

        function addMessage(text, sender = "bot") {
            const msg = document.createElement("div");
            msg.classList.add("chat-message");
            msg.classList.add(
                sender === "user" ? "chat-message-user" : "chat-message-bot"
            );
            msg.textContent = text;
            chatMessages.appendChild(msg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function openChat() {
            chatWidget.classList.add("open");
            setUnread(false);
            chatInput.focus();
        }

        function closeChat() {
            chatWidget.classList.remove("open");
        }

        chatToggleBtn.addEventListener("click", () => {
            chatWidget.classList.contains("open") ? closeChat() : openChat();
        });

        chatCloseBtn.addEventListener("click", closeChat);

        // Initial greeting + unread pulse
        addMessage("Hey! I'm your practice chatbot. Ask me about this site.");
        setUnread(true);

        chatFormEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, "user");
            chatInput.value = "";

            let reply = "Great question! I'm a scripted practice bot.";

            const l = text.toLowerCase();
            if (l.includes("html")) {
                reply = "HTML gives the structure of every webpage—you're using it on every page here.";
            } else if (l.includes("css")) {
                reply = "CSS controls layout, colors, spacing, and those card/hero styles you're seeing.";
            } else if (l.includes("javascript") || l.includes("js")) {
                reply = "JavaScript powers interactions like dark mode, BTC prices, and this chatbot.";
            } else if (l.includes("btc") || l.includes("bitcoin")) {
                reply = "The BTC widget uses the CoinGecko API and auto-refreshes every 30 seconds.";
            } else if (l.includes("dark")) {
                reply = "Dark mode works by toggling a .dark-theme class and swapping CSS variables.";
            } else if (l.includes("contact")) {
                reply = "Your contact page uses a Netlify form. Submissions get stored in your Netlify dashboard.";
            }

            setTimeout(() => {
                addMessage(reply, "bot");

                if (!chatWidget.classList.contains("open")) {
                    setUnread(true);
                }
            }, 300);
        });
    }

});
