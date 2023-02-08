var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIAL);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = {
  getAdminReference: () => admin,
  getAuthReference: () => admin.auth(),
  getStorageReference: () => admin.storage(),
};
