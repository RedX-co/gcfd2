

function ContactCtrl($scope){
  $scope.contact = { // starting contact values
    email: "",
    message: ""
  };
  $scope.isValid = {
    email: true,
    form: false,
    checked: false // form has been checked
  };
  $scope.contactSent = false;

  function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };


  $scope.validate = function validate(contact) {
    $scope.isValid.checked = true;
    $scope.isValid.email = isValidEmail(contact.email);
    $scope.isValid.form = $scope.isValid.email && contact.message.length > 2; // all of the conditions to be met for the form to be valid
    return $scope.isValid.form;
  };

  $scope.send = function(contact) { // send the message
    if (!$scope.contactSent && isValidEmail(contact.email)) {
      $scope.contactSent = null;
      var firebaseRef = new Firebase("https://gcfd2.firebaseio.com/email"); // your firebase location here
      firebaseRef.push($scope.contact, function complete() {
        $scope.contactSent = true;
        $scope.$apply();
      });
    };
  };

  $scope.sendStatus = function() {
    switch ($scope.contactSent) {
      case null: return 'Sending';
      case true: return 'Sent';
    }
    return 'Send';
  }

};
