const admin = require('firebase-admin')

// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
const serviceAccount = require('../node-firebase-challenge-firebase-adminsdk-71l7s-24fe56dcc3.json')

// Configuration of the database
admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://node-firebase-challenge-default-rtdb.europe-west1.firebasedatabase.app/'
});
// db is the database itself
exports.db = admin.database();
