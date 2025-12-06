import { initializeApp, deleteApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, limit, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

console.log("Script.js loaded!");

// --- FIREBASE CONFIGURATION ---
// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0OaZk65LzGnZG3WPN1SmiI8XzB1xkmag",
    authDomain: "brandify-digital.firebaseapp.com",
    projectId: "brandify-digital",
    storageBucket: "brandify-digital.firebasestorage.app",
    messagingSenderId: "80977859472",
    appId: "1:80977859472:web:88a05035249c96df605915",
    measurementId: "G-8YES8L8T3E"
};

// Initialize Firebase
let db, auth, storage;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase initialized");
} catch (error) {
    console.error("Firebase initialization failed. Make sure to update firebaseConfig.", error);
    showToast("Firebase not configured! Please update script.js with your Firebase keys.", "error");
}

// --- DATA SEEDING (Run once to populate DB) ---
const INITIAL_DATA = {
    users: [
        {
            email: 'admin@kondamaal.com',
            role: 'owner',
            name: 'Admin User',
            position: 'CEO',
            department: 'Executive',
            salary: 120000,
            contactInfo: { phone: '555-0101', address: '123 Admin St', bankDetails: 'BankA-123' },
            createdAt: Date.now()
        },
        {
            email: 'manager@kondamaal.com',
            role: 'manager',
            name: 'Sarah Manager',
            position: 'Project Manager',
            department: 'Operations',
            salary: 85000,
            contactInfo: { phone: '555-0102', address: '456 Manager Ln', bankDetails: 'BankB-456' },
            createdAt: Date.now()
        },
        {
            email: 'emp@kondamaal.com',
            role: 'employee',
            name: 'John Employee',
            position: 'Developer',
            department: 'Engineering',
            salary: 65000,
            contactInfo: { phone: '555-0103', address: '789 Dev Rd', bankDetails: 'BankC-789' },
            createdAt: Date.now()
        },
        {
            email: 'client@kondamaal.com',
            role: 'client',
            name: 'Alpha Corp',
            position: 'Client POC',
            department: 'External',
            salary: 0,
            contactInfo: { phone: '555-0104', address: '101 Client Blvd', bankDetails: 'N/A' },
            createdAt: Date.now()
        }
    ],
    projects: [
        {
            name: "Alpha Automation",
            clientId: "client@kondamaal.com", // In real app, use UID
            managerId: "manager@kondamaal.com",
            status: "Active",
            startDate: "2025-01-01",
            endDate: "2025-06-30",
            details: "Full marketing automation setup.",
            createdAt: Date.now()
        }
    ],
    tasks: [
        {
            title: "Setup HubSpot Workflows",
            description: "Configure initial lead nurturing workflows.",
            assignedTo: "John Employee",
            projectId: "Alpha Automation",
            status: "Pending",
            priority: "High",
            deadline: "2025-02-15",
            createdAt: Date.now()
        },
        {
            title: "Review Ad Copy",
            description: "Check compliance for Q1 ad campaign.",
            assignedTo: "John Employee",
            projectId: "Alpha Automation",
            status: "Pending",
            priority: "Medium",
            deadline: "2025-02-20",
            createdAt: Date.now()
        }
    ],
    attendance: [
        { employeeId: "emp@kondamaal.com", name: "John Employee", date: "2025-11-21", status: "Clocked In", remarks: "On time" },
        { employeeId: "manager@kondamaal.com", name: "Sarah Manager", date: "2025-11-21", status: "Clocked In", remarks: "Remote" }
    ],
    employee_requests: [
        { requestType: "Leave", employeeId: "emp@kondamaal.com", managerId: "manager@kondamaal.com", status: "Pending", details: "Sick leave for Friday", createdAt: Date.now() }
    ],
    payslips: [
        { employeeId: "emp@kondamaal.com", month: "October 2025", salary: 5416, bonuses: 200, deductions: 100, netPay: 5516, createdAt: Date.now(), downloadUrl: "#" }
    ],
    invoices: [
        { clientId: "client@kondamaal.com", projectId: "Alpha Automation", amount: 5000, status: "Unpaid", details: "Initial Setup Fee", createdAt: Date.now(), dueDate: "2025-12-01" }
    ],
    messages: [
        { senderId: "manager@kondamaal.com", receiverId: "client@kondamaal.com", message: "Project kickoff was successful.", type: "text", timestamp: Date.now() }
    ],
    careers: [
        {
            title: "Marketing Automation Specialist",
            about: "We are looking for a tech-savvy marketer to lead our automation efforts.",
            responsibilities: "• Design and implement email workflows.\n• Manage CRM integrations.\n• Analyze campaign performance.",
            skills: "• HubSpot/Salesforce\n• Zapier/Make\n• HTML/CSS basics",
            perks: "• Remote work\n• Learning budget\n• Health insurance",
            createdAt: Date.now()
        }
    ]
};

async function seedDatabase() {
    if (!db) return;
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    if (snapshot.empty) {
        console.log("Seeding database with extended model...");

        // Helper to seed collection
        const seed = async (colName, data) => {
            for (const item of data) await addDoc(collection(db, colName), item);
        };

        await seed("users", INITIAL_DATA.users);
        await seed("projects", INITIAL_DATA.projects);
        await seed("tasks", INITIAL_DATA.tasks);
        await seed("attendance", INITIAL_DATA.attendance);
        await seed("employee_requests", INITIAL_DATA.employee_requests);
        await seed("payslips", INITIAL_DATA.payslips);
        await seed("invoices", INITIAL_DATA.invoices);
        await seed("messages", INITIAL_DATA.messages);
        await seed("careers", INITIAL_DATA.careers);

        showToast("Database seeded with new comprehensive model! You can now login.", "success");
    }
}

// --- APP LOGIC ---

const servicesData = [
    {
        category: "1. Assisted Social Media Automation",
        services: [
            {
                title: "Assisted Social Media Automation",
                tagline: "Low-cost, efficient, and scalable social media management.",
                features: [
                    { title: "Content Intake & Approval", desc: "Client submits ideas via Google Form/Notion. n8n routes submissions to team and SME for review. Approved content moves to scheduling." },
                    { title: "Automated Scheduling & Publishing", desc: "Schedule posts on Facebook, Instagram, LinkedIn, X (Twitter). Apply platform-specific formats and posting rules. Manual oversight ensures quality." },
                    { title: "Content Repurposing", desc: "Auto-generate captions, hashtags, and post variations. Convert content for multiple platforms. Drafts sent for team refinement." },
                    { title: "Engagement Monitoring", desc: "Track comments, DMs, and mentions automatically. Alerts sent to Slack/WhatsApp. Team manually responds or escalates issues." },
                    { title: "Performance Reporting", desc: "Weekly snapshots & monthly reports generated automatically. Metrics: reach, engagement, followers, top posts." },
                    { title: "Lead Capture from Social Channels", desc: "Collect leads from comments, DMs, and lead ads. Auto-send welcome messages and push to CRM. Notify sales team for manual follow-up." },
                    { title: "Assisted Creative Management", desc: "Automate file organization, versioning, and draft approvals. Team handles final design, editing, and approval." }
                ],
                whyMatters: "Repetitive tasks handled by automation. Human oversight ensures creativity, accuracy, and brand consistency.",
                cta: "Start Automating"
            }
        ]
    },
    {
        category: "2. Customer Support & Chatbot Automation",
        services: [
            {
                title: "Customer Support & Chatbot Automation",
                tagline: "Deliver instant, 24/7 support without increasing headcount.",
                features: [
                    { title: "Automated Customer Query Routing", desc: "Connect website/chatbot → Slack/Email/CRM. Auto-assign tickets based on category, priority, or customer type." },
                    { title: "Chatbot → CRM Sync", desc: "Every chat inquiry automatically logged into HubSpot/Zoho/Notion as a ticket or lead. Add tags, notes, and follow-up tasks." },
                    { title: "Auto-Responses & Knowledge-Base", desc: "Trigger instant replies using predefined rules. Connect chatbot to FAQs, Google Sheets, or Notion databases." },
                    { title: "Support Ticket Automation", desc: "Auto-create, update, and close tickets (Zendesk, Freshdesk, HubSpot). Send alerts for overdue or high-priority tickets." },
                    { title: "Multi-Channel Support Integration", desc: "WhatsApp, Email, Website chat, Instagram, Facebook → unified reporting. Trigger notifications to support teams instantly." },
                    { title: "Customer Satisfaction Automation", desc: "Auto-send CSAT/NPS surveys after ticket closure. Store results in CRM & notify team if score is low." },
                    { title: "Escalation & Alert Automation", desc: "If no response in X hours → escalate to manager. Trigger Slack/SMS alerts for urgent issues." }
                ],
                whyMatters: "Reduce response times, improve customer satisfaction, and ensure no query slips through the cracks.",
                cta: "Automate Support"
            }
        ]
    },
    {
        category: "3. Marketing Automation",
        services: [
            {
                title: "Marketing Automation",
                tagline: "Scale your reach and nurture leads automatically.",
                features: [
                    { title: "Lead Capture & Nurture Automation", desc: "Auto-collect leads from website forms, ads, social DMs. Send instant welcome emails/SMS. Add leads into CRM with tags and follow-up tasks." },
                    { title: "Email & Drip Campaign Automation", desc: "Auto-trigger drip sequences (offers, reminders, onboarding). Segment customers based on activity, behaviour, or tags." },
                    { title: "Social Media Automation", desc: "Schedule posts across Facebook, Instagram, LinkedIn, X. Auto-post announcements, offers, and updates from a central source." },
                    { title: "WhatsApp / SMS Marketing", desc: "Send promotional messages, reminders, or event alerts. Trigger personalised replies based on customer input." },
                    { title: "Ad Performance Reporting", desc: "Pull data from Meta/Google Ads automatically. Generate daily/weekly reports and send to Slack/Email." },
                    { title: "Customer Segmentation & Tagging", desc: "Auto-tag customers based on behaviour, purchase history, or engagement. Sync segments with email tools (Mailchimp, HubSpot, Zoho)." },
                    { title: "Review & Feedback Automation", desc: "Auto-request Google/Trustpilot reviews post-purchase. Store feedback in CRM and notify team for low ratings." }
                ],
                whyMatters: "Engage customers at the right time, with the right message, without manual effort.",
                cta: "Boost Marketing"
            }
        ]
    },
    {
        category: "4. Internal Process and Task Automation",
        services: [
            {
                title: "Process & Task Automation",
                tagline: "Streamline operations, reduce errors, and scale faster.",
                features: [
                    { icon: "🔄", title: "Data Entry & Sync Automation", desc: "Auto-sync data between Google Sheets, CRMs, accounting tools, databases. Remove manual copy-paste work." },
                    { icon: "⚙️", title: "Workflow Automation", desc: "Automate approvals, reminders, internal notifications (Slack/Email). Build multi-step business workflows." },
                    { icon: "📄", title: "Document & Report Automation", desc: "Auto-generate PDF invoices, proposals, reports. Schedule daily/weekly business dashboards." },
                    { icon: "📂", title: "File & Data Management", desc: "Auto-organise files in Google Drive/OneDrive. Format, clean, and route incoming data via APIs or forms." },
                    { icon: "👥", title: "Employee Onboarding/Offboarding", desc: "Create accounts, send welcome emails, assign tasks. Remove access & archive files during offboarding." },
                    { icon: "📅", title: "Task Scheduling & Reminders", desc: "Automated deadline reminders for teams. Recurring tasks management across systems." },
                    { icon: "🔌", title: "API Integrations", desc: "Connect any SaaS/CRM/ERP the SME uses. Build custom workflows tailored to their operations." }
                ],
                whyMatters: "Eliminate manual bottlenecks, ensure data accuracy, and free up your team to focus on high-value work.",
                cta: "Start Automating"
            }
        ]
    },
    {
        category: "5. Back Office / Operational Support",
        services: [
            {
                title: "Back-office / Operations Automation",
                tagline: "Optimize your internal operations with intelligent automation.",
                features: [
                    { title: "Finance & Accounting Automation", desc: "Auto-generate invoices, payment reminders, receipts. Sync transactions between CRM ↔ Xero/QuickBooks/Zoho Books. Automated expense approvals." },
                    { title: "HR & Employee Management", desc: "Onboarding/offboarding workflows (accounts, documents, tasks). Leave/attendance tracking with automatic approvals. Employee data sync." },
                    { title: "Operations & Admin Workflows", desc: "Daily/weekly operational report generation. Automatic document storage & categorisation. Task assignment and escalation." },
                    { title: "Maintenance & Manufacturing", desc: "Machine usage logging via APIs/IOT endpoints. Auto-trigger maintenance tickets when thresholds are hit. Production status alerts." }
                ],
                whyMatters: "Streamline back-office processes to reduce overhead, minimize errors, and ensure compliance.",
                cta: "Optimize Operations"
            }
        ]
    }
];

