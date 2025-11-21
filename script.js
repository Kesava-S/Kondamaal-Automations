import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized");
} catch (error) {
    console.error("Firebase initialization failed. Make sure to update firebaseConfig.", error);
    alert("Firebase not configured! Please update script.js with your Firebase keys.");
}

// --- DATA SEEDING (Run once to populate DB) ---
const INITIAL_DATA = {
    users: [
        {
            email: 'admin@brandify.com',
            role: 'owner',
            name: 'Admin User',
            position: 'CEO',
            department: 'Executive',
            salary: 120000,
            contactInfo: { phone: '555-0101', address: '123 Admin St', bankDetails: 'BankA-123' },
            createdAt: Date.now()
        },
        {
            email: 'manager@brandify.com',
            role: 'manager',
            name: 'Sarah Manager',
            position: 'Project Manager',
            department: 'Operations',
            salary: 85000,
            contactInfo: { phone: '555-0102', address: '456 Manager Ln', bankDetails: 'BankB-456' },
            createdAt: Date.now()
        },
        {
            email: 'emp@brandify.com',
            role: 'employee',
            name: 'John Employee',
            position: 'Developer',
            department: 'Engineering',
            salary: 65000,
            contactInfo: { phone: '555-0103', address: '789 Dev Rd', bankDetails: 'BankC-789' },
            createdAt: Date.now()
        },
        {
            email: 'client@brandify.com',
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
            clientId: "client@brandify.com", // In real app, use UID
            managerId: "manager@brandify.com",
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
        { employeeId: "emp@brandify.com", name: "John Employee", date: "2025-11-21", status: "Clocked In", remarks: "On time" },
        { employeeId: "manager@brandify.com", name: "Sarah Manager", date: "2025-11-21", status: "Clocked In", remarks: "Remote" }
    ],
    employee_requests: [
        { requestType: "Leave", employeeId: "emp@brandify.com", managerId: "manager@brandify.com", status: "Pending", details: "Sick leave for Friday", createdAt: Date.now() }
    ],
    payslips: [
        { employeeId: "emp@brandify.com", month: "October 2025", salary: 5416, bonuses: 200, deductions: 100, netPay: 5516, createdAt: Date.now(), downloadUrl: "#" }
    ],
    invoices: [
        { clientId: "client@brandify.com", projectId: "Alpha Automation", amount: 5000, status: "Unpaid", details: "Initial Setup Fee", createdAt: Date.now(), dueDate: "2025-12-01" }
    ],
    messages: [
        { senderId: "manager@brandify.com", receiverId: "client@brandify.com", message: "Project kickoff was successful.", type: "text", timestamp: Date.now() }
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

        alert("Database seeded with new comprehensive model! You can now login.");
    }
}

// --- APP LOGIC ---

const servicesData = [
    {
        title: "Lead Generation & Nurturing",
        details: [
            "Capture leads automatically from your website, ads, and social media.",
            "Engage prospects with email and SMS drip campaigns.",
            "Follow-up with WhatsApp sequences for faster conversions."
        ]
    },
    {
        title: "Personalized CRM with Automation",
        details: [
            "Capture leads via forms, chatbots, and landing pages, then segment them for target marketing.",
            "Automated reminders and deal updates for your sales team.",
            "Ensure no lead slips through the cracks with intelligent workflows."
        ]
    },
    {
        title: "Social Media Automation",
        details: [
            "Schedule posts across all platforms to maintain a consistent presence.",
            "Automate responses to messages and comments using chatbot flows.",
            "Save time while staying engaged with your audience 24/7."
        ]
    },
    {
        title: "Ads Automation",
        details: [
            "Automatically optimize Meta & Google ads for maximum ROI.",
            "Set up retargeting campaigns and dynamic audience updates.",
            "Reduce ad spend wastage and boost campaign performance."
        ]
    },
    {
        title: "Reporting & Insights",
        details: [
            "Receive automated weekly and monthly performance dashboards.",
            "Track lead sources and campaign effectiveness effortlessly.",
            "Make data-driven decisions without manual reporting."
        ]
    },
    {
        title: "Sales Automation",
        details: [
            "Enable automatic call booking and calendar integrations.",
            "Reactivate abandoned leads with automated sequences.",
            "Turn more prospects into customers with minimal effort."
        ]
    }
];

// Main App Logic
// (DOMContentLoaded wrapper removed as type="module" defers execution automatically)
// Check/Seed DB
// Database seeding moved to end to prevent blocking UI

// --- 1. Render Services ---
const accordionContainer = document.getElementById('services-accordion');
if (accordionContainer) {
    servicesData.forEach((service) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.innerHTML = `
                <div class="accordion-header">
                    <span>${service.title}</span>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <ul>
                        ${service.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            `;

        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            document.querySelectorAll('.accordion-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });

        accordionContainer.appendChild(item);
    });
}

// --- 2. Navigation & Views ---
const views = {
    landing: document.getElementById('view-landing'),
    login: document.getElementById('view-login'),
    employee: document.getElementById('view-dashboard-employee'),
    manager: document.getElementById('view-dashboard-manager'),
    client: document.getElementById('view-dashboard-client'),
    owner: document.getElementById('view-dashboard-owner')
};

const navBtns = {
    home: document.getElementById('nav-home'),
    login: document.getElementById('nav-login'),
    logout: document.getElementById('nav-logout')
};

let currentUser = null;
let unsubscribeListeners = [];

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

if (navBtns.logout) navBtns.logout.addEventListener('click', () => {
    currentUser = null;
    // Unsubscribe from real-time listeners
    unsubscribeListeners.forEach(unsub => unsub());
    unsubscribeListeners = [];

    navBtns.login.classList.remove('hidden');
    navBtns.logout.classList.add('hidden');
    switchView('landing');
});

// --- 3. Unified Login Logic (Firestore) ---
const loginForm = document.getElementById('unified-login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;

        if (!db) {
            alert("Database not connected.");
            return;
        }

        try {
            // Query Users Collection
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                currentUser = { id: userDoc.id, ...userDoc.data() };

                navBtns.login.classList.add('hidden');
                navBtns.logout.classList.remove('hidden');

                // Initialize Real-time Listeners
                if (currentUser.role === 'employee') initEmployeeDashboard();
                if (currentUser.role === 'manager') initManagerDashboard();
                if (currentUser.role === 'client') initClientDashboard();
                if (currentUser.role === 'owner') initOwnerDashboard();

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
                }
            } else {
                alert('Invalid email. Please check your credentials.');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Check console for details.");
        }
    });
}

// --- 4. Employee Dashboard Logic ---
function initEmployeeDashboard() {
    document.querySelector('.user-name-display').textContent = currentUser.name;

    // Listen for Tasks
    const q = query(collection(db, "tasks"), where("assignedTo", "==", currentUser.name));
    const unsub = onSnapshot(q, (snapshot) => {
        const taskList = document.getElementById('emp-task-list');
        const reportSelect = document.getElementById('report-task-select');

        if (taskList) taskList.innerHTML = '';
        if (reportSelect) {
            // Keep default option
            reportSelect.innerHTML = '<option value="">Select Task...</option>';
        }

        if (snapshot.empty) {
            if (taskList) taskList.innerHTML = '<li>No tasks assigned yet.</li>';
        } else {
            snapshot.forEach(doc => {
                const task = doc.data();
                const taskId = doc.id;

                // Populate Task List
                if (taskList) {
                    const li = document.createElement('li');
                    li.className = 'task-item';
                    li.innerHTML = `
                            <div class="task-header">
                                <strong>${task.title}</strong>
                                <span class="tag ${task.priority === 'High' ? 'high' : task.priority === 'Medium' ? 'medium' : 'done'}">${task.status}</span>
                            </div>
                            <p class="text-small">${task.description || 'No description'}</p>
                            <div class="task-meta">
                                <span>📅 Due: ${task.deadline || 'N/A'}</span>
                                <span>📂 ${task.projectId || 'General'}</span>
                            </div>
                            ${task.status !== 'Completed' ? `<button class="btn-small btn-complete" data-id="${taskId}">Mark Complete</button>` : ''}
                        `;
                    taskList.appendChild(li);
                }

                // Populate Report Dropdown
                if (reportSelect && task.status !== 'Completed') {
                    const option = document.createElement('option');
                    option.value = taskId;
                    option.textContent = task.title;
                    reportSelect.appendChild(option);
                }
            });

            // Attach "Mark Complete" listeners
            if (taskList) {
                taskList.querySelectorAll('.btn-complete').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const tid = e.target.getAttribute('data-id');
                        if (confirm('Mark this task as completed?')) {
                            await updateDoc(doc(db, "tasks", tid), { status: "Completed" });
                        }
                    });
                });
            }
        }
    });
    unsubscribeListeners.push(unsub);

    // Listen for Payslips
    const qPayslips = query(collection(db, "payslips"), where("employeeId", "==", currentUser.email));
    const unsubPayslips = onSnapshot(qPayslips, (snapshot) => {
        const payslipList = document.getElementById('emp-payslip-list');
        if (payslipList) {
            payslipList.innerHTML = '';
            if (snapshot.empty) {
                payslipList.innerHTML = '<li>No payslips found.</li>';
            } else {
                snapshot.forEach(doc => {
                    const pay = doc.data();
                    const li = document.createElement('li');
                    li.innerHTML = `📄 <a href="${pay.downloadUrl || '#'}" target="_blank">${pay.month} - $${pay.netPay}</a>`;
                    payslipList.appendChild(li);
                });
            }
        }
    });
    unsubscribeListeners.push(unsubPayslips);
}

// Employee Report Submission
const empReportForm = document.getElementById('emp-report-form');
if (empReportForm) {
    empReportForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskId = document.getElementById('report-task-select').value;
        const text = empReportForm.querySelector('textarea').value;

        if (taskId && text && db) {
            // Get task title for reference
            const taskSelect = document.getElementById('report-task-select');
            const taskTitle = taskSelect.options[taskSelect.selectedIndex].text;

            await addDoc(collection(db, "reports"), {
                taskId: taskId,
                taskTitle: taskTitle,
                submittedBy: currentUser.name,
                reportText: text,
                submittedAt: Date.now(),
                date: new Date().toLocaleDateString(),
                status: "Pending"
            });
            alert("Report submitted successfully!");
            empReportForm.reset();
        } else {
            alert("Please select a task and enter report details.");
        }
    });
}

// Clock In/Out Logic
const btnClockIn = document.getElementById('emp-clock-in');
const btnClockOut = document.getElementById('emp-clock-out');

// --- 5. Manager Dashboard Logic ---
function initManagerDashboard() {
    // Listen for Reports
    const qReports = query(collection(db, "reports"), orderBy("createdAt", "desc"), limit(10));
    const unsubReports = onSnapshot(qReports, (snapshot) => {
        const reportTableBody = document.querySelector('#view-dashboard-manager .data-table tbody');
        if (reportTableBody) {
            reportTableBody.innerHTML = '';
            snapshot.forEach(doc => {
                const rep = doc.data();
                const tr = document.createElement('tr');
                tr.innerHTML = `
                        <td>${rep.submittedBy || rep.employee}</td>
                        <td>${rep.date}</td>
                        <td>${rep.reportText || rep.summary}</td>
                        <td><span class="tag ${rep.status === 'Reviewed' ? 'done' : 'medium'}">${rep.status}</span></td>
                    `;
                reportTableBody.appendChild(tr);
            });
        }
    });
    unsubscribeListeners.push(unsubReports);

    // Listen for Attendance
    const unsubAttendance = onSnapshot(collection(db, "attendance"), (snapshot) => {
        const attendanceList = document.querySelector('.attendance-list');
        if (attendanceList) {
            attendanceList.innerHTML = '';
            snapshot.forEach(doc => {
                const att = doc.data();
                const li = document.createElement('li');
                li.className = 'status-item';
                const color = att.status === 'Clocked In' ? '#10b981' : '#ef4444';
                li.innerHTML = `
                        <span class="dot" style="background: ${color};"></span> 
                        <span>${att.name} (${att.status})</span>
                    `;
                attendanceList.appendChild(li);
            });
        }
    });
    unsubscribeListeners.push(unsubAttendance);

    // Listen for Employee Requests
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
}

// Manager Assign Task
const assignTaskForm = document.getElementById('mgr-assign-task-form');
if (assignTaskForm) {
    assignTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;
        const project = document.getElementById('task-project').value;
        const deadline = document.getElementById('task-deadline').value;
        const empSelect = document.getElementById('task-emp-select');
        const empName = empSelect.options[empSelect.selectedIndex].text;

        if (title && empSelect.value && db) {
            await addDoc(collection(db, "tasks"), {
                title: title,
                description: desc,
                projectId: project,
                deadline: deadline,
                priority: "Medium", // Default
                status: "Pending",
                assignedTo: empName,
                createdAt: Date.now()
            });
            alert(`Task "${title}" assigned to ${empName}.`);
            assignTaskForm.reset();
        }
    });
}

// Manager Role Assignment
const roleForm = document.getElementById('mgr-role-form');
if (roleForm) {
    roleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const empName = document.getElementById('role-emp-select').value;
        const newRole = document.getElementById('role-input').value;

        if (empName && newRole && db) {
            await addDoc(collection(db, "notifications"), {
                message: `Manager updated ${empName}'s role to: ${newRole}`,
                createdAt: Date.now()
            });
            alert(`Role for ${empName} updated. Owner notified.`);
            roleForm.reset();
        }
    });
}

// --- 6. Owner Dashboard Logic ---
function initOwnerDashboard() {
    // Notifications
    const qNotif = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(10));
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

    // Inquiries
    const qInquiries = query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(10));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
        const inquiryList = document.getElementById('owner-inquiries-list');
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

    // --- User Management Logic ---
    const userList = document.getElementById('admin-user-list');
    const addUserBtn = document.getElementById('admin-add-user-btn');
    const emailInput = document.getElementById('admin-new-user-email');
    const roleInput = document.getElementById('admin-new-user-role');

    // Listen for Users
    const qUsers = query(collection(db, "users"));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
        if (userList) {
            userList.innerHTML = '';
            snapshot.forEach(doc => {
                const user = doc.data();
                // Don't allow deleting self or critical admin if needed (logic can be enhanced)
                const isSelf = currentUser && user.email === currentUser.email;

                const div = document.createElement('div');
                div.className = 'control-item';
                div.innerHTML = `
                        <span>${user.name || user.email} (${user.role})</span>
                        ${!isSelf ? `<button class="text-btn delete" data-id="${doc.id}">Remove</button>` : ''}
                    `;
                userList.appendChild(div);
            });

            // Attach event listeners to delete buttons
            userList.querySelectorAll('.text-btn.delete').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const uid = e.target.getAttribute('data-id');
                    if (confirm('Are you sure you want to remove this user?')) {
                        try {
                            await deleteDoc(doc(db, "users", uid));
                        } catch (err) {
                            console.error("Error deleting user:", err);
                            alert("Failed to delete user.");
                        }
                    }
                });
            });
        }
    });
    unsubscribeListeners.push(unsubUsers);

    // Add User
    if (addUserBtn) {
        addUserBtn.addEventListener('click', async () => {
            const email = emailInput.value;
            const role = roleInput.value;
            if (email && role && db) {
                try {
                    await addDoc(collection(db, "users"), {
                        email: email,
                        role: role,
                        name: email.split('@')[0], // Default name
                        createdAt: Date.now()
                    });
                    alert('User added successfully.');
                    emailInput.value = '';
                    roleInput.value = '';
                } catch (e) {
                    console.error("Error adding user: ", e);
                    alert("Failed to add user.");
                }
            } else {
                alert("Please enter email and select a role.");
            }
        });
    }
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
const chatInput = document.getElementById('ai-chat-input');
const chatSend = document.getElementById('ai-chat-send');
const chatMessages = document.getElementById('ai-chat-messages');
const inquiryForm = document.getElementById('inquiry-form');

// Handle Inquiry Form Submission
if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = inquiryForm.querySelector('input[type="text"]').value;
        const email = inquiryForm.querySelector('input[type="email"]').value;
        const message = inquiryForm.querySelector('textarea').value;

        if (name && email && db) {
            try {
                await addDoc(collection(db, "inquiries"), {
                    name: name,
                    email: email,
                    message: message,
                    createdAt: Date.now(),
                    dateString: new Date().toLocaleDateString()
                });
                alert("Thank you! Your inquiry has been sent. We will contact you shortly.");
                inquiryForm.reset();
            } catch (error) {
                console.error("Error sending inquiry:", error);
                alert("There was an error sending your message. Please try again.");
            }
        }
    });
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = sender === 'ai' ? 'ai-msg' : 'user-msg';
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
seedDatabase().catch(console.error);
