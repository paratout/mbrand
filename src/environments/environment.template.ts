// Environment configuration template
// Copy this to environment.ts and environment.development.ts with real values
// DO NOT commit the real files — they are in .gitignore

export const environment = {
    production: false,
    adminEmail: 'YOUR_ADMIN_EMAIL',
    firebase: {
        apiKey: 'YOUR_FIREBASE_API_KEY',
        authDomain: 'YOUR_PROJECT.firebaseapp.com',
        projectId: 'YOUR_PROJECT_ID',
        storageBucket: 'YOUR_PROJECT.firebasestorage.app',
        messagingSenderId: 'YOUR_SENDER_ID',
        appId: 'YOUR_APP_ID'
    }
};