// Main App Logic
// (DOMContentLoaded wrapper removed as type="module" defers execution automatically)
// Check/Seed DB
// Database seeding moved to end to prevent blocking UI

// --- 1. Render Services ---
// --- 1. Render Services ---
// --- 1. Render Services (Grid Layout) ---
// --- 1. Render Services (Grid Layout) ---
function renderServices() {
    const servicesGrid = document.getElementById('services-grid') || document.querySelector('.services-grid');
    console.log("Attempting to render services. Grid Element:", servicesGrid);

    if (servicesGrid) {
        console.log("Rendering Services Grid with data length:", servicesData.length);
        servicesGrid.innerHTML = ''; // Clear default content

        servicesData.forEach((categoryGroup) => {
            categoryGroup.services.forEach((service) => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${categoryGroup.category.replace(/^\d+\.\s*/, '')}</span>
                        <h3 style="margin-top: 0.5rem;">${service.title}</h3>
                        <p style="color: var(--text-light); font-size: 0.95rem;">${service.tagline}</p>
                    </div>
                    <span class="card-arrow">→</span>
                `;

                card.addEventListener('click', () => openServiceDetail(service));
                servicesGrid.appendChild(card);
            });
        });
    } else {
        console.error("CRITICAL ERROR: Services Grid element not found in DOM!");
    }
}

// Call render immediately (if script is deferred, DOM should be ready)
renderServices();
// Also try on load just in case
window.addEventListener('load', renderServices);

// --- Service Detail View Logic ---
function openServiceDetail(service) {
    const detailView = document.getElementById('view-service-detail');
    const contentContainer = document.getElementById('service-detail-content');

    // Populate Content
    contentContainer.innerHTML = `
        <div class="sd-hero">
            <h1>${service.title}</h1>
            <p>${service.tagline}</p>
        </div>

        <div class="sd-section">
            <div class="sd-container">
                <div class="sd-content scroll-reveal" style="text-align: center; margin: 0 auto; max-width: 800px; display: flex; flex-direction: column; align-items: center;">
                    <h2>Why it matters</h2>
                    <p>${service.whyMatters}</p>
                    <ul class="differentiation-list" style="margin-top: 1rem; text-align: left; display: inline-block;">
                        ${service.differentiation ? service.differentiation.map(d => `<li>${d}</li>`).join('') : ''}
                    </ul>
                </div>
            </div>
        </div>

        <div class="sd-section bg-light">
            <div class="sd-container">
                <div class="sd-content scroll-reveal" style="text-align: center; margin: 0 auto; width: 100%;">
                    <h2>Key Features</h2>
                    <p>Everything you need to succeed.</p>
                    <div class="sd-features-grid">
                        ${service.features ? service.features.map(f => `
                            <div class="sd-feature-card">
                                <h3>${f.title}</h3>
                                <p style="font-size: 0.9rem; color: var(--text-light);">${f.desc}</p>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
            </div>
        </div>

        ${service.workflow ? `
        <div class="sd-section">
            <div class="sd-container">
                <div class="sd-content scroll-reveal" style="text-align: center; margin: 0 auto; display: flex; flex-direction: column; align-items: center;">
                    <h2>How it works</h2>
                    <div class="workflow-container" style="justify-content: center; margin-top: 2rem;">
                        ${service.workflow.map((step, index) => `
                            <span class="workflow-step" style="font-size: 1rem; padding: 0.5rem 1rem;">${step}</span>
                            ${index < service.workflow.length - 1 ? '<span class="workflow-arrow">→</span>' : ''}
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <div class="sd-section bg-light" style="min-height: 50vh;">
            <div class="sd-content scroll-reveal" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
                <h2>Ready to get started?</h2>
                <p style="margin-bottom: 2rem;">Take your business to the next level with ${service.title}.</p>
                <button class="btn-primary cta-btn" style="font-size: 1rem; padding: 0.8rem 2rem;" onclick="document.getElementById('back-to-home').click(); setTimeout(() => document.querySelector('.inquiry-section').scrollIntoView({behavior: 'smooth'}), 500);">
                    ${service.cta}
                </button>
            </div>
        </div>
    `;

    // Switch View
    switchView('serviceDetail');

    // Initialize Scroll Animations
    setTimeout(initScrollAnimations, 100);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Back Button Logic
const backBtn = document.getElementById('back-to-home');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.reload();
    });
}

// --- 2. Navigation & Views ---
const views = {
    landing: document.getElementById('view-landing'),
    login: document.getElementById('view-login'),
    employee: document.getElementById('view-dashboard-employee'),
    manager: document.getElementById('view-dashboard-manager'),
    client: document.getElementById('view-dashboard-client'),
    owner: document.getElementById('view-dashboard-owner'),
    careers: document.getElementById('view-careers'),
    serviceDetail: document.getElementById('view-service-detail')
};

const navBtns = {
    home: document.getElementById('nav-home'),
    login: document.getElementById('nav-login'),
    logout: document.getElementById('nav-logout'),
    careers: document.getElementById('nav-careers')
};

let currentUser = null;
let unsubscribeListeners = [];

// --- Session Persistence ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Session restored for:", user.email);

        // 1. Update Navigation UI
        navBtns.login.classList.add('hidden');
        navBtns.logout.classList.remove('hidden');
        // Only hide Careers if the user is an internal role (Owner, Manager, Employee)
        // If they are a Client or just a User, they might want to see it (or we can decide logic)
        // For now, let's keep it visible for everyone so they can apply, OR hide it only for Owner/Manager.
        // The prompt says "required to signin... before entering details". This implies they sign in as a generic user.
        // So we should NOT hide the Careers tab for them.
        // Let's remove the line that hides it for everyone.
        // navBtns.careers.classList.add('hidden'); <--- REMOVED


        // 2. Fetch User Profile
        // Try to find user by email (since we used email as key in seed, but moving to UID is better)
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const userDoc = snapshot.docs[0];
            currentUser = { id: userDoc.id, ...userDoc.data(), uid: user.uid };

            // 3. Initialize Dashboard Logic
            if (currentUser.role === 'employee') initEmployeeDashboard();
            if (currentUser.role === 'manager') initManagerDashboard();
            if (currentUser.role === 'client') initClientDashboard();
            if (currentUser.role === 'owner') initOwnerDashboard();

            // 4. Redirect if on landing page or login page
            const activeView = document.querySelector('.view.active');
            if (activeView && (activeView.id === 'view-landing' || activeView.id === 'view-login')) {
                const roleViewMap = { 'employee': 'employee', 'manager': 'manager', 'client': 'client', 'owner': 'owner' };
                if (roleViewMap[currentUser.role]) {
                    switchView(roleViewMap[currentUser.role]);
                } else {
                    // If no specific dashboard role (e.g. applicant), go to Careers or Home
                    switchView('careers');
                }
            }
        } else {
            console.error("Auth valid but Firestore profile missing.");
            await signOut(auth);
        }
    } else {
        console.log("No active session.");
        currentUser = null;

        // 1. Update Navigation UI
        navBtns.login.classList.remove('hidden');
        navBtns.logout.classList.add('hidden');
        navBtns.careers.classList.remove('hidden'); // Show Careers for guests

        // 2. Restore View or Redirect
        const lastView = localStorage.getItem('lastView');
        const allowedGuestViews = ['landing', 'login', 'careers'];

        if (lastView && allowedGuestViews.includes(lastView)) {
            switchView(lastView);
        } else {
            // Default to landing if no history or if history was a protected route
            switchView('landing');
        }
    }
});

function switchView(viewName) {
    // 1. Hide all views
    Object.values(views).forEach(el => {
        if (el) {
            el.classList.remove('active');
            el.classList.add('hidden');
        }
    });

    // 2. Show target view
    const target = views[viewName];
    if (target) {
        target.classList.remove('hidden');
        // Force reflow to enable transition
        void target.offsetWidth;
        target.classList.add('active');
        console.log(`Switched to view: ${viewName}`);

        // Save state
        localStorage.setItem('lastView', viewName);

        // Scroll to top
        window.scrollTo(0, 0);

        // 3. Update Navbar Active State
        // Remove active class from all buttons
        Object.values(navBtns).forEach(btn => btn.classList.remove('active'));

        // Add active class based on view
        if (viewName === 'landing') {
            navBtns.home.classList.add('active');
        } else if (viewName === 'careers') {
            navBtns.careers.classList.add('active');
        } else if (viewName === 'login') {
            navBtns.login.classList.add('active');
        }
        // Dashboards don't necessarily need a highlighted nav button, or we could highlight 'Home' or a 'Dashboard' button if it existed.
    } else {
        console.error(`View '${viewName}' not found.`);
    }
}

function goHome() {
    if (currentUser) {
        switchView(currentUser.role === 'employee' ? 'employee' : currentUser.role === 'manager' ? 'manager' : currentUser.role === 'client' ? 'client' : 'owner');
    } else {
        switchView('landing');
    }
}

if (navBtns.home) navBtns.home.addEventListener('click', goHome);

// Logo Click
const navLogo = document.getElementById('nav-logo');
if (navLogo) navLogo.addEventListener('click', goHome);

if (navBtns.login) navBtns.login.addEventListener('click', () => switchView('login'));
if (navBtns.careers) navBtns.careers.addEventListener('click', () => {
    switchView('careers');
    loadCareers(); // Load careers data when navigating to the careers page
});
if (navBtns.logout) navBtns.logout.addEventListener('click', async () => {
    try {
        // Unsubscribe all active listeners before logging out
        unsubscribeListeners.forEach(unsub => unsub());
        unsubscribeListeners = []; // Clear the array

        await signOut(auth);
        currentUser = null;
        showToast("Logged out successfully!", "success");
        switchView('landing'); // Redirect to landing page after logout
        // Clear any dashboard-specific UI elements or data if necessary
    } catch (error) {
        console.error("Logout error:", error);
        showToast("Error logging out.", "error");
    }
});

// --- 3. Unified Login Logic (Firestore) ---
const loginForm = document.getElementById('unified-login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value; // Assuming a password input exists

        if (!db) {
            showToast("Database not connected.", "error");
            return;
        }
        try {
            // 1. Authenticate with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Fetch User Role from Firestore
            // We assume the document ID in 'users' collection matches the Auth UID? 
            // OR we query by email if the IDs don't match. 
            // For this setup, let's query by email to be safe since we seeded data without UIDs.
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                currentUser = { id: userDoc.id, ...userDoc.data(), uid: user.uid };

                navBtns.login.classList.add('hidden');
                navBtns.logout.classList.remove('hidden');

                // Initialize Real-time Listeners
                if (currentUser.role === 'employee') initEmployeeDashboard();
                if (currentUser.role === 'manager') initManagerDashboard();
                if (currentUser.role === 'client') initClientDashboard();
                if (currentUser.role === 'owner') initOwnerDashboard();

                // Listen for Global Announcements (All Roles)
                const qAnnounce = query(collection(db, "announcements"), orderBy("createdAt", "desc"), limit(1));
                const unsubAnnounce = onSnapshot(qAnnounce, (snapshot) => {
                    if (!snapshot.empty) {
                        const announce = snapshot.docs[0].data();

                        // Check Target Audience
                        let show = false;
                        const role = currentUser.role;
                        const target = announce.targetAudience || 'all';

                        if (role === 'owner') return; // Owner doesn't see the popup

                        if (target === 'all') show = true;
                        else if (target === 'internal' && (role === 'employee' || role === 'manager')) show = true;
                        else if (target === 'employees' && role === 'employee') show = true;
                        else if (target === 'managers' && role === 'manager') show = true;
                        else if (target === 'clients' && role === 'client') show = true;

                        if (show) {
                            // Simple check: Show if created recently (e.g., last 24 hours) OR just show latest.
                            const lastSeen = localStorage.getItem('lastSeenAnnouncement');
                            if (lastSeen !== snapshot.docs[0].id) {
                                const modal = document.getElementById('announcement-modal');
                                const text = document.getElementById('announcement-text');
                                if (modal && text) {
                                    text.textContent = announce.message;
                                    modal.classList.remove('hidden');

                                    // Auto-hide after 5 seconds (Toast behavior)
                                    setTimeout(() => {
                                        modal.classList.add('hidden');
                                    }, 5000);

                                    // Save to local storage
                                    localStorage.setItem('lastSeenAnnouncement', snapshot.docs[0].id);
                                }
                            }
                        }
                    }
                });
                unsubscribeListeners.push(unsubAnnounce);

                // Force view switch based on role
                const roleViewMap = {
                    'employee': 'employee',
                    'manager': 'manager',
                    'client': 'client',
                    'owner': 'owner'
                };

                if (roleViewMap[currentUser.role]) {
                    switchView(roleViewMap[currentUser.role]);
                } else {
                    console.error("Unknown role:", currentUser.role);
                    showToast("Login successful but role is undefined.", "error");
                }
            } else {
                // Profile not found - Auto-create for demo purposes or handle gracefully
                console.warn("User authenticated but no profile found. Creating default profile...");

                let role = 'client'; // Default fallback
                if (email.includes('admin')) role = 'owner';
                if (email.includes('manager')) role = 'manager';
                if (email.includes('emp')) role = 'employee';

                const newProfile = {
                    email: email,
                    role: role,
                    name: email.split('@')[0],
                    createdAt: Date.now()
                };

                const docRef = await addDoc(collection(db, "users"), newProfile);
                currentUser = { id: docRef.id, ...newProfile, uid: user.uid };

                navBtns.login.classList.add('hidden');
                navBtns.logout.classList.remove('hidden');

                if (currentUser.role === 'employee') initEmployeeDashboard();
                if (currentUser.role === 'manager') initManagerDashboard();
                if (currentUser.role === 'client') initClientDashboard();
                if (currentUser.role === 'owner') initOwnerDashboard();

                const roleViewMap = { 'employee': 'employee', 'manager': 'manager', 'client': 'client', 'owner': 'owner' };
                switchView(roleViewMap[currentUser.role]);

                showToast("Profile created! Welcome.", "success");
            }
        } catch (error) {
            console.error("Login error:", error);
            let msg = "An unexpected error occurred. Please try again.";

            switch (error.code) {
                case 'auth/invalid-email':
                    msg = "Invalid email address.";
                    break;
                case 'auth/user-disabled':
                    msg = "User account is disabled.";
                    break;
                case 'auth/user-not-found':
                    msg = "No account found with this email.";
                    break;
                case 'auth/wrong-password':
                    msg = "Incorrect password.";
                    break;
                case 'auth/invalid-credential':
                    msg = "Invalid credentials. Please check your email and password.";
                    break;
                default:
                    msg = "Error: " + error.message; // Show actual error
            }
            showToast(msg, "error");
        }
    });
}

