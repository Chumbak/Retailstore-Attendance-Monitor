// Login view
var submitted = false;
function loginView(userError) {
  $('#dashboard-view').hide();
  $('#login-view').show();
  $('.header').hide();
  if (userError) {
    $('#error').html("Please login as admin to view dashboard!");
  }
  // Firebase Login handler
  $(document).on( 'submit', '#login', function(event) {
    if (!submitted) {
      $('#inputSubmit').addClass('disabled');
      submitted = true;
      var email = $('#inputEmail').val(),
          pwd = $('#inputPassword').val();
      firebase.auth().signInWithEmailAndPassword(email, pwd).then(function() {
        submitted = false;
        $('#error').html('');
        document.getElementById("login").reset();
        $('#inputSubmit').removeClass('disabled');
      }).catch(function(err) {
        submitted = false;
        $('#error').html(err.message);
        $('#inputSubmit').removeClass('disabled');
      });
    }
    event.preventDefault();
  });
}
