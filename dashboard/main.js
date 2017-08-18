// Global variables
var empData, config;
function logout() {
  firebase.auth().signOut();
}
// Hide owl loader and load view
$(document).ready(function() {
  // Initialize Firebase
  $.ajax({
    type: "get",
    url: "/settings.json",
  })
  .done(function(response){
    config = {
      apiKey: response.FIREBASE_API_KEY,
      authDomain: response.FIREBASE_AUTH_DOMAIN,
      databaseURL: response.FIREBASE_DATABASE_URL,
      projectId: response.FIREBASE_PROJECT_ID,
      storageBucket: response.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: response.FIREBASE_MESSAGING_SENDING_ID
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      $('.owl-loader').remove();
      if (user) {
        if (user.email === 'ram-admin@chumbak.in') {
          dashboardView(true);
        } else {
          loginView(true);
        }
      } else {
        loginView();
      }
    });
  })
  // Load login view
  $('#login-view').hide();
  $('#login-view').load('/views/login/login.html');
  // Load dashboard view
  $('#dashboard-view').hide();
  $('#dashboard-view').load('/views/dashboard/dashboard.html');
});