// --- 14. Shared Task Rendering Logic ---
function renderMyTasks(containerId, userName) {
    const q = query(collection(db, "tasks"), where("assignedTo", "==", userName));
    const unsub = onSnapshot(q, (snapshot) => {
        const taskList = document.getElementById(containerId);
        // Also update report select if it exists (Employee only usually)
        const reportSelect = document.getElementById('report-task-select');

        if (taskList) taskList.innerHTML = '';
        if (reportSelect) reportSelect.innerHTML = '<option value="">Select Task...</option>';

        if (snapshot.empty) {
            if (taskList) taskList.innerHTML = '<li>No tasks assigned yet.</li>';
        } else {
            const tasks = [];
            snapshot.forEach(doc => tasks.push({ id: doc.id, ...doc.data() }));

            // Filter and Sort
            // Filter: Show ONLY pending tasks
            const tasksToShow = tasks.filter(t => t.status !== 'Completed');

            tasksToShow.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                const isCompleted = task.status === 'Completed';

                const sourceBadge = task.source === 'Executive'
                    ? '<span class="tag high" style="background:#7c3aed; color:white;">From Executive</span>'
                    : '<span class="tag" style="background:#e5e7eb; color:#374151;">From Manager</span>';

                li.innerHTML = `
                    <div style="display:flex; align-items:center; gap:10px;">
                        <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${isCompleted ? 'checked' : ''}>
                        <div style="flex:1;">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:5px;">
                                <strong style="${isCompleted ? 'text-decoration:line-through; color:#9ca3af;' : ''}">${task.title}</strong>
                                ${sourceBadge}
                            </div>
                            <p class="text-small">${task.description || 'No description'}</p>
                            <p class="text-small"><strong>Deadline:</strong> ${task.deadline || 'N/A'} | <strong>Project:</strong> ${task.projectId || 'N/A'}</p>
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-end;">
                        <span class="status-badge ${isCompleted ? 'status-completed' : 'status-pending'}">${task.status}</span>
                    </div>
                `;
                if (taskList) taskList.appendChild(li);

                // Populate Report Dropdown (only pending)
                if (reportSelect && !isCompleted) {
                    const option = document.createElement('option');
                    option.value = task.id;
                    option.textContent = task.title;
                    reportSelect.appendChild(option);
                }
            });

            // Attach Checkbox Listeners
            if (taskList) {
                taskList.querySelectorAll('.task-checkbox').forEach(cb => {
                    cb.addEventListener('change', async (e) => {
                        const tid = e.target.getAttribute('data-id');
                        const newStatus = e.target.checked ? 'Completed' : 'Pending';
                        await toggleTaskStatus(tid, newStatus === 'Completed' ? 'Pending' : 'Completed');
                    });
                });
            }
        }
    });
    unsubscribeListeners.push(unsub);
}

