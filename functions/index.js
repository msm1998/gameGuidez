const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
    // get user and add admin custom claim
    if(context.auth.token.admin !== true){
        return { error:'only admin can make admin'}
    }
    return admin.auth().getUserByEmail(data.email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`
      }
    }).catch(err => {
      return err;
    });
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

