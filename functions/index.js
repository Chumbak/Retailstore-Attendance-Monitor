const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);

exports.sendNewMessageNotification = functions.database.ref('/messages').onWrite( event => {
    const getValuePromise = admin.database()
                                 .ref('messages')
                                 .orderByKey()
                                 .limitToLast(1)
                                 .once('value');

    return getValuePromise.then(snapshot => {
        console.log(_.values(snapshot.val())[0]);
        const { text, author } = _.values(snapshot.val())[0];

        const payload = {
            notification: {
                title: 'New msg',
                body: text,
                icon: author.avatar
            }
        };

        return admin.messaging()
                    .sendToTopic('attendanceapp-notif', payload);
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