// --- 4. Employee Dashboard Logic ---
function initEmployeeDashboard() {
    document.querySelector('.user-name-display').textContent = currentUser.name;

    // Render My Tasks
    renderMyTasks('emp-task-list', currentUser.name);

    // Listen for Payslips
    const qPayslips = query(collection(db, "payslips"), where("email", "==", currentUser.email));
    const unsubPayslips = onSnapshot(qPayslips, (snapshot) => {
        const list = document.getElementById('emp-payslip-list');
        if (list) {
            list.innerHTML = '';
            snapshot.forEach(doc => {
                const slip = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `<a href="#">Payslip - ${slip.month}</a> <span>$${slip.amount}</span>`;
                list.appendChild(li);
            });
        }
    });
    unsubscribeListeners.push(unsubPayslips);

    // Listen for Notifications
    const qNotif = query(collection(db, "notifications"), where("targetRole", "==", "employee"));
    const unsubNotif = onSnapshot(qNotif, (snapshot) => {
        const list = document.getElementById('emp-announcement-list');
        if (list) {
            list.innerHTML = '';
            snapshot.forEach(doc => {
                const n = doc.data();
                const li = document.createElement('li');
                li.textContent = n.message;
                list.appendChild(li);
            });
        }
    });
    unsubscribeListeners.push(unsubNotif);

    // Report Submission
    const empReportForm = document.getElementById('emp-report-form');
    if (empReportForm) {
        const newForm = empReportForm.cloneNode(true);
        empReportForm.parentNode.replaceChild(newForm, empReportForm);
        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const taskId = document.getElementById('report-task-select').value;
            const summary = document.getElementById('report-summary').value;

            if (taskId && summary) {
                await addDoc(collection(db, "reports"), {
                    taskId,
                    summary,
                    employeeName: currentUser.name,
                    date: new Date().toLocaleDateString(),
                    status: "Pending"
                });
                showToast("Report submitted successfully!", "success");
                newForm.reset();
            } else {
                showToast("Please select a task and enter report details.", "info");
            }
        });
    }
}

// --- 5. Manager Dashboard Logic ---
function initManagerDashboard() {
    document.querySelector('.user-name-display').textContent = currentUser.name;

    // 1. Render My Tasks (Manager's own tasks)
    renderMyTasks('mgr-task-list', currentUser.name);

    // 2. Populate Employee Dropdown for Task Assignment & Table
    let employeeOptions = []; // Store for table usage

    const qEmps = query(collection(db, "users"), where("role", "==", "employee"));
    const unsubEmps = onSnapshot(qEmps, (snapshot) => {
        const select = document.getElementById('task-emp-select');
        const roleSelect = document.getElementById('role-emp-select');

        employeeOptions = []; // Reset
        if (select) select.innerHTML = '<option value="">Select Employee</option>';
        if (roleSelect) roleSelect.innerHTML = '<option value="">Select Employee</option>';

        snapshot.forEach(doc => {
            const user = doc.data();
            employeeOptions.push(user.name); // Store name

            if (select) {
                const opt = document.createElement('option');
                opt.value = user.name;
                opt.textContent = user.name;
                select.appendChild(opt);
            }
            if (roleSelect) {
                const opt = document.createElement('option');
                opt.value = doc.id;
                opt.textContent = user.name;
                roleSelect.appendChild(opt);
            }
        });
    });
    unsubscribeListeners.push(unsubEmps);

    // 3. Manager Task Monitoring (Tasks assigned to OTHERS)
    const qMgrTasks = query(collection(db, "tasks"), where("assignedTo", "!=", currentUser.name));
    const unsubMgrTasks = onSnapshot(qMgrTasks, (snapshot) => {
        const table = document.getElementById('mgr-task-monitoring-table');
        if (table) {
            table.innerHTML = '';
            snapshot.forEach(doc => {
                const task = doc.data();
                const taskId = doc.id;

                // Filter: Show if NOT assigned to me
                if (task.assignedTo !== currentUser.name) {
                    const tr = document.createElement('tr');
                    const isCompleted = task.status === 'Completed';

                    // Build Employee Select Options
                    let empSelectHTML = `<select class="mgr-task-assign-select" data-id="${taskId}">`;
                    // Add current assigned user if not in list (to avoid blank)
                    if (!employeeOptions.includes(task.assignedTo)) {
                        empSelectHTML += `<option value="${task.assignedTo}" selected>${task.assignedTo}</option>`;
                    }
                    employeeOptions.forEach(empName => {
                        const selected = empName === task.assignedTo ? 'selected' : '';
                        empSelectHTML += `<option value="${empName}" ${selected}>${empName}</option>`;
                    });
                    empSelectHTML += `</select>`;

                    tr.innerHTML = `
                        <td>${task.title}</td>
                        <td>${empSelectHTML}</td>
                        <td><span class="status-badge ${isCompleted ? 'status-completed' : 'status-pending'}">${task.status}</span></td>
                        <td><input type="date" class="mgr-task-deadline" data-id="${taskId}" value="${task.deadline || ''}"></td>
                        <td>
                            <button class="btn-small btn-danger mgr-task-delete" data-id="${taskId}" style="background:#ef4444; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button>
                        </td>
                    `;
                    table.appendChild(tr);
                }
            });

            // Attach Event Listeners for Controls
            // 1. Reassign Task
            table.querySelectorAll('.mgr-task-assign-select').forEach(select => {
                select.addEventListener('change', async (e) => {
                    const tid = e.target.getAttribute('data-id');
                    const newAssignee = e.target.value;
                    try {
                        await updateDoc(doc(db, "tasks", tid), { assignedTo: newAssignee });
                        showToast(`Task reassigned to ${newAssignee}`, "success");
                    } catch (err) {
                        console.error(err);
                        showToast("Failed to reassign task", "error");
                    }
                });
            });

            // 2. Update Deadline
            table.querySelectorAll('.mgr-task-deadline').forEach(input => {
                input.addEventListener('change', async (e) => {
                    const tid = e.target.getAttribute('data-id');
                    const newDate = e.target.value;
                    try {
                        await updateDoc(doc(db, "tasks", tid), { deadline: newDate });
                        showToast("Deadline updated", "success");
                    } catch (err) {
                        console.error(err);
                        showToast("Failed to update deadline", "error");
                    }
                });
            });

            // 3. Delete Task
            table.querySelectorAll('.mgr-task-delete').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    if (confirm("Are you sure you want to delete this task?")) {
                        const tid = e.target.getAttribute('data-id');
                        try {
                            await deleteDoc(doc(db, "tasks", tid));
                            showToast("Task deleted", "success");
                        } catch (err) {
                            console.error(err);
                            showToast("Failed to delete task", "error");
                        }
                    }
                });
            });
        }
    });
    unsubscribeListeners.push(unsubMgrTasks);

    // 4. Manager Inquiries View
    const qMgrInquiries = query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(20));
    const unsubMgrInquiries = onSnapshot(qMgrInquiries, (snapshot) => {
        const inquiryTable = document.getElementById('mgr-inquiry-table');
        if (inquiryTable) {
            inquiryTable.innerHTML = '';
            snapshot.forEach(doc => {
                const inq = doc.data();
                const tr = document.createElement('tr');
                const needs = Array.isArray(inq.autoNeeds) ? inq.autoNeeds.join(', ') : (inq.autoNeeds || 'N/A');

                tr.innerHTML = `
                    <td>${inq.contactPerson || inq.name}</td>
                    <td>${inq.contactEmail || inq.email}</td>
                    <td>${inq.whatsapp || 'N/A'}</td>
                    <td>${inq.businessName || 'N/A'}</td>
                    <td><span class="text-small" style="display:block; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${needs}">${needs}</span></td>
                    <td>${inq.dateString}</td>
                `;
                inquiryTable.appendChild(tr);
            });
        }
    });
    unsubscribeListeners.push(unsubMgrInquiries);

    // 5. Employee Requests
    const qRequests = query(collection(db, "employee_requests"), where("managerId", "==", currentUser.email));
    const unsubRequests = onSnapshot(qRequests, (snapshot) => {
        const reqList = document.getElementById('mgr-request-list');
        if (reqList) {
            reqList.innerHTML = '';
            if (snapshot.empty) {
                reqList.innerHTML = '<li>No pending requests.</li>';
            } else {
                snapshot.forEach(doc => {
                    const req = doc.data();
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${req.requestType}</strong> from ${req.employeeId} <br>
                        <span class="text-small">${req.details}</span>
                        <div class="action-buttons" style="margin-top:0.5rem;">
                            <button class="btn-small">Approve</button>
                            <button class="btn-small" style="background:#ef4444;">Reject</button>
                        </div>
                    `;
                    reqList.appendChild(li);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubRequests);

    // 6. Notifications
    const qNotif = query(collection(db, "notifications"), where("targetRole", "==", "manager"), orderBy("createdAt", "desc"), limit(10));
    const unsubNotif = onSnapshot(qNotif, (snapshot) => {
        let notifContainer = document.getElementById('manager-notifications');
        if (!notifContainer) {
            const header = document.querySelector('#view-dashboard-manager .dashboard-header');
            if (header) {
                notifContainer = document.createElement('ul');
                notifContainer.id = 'manager-notifications';
                notifContainer.className = 'notification-list';
                notifContainer.style.marginBottom = '1rem';
                notifContainer.style.background = '#fff3cd';
                notifContainer.style.padding = '10px';
                notifContainer.style.borderRadius = '8px';
                header.after(notifContainer);
            }
        }

        if (notifContainer) {
            notifContainer.innerHTML = '';
            if (snapshot.empty) {
                notifContainer.style.display = 'none';
            } else {
                notifContainer.style.display = 'block';
                snapshot.forEach(doc => {
                    const note = doc.data();
                    const li = document.createElement('li');
                    li.innerHTML = `🔔 <strong>Notification:</strong> ${note.message} <br><small>${new Date(note.createdAt).toLocaleTimeString()}</small>`;
                    li.style.marginBottom = '5px';
                    notifContainer.appendChild(li);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubNotif);

    // 7. Assign Task Listener
    const assignTaskForm = document.getElementById('mgr-assign-task-form');
    if (assignTaskForm) {
        const newForm = assignTaskForm.cloneNode(true);
        assignTaskForm.parentNode.replaceChild(newForm, assignTaskForm);

        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = newForm.querySelector('#task-title').value;
            const desc = newForm.querySelector('#task-desc').value;
            const project = newForm.querySelector('#task-project').value;
            const deadline = newForm.querySelector('#task-deadline').value;
            const empSelect = newForm.querySelector('#task-emp-select');
            const empName = empSelect.options[empSelect.selectedIndex].text;

            if (title && empSelect.value && db) {
                await addDoc(collection(db, "tasks"), {
                    title: title,
                    description: desc,
                    projectId: project,
                    deadline: deadline,
                    priority: "Medium",
                    status: "Pending",
                    assignedTo: empName,
                    source: "Manager",
                    createdAt: Date.now()
                });
                showToast(`Task "${title}" assigned to ${empName}.`, "success");
                newForm.reset();
            }
        });
    }

    // 8. Role Assignment Listener
    const mgrRoleForm = document.getElementById('mgr-role-form');
    if (mgrRoleForm) {
        const newRoleForm = mgrRoleForm.cloneNode(true);
        mgrRoleForm.parentNode.replaceChild(newRoleForm, mgrRoleForm);

        newRoleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const empId = newRoleForm.querySelector('#role-emp-select').value;
            const newRole = newRoleForm.querySelector('#role-input').value;

            if (empId && newRole && db) {
                try {
                    const userRef = doc(db, "users", empId);
                    const userSnap = await getDoc(userRef);
                    const userName = userSnap.exists() ? (userSnap.data().name || userSnap.data().email) : "Employee";

                    await updateDoc(userRef, { position: newRole });

                    // Notify Admin
                    await addDoc(collection(db, "notifications"), {
                        message: `Manager updated ${userName}'s position to: ${newRole}`,
                        targetRole: 'owner',
                        createdAt: Date.now()
                    });

                    // Notify Employee
                    await addDoc(collection(db, "notifications"), {
                        message: `Your position has been updated to: ${newRole}`,
                        targetEmail: userSnap.data().email,
                        createdAt: Date.now()
                    });

                    showToast(`Employee position updated to ${newRole}!`, "success");
                    newRoleForm.reset();
                } catch (error) {
                    console.error("Error updating role:", error);
                    showToast("Failed to update role.", "error");
                }
            }
        });

    }

    // 9. View Applications (Manager)
    loadManagerApplications();
}

