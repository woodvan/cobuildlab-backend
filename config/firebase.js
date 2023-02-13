var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIAL);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  getAdminReference: () => admin,
  getAuthReference: () => admin.auth(),
};
