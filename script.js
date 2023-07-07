var loginForm = document.getElementById('login-form');
var transactionSection = document.getElementById('transaction-section');
var transactionResultSection = document.getElementById('transaction-result-section');
var transactionResult = document.getElementById('transaction-result');
var checkAnotherBtn = document.getElementById('check-another-btn');
var transactionHistory = document.getElementById('transaction-history');
var showPasswordCheckbox = document.getElementById('show-password-checkbox');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get login credentials
  var username = document.getElementById('username').value;
  var passwordInput = document.getElementById('password');
  var password = passwordInput.value;

  // Get show password checkbox value
  var showPassword = showPasswordCheckbox.checked;

  // Perform login authentication (you can replace this with your own logic)
  var isAuthenticated = performAuthentication(username, password);

  // If login is successful, show transaction section
  if (isAuthenticated) {
    loginForm.style.display = 'none';
    transactionSection.style.display = 'block';

    // Show or hide the password based on the showPassword value
    if (showPassword) {
      passwordInput.setAttribute('type', 'text');
    } else {
      passwordInput.setAttribute('type', 'password');
    }
  } else {
    showAlert('Invalid login credentials. Please try again.', 'red');
  }
});

// Rest of the code remains the same


// Rest of the code remains the same

document.getElementById('transaction-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var transactionId = document.getElementById('transaction-id').value;
  var website = document.getElementById('website').value;

  // Perform fraud detection logic
  var isFraudulent = performFraudDetection(transactionId, website);

  // Display transaction result
  displayTransactionResult(transactionId, getCurrentTime(), isFraudulent);

  // Show the "Check Another Transaction Status" button
  checkAnotherBtn.style.display = 'block';

  // Add the transaction status to the transaction history
  addTransactionToHistory(transactionId, isFraudulent);
});

checkAnotherBtn.addEventListener('click', function() {
  // Clear the transaction form and result
  document.getElementById('transaction-id').value = '';
  document.getElementById('website').value = '';
  transactionResult.innerHTML = '';

  // Hide the "Check Another Transaction Status" button
  checkAnotherBtn.style.display = 'none';

  // Show the transaction section again
  transactionSection.style.display = 'block';
});

function displayTransactionResult(transactionId, time, isFraudulent) {
  var status = isFraudulent ? 'Unsuccessful' : 'Successful';
  var statusColor = isFraudulent ? 'red' : 'green';

  var resultHTML = `
    <p><strong>Transaction ID:</strong> ${transactionId}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Status:</strong> <span style="color: ${statusColor};">${status}</span></p>
  `;

  // Append the new transaction result to the existing ones
  transactionResult.innerHTML = resultHTML + transactionResult.innerHTML;

  // Hide transaction section and show transaction result section
  transactionSection.style.display = 'none';
  transactionResultSection.style.display = 'block';
}

function getCurrentTime() {
  var currentTime = new Date();
  return currentTime.toLocaleString();
}

function performAuthentication(username, password) {
  // Your authentication logic goes here
  // Return true if the login is successful, false otherwise
  // You can implement your own authentication mechanism, such as comparing
  // the entered username and password against a stored list or using a
  // backend authentication service.

  // Example: Simple check for hardcoded username and password
  if (username === 'admin' && password === 'password') {
    return true;
  }

  return false;
}

function performFraudDetection(transactionId, website) {
  // Your fraud detection logic goes here
  // Return true if the transaction is flagged as fraudulent, false otherwise
  // You can implement your own fraud detection algorithms or connect to
  // external fraud detection services.

  // Example: Simulate random fraudulent detection
  var randomNumber = Math.random();
  if (randomNumber < 0.2) {
    return true; // Transaction is flagged as fraudulent
  }

  return false; // Transaction is not flagged as fraudulent
}

function showAlert(message, color) {
  var alertElement = document.createElement('div');
  alertElement.textContent = message;
  alertElement.style.color = color;
  alertElement.style.marginTop = '10px';
  document.body.appendChild(alertElement);

  setTimeout(function() {
    alertElement.remove();
  }, 3000);
}

function addTransactionToHistory(transactionId, isFraudulent) {
  var transactionStatus = isFraudulent ? 'Unsuccessful' : 'Successful';

  var transactionItem = document.createElement('li');
  transactionItem.textContent = `Transaction ID: ${transactionId}, Status: ${transactionStatus}`;

  transactionHistory.appendChild(transactionItem);
}