async function loadManagerApplications() {
    const tbody = document.getElementById('mgr-applications-table');
    if (!tbody) return;

    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
        tbody.innerHTML = '';
        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="7">No applications received yet.</td></tr>';
            return;
        }
        snapshot.forEach(doc => {
            const app = doc.data();
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${app.name}</td>
                <td>${app.jobTitle}</td>
                <td>${app.email}</td>
                <td>${app.phone}</td>
                <td><a href="${app.resumeUrl}" target="_blank" class="text-btn">View PDF</a></td>
                <td>${new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteApplication('${doc.id}')" style="background:#ef4444; color:white;">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
    unsubscribeListeners.push(unsub);
}

// --- 6. Owner Dashboard Logic ---
function initOwnerDashboard() {
    // loadOwnerInquiries(); // Logic is inline below
    // loadOwnerBookings(); // Load AI bookings (Logic below)

    // Bookings Logic (AI Chatbot)
    const bookingList = document.getElementById('owner-booking-table');
    const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(20));
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
        if (bookingList) {
            bookingList.innerHTML = '';
            if (snapshot.empty) {
                bookingList.innerHTML = '<tr><td colspan="5">No bookings yet.</td></tr>';
            } else {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${data.name || 'N/A'}</td>
                        <td>${data.mobile || 'N/A'}</td>
                        <td>${data.email || 'N/A'}</td>
                        <td>${data.date || 'N/A'}</td>
                        <td>${data.status || 'Pending'}</td>
                    `;
                    bookingList.appendChild(tr);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubBookings);
    // loadOwnerTasks();
    // loadGlobalTaskMonitoring();
    // loadOwnerProjects();
    // loadEmployeeDirectory();
    loadOwnerJobs(); // Load Careers
    loadOwnerApplications(); // Load Applications
    // Notifications (Admin/Owner)
    const qNotif = query(collection(db, "notifications"), where("targetRole", "==", "owner"), orderBy("createdAt", "desc"), limit(10));
    const unsubNotif = onSnapshot(qNotif, (snapshot) => {
        const notifList = document.getElementById('owner-notifications');
        if (notifList) {
            notifList.innerHTML = '';
            snapshot.forEach(doc => {
                const note = doc.data();
                const li = document.createElement('li');
                li.textContent = note.message;
                notifList.appendChild(li);
            });
        }
    });
    unsubscribeListeners.push(unsubNotif);

    // Inquiries (Updated for Table)
    const inquiryList = document.getElementById('owner-inquiry-table');
    const qInquiries = query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(20));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
        if (inquiryList) {
            inquiryList.innerHTML = '';
            if (snapshot.empty) {
                inquiryList.innerHTML = '<tr><td colspan="4">No inquiries yet.</td></tr>';
            } else {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                            <td>${data.name}</td>
                            <td>${data.email}</td>
                            <td>${data.message}</td>
                            <td>${data.dateString}</td>
                        `;
                    inquiryList.appendChild(tr);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubInquiries);

    // --- User Management Logic (Updated for Employee Directory) ---
    const userTableBody = document.getElementById('admin-employee-table');
    const addUserBtn = document.getElementById('admin-add-user-btn');
    const emailInput = document.getElementById('admin-new-user-email');
    const roleInput = document.getElementById('admin-new-user-role');

    // Listen for Users
    const qUsers = query(collection(db, "users"));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
        const employeeTable = document.getElementById('admin-employee-table');
        const assignSelect = document.getElementById('owner-task-target');

        if (employeeTable) employeeTable.innerHTML = '';
        if (assignSelect) assignSelect.innerHTML = '<option value="">Select Manager or Employee</option>';

        snapshot.forEach(doc => {
            const user = doc.data();
            const uid = doc.id;

            // Populate Employee Table
            if (employeeTable) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.name || 'N/A'}</td>
                    <td><span class="tag ${user.role === 'owner' ? 'high' : user.role === 'manager' ? 'medium' : 'low'}">${user.role.toUpperCase()}</span></td>
                    <td>${user.department || 'General'}</td>
                    <td>${user.email}</td>
                    <td>********</td> <!-- Password hidden for security -->
                    <td>
                        ${user.email !== currentUser.email ? `<button class="btn-small delete-btn" data-id="${uid}" style="background:#ef4444; color:white;">Remove</button>` : ''}
                    </td>
                `;
                employeeTable.appendChild(tr);
            }

            // Populate Task Assignment Dropdown
            if (assignSelect && (user.role === 'manager' || user.role === 'employee')) {
                const option = document.createElement('option');
                option.value = user.name; // Using name for assignment as per current schema
                option.textContent = `${user.name} (${user.role})`;
                assignSelect.appendChild(option);
            }
        });

        // Attach Delete Listeners
        if (employeeTable) {
            employeeTable.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const uid = e.target.getAttribute('data-id');
                    const userItem = snapshot.docs.find(d => d.id === uid).data();
                    const userName = userItem.name || userItem.email;
                    const userRole = userItem.role;

                    if (confirm(`Are you sure you want to remove ${userName}? All their assigned tasks will also be deleted.`)) {
                        try {
                            // 1. Delete User Profile
                            await deleteDoc(doc(db, "users", uid));

                            // 2. Delete Assigned Tasks
                            const qTasks = query(collection(db, "tasks"), where("assignedTo", "==", userName));
                            const taskSnaps = await getDocs(qTasks);
                            const deletePromises = taskSnaps.docs.map(d => deleteDoc(doc(db, "tasks", d.id)));
                            await Promise.all(deletePromises);

                            // 3. Notify Managers
                            if (userRole === 'employee') {
                                await addDoc(collection(db, "notifications"), {
                                    message: `Admin removed employee: ${userName}`,
                                    targetRole: 'manager',
                                    createdAt: Date.now()
                                });
                            }
                            showToast(`User ${userName} and their tasks removed.`, "success");
                        } catch (err) {
                            console.error("Error deleting user:", err);
                            showToast("Failed to delete user.", "error");
                        }
                    }
                });
            });
        }
    });
    unsubscribeListeners.push(unsubUsers);

    // Add User
    // Add User (Moved outside init to prevent duplicates, see below)
    // We will attach the listener only if it hasn't been attached.
    // Better pattern: Remove old listener or use a global setup function.
    // For this codebase, let's use a simple check or cloneNode.
    if (addUserBtn) {
        // Clone to remove existing listeners
        const newBtn = addUserBtn.cloneNode(true);
        addUserBtn.parentNode.replaceChild(newBtn, addUserBtn);

        newBtn.addEventListener('click', async () => {
            const name = document.getElementById('admin-new-user-name').value;
            const email = emailInput.value;
            const password = document.getElementById('admin-new-user-pass').value;
            const role = roleInput.value;
            const dept = document.getElementById('admin-new-user-dept').value;

            if (name && email && password && role && db) {
                try {
                    // 1. Create Auth User (using secondary app to avoid logging out current user)
                    const secondaryApp = initializeApp(firebaseConfig, "Secondary");
                    const secondaryAuth = getAuth(secondaryApp);
                    await createUserWithEmailAndPassword(secondaryAuth, email, password);
                    await signOut(secondaryAuth); // Sign out the new user immediately
                    await deleteApp(secondaryApp); // Cleanup

                    // 2. Create Firestore Profile
                    await addDoc(collection(db, "users"), {
                        name: name,
                        email: email,
                        role: role,
                        department: dept || 'General',
                        position: role.charAt(0).toUpperCase() + role.slice(1), // Default position
                        createdAt: Date.now()
                    });

                    // Notify Managers if a new employee is added
                    if (role === 'employee') {
                        await addDoc(collection(db, "notifications"), {
                            message: `Admin added new employee: ${name} (${email})`,
                            targetRole: 'manager',
                            createdAt: Date.now()
                        });
                    }

                    showToast(`User ${name} added successfully! They can login with the provided password.`, "success");
                    // Reset form
                    document.getElementById('admin-new-user-name').value = '';
                    emailInput.value = '';
                    document.getElementById('admin-new-user-pass').value = '';
                    roleInput.value = '';
                    document.getElementById('admin-new-user-dept').value = '';
                } catch (e) {
                    console.error("Error adding user: ", e);
                    showToast("Failed to add user: " + e.message, "error");
                }
            } else {
                showToast("Please fill in all required fields (Name, Email, Password, Role).", "info");
            }
        });
    }

    // --- Executive Task Assignment ---
    const ownerTaskForm = document.getElementById('owner-assign-task-form');
    // Populate Dropdown with Managers and Employees
    const qAllStaff = query(collection(db, "users"), where("role", "in", ["manager", "employee"]));
    const unsubAllStaff = onSnapshot(qAllStaff, (snapshot) => {
        const targetSelect = document.getElementById('owner-task-target');
        if (targetSelect) {
            targetSelect.innerHTML = '<option value="">Select Manager or Employee</option>';
            snapshot.forEach(doc => {
                const user = doc.data();
                const opt = document.createElement('option');
                opt.value = user.name || user.email; // Using Name/Email as identifier for now
                opt.textContent = `${user.name || user.email} (${user.role})`;
                targetSelect.appendChild(opt);
            });
        }
    });
    unsubscribeListeners.push(unsubAllStaff);

    if (ownerTaskForm) {
        // Prevent duplicate listeners
        const newForm = ownerTaskForm.cloneNode(true);
        ownerTaskForm.parentNode.replaceChild(newForm, ownerTaskForm);

        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('owner-task-title').value;
            const target = document.getElementById('owner-task-target').value;
            const desc = document.getElementById('owner-task-desc').value;
            const project = document.getElementById('owner-task-project').value;
            const deadline = document.getElementById('owner-task-deadline').value;

            if (title && target && db) {
                try {
                    await addDoc(collection(db, "tasks"), {
                        title: title,
                        description: desc,
                        projectId: project,
                        deadline: deadline,
                        priority: "High", // Default high for executive
                        status: "Pending",
                        assignedTo: target,
                        source: "Executive", // Differentiator
                        createdAt: Date.now()
                    });

                    // Notify the user
                    await addDoc(collection(db, "notifications"), {
                        message: `Executive assigned you a new task: ${title}`,
                        targetEmail: target.includes('@') ? target : null, // If value is email, target specific. If name, might miss. Ideally use ID.
                        // Fallback: we are using name in dropdown. Let's hope name is unique or switch to ID later.
                        // For now, let's just create a general notification or try to find email.
                        // Simplified: Just create the task. The user sees it in their list.
                        createdAt: Date.now()
                    });

                    showToast("Task assigned successfully!", "success");
                    ownerTaskForm.reset();
                } catch (err) {
                    console.error("Error assigning task:", err);
                    showToast("Failed to assign task.", "error");
                }
            }
        });
    }

    // --- Global Announcement ---
    const announceForm = document.getElementById('owner-announcement-form');

    // Display Last Announcement
    const qLastAnnounce = query(collection(db, "announcements"), orderBy("createdAt", "desc"), limit(1));
    const unsubLastAnnounce = onSnapshot(qLastAnnounce, (snapshot) => {
        const lastDiv = document.getElementById('owner-last-announcement');
        if (lastDiv) {
            if (snapshot.empty) {
                lastDiv.textContent = "No announcements posted yet.";
            } else {
                const data = snapshot.docs[0].data();
                const date = new Date(data.createdAt).toLocaleString();
                lastDiv.innerHTML = `<strong>Last Posted:</strong> "${data.message}" <br> <small>To: ${data.targetAudience || 'All'} | On: ${date}</small>`;
            }
        }
    });
    unsubscribeListeners.push(unsubLastAnnounce);

    if (announceForm) {
        announceForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const msg = document.getElementById('announcement-input').value;
            const target = document.getElementById('announcement-target').value;

            if (msg && db) {
                try {
                    await addDoc(collection(db, "announcements"), {
                        message: msg,
                        targetAudience: target,
                        createdAt: Date.now(),
                        createdBy: currentUser.email
                    });
                    showToast("Announcement posted!", "success");
                    document.getElementById('announcement-input').value = '';
                } catch (err) {
                    console.error("Error posting announcement:", err);
                    showToast("Failed to post announcement.", "error");
                }
            }
        });
    }

    // --- Client Onboarding & Projects ---
    const onboardForm = document.getElementById('owner-onboard-client-form');
    if (onboardForm) {
        const newForm = onboardForm.cloneNode(true);
        onboardForm.parentNode.replaceChild(newForm, onboardForm);

        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const clientName = document.getElementById('onboard-client-name').value;
            const projectName = document.getElementById('onboard-project-name').value;
            const startDate = document.getElementById('onboard-start-date').value;

            if (clientName && projectName && startDate && db) {
                try {
                    await addDoc(collection(db, "projects"), {
                        clientName: clientName,
                        name: projectName,
                        startDate: startDate,
                        status: "Active",
                        createdAt: Date.now()
                    });
                    showToast(`Project "${projectName}" created for ${clientName}.`, "success");
                    newForm.reset();
                } catch (err) {
                    console.error("Error creating project:", err);
                    showToast("Failed to create project.", "error");
                }
            }
        });
    }

    // Render Active Projects
    const qProjects = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
        const list = document.getElementById('owner-project-list');
        if (list) {
            list.innerHTML = '';
            if (snapshot.empty) {
                list.innerHTML = '<li>No active projects.</li>';
            } else {
                snapshot.forEach(doc => {
                    const proj = doc.data();
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${proj.name}</strong> <span class="text-small">(${proj.clientName})</span>
                        <span class="tag" style="background:#dcfce7; color:#166534;">${proj.status}</span>
                    `;
                    list.appendChild(li);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubProjects);
}

// --- 8. Client Dashboard Logic ---
function initClientDashboard() {
    // Listen for Projects
    const qProjects = query(collection(db, "projects"), where("clientId", "==", currentUser.email));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
        const projectList = document.getElementById('client-project-list');
        if (projectList) {
            projectList.innerHTML = '';
            if (snapshot.empty) {
                projectList.innerHTML = '<p>No active projects.</p>';
            } else {
                snapshot.forEach(doc => {
                    const proj = doc.data();
                    const div = document.createElement('div');
                    div.className = 'status-timeline'; // Reusing style
                    div.innerHTML = `
                        <h4>${proj.name}</h4>
                        <p>${proj.details}</p>
                        <p><strong>Status:</strong> ${proj.status}</p>
                        <p><small>${proj.startDate} to ${proj.endDate}</small></p>
                    `;
                    projectList.appendChild(div);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubProjects);

    // Listen for Invoices
    const qInvoices = query(collection(db, "invoices"), where("clientId", "==", currentUser.email));
    const unsubInvoices = onSnapshot(qInvoices, (snapshot) => {
        const invList = document.getElementById('client-invoice-list');
        if (invList) {
            invList.innerHTML = '';
            if (snapshot.empty) {
                invList.innerHTML = '<li>No invoices found.</li>';
            } else {
                snapshot.forEach(doc => {
                    const inv = doc.data();
                    const li = document.createElement('li');
                    li.innerHTML = `
                        🧾 <strong>${inv.details}</strong> - $${inv.amount} 
                        <span class="tag ${inv.status === 'Paid' ? 'done' : 'high'}">${inv.status}</span>
                        <br><small>Due: ${inv.dueDate}</small>
                    `;
                    invList.appendChild(li);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubInvoices);
}

// --- 9. AI Chatbot Logic & Inquiry Form ---
// --- 9. AI Chatbot Logic & Multi-Step Form ---
const chatInput = document.getElementById('ai-chat-input');
const chatSend = document.getElementById('ai-chat-send');
const chatMessages = document.getElementById('ai-chat-messages');

// Multi-Step Form Logic
const multiStepForm = document.getElementById('multi-step-form');
if (multiStepForm) {
    const steps = multiStepForm.querySelectorAll('.quiz-step');
    const progressFill = document.getElementById('quiz-progress');
    let currentStep = 0;

    const updateStep = () => {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        // Update Progress Bar (Steps are 1-6)
        const progress = ((currentStep + 1) / steps.length) * 100;
        if (progressFill) progressFill.style.width = `${progress}%`;
    };

    // Validation Patterns
    const patterns = {
        businessName: { regex: /^[a-zA-Z0-9\s\.\-\&]+$/, msg: "Business Name can only contain letters, numbers, spaces, and . - &" },
        industry: { regex: /^[a-zA-Z\s]+$/, msg: "Industry can only contain letters and spaces." },
        size: { regex: /^[0-9\-\+]+$/, msg: "Size must be numbers (e.g., 10, 10-50, 100+)." },
        location: { regex: /^[a-zA-Z0-9\s\,\.\-]+$/, msg: "Location contains invalid characters." },
        website: { regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, msg: "Please enter a valid website URL." },
        contactEmail: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "Please enter a valid email address." },
        contactPerson: { regex: /^[a-zA-Z\s\.]+$/, msg: "Contact Name can only contain letters." },
        budget: { regex: /^[0-9\$\,\.\-\s]+$/, msg: "Budget should be numeric (e.g. $1000, 5000-10000)." },
        whatsapp: { regex: /^\+?[0-9\s\-]{7,15}$/, msg: "Please enter a valid phone number (e.g. +1234567890)." }
    };

    // Next Buttons
    multiStepForm.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentInputs = steps[currentStep].querySelectorAll('input, textarea');
            let valid = true;

            currentInputs.forEach(input => {
                const name = input.name;
                const value = input.value.trim();
                const isRequired = input.hasAttribute('required');
                const errorMsgEl = input.nextElementSibling; // Get the .error-message div

                // Reset style and error message
                input.classList.remove('error');
                input.style.borderColor = '#cbd5e1';
                if (errorMsgEl && errorMsgEl.classList.contains('error-message')) {
                    errorMsgEl.textContent = '';
                    errorMsgEl.classList.remove('visible');
                }

                let error = null;

                // 1. Check Required
                if (isRequired && !value) {
                    error = "This field is required.";
                }
                // 2. Check Patterns (if value exists)
                else if (value && patterns[name]) {
                    if (!patterns[name].regex.test(value)) {
                        error = patterns[name].msg;
                    }
                }

                // Display Error
                if (error) {
                    valid = false;
                    input.classList.add('error');
                    input.style.borderColor = '#ef4444';
                    if (errorMsgEl && errorMsgEl.classList.contains('error-message')) {
                        errorMsgEl.textContent = error;
                        errorMsgEl.classList.add('visible');
                    }
                }
            });

            if (valid) {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    updateStep();
                }
            }
        });
    });

    // Prev Buttons
    multiStepForm.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStep();
            }
        });
    });

    // Prevent Accidental Reload
    window.addEventListener('beforeunload', (e) => {
        // Check if user has started the form (step > 0 or any input filled)
        // Simple check: if currentStep > 0
        if (currentStep > 0) {
            e.preventDefault();
            e.returnValue = ''; // Chrome requires returnValue to be set
        }
    });

    // Form Submission
    multiStepForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect all data
        const formData = new FormData(multiStepForm);
        const data = {};
        formData.forEach((value, key) => {
            // Handle checkboxes (arrays)
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        if (db) {
            try {
                await addDoc(collection(db, "inquiries"), {
                    ...data,
                    createdAt: Date.now(),
                    dateString: new Date().toLocaleDateString(),
                    status: 'New'
                });
                showToast("Thank you! Your comprehensive inquiry has been received. We will analyze your needs and contact you shortly.", "success");
                multiStepForm.reset();
                currentStep = 0;
                updateStep();
            } catch (error) {
                console.error("Error sending inquiry:", error);
                showToast("There was an error sending your message. Please try again.", "error");
            }
        }
    });
}

// --- 10. AI Chatbot Booking Logic ---
let chatState = 'date'; // date -> time -> phone -> done
let bookingData = {};

if (chatSend && chatInput) {
    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = sender === 'ai' ? 'ai-msg' : 'user-msg';
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    chatSend.addEventListener('click', async () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, 'user');
        chatInput.value = '';

        // AI Logic with Delay
        setTimeout(async () => {
            let response = "";
            let valid = false;

            if (chatState === 'date') {
                // Validate Date (YYYY-MM-DD)
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (dateRegex.test(text)) {
                    const inputDate = new Date(text);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

                    if (isNaN(inputDate.getTime())) {
                        response = "That doesn't look like a valid date. Please use YYYY-MM-DD.";
                    } else if (inputDate < today) {
                        response = "You cannot book a consultation in the past. Please enter a future date.";
                    } else {
                        bookingData.date = text;
                        response = "Great. Please select a time slot:";
                        chatState = 'time';
                        valid = true;

                        // Add Time Options
                        setTimeout(() => {
                            const optionsDiv = document.createElement('div');
                            optionsDiv.className = 'chat-options';
                            const slots = ["10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM"];
                            slots.forEach(slot => {
                                const btn = document.createElement('button');
                                btn.className = 'chat-option-btn';
                                btn.textContent = slot;
                                btn.onclick = () => {
                                    chatInput.value = slot;
                                    chatSend.click();
                                };
                                optionsDiv.appendChild(btn);
                            });
                            chatMessages.appendChild(optionsDiv);
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, 700);
                    }
                } else {
                    response = "Please enter a valid date in YYYY-MM-DD format (e.g., 2024-12-01).";
                }
            } else if (chatState === 'time') {
                // Validate Time Slot Selection
                const validSlots = ["10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM"];
                if (validSlots.includes(text)) {
                    bookingData.time = text;
                    response = "Got it. Now, please enter your Country Code (e.g., +1, +44, +91).";
                    chatState = 'country_code';
                    valid = true;
                } else {
                    response = "Please select one of the available time slots.";
                    // Re-show options
                    setTimeout(() => {
                        const optionsDiv = document.createElement('div');
                        optionsDiv.className = 'chat-options';
                        validSlots.forEach(slot => {
                            const btn = document.createElement('button');
                            btn.className = 'chat-option-btn';
                            btn.textContent = slot;
                            btn.onclick = () => {
                                chatInput.value = slot;
                                chatSend.click();
                            };
                            optionsDiv.appendChild(btn);
                        });
                        chatMessages.appendChild(optionsDiv);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 700);
                }
            } else if (chatState === 'country_code') {
                // Validate Country Code
                const ccRegex = /^\+\d{1,4}$/;
                if (ccRegex.test(text)) {
                    bookingData.countryCode = text;
                    response = "Thanks. Now please enter your Mobile Number.";
                    chatState = 'mobile';
                    valid = true;
                } else {
                    response = "Please enter a valid Country Code starting with + (e.g., +1).";
                }
            } else if (chatState === 'mobile') {
                // Validate Mobile Number
                const mobileRegex = /^\d{7,15}$/;
                if (mobileRegex.test(text.replace(/[\s-]/g, ''))) {
                    bookingData.mobile = text;
                    response = "Great. Finally, please enter your Email Address.";
                    chatState = 'email';
                    valid = true;
                } else {
                    response = "Please enter a valid Mobile Number (digits only).";
                }
            } else if (chatState === 'email') {
                // Validate Email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(text)) {
                    bookingData.email = text;
                    response = "Perfect! Your call has been scheduled. We will confirm shortly via email.";
                    chatState = 'done';
                    valid = true;

                    // Save Booking to Firestore
                    if (db) {
                        try {
                            await addDoc(collection(db, "bookings"), {
                                ...bookingData,
                                createdAt: Date.now(),
                                status: 'Pending'
                            });
                        } catch (e) {
                            console.error("Error saving booking:", e);
                            response += " (System note: Error saving booking)";
                        }
                    }
                } else {
                    response = "Please enter a valid Email Address.";
                }
            } else if (chatState === 'done') {
                response = "You are all set! Is there anything else?";
            }

            addMessage(response, 'ai');
        }, 600);
    });
}

