const usernameField = document.getElementById('usernameField');
const feedbackArea = document.querySelector('.invalid-feedback p');

const emailField = document.getElementById('emailField');
const emailFeedbackArea = document.querySelector('.email-invalid-feedback p');

const passwordField = document.getElementById("passwordField");


const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');

const showPasswordToggle = document.querySelector('.showPasswordToggle');

const handleToggleInput = (e) => {
  if (showPasswordToggle.textContent === "SHOW") {
    showPasswordToggle.textContent = "HIDE";
    passwordField.setAttribute("type", "text");
  } else {
    showPasswordToggle.textContent = "SHOW";
    passwordField.setAttribute("type", "password");
  }
}



usernameField.addEventListener('keyup', () => {
    const usernameValue = usernameField.value;
    usernameSuccessOutput.style.display = "block";

    usernameSuccessOutput.textContent = `Checking ${usernameValue}`;

    usernameField.classList.remove("is-invalid");
    feedbackArea.parentElement.style.display = "none";

    if (usernameValue.length > 0) {
        fetch("/authentication/validate-username", {
          body: JSON.stringify({ username: usernameValue }),
          method: "POST",
        }).then(res => res.json()).then(data => {
          console.log(data);
          usernameSuccessOutput.style.display = 'none';
           if (data.username_error) {
            usernameField.classList.add('is-invalid');
            feedbackArea.parentElement.style.display = 'block';
            feedbackArea.innerHTML = data.username_error;
           }
        });    
    }
    
})


emailField.addEventListener('keyup', () => {
    const emailValue = emailField.value;

    emailField.classList.remove("is-invalid");
    emailFeedbackArea.parentElement.style.display = "none";

    if (emailValue.length > 0) {
      fetch("/authentication/validate-email", {
        body: JSON.stringify({ email: emailValue }),
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.email_error) {
            emailField.classList.add("is-invalid");
            emailFeedbackArea.parentElement.style.display = "block";
            emailFeedbackArea.innerHTML = data.email_error;
          }
        });
    }
})


showPasswordToggle.addEventListener('click', handleToggleInput)