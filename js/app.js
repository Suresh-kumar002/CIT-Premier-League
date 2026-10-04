/* =====================================================
   CITPL - MAIN UI ENGINE & SMARTLIB AI CHATBOT INTERACTOR
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    initClockAndStatus();
    initMarqueeControls();
    initChatbot();
    updateUserRoleUI();
});

function initMarqueeControls() {
    const marquee = document.getElementById("marqueeText");
    const icon = document.getElementById("playPauseIcon");
    if (!marquee || !icon) return;

    marquee.style.animationPlayState = "running";
    marqueePaused = false;
    icon.className = "fas fa-pause";
}

// 1. Clock & League Status Indicator
function initClockAndStatus() {
    const statusPill = document.getElementById("globalLibraryStatus");
    if (statusPill) {
        statusPill.innerHTML = `<i class="fas fa-circle me-1 text-success" style="font-size: 8px;"></i> CITPL 2026: Season Active`;
    }
}

// 2. Marquee Ticker Pause / Play
let marqueePaused = false;
function toggleMarquee() {
    const marquee = document.getElementById("marqueeText");
    const icon = document.getElementById("playPauseIcon");
    if (!marquee || !icon) return;

    if (marqueePaused) {
        marquee.style.animationPlayState = "running";
        icon.className = "fas fa-pause";
        marqueePaused = false;
    } else {
        marquee.style.animationPlayState = "paused";
        icon.className = "fas fa-play";
        marqueePaused = true;
    }
}

// 3. Smart AI Chatbot Integration
function initChatbot() {
    const chatBtn = document.getElementById("chatBtn");
    const chatWindow = document.getElementById("chatWindow");
    const chatTooltip = document.getElementById("chatTooltip");

    if (chatBtn && chatWindow) {
        chatBtn.addEventListener("click", function () {
            chatWindow.classList.toggle("active");
            if (chatTooltip) chatTooltip.style.display = "none";
        });
    }
}

function handleEnter(e) {
    if (e.key === "Enter") sendMessage();
}

function sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");
    if (!chatInput || !chatBody) return;

    const query = chatInput.value.trim();
    if (!query) return;

    // Append User Message
    appendChatBubble("user", query);
    chatInput.value = "";

    // Show Loading
    const loadingId = "load-" + Date.now();
    appendChatBubble("bot", "Thinking...", loadingId);

    setTimeout(() => {
        const loadingElem = document.getElementById(loadingId);
        if (loadingElem) loadingElem.remove();

        // Bot Smart Answers
        const reply = generateAIResponse(query);
        appendChatBubble("bot", reply);
    }, 600);
}

function appendChatBubble(sender, text, id = null) {
    const chatBody = document.getElementById("chatBody");
    if (!chatBody) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `msg msg-${sender}`;
    msgDiv.innerText = text;
    if (id) msgDiv.id = id;

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function generateAIResponse(q) {
    const lower = q.toLowerCase();
    if (lower.includes("live") || lower.includes("score")) {
        return "🔴 Live Score: CIT Warriors (87/4, 9.2 ov) vs Tech Titans (120/6). Target: 121 runs. Need 34 runs from 4.4 overs!";
    } else if (lower.includes("auction") || lower.includes("bid")) {
        return "🔨 Current Lot #14 is Live! Karan Patel (All-Rounder) is on the table. Highest Bid: ₹1,600 by Cyber Strikers.";
    } else if (lower.includes("register") || lower.includes("fee")) {
        return "📝 Player Registration is ₹50. Fill your college details, upload ₹50 payment transaction ID, and get verified by Admin!";
    } else if (lower.includes("captain") || lower.includes("team")) {
        return "🏏 4 Teams in CITPL 2026: CIT Warriors, Tech Titans, Cyber Strikers, and Royals Abu Road. Starting purse is ₹10,000 per team.";
    } else if (lower.includes("points") || lower.includes("table")) {
        return "📊 CIT Warriors currently leads the points table with 6 Points (NRR +1.25). Tech Titans is 2nd with 4 Points!";
    } else {
        return "Welcome to CIT Premier League AI Assistant! You can ask me about Live Scores, Auction Bids, Player Registrations, Fixtures, or Points Table.";
    }
}

// Role Switcher UI Updater
function updateUserRoleUI() {
    if (!window.citplDB || typeof window.citplDB.getCurrentUser !== "function") return;

    const currentUser = window.citplDB.getCurrentUser();
    const roleBadge = document.getElementById("currentUserRoleBadge");
    if (roleBadge) {
        if (!currentUser) {
            roleBadge.innerText = "Guest User";
            return;
        }
        roleBadge.innerText = `${currentUser.name} (${currentUser.role})`;
    }
}

function switchUserRole(role) {
    const userMap = {
        SUPER_ADMIN: { id: "u_admin", name: "Super Admin", email: "admin@cit.ac.in", role: "SUPER_ADMIN" },
        AUCTION_ADMIN: { id: "u_auction", name: "Auction Manager", email: "auction@cit.ac.in", role: "AUCTION_ADMIN" },
        CAPTAIN: { id: "u_cap_warriors", name: "Rahul Sharma (Capt)", email: "warriors@cit.ac.in", role: "CAPTAIN", teamId: "t1" },
        SCOREKEEPER: { id: "u_scorekeeper", name: "Scorekeeper Official", email: "scorer@cit.ac.in", role: "SCOREKEEPER" },
        PLAYER: { id: "u_player1", name: "Amit Kumar", email: "amit@cit.ac.in", role: "PLAYER" }
    };

    if (userMap[role]) {
        window.citplDB.setCurrentUser(userMap[role]);
        alert(`Switched role to: ${userMap[role].name} (${userMap[role].role})`);
        location.reload();
    }
}
