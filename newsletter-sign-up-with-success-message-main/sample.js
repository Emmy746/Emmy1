// ===== STEP 1: GET THE HTML ELEMENTS WE NEED =====
// WHY: We need to tell JavaScript which HTML elements to work with
// Think of it like getting references (addresses) to the buttons and input field

const emailInput = document.getElementById('emailInput');
// This finds the input field where users type their email
// getElementById is like saying "find the element with id='emailInput'"

const submitBtn = document.getElementById('submitBtn');
// This finds the submit button that users click

const errorMessage = document.getElementById('errorMessage');
// This is where we'll show error messages if validation fails

const successMessage = document.getElementById('successMessage');
// This is the success message section that will show after submission

const emailDisplay = document.getElementById('emailDisplay');
// This is where we'll display the email in the success message

const dismissBtn = document.getElementById('dismissBtn');
// This is the button to close the success message


// ===== STEP 2: CREATE A FUNCTION TO VALIDATE EMAIL =====
// WHY: We need to check if the email is in the correct format
// A function is like a recipe - we define it once and use it many times

function isValidEmail(email) {
  // This is called "regex" (regular expression) - it's a pattern for checking text
  // WHY regex? It checks if the email follows the correct format
  // Pattern explanation:
  // ^ = start of the email
  // [^ ]+ = one or more characters that aren't spaces
  // @ = the @ symbol (all emails must have this)
  // [^ ]+ = one or more characters that aren't spaces (the domain)
  // \. = a dot/period (escaped with \ because . has special meaning)
  // [a-z]{2,} = at least 2 letters at the end (like .com, .org)
  // $ = end of the email
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  // The 'i' at the end means "ignore case" - treats ABC and abc the same
  
  return emailRegex.test(email);
  // .test() returns true if the pattern matches, false if it doesn't
}


// ===== STEP 3: CREATE A FUNCTION TO SHOW ERROR MESSAGES =====
// WHY: When validation fails, we need to tell the user what went wrong

function showError(message) {
  // We're passing in a message as a parameter (the thing in parentheses)
  
  errorMessage.textContent = message;
  // .textContent changes the text that displays on the page
  
  errorMessage.style.display = 'block';
  // .style.display = 'block' makes it visible
  // WHY? We'll hide it by default in CSS, and show it only when needed
  
  emailInput.style.borderColor = '#FF6155';
  // Changes the input border to red to highlight the error
  // WHY red? It's a universal signal for errors
  
  emailInput.style.backgroundColor = '#FFE8E6';
  // Light red background helps users see the problem clearly
}


// ===== STEP 4: CREATE A FUNCTION TO CLEAR ERROR MESSAGES =====
// WHY: When the user starts typing again, we want to hide the error

function clearError() {
  errorMessage.textContent = '';
  // Empty the error message
  
  errorMessage.style.display = 'none';
  // Hide it completely
  
  emailInput.style.borderColor = 'hsl(0, 0%, 58%)';
  // Return the border to original color (grey)
  
  emailInput.style.backgroundColor = 'transparent';
  // Return the background to normal
}


// ===== STEP 5: CLEAR ERROR WHEN USER TYPES =====
// WHY: As soon as the user starts typing, the error should go away
// This improves user experience - they see the error, start fixing it, and it disappears

emailInput.addEventListener('input', function() {
  // 'input' event fires every time the user types a character
  // WHY 'input' instead of other events? It's the best for real-time feedback
  
  clearError();
  // Call our clearError function to hide the error message
});


// ===== STEP 6: VALIDATE AND SUBMIT THE FORM =====
// WHY: When the user clicks submit, we check the email and handle what happens next

submitBtn.addEventListener('click', function(event) {
  // 'click' event fires when the user clicks the button
  
  event.preventDefault();
  // WHY preventDefault? By default, form buttons reload the page
  // We DON'T want that - we want to control what happens
  
  const email = emailInput.value;
  // .value gets whatever the user typed in the input field
  
  // ===== CHECK 1: IS THE FIELD EMPTY? =====
  if (email === '') {
    // === means "exactly equals" (we're checking for empty string)
    showError('Email is required');
    return;
    // 'return' stops the function here - doesn't continue to next checks
  }
  
  // ===== CHECK 2: IS THE EMAIL FORMAT CORRECT? =====
  if (!isValidEmail(email)) {
    // ! means "not" - so this reads "if email is NOT valid"
    showError('Please enter a valid email address');
    return;
    // Stop here if email format is wrong
  }
  
  // ===== IF WE GET HERE, THE EMAIL IS VALID! =====
  // WHY? All checks passed, so we can show the success message
  
  showSuccessMessage(email);
  // Call our success function and pass the email address to it
});


// ===== STEP 7: SHOW THE SUCCESS MESSAGE =====
// WHY: We create a separate function for the success state for clarity

function showSuccessMessage(email) {
  // Hide the form
  document.getElementById('main-area').style.display = 'none';
  // .display = 'none' completely hides an element
  
  // Hide the header image
  document.querySelector('section .header-img').style.display = 'none';
  // .querySelector lets us find elements by CSS selectors (like .class or #id)
  
  // Show the success message
  successMessage.classList.remove('hidden');
  // .classList.remove removes a CSS class
  // WHY? We can control visibility with CSS classes instead of inline styles
  // (It's cleaner!)
  
  // Display the email in the success message
  emailDisplay.textContent = email;
  // Show the email address the user submitted
  
  // Clear the input field for next time
  emailInput.value = '';
}


// ===== STEP 8: DISMISS THE SUCCESS MESSAGE =====
// WHY: User needs a way to close the success message and start over

dismissBtn.addEventListener('click', function() {
  // When user clicks "Dismiss message"
  
  successMessage.classList.add('hidden');
  // Add the 'hidden' class back to hide the success message
  
  document.getElementById('main-area').style.display = 'block';
  // Show the form again so user can sign up again if they want
  
  document.querySelector('section .header-img').style.display = 'block';
  // Show the header image again
  
  clearError();
  // Make sure any old error messages are cleared
});


// ===== STEP 9: ALLOW SUBMITTING BY PRESSING ENTER =====
// WHY: Users expect to be able to press Enter instead of clicking the button
// This is a common web convention

emailInput.addEventListener('keypress', function(event) {
  // 'keypress' event fires when user presses a key
  
  if (event.key === 'Enter') {
    // event.key tells us which key was pressed
    // === 'Enter' checks if they pressed the Enter key
    
    submitBtn.click();
    // Trigger the submit button click programmatically
    // WHY? Reuse the same validation code instead of writing it twice
  }
});
