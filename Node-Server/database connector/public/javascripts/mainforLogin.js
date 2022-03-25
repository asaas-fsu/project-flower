function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
             //If no longer focusing on the username field and the paramaters are not met (greater than 0 but less than 2) display the error.
            if (e.target.id == "signupUsername" && e.target.value.length > 0 && e.target.value.length < 2) {
                setInputError(inputElement, "Username must be at least 2 characters in length");
            }
            //If the password field has text in it and it's shorter than 7 characters display the error.
            else if (e.target.id == "signupPassword" && e.target.value.length > 0 && e.target.value.length < 7) {
                setInputError(inputElement, "Password must be longer than 6 characters!");
            }
            // If the confirm password field has text in it and it doesn't match the password field display the error
            else if (e.target.id == "signupPassword" && document.getElementById("signupConfirmPassword").value.length > 0 && e.target.value != document.getElementById("signupConfirmPassword").value) {
                setInputError(inputElement, "Passwords must match!");
            }
            // If the confirm password field does not match the password field diplay the error. 
            else if (e.target.id == "signupConfirmPassword" && e.target.value != document.getElementById("signupPassword").value) {
                setInputError(inputElement, "Passwords must match!");
            }
        
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});