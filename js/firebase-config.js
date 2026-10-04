/* =====================================================
   CITPL - FIREBASE DATA ENGINE & CRICBUZZ STYLE LIVE SCORE SYSTEM
   Admin Assignment Engine & Realtime Ball-by-Ball Storage
   Admin: sureshcitabu@gmail.com / jugnu@123
   ===================================================== */

(function () {
const defaultInitialData = {
    season: {
        id: "season_2026",
        name: "CIT Premier League 2026",
        year: 2026,
        status: "AUCTION",
        registrationFee: 50,
        startingPurse: 10000,
        maxSquadSize: 15,
        defaultOvers: 10
    },

    settings: {
        leagueName: "CIT Premier League 2026",
        registrationFee: 50,
        teamPurse: 10000,
        maxSquadSize: 15,
        minSquadSize: 11,
        defaultOvers: 10,
        auctionTimerSeconds: 15,
        defaultBidIncrement: 100,
        timerExtensionSeconds: 10,
        allowPlayerSelfRegistration: true
    },

    notifications: [
        {
            id: "n1",
            title: "Auction Live",
            message: "Live bidding is now active for category A players.",
            type: "INFO",
            createdAt: new Date().toISOString()
        },
        {
            id: "n2",
            title: "Season Update",
            message: "Admin has approved the current league configuration.",
            type: "SUCCESS",
            createdAt: new Date().toISOString()
        }
    ],

    auditLogs: [
        {
            id: "a1",
            action: "SEASON_INITIALIZED",
            actor: "system",
            detail: "CITPL 2026 platform initialized with league settings.",
            timestamp: new Date().toISOString()
        }
    ],

    users: [
        { 
            id: "u_admin", 
            name: "Suresh Sir (League Admin)", 
            email: "sureshcitabu@gmail.com", 
            password: "jugnu@123", 
            role: "ADMIN" 
        },
        { 
            id: "u_owner_warriors", 
            name: "Rahul Sharma (CIT Warriors Owner)", 
            email: "warriors@cit.ac.in", 
            password: "owner@123", 
            role: "TEAM_OWNER", 
            teamId: "t1" 
        },
        { 
            id: "u_owner_titans", 
            name: "Vikram Singh (Tech Titans Owner)", 
            email: "titans@cit.ac.in", 
            password: "owner@123", 
            role: "TEAM_OWNER", 
            teamId: "t2" 
        },
        { 
            id: "u_owner_strikers", 
            name: "Karan Patel (Cyber Strikers Owner)", 
            email: "strikers@cit.ac.in", 
            password: "owner@123", 
            role: "TEAM_OWNER", 
            teamId: "t3" 
        },
        { 
            id: "u_owner_royals", 
            name: "Suresh Meena (Royals Abu Road Owner)", 
            email: "royals@cit.ac.in", 
            password: "owner@123", 
            role: "TEAM_OWNER", 
            teamId: "t4" 
        },
        { 
            id: "u_scorekeeper", 
            name: "Official Scorekeeper (Assigned by Admin)", 
            email: "scorer@cit.ac.in", 
            password: "score@123", 
            role: "SCOREKEEPER" 
        }
    ],

    teams: [
        { 
            id: "t1", 
            name: "CIT Warriors", 
            shortName: "WAR", 
            ownerName: "Rahul Sharma", 
            ownerEmail: "warriors@cit.ac.in",
            startingPurse: 10000, 
            remainingPurse: 6400, 
            totalSpent: 3600, 
            squadCount: 8, 
            points: 6, 
            wins: 3, 
            losses: 1, 
            nrr: "+1.25" 
        },
        { 
            id: "t2", 
            name: "Tech Titans", 
            shortName: "TTN", 
            ownerName: "Vikram Singh", 
            ownerEmail: "titans@cit.ac.in",
            startingPurse: 10000, 
            remainingPurse: 7100, 
            totalSpent: 2900, 
            squadCount: 7, 
            points: 4, 
            wins: 2, 
            losses: 2, 
            nrr: "+0.45" 
        },
        { 
            id: "t3", 
            name: "Cyber Strikers", 
            shortName: "STR", 
            ownerName: "Karan Patel", 
            ownerEmail: "strikers@cit.ac.in",
            startingPurse: 10000, 
            remainingPurse: 5500, 
            totalSpent: 4500, 
            squadCount: 9, 
            points: 4, 
            wins: 2, 
            losses: 2, 
            nrr: "-0.15" 
        },
        { 
            id: "t4", 
            name: "Royals Abu Road", 
            shortName: "RAR", 
            ownerName: "Suresh Meena", 
            ownerEmail: "royals@cit.ac.in",
            startingPurse: 10000, 
            remainingPurse: 8000, 
            totalSpent: 2000, 
            squadCount: 6, 
            points: 2, 
            wins: 1, 
            losses: 3, 
            nrr: "-1.50" 
        }
    ],

    matches: [
        {
            id: "match_105",
            matchNumber: 5,
            teamAId: "t1",
            teamBId: "t2",
            assignedScorekeeper: "scorer@cit.ac.in",
            isLockedByAdmin: false,
            status: "LIVE",
            venue: "CIT Main Sports Ground",
            scheduledTime: "Today, 4:30 PM",
            oversLimit: 10
        }
    ],

    players: [
        { id: "p101", name: "Rahul Sharma", role: "ALL_ROUNDER", category: "Category A", teamId: "t1", auctionPrice: 1200, runs: 142, wickets: 6, matches: 4, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", branch: "CSE", sem: "6th", status: "APPROVED", registrationId: "REG2026-001", paymentVerified: true },
        { id: "p102", name: "Amit Kumar", role: "BOWLER", category: "Category C", teamId: "t1", auctionPrice: 800, runs: 35, wickets: 9, matches: 4, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80", branch: "ECE", sem: "4th", status: "APPROVED", registrationId: "REG2026-002", paymentVerified: true },
        { id: "p103", name: "Vikram Singh", role: "BATTER", category: "Category A", teamId: "t2", auctionPrice: 1500, runs: 189, wickets: 1, matches: 4, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", branch: "MECH", sem: "8th", status: "APPROVED", registrationId: "REG2026-003", paymentVerified: true },
        { id: "p104", name: "Devendra Verma", role: "WICKET_KEEPER", category: "Category B", teamId: "t2", auctionPrice: 700, runs: 98, wickets: 0, matches: 4, photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80", branch: "CIVIL", sem: "6th", status: "APPROVED", registrationId: "REG2026-004", paymentVerified: true },
        { id: "p105", name: "Karan Patel", role: "ALL_ROUNDER", category: "Category A", teamId: null, auctionPrice: 0, runs: 165, wickets: 7, matches: 4, photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80", branch: "CSE", sem: "8th", status: "APPROVED", registrationId: "REG2026-005", paymentVerified: true },
        { id: "p106", name: "Pooja Chaudhary", role: "BATTER", category: "Category B", teamId: "t3", auctionPrice: 600, runs: 88, wickets: 2, matches: 3, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80", branch: "EE", sem: "4th", status: "APPROVED", registrationId: "REG2026-006", paymentVerified: true },
        { id: "p107", name: "Suresh Meena", role: "BOWLER", category: "Category C", teamId: "t4", auctionPrice: 500, runs: 24, wickets: 8, matches: 4, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", branch: "AI&DS", sem: "4th", status: "APPROVED", registrationId: "REG2026-007", paymentVerified: true },
        { id: "p108", name: "Manish Solanki", role: "ALL_ROUNDER", category: "Category A", teamId: null, auctionPrice: 0, runs: 0, wickets: 0, matches: 0, photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80", branch: "CSE", sem: "2nd", status: "PENDING", registrationId: "REG2026-008", paymentVerified: false }
    ],

    pendingTransfers: [],

    auctionState: {
        status: "LIVE",
        currentLot: 14,
        currentPlayerId: "p105",
        currentBid: 500,
        highestTeamId: null,
        lastBidTeamId: null,
        lastBidTeamName: "Auction House",
        lastBidAmount: 500,
        lastBidTime: null,
        bidIncrement: 100,
        bidDeadline: null,
        workflowVersion: 2,
        timerSeconds: 15,
        bidsHistory: []
    },

    // CRICBUZZ / GOOGLE CRICKET LIVE SCORECARD DATA STRUCTURE
    liveMatch: {
        id: "match_105",
        matchNumber: 5,
        teamA: { id: "t1", name: "CIT Warriors", runs: 87, wickets: 4, overs: 9.2 },
        teamB: { id: "t2", name: "Tech Titans", runs: 120, wickets: 6, overs: 10.0 },
        currentInnings: 2,
        target: 121,
        status: "LIVE",
        assignedScorekeeper: "scorer@cit.ac.in",
        isLockedByAdmin: false,

        striker: { id: "p101", name: "Rahul Sharma", runs: 42, balls: 24, fours: 4, sixes: 2 },
        nonStriker: { id: "p102", name: "Amit Kumar", runs: 18, balls: 11, fours: 2, sixes: 0 },
        bowler: { id: "p103", name: "Vikram Singh", overs: 2.2, maidens: 0, runsConceded: 18, wickets: 2, economy: 7.71 },

        // FULL CRICBUZZ SCORECARD DATA
        innings1Scorecard: {
            teamName: "Tech Titans",
            total: "120/6 (10.0 Ov)",
            batting: [
                { name: "Vikram Singh (c)", status: "c Rahul b Amit", runs: 48, balls: 26, fours: 5, sixes: 3, sr: "184.62" },
                { name: "Devendra Verma (wk)", status: "b Amit", runs: 32, balls: 18, fours: 4, sixes: 1, sr: "177.78" },
                { name: "Manish Kumar", status: "run out (Rahul)", runs: 18, balls: 10, fours: 2, sixes: 0, sr: "180.00" },
                { name: "Suresh Meena", status: "not out", runs: 14, balls: 6, fours: 1, sixes: 1, sr: "233.33" }
            ],
            bowling: [
                { name: "Amit Kumar", overs: "2.0", maidens: 0, runs: 22, wickets: 2, econ: "11.00" },
                { name: "Rahul Sharma", overs: "2.0", maidens: 0, runs: 18, wickets: 1, econ: "9.00" }
            ],
            extras: "8 (b 1, lb 2, w 4, nb 1)",
            fow: "34-1 (Devendra, 3.2 ov), 89-2 (Vikram, 7.4 ov)"
        },

        lastOverBalls: ["1", "4", "W", "2", "6", "1wd"],
        recentBalls: [
            { over: "9.2", type: "FOUR", event: "FOUR! Vikram to Rahul, boundary over extra cover!", bowler: "Vikram", striker: "Rahul" },
            { over: "9.1", type: "SINGLE", event: "1 run, Vikram to Rahul, flicked away to deep midwicket.", bowler: "Vikram", striker: "Rahul" },
            { over: "8.6", type: "WICKET", event: "OUT! Amit to Karan, Bowled him! Cleaned up the middle stump!", bowler: "Amit", striker: "Karan" }
        ]
    }
};

class CITPLFirebaseEngine {
    constructor() {
        this.storageKey = "CITPL_DATABASE_STORE_2026";
        this.listeners = [];
        window.addEventListener("storage", event => {
            if (event.key !== this.storageKey || !event.newValue) return;
            try {
                this.db = JSON.parse(event.newValue);
                this.notifyListeners();
            } catch (error) {
                console.error("Unable to sync auction data from another tab.", error);
            }
        });
        this.initData();
    }

    initData() {
        const stored = localStorage.getItem(this.storageKey);
        if (!stored) {
            this.db = defaultInitialData;
            this.save();
        } else {
            try {
                this.db = JSON.parse(stored);
            } catch (e) {
                this.db = defaultInitialData;
                this.save();
            }
        }
        this.db.settings = { ...defaultInitialData.settings, ...(this.db.settings || {}) };
        this.db.auctionState = { ...defaultInitialData.auctionState, ...(this.db.auctionState || {}) };
        if (!this.db.auctionState.bidDeadline && this.db.auctionState.status === "LIVE") {
            this.db.auctionState.bidDeadline = Date.now() + (this.db.auctionState.timerSeconds || this.db.settings.auctionTimerSeconds) * 1000;
        }
        this.syncAdminCredentials();
    }

    syncAdminCredentials() {
        if (!this.db.users) this.db.users = [];
        let adminUser = this.db.users.find(u => u.email.toLowerCase() === "sureshcitabu@gmail.com" || u.role === "ADMIN");
        if (!adminUser) {
            adminUser = {
                id: "u_admin",
                name: "Suresh Sir (League Admin)",
                email: "sureshcitabu@gmail.com",
                password: "jugnu@123",
                role: "ADMIN"
            };
            this.db.users.unshift(adminUser);
        } else {
            adminUser.email = "sureshcitabu@gmail.com";
            adminUser.password = "jugnu@123";
            adminUser.role = "ADMIN";
            adminUser.name = "Suresh Sir (League Admin)";
        }
        this.save();
    }

    normalizeRole(role) {
        const normalized = (role || "").toUpperCase();
        const roleAliasMap = {
            SUPER_ADMIN: "ADMIN",
            AUCTION_ADMIN: "ADMIN",
            CAPTAIN: "TEAM_OWNER",
            PLAYER: "PLAYER",
            PUBLIC: "PUBLIC"
        };
        return roleAliasMap[normalized] || normalized || "PUBLIC";
    }

    isAdminRole(user) {
        const currentUser = user || this.getCurrentUser();
        return !!currentUser && this.normalizeRole(currentUser.role) === "ADMIN";
    }

    save() {
        if (!this.db) this.db = defaultInitialData;
        if (!this.db.settings) this.db.settings = defaultInitialData.settings;
        if (!this.db.notifications) this.db.notifications = defaultInitialData.notifications;
        if (!this.db.auditLogs) this.db.auditLogs = defaultInitialData.auditLogs;
        if (!this.db.pendingTransfers) this.db.pendingTransfers = [];
        localStorage.setItem(this.storageKey, JSON.stringify(this.db));
        this.notifyListeners();
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        if (!this.listeners) this.listeners = [];
        this.listeners.forEach(cb => cb(this.db));
    }

    // AUTH
    login(email, password) {
        const cleanEmail = (email || "").trim().toLowerCase();
        const cleanPass = (password || "").trim();

        if (cleanEmail === "sureshcitabu@gmail.com" && cleanPass === "jugnu@123") {
            const admin = {
                id: "u_admin",
                name: "Suresh Sir (League Admin)",
                email: "sureshcitabu@gmail.com",
                password: "jugnu@123",
                role: "ADMIN"
            };
            this.setCurrentUser(admin);
            return { success: true, user: admin, redirect: "admin.html" };
        }

        const user = this.db.users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass);
        if (user) {
            this.setCurrentUser(user);
            const redirectMap = {
                ADMIN: "admin.html",
                TEAM_OWNER: "auction.html",
                SCOREKEEPER: "scorekeeper.html"
            };
            return { success: true, user, redirect: redirectMap[user.role] || "index.html" };
        }
        return { success: false, message: "Invalid email or password!" };
    }

    getCurrentUser() {
        let storedUser = sessionStorage.getItem("CITPL_CURRENT_USER");
        if (!storedUser) {
            storedUser = localStorage.getItem("CITPL_CURRENT_USER");
            if (storedUser) {
                sessionStorage.setItem("CITPL_CURRENT_USER", storedUser);
                localStorage.removeItem("CITPL_CURRENT_USER");
            }
        }
        if (!storedUser) return null;

        try {
            const parsed = JSON.parse(storedUser);
            return parsed && parsed.email ? parsed : null;
        } catch (error) {
            sessionStorage.removeItem("CITPL_CURRENT_USER");
            return null;
        }
    }

    setCurrentUser(user) {
        if (!user) {
            sessionStorage.removeItem("CITPL_CURRENT_USER");
            localStorage.removeItem("CITPL_CURRENT_USER");
            this.notifyListeners();
            return;
        }
        sessionStorage.setItem("CITPL_CURRENT_USER", JSON.stringify(user));
        localStorage.removeItem("CITPL_CURRENT_USER");
        this.notifyListeners();
    }

    // ADMIN EXCLUSIVE SCOREKEEPER PERMISSION ASSIGNMENT
    assignScorekeeperToMatch(matchId, scorekeeperEmail) {
        const currentUser = this.getCurrentUser();
        if (!this.isAdminRole(currentUser)) {
            return { success: false, message: "Only Admin/Super Admin can assign scorekeepers!" };
        }
        this.db.liveMatch.assignedScorekeeper = scorekeeperEmail;
        this.db.auditLogs = this.db.auditLogs || [];
        this.db.auditLogs.unshift({
            id: `a${Date.now()}`,
            action: "SCOREKEEPER_ASSIGNED",
            actor: currentUser.email,
            detail: `Assigned scorekeeper ${scorekeeperEmail} to match ${matchId}`,
            timestamp: new Date().toISOString()
        });
        this.save();
        return { success: true, message: `Scorekeeper permission granted to ${scorekeeperEmail}!` };
    }

    toggleMatchLockByAdmin(matchId, isLocked) {
        const currentUser = this.getCurrentUser();
        if (!this.isAdminRole(currentUser)) {
            return { success: false, message: "Only Admin can lock/unlock match scoring!" };
        }
        this.db.liveMatch.isLockedByAdmin = isLocked;
        this.db.auditLogs = this.db.auditLogs || [];
        this.db.auditLogs.unshift({
            id: `a${Date.now()}`,
            action: "MATCH_LOCK_TOGGLED",
            actor: currentUser.email,
            detail: `Match ${matchId} ${isLocked ? 'locked' : 'unlocked'} by admin`,
            timestamp: new Date().toISOString()
        });
        this.save();
        return { success: true, message: `Match scoring ${isLocked ? 'LOCKED' : 'UNLOCKED'} by Admin!` };
    }

    // AUTHORIZATION CHECK FOR SCOREKEEPER
    canUserUpdateScore() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            return { allowed: false, reason: "Please log in first to access scoring." };
        }
        if (this.isAdminRole(currentUser)) return { allowed: true };
        if (this.db.liveMatch.isLockedByAdmin) return { allowed: false, reason: "Match scoring is currently LOCKED by Admin!" };
        if (currentUser.email.toLowerCase() === (this.db.liveMatch.assignedScorekeeper || "").toLowerCase()) {
            return { allowed: true };
        }
        return { allowed: false, reason: `You are not assigned as the Official Scorekeeper for this match. Contact Admin sureshcitabu@gmail.com.` };
    }

    // BALL-BY-BALL RECORDING ENGINE (STEP 9 & 11)
    recordBall(run, isExtra = false, extraType = "", isWicket = false, wicketType = "") {
        const auth = this.canUserUpdateScore();
        if (!auth.allowed) {
            return { success: false, message: auth.reason };
        }

        const match = this.db.liveMatch;
        let runsToAdd = run;
        let isLegalBall = true;
        let batRuns = run;
        let extraRuns = 0;

        // Step 11: Implement scoring logic for extras
        if (isExtra) {
            if (extraType === "WD" || extraType === "NB") {
                isLegalBall = false;
                extraRuns = 1; // 1 run for wide/no-ball
                runsToAdd += 1;
                if(extraType === "WD") { batRuns = 0; extraRuns += run; } // additional wide runs
                if(extraType === "NB") { batRuns = run; } // NB additional runs are bat runs
            }
            if (extraType === "BYE" || extraType === "LB") {
                batRuns = 0;
                extraRuns = run;
            }
        }

        // Calculate overs (Overs logic)
        let currentOversStr = match.teamA.overs.toString();
        let oversInt = Math.floor(match.teamA.overs);
        let ballsInOver = Math.round((match.teamA.overs - oversInt) * 10);
        
        if (isLegalBall) {
            ballsInOver += 1;
            if (ballsInOver >= 6) {
                oversInt += 1;
                ballsInOver = 0;
            }
            match.teamA.overs = oversInt + (ballsInOver / 10);
        }

        // Update Team Score
        match.teamA.runs += runsToAdd;
        if (isWicket) match.teamA.wickets += 1;

        // Update Batsman
        match.striker.runs += batRuns;
        if (isLegalBall || extraType === "NB") {
            match.striker.balls += 1; // NB counts as ball faced
        }
        if (batRuns === 4) match.striker.fours += 1;
        if (batRuns === 6) match.striker.sixes += 1;

        // Update Bowler
        if (isLegalBall) {
            let bowBalls = Math.round((match.bowler.overs - Math.floor(match.bowler.overs)) * 10) + 1;
            let bowOvers = Math.floor(match.bowler.overs);
            if (bowBalls >= 6) { bowOvers += 1; bowBalls = 0; }
            match.bowler.overs = bowOvers + (bowBalls / 10);
        }
        match.bowler.runsConceded += runsToAdd;
        if (isWicket && !["Run Out", "Retired Hurt", "Obstructing the Field"].includes(wicketType)) {
            match.bowler.wickets += 1;
        }

        // Strike rotation logic
        let shouldRotate = false;
        if (run % 2 !== 0) shouldRotate = true; // 1, 3, 5 runs rotate strike
        if (isLegalBall && ballsInOver === 0) shouldRotate = !shouldRotate; // Over change rotates strike

        if (shouldRotate) {
            let temp = match.striker;
            match.striker = match.nonStriker;
            match.nonStriker = temp;
        }

        // Add to history
        const eventType = isWicket ? "WICKET" : batRuns === 6 ? "SIX" : batRuns === 4 ? "FOUR" : isExtra ? extraType : "RUNS";
        const eventText = isWicket ? `OUT! ${wicketType}` : batRuns === 6 ? `SIX!` : batRuns === 4 ? `FOUR!` : `${runsToAdd} run(s)`;

        match.recentBalls.unshift({
            over: match.teamA.overs.toFixed(1),
            type: eventType,
            event: `${eventText}`,
            bowler: match.bowler.name,
            striker: match.striker.name
        });
        if(match.recentBalls.length > 20) match.recentBalls.pop();

        // Push to delivery history for undo support
        if(!match.history) match.history = [];
        match.history.push(JSON.parse(JSON.stringify(match)));

        this.save();
        return { success: true, message: "Ball recorded successfully." };
    }

    // TEAMS & AUCTION
    createTeamByAdmin(teamName, shortName, ownerName, ownerEmail, ownerPassword, startingPurse = 10000) {
        const currentUser = this.getCurrentUser();
        if (!this.isAdminRole(currentUser)) {
            return { success: false, message: "Only Admin/Super Admin can create teams!" };
        }

        const teamId = "t" + (this.db.teams.length + 1);
        const userId = "u_owner_" + Date.now();

        const newTeam = {
            id: teamId,
            name: teamName,
            shortName: shortName.toUpperCase(),
            ownerName: ownerName,
            ownerEmail: ownerEmail,
            startingPurse: parseInt(startingPurse),
            remainingPurse: parseInt(startingPurse),
            totalSpent: 0,
            squadCount: 0,
            points: 0,
            wins: 0,
            losses: 0,
            nrr: "0.00"
        };

        const newOwner = {
            id: userId,
            name: `${ownerName} (${teamName} Owner)`,
            email: ownerEmail,
            password: ownerPassword || "owner@123",
            role: "TEAM_OWNER",
            teamId: teamId
        };

        this.db.teams.push(newTeam);
        this.db.users.push(newOwner);
        this.save();
        return { success: true, message: `Team ${teamName} and Owner Account created!` };
    }

    getNextAuctionPlayer() {
        const nextPlayer = this.db.players.find(p => p.teamId === null && p.status === "APPROVED");
        return nextPlayer || null;
    }

    recordAuctionAction(action, detail, teamId = null, amount = null) {
        if (!this.db.auditLogs) this.db.auditLogs = [];
        const user = this.getCurrentUser();
        this.db.auditLogs.unshift({
            id: `auction_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            action,
            actor: user ? user.email : "system",
            detail,
            teamId,
            amount,
            timestamp: new Date().toISOString()
        });
    }

    getAuctionRemainingSeconds() {
        const state = this.db.auctionState;
        if (["SOLD", "UNSOLD", "AUCTION_COMPLETE"].includes(state.status)) return 0;
        if (!state.bidDeadline) return Math.max(0, Number(state.timerSeconds || 0));
        return Math.max(0, Math.ceil((state.bidDeadline - Date.now()) / 1000));
    }

    getNextAuctionBid() {
        const state = this.db.auctionState;
        return state.highestTeamId ? state.currentBid + state.bidIncrement : state.currentBid;
    }

    advanceAuctionToNextPlayer() {
        if (!this.isAdminRole()) return { success: false, message: "Only the league admin can advance the auction." };
        const nextPlayer = this.getNextAuctionPlayer();
        const state = this.db.auctionState;

        if (["LIVE", "GOING_ONCE", "GOING_TWICE", "PAUSED"].includes(state.status) && state.currentPlayerId) {
            return { success: false, message: "Mark this player SOLD or UNSOLD before moving to the next lot." };
        }

        state.status = nextPlayer ? "LIVE" : "AUCTION_COMPLETE";
        state.currentPlayerId = nextPlayer ? nextPlayer.id : null;
        state.currentLot = nextPlayer ? (Number(state.currentLot || 0) + 1) : state.currentLot;
        state.currentBid = nextPlayer ? Number(nextPlayer.basePrice || 500) : 0;
        state.highestTeamId = null;
        state.lastBidTeamId = null;
        state.lastBidTeamName = "Auction House";
        state.lastBidAmount = state.currentBid;
        state.lastBidTime = null;
        state.bidIncrement = Number((nextPlayer && nextPlayer.bidIncrement) || this.db.settings.defaultBidIncrement || 100);
        state.timerSeconds = Number(this.db.settings.auctionTimerSeconds || 15);
        state.bidDeadline = nextPlayer ? Date.now() + state.timerSeconds * 1000 : null;
        state.bidsHistory = [];
        this.recordAuctionAction("PLAYER_STARTED", nextPlayer ? `Lot ${state.currentLot}: ${nextPlayer.name} brought on stage.` : "Auction completed.");

        this.save();
        return { success: true, message: nextPlayer ? `Next lot: ${nextPlayer.name}` : "Auction complete." };
    }

    placeBid(amount) {
        const sessionUser = this.getCurrentUser();
        const user = sessionUser && this.db.users.find(u => u.email.toLowerCase() === sessionUser.email.toLowerCase());
        if (!user || user.role !== "TEAM_OWNER" || user.teamId !== sessionUser.teamId) {
            return { success: false, message: "Only an authenticated team owner can place a bid." };
        }

        const state = this.db.auctionState;
        const player = this.db.players.find(p => p.id === state.currentPlayerId);
        const team = this.db.teams.find(t => t.id === user.teamId);
        if (!team) return { success: false, message: "Your team account is not linked to a valid team." };
        if (!["LIVE", "GOING_ONCE", "GOING_TWICE"].includes(state.status) || !player || player.teamId) return { success: false, message: "There is no active player accepting bids." };
        if (this.getAuctionRemainingSeconds() <= 0) return { success: false, message: "Bidding time has expired. Please wait for the auctioneer." };
        if (state.highestTeamId === team.id) return { success: false, message: "Your team is already the highest bidder." };
        if (Number(amount) !== this.getNextAuctionBid()) return { success: false, message: `Bid changed. The next valid bid is ₹${this.getNextAuctionBid()}.` };
        if (team.squadCount >= this.db.settings.maxSquadSize) return { success: false, message: "Your squad is full." };
        if (team.remainingPurse < Number(amount)) return { success: false, message: `Insufficient purse. Remaining: ₹${team.remainingPurse}.` };

        const now = Date.now();
        state.currentBid = Number(amount);
        state.highestTeamId = team.id;
        state.lastBidTeamId = team.id;
        state.lastBidTeamName = team.name;
        state.lastBidAmount = Number(amount);
        state.lastBidTime = new Date(now).toLocaleTimeString();
        const normalTimer = Number(this.db.settings.auctionTimerSeconds || 15);
        const extension = Number(this.db.settings.timerExtensionSeconds || normalTimer);
        state.timerSeconds = this.getAuctionRemainingSeconds() <= 5 ? extension : normalTimer;
        state.bidDeadline = now + state.timerSeconds * 1000;
        state.status = "LIVE";
        state.bidsHistory.push({
            id: `bid_${now}_${Math.random().toString(36).slice(2, 7)}`,
            teamId: team.id,
            teamName: team.name,
            userId: user.id,
            playerId: player.id,
            amount: Number(amount),
            sequence: state.bidsHistory.length + 1,
            time: new Date(now).toLocaleTimeString(),
            timestamp: new Date(now).toISOString()
        });
        this.recordAuctionAction("BID_ACCEPTED", `${team.name} bid ₹${amount} for ${player.name}.`, team.id, Number(amount));
        this.save();
        return { success: true, message: `Bid of ₹${amount} placed by ${team.name}` };
    }

    markPlayerSold(playerId, teamId, finalPrice) {
        if (!this.isAdminRole()) return { success: false, message: "Only the league admin can confirm a sale." };
        const state = this.db.auctionState;
        const player = this.db.players.find(p => p.id === playerId);
        const team = this.db.teams.find(t => t.id === teamId);
        if (!["LIVE", "GOING_ONCE", "GOING_TWICE"].includes(state.status) || state.currentPlayerId !== playerId || !player || player.teamId) {
            return { success: false, message: "This player is not on the active lot." };
        }
        if (!team || state.highestTeamId !== teamId || Number(finalPrice) !== Number(state.currentBid)) {
            return { success: false, message: "Sale must match the current highest team and bid." };
        }
        if (team.remainingPurse < finalPrice || team.squadCount >= this.db.settings.maxSquadSize) {
            return { success: false, message: "Winning team no longer meets purse or squad requirements." };
        }

        if (player && team) {
            player.teamId = teamId;
            player.auctionPrice = Number(finalPrice);
            player.status = "SOLD";
            player.soldAt = new Date().toISOString();
            team.remainingPurse -= Number(finalPrice);
            team.totalSpent = Number(team.totalSpent || 0) + Number(finalPrice);
            team.squadCount = Number(team.squadCount || 0) + 1;

            const message = `${player.name} sold to ${team.name} for ₹${finalPrice}.`;
            state.status = "SOLD";
            state.currentBid = Number(finalPrice);
            state.bidDeadline = null;
            state.timerSeconds = 0;
            this.recordAuctionAction("PLAYER_SOLD", message, teamId, Number(finalPrice));

            this.save();
            return { success: true, message };
        }
        return { success: false, message: "Player or team not found for sale." };
    }

    markPlayerUnsold() {
        if (!this.isAdminRole()) return { success: false, message: "Only the league admin can mark a player unsold." };
        const state = this.db.auctionState;
        const player = this.db.players.find(p => p.id === state.currentPlayerId);
        if (!["LIVE", "GOING_ONCE", "GOING_TWICE"].includes(state.status) || !player || player.teamId) {
            return { success: false, message: "There is no active player to mark unsold." };
        }
        player.status = "UNSOLD";
        state.status = "UNSOLD";
        state.bidDeadline = null;
        state.timerSeconds = 0;
        this.recordAuctionAction("PLAYER_UNSOLD", `${player.name} marked unsold.`, state.highestTeamId, state.currentBid);
        state.highestTeamId = null;

        this.save();
        return { success: true, message: "Lot declared unsold." };
    }

    setAuctionStatus(status) {
        if (!this.isAdminRole()) return { success: false, message: "Only the league admin can control the auction." };
        const state = this.db.auctionState;
        const allowed = { LIVE: ["PAUSED", "GOING_ONCE", "GOING_TWICE"], PAUSED: ["LIVE"], GOING_ONCE: ["LIVE", "GOING_TWICE"], GOING_TWICE: ["LIVE"] };
        if (!allowed[state.status] || !allowed[state.status].includes(status)) {
            return { success: false, message: `Cannot change auction from ${state.status} to ${status}.` };
        }
        if (status === "PAUSED") {
            state.timerSeconds = this.getAuctionRemainingSeconds();
            state.bidDeadline = null;
        } else if (state.status === "PAUSED" && status === "LIVE") {
            state.bidDeadline = Date.now() + Number(state.timerSeconds || this.db.settings.auctionTimerSeconds) * 1000;
        }
        state.status = status;
        this.recordAuctionAction(`AUCTION_${status}`, `Auction status changed to ${status}.`);
        this.save();
        return { success: true, message: `Auction ${status.toLowerCase().replaceAll("_", " ")}.` };
    }

    deleteTeamByAdmin(teamId) {
        const currentUser = this.getCurrentUser();
        if (!this.isAdminRole(currentUser)) {
            return { success: false, message: "Only Admin can delete teams!" };
        }

        const teamIndex = this.db.teams.findIndex(t => t.id === teamId);
        if (teamIndex === -1) {
            return { success: false, message: "Team not found." };
        }

        const team = this.db.teams[teamIndex];
        this.db.teams.splice(teamIndex, 1);
        this.db.users = this.db.users.filter(u => u.teamId !== teamId && u.email.toLowerCase() !== (team.ownerEmail || "").toLowerCase());
        this.db.players = this.db.players.map(p => p.teamId === teamId ? { ...p, teamId: null, auctionPrice: 0 } : p);
        this.save();
        return { success: true, message: `Team ${team.name} and its owner data were removed.` };
    }

    registerPlayer(playerData) {
        const newId = "p" + (Date.now() % 10000);
        const newRegId = "REG2026-" + Math.floor(100 + Math.random() * 900);
        const player = {
            id: newId,
            registrationId: newRegId,
            name: playerData.name,
            role: playerData.role,
            category: playerData.category || "Category D",
            branch: playerData.branch,
            sem: playerData.sem,
            mobile: playerData.mobile,
            email: playerData.email,
            photo: playerData.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
            status: "PENDING",
            paymentVerified: false,
            transactionId: playerData.transactionId || "TXN" + Math.floor(Math.random() * 1000000),
            teamId: null,
            auctionPrice: 0,
            runs: 0,
            wickets: 0,
            matches: 0
        };
        this.db.players.push(player);
        this.save();
        return player;
    }

    approvePlayer(id) {
        const p = this.db.players.find(x => x.id === id);
        if (p) {
            p.status = "APPROVED";
            p.paymentVerified = true;
            this.save();
            return { success: true, message: `${p.name} approved successfully.` };
        }
        return { success: false, message: "Player not found." };
    }

    rejectPlayer(id) {
        const p = this.db.players.find(x => x.id === id);
        if (p) {
            p.status = "REJECTED";
            p.paymentVerified = false;
            this.save();
            return { success: true, message: `${p.name} rejected.` };
        }
        return { success: false, message: "Player not found." };
    }

    // PLAYER TRANSFER / BYE REQUEST (Team Owner requests, Admin approves)
    requestPlayerTransfer(playerId, toTeamId, fee = 0) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: "Not logged in." };
        const player = this.db.players.find(p => p.id === playerId);
        const fromTeam = player ? this.db.teams.find(t => t.id === player.teamId) : null;
        const toTeam = this.db.teams.find(t => t.id === toTeamId);
        if (!player || !fromTeam || !toTeam) return { success: false, message: "Invalid player or team." };
        if (!this.db.pendingTransfers) this.db.pendingTransfers = [];
        const transfer = {
            id: `tr_${Date.now()}`,
            playerId,
            fromTeamId: fromTeam.id,
            toTeamId,
            fee: Number(fee),
            requestedBy: currentUser.email,
            requestedAt: new Date().toISOString(),
            status: "PENDING"
        };
        this.db.pendingTransfers.push(transfer);
        this.recordAuctionAction("TRANSFER_REQUESTED", `${player.name} transfer from ${fromTeam.name} to ${toTeam.name} requested.`);
        this.save();
        return { success: true, message: `Transfer request submitted. Awaiting admin approval.` };
    }

    approvePlayerTransfer(transferId) {
        if (!this.isAdminRole()) return { success: false, message: "Only admin can approve transfers." };
        if (!this.db.pendingTransfers) this.db.pendingTransfers = [];
        const tr = this.db.pendingTransfers.find(t => t.id === transferId);
        if (!tr) return { success: false, message: "Transfer request not found." };
        const player = this.db.players.find(p => p.id === tr.playerId);
        const fromTeam = this.db.teams.find(t => t.id === tr.fromTeamId);
        const toTeam = this.db.teams.find(t => t.id === tr.toTeamId);
        if (!player || !fromTeam || !toTeam) return { success: false, message: "Player or team data missing." };
        if (toTeam.remainingPurse < tr.fee) return { success: false, message: `${toTeam.name} does not have sufficient purse for this transfer.` };

        // Execute transfer
        player.teamId = toTeam.id;
        player.auctionPrice = tr.fee || player.auctionPrice;
        fromTeam.squadCount = Math.max(0, (fromTeam.squadCount || 1) - 1);
        fromTeam.remainingPurse = (fromTeam.remainingPurse || 0) + tr.fee;
        fromTeam.totalSpent = Math.max(0, (fromTeam.totalSpent || 0) - tr.fee);
        toTeam.squadCount = (toTeam.squadCount || 0) + 1;
        toTeam.remainingPurse = Math.max(0, (toTeam.remainingPurse || 0) - tr.fee);
        toTeam.totalSpent = (toTeam.totalSpent || 0) + tr.fee;

        // Remove from pending
        this.db.pendingTransfers = this.db.pendingTransfers.filter(t => t.id !== transferId);
        this.recordAuctionAction("TRANSFER_APPROVED", `${player.name} transferred from ${fromTeam.name} to ${toTeam.name} for ₹${tr.fee}.`);
        this.save();
        return { success: true, message: `${player.name} transferred to ${toTeam.name} for ₹${tr.fee}.` };
    }
}

window.citplDB = new CITPLFirebaseEngine();
})();
