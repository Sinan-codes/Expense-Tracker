const usernameField = document.getElementById('usernameField');
const feedbackArea = document.querySelector('.invalid-feedback p');


usernameField.addEventListener('keyup', () => {
    console.log('Key up event detected on username field');
    const usernameValue = usernameField.value;

    usernameField.classList.remove("is-invalid");
    feedbackArea.parentElement.style.display = "none";

    if (usernameValue.length > 0) {
        fetch("/authentication/validate-username", {
          body: JSON.stringify({ username: usernameValue }),
          method: "POST",
        }).then(res => res.json()).then(data => {
          console.log(data);
           if (data.username_error) {
            usernameField.classList.add('is-invalid');
            feedbackArea.parentElement.style.display = 'block';
            feedbackArea.innerHTML = data.username_error;
           }
        });    
    }
    
})