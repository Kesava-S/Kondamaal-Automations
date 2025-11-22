# Implementation Plan: Secure Backend & RBAC with Firebase

This plan upgrades the current client-side application to a secure, robust web application using Firebase as a Serverless Backend. This ensures authentication, role-based access control (RBAC), and data persistence are handled securely.

## 1. Architecture Overview
- **Authentication**: Firebase Authentication (Handles sessions, password hashing, secure tokens).
- **Database**: Cloud Firestore (NoSQL DB for persistent data).
- **Security**: Firestore Security Rules (The "Backend" logic that enforces RBAC and validation).
- **Frontend**: Existing HTML/JS, refactored to respect session state.

## 2. Security & RBAC (Firestore Rules)
We will implement strict rules to ensure:
- **Unauthenticated users** can only read public data (if any) or write inquiries.
- **Employees** can read their own data, write reports, and read announcements.
- **Managers** can read/write tasks, read employee data, and manage their team.
- **Admins (Owners)** have full access.

## 3. Session Management (State Persistence)
Currently, the app loses state on reload. We will implement `onAuthStateChanged` to:
- Automatically detect the logged-in user on page load.
- Fetch their profile and role.
- Redirect them to the correct dashboard without requiring re-login.

## 4. Data Validation & Sanitization
- Implement client-side validation (Regex) for all inputs.
- Implement server-side validation (Firestore Rules) to prevent bad data (e.g., negative salaries, invalid dates).

## 5. Implementation Steps

### Step 1: Configure Firestore Security Rules
Create a `firestore.rules` file to enforce permissions.

### Step 2: Refactor `script.js` for Session Persistence
Replace the manual `currentUser` handling with a global listener that restores the session.

### Step 3: Secure CRUD Operations
Ensure all database writes go through the secured paths and handle "Permission Denied" errors gracefully.

---

## Code Snippets

### A. Firestore Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }
    function hasRole(role) {
      return isSignedIn() && getUserData().role == role;
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isSignedIn(); // Authenticated users can read profiles (for directories)
      allow write: if hasRole('owner'); // Only Owner can create/edit users
    }

    // Tasks Collection
    match /tasks/{taskId} {
      allow read: if isSignedIn();
      allow create: if hasRole('manager') || hasRole('owner');
      allow update: if hasRole('manager') || hasRole('owner') || (hasRole('employee') && resource.data.assignedTo == getUserData().name);
      allow delete: if hasRole('manager') || hasRole('owner');
    }
    
    // ... (Rules for other collections)
  }
}
```

### B. Session Persistence (`script.js`)
```javascript
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", uid)); // Assuming ID matches UID now, or query by email
        if (userDoc.exists()) {
            currentUser = userDoc.data();
            // Redirect/Update UI
        }
    } else {
        // User is signed out
        currentUser = null;
        switchView('landing');
    }
});
```