// --- 11. Toast Notification Logic ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}

// --- 12. Logout Logic Update ---
if (navBtns.logout) {
    navBtns.logout.addEventListener('click', async () => {
        try {
            await signOut(auth);
            currentUser = null;

            // Unsubscribe from all listeners
            unsubscribeListeners.forEach(unsub => unsub());
            unsubscribeListeners = [];

            // Clear login form inputs
            const loginEmail = document.getElementById('login-email');
            const loginPass = document.getElementById('login-password');
            if (loginEmail) loginEmail.value = '';
            if (loginPass) loginPass.value = '';

            navBtns.login.classList.remove('hidden');
            navBtns.logout.classList.add('hidden');

            // Redirect to LOGIN page
            switchView('login');

            showToast("Logged out successfully.", "success");
        } catch (error) {
            console.error("Logout error:", error);
            showToast("Error logging out.", "error");
        }
    });
}

// --- 13. Task Management Helpers ---
// (Existing helpers...)

// --- 14. Careers & Applications Logic ---

// Load Careers for Public View
async function loadCareers() {
    const list = document.getElementById('careers-job-list');
    if (!list) return;
    list.innerHTML = '<p>Loading open positions...</p>';

    try {
        const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            list.innerHTML = '<p>No open positions at the moment. Please check back later.</p>';
            return;
        }

        list.innerHTML = '';
        snapshot.forEach(doc => {
            const job = doc.data();
            const div = document.createElement('div');
            div.className = 'job-card card';
            div.style.marginBottom = '1.5rem';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${job.title}</h3>
                    <button class="btn-primary" onclick="openApplicationModal('${doc.id}', '${job.title}')">Apply Now</button>
                </div>
                <p><strong>About:</strong> ${job.about}</p>
                <p><strong>Responsibilities:</strong></p>
                <pre style="font-family:inherit; white-space:pre-wrap;">${job.responsibilities}</pre>
                <p><strong>Required Skills:</strong></p>
                <pre style="font-family:inherit; white-space:pre-wrap;">${job.skills}</pre>
                <p><strong>Why you'll love this role:</strong></p>
                <pre style="font-family:inherit; white-space:pre-wrap;">${job.perks}</pre>
            `;
            list.appendChild(div);
        });
    } catch (e) {
        console.error("Error loading careers:", e);
        list.innerHTML = '<p>Error loading positions.</p>';
    }
}

// Application Modal Logic
window.openApplicationModal = (jobId, jobTitle) => {
    if (!auth.currentUser) {
        showToast("Please log in to apply for this role.", "warning");
        switchView('login');
        return;
    }
    const modal = document.getElementById('application-modal');
    document.getElementById('app-role-title').textContent = jobTitle;
    document.getElementById('app-role-id').value = jobId;

    // Pre-fill user details if available
    if (currentUser) {
        document.getElementById('app-name').value = currentUser.name || '';
        document.getElementById('app-email').value = currentUser.email || '';
        document.getElementById('app-phone').value = currentUser.phone || '';
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
};

const closeAppModal = document.getElementById('close-app-modal');
if (closeAppModal) {
    closeAppModal.addEventListener('click', () => {
        document.getElementById('application-modal').classList.add('hidden');
        document.getElementById('application-modal').style.display = 'none';
    });
}

// Handle Application Submit
const appForm = document.getElementById('application-form');
if (appForm) {
    appForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = appForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            const jobId = document.getElementById('app-role-id').value;
            const name = document.getElementById('app-name').value;
            const email = document.getElementById('app-email').value;
            const phone = document.getElementById('app-phone').value;
            const cover = document.getElementById('app-cover').value;
            const resumeFile = document.getElementById('app-resume').files[0];

            if (!resumeFile) throw new Error("Please upload a resume.");

            let downloadUrl = "#";

            // 1. Upload Resume to Google Drive via Backend
            const formData = new FormData();
            formData.append('resume', resumeFile);

            // TODO: Update this URL to your deployed backend (e.g., https://your-app.onrender.com)
            // If frontend and backend are on the same domain, use '/upload-resume'
            const BACKEND_URL = 'http://localhost:3000';

            try {
                const response = await fetch(`${BACKEND_URL}/upload-resume`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Upload failed');
                }

                const result = await response.json();
                downloadUrl = result.fileUrl;
                console.log("File uploaded to Drive:", downloadUrl);

            } catch (uploadError) {
                console.error("Drive upload failed:", uploadError);
                showToast("Resume upload failed. Submitting without file link.", "warning");
            }

            // 2. Save Application to Firestore
            await addDoc(collection(db, "applications"), {
                jobId,
                jobTitle: document.getElementById('app-role-title').textContent,
                name,
                email,
                phone,
                coverLetter: cover,
                resumeUrl: downloadUrl,
                createdAt: Date.now()
            });

            showToast("Application submitted successfully!", "success");

            appForm.reset();
            document.getElementById('application-modal').classList.add('hidden');
            document.getElementById('application-modal').style.display = 'none';

        } catch (error) {
            console.error("Application error:", error);
            showToast("Error submitting application: " + error.message, "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Application";
        }
    });
}

// --- Owner Careers Management ---

async function loadOwnerJobs() {
    const list = document.getElementById('owner-job-list');
    if (!list) return;

    // Real-time listener
    const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
        list.innerHTML = '';
        snapshot.forEach(doc => {
            const job = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${job.title}</span>
                <button class="btn-secondary" onclick="deleteJob('${doc.id}')">Delete</button>
            `;
            list.appendChild(li);
        });
    });
    unsubscribeListeners.push(unsub);
}

window.deleteJob = async (jobId) => {
    if (confirm("Are you sure you want to delete this role?")) {
        await deleteDoc(doc(db, "careers", jobId));
        showToast("Role deleted.", "success");
    }
};

const ownerJobForm = document.getElementById('owner-add-job-form');
if (ownerJobForm) {
    ownerJobForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!db) {
            showToast("Database connection missing!", "error");
            return;
        }

        const submitBtn = ownerJobForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Posting...";
        submitBtn.disabled = true;

        try {
            await addDoc(collection(db, "careers"), {
                title: document.getElementById('job-title').value,
                about: document.getElementById('job-about').value,
                responsibilities: document.getElementById('job-responsibilities').value,
                skills: document.getElementById('job-skills').value,
                perks: document.getElementById('job-perks').value,
                createdAt: Date.now()
            });
            showToast("New role posted successfully!", "success");
            ownerJobForm.reset();
        } catch (e) {
            console.error("Error posting job:", e);
            showToast("Error posting job: " + e.message, "error");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

async function loadOwnerApplications() {
    const tbody = document.getElementById('owner-applications-table');
    if (!tbody) return;

    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
        tbody.innerHTML = '';
        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="7">No applications received yet.</td></tr>';
            return;
        }
        snapshot.forEach(doc => {
            const app = doc.data();
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${app.name}</td>
                <td>${app.jobTitle}</td>
                <td>${app.email}</td>
                <td>${app.phone}</td>
                <td><a href="${app.resumeUrl}" target="_blank" class="text-btn">View PDF</a></td>
                <td>${new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteApplication('${doc.id}')" style="background:#ef4444; color:white;">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
    unsubscribeListeners.push(unsub);
}

window.deleteApplication = async (appId) => {
    if (confirm("Are you sure you want to delete this application?")) {
        try {
            await deleteDoc(doc(db, "applications", appId));
            showToast("Application deleted.", "success");
        } catch (e) {
            console.error("Error deleting application:", e);
            showToast("Failed to delete application.", "error");
        }
    }
};
async function toggleTaskStatus(taskId, currentStatus) {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    const updateData = { status: newStatus };
    if (newStatus === 'Completed') {
        updateData.completedAt = Date.now();
    } else {
        updateData.completedAt = null;
    }

    try {
        await updateDoc(doc(db, "tasks", taskId), updateData);
        showToast(`Task marked as ${newStatus}`, "success");
    } catch (e) {
        console.error("Error updating task:", e);
        showToast("Failed to update task.", "error");
    }
}

if (chatSend) {
    chatSend.addEventListener('click', () => {
        const text = chatInput.value;
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        setTimeout(() => {
            addMessage("Great! I've tentatively booked that slot for you. One of our experts will call you then.", 'ai');
        }, 1000);
    });
}
// Start database seeding in the background
// seedDatabase().catch(console.error);
