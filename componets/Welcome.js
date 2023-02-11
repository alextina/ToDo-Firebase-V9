import logoImg from "../media/logo-todo.png";
import logoGoogle from "../media/google-logo.png";
import { emailVerification, logIn, signInWithGoogle, sigUpWithEmail } from "../firebase/auth";
import { inputComplet, validateForm } from "../solo-functions.js/validate-inputs";

export const Welcome = (onNavigate) => {
    const form = document.createElement("form");
    const logo = document.createElement("img");
    const labelEmail = document.createElement("label");
    const inputEmail = document.createElement("input");
    const errorEmail = document.createElement("p");
    const labelPassword = document.createElement("label");
    const inputPassword = document.createElement("input");
    const errorPassword = document.createElement("p");
    const divButtons = document.createElement("div");
    const buttonLogin = document.createElement("button");
    const invalidLogin = document.createElement("p");
    const buttonSignup = document.createElement("button");
    const buttonGoogle = document.createElement("div");
    const imgGoogle = document.createElement("img");
    const txtGoogle = document.createElement("span");
    const invalidForm = document.createElement("p");
    const validForm = document.createElement("p");

    form.className ="container";
    form.autocomplete = "off";
    logo.src = logoImg;
    logo.alt = "logo-todo";
    logo.className = "logoTodo";
    labelEmail.htmlFor = "email";
    labelEmail.textContent = "E-mail";
    inputEmail.name = "email";
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.required = true;
    errorEmail.className = "hide";
    errorEmail.id = "error-email";
    errorEmail.textContent = "El e-mail debe tener formato válido."
    labelPassword.htmlFor = "password";
    labelPassword.textContent = "Password";
    inputPassword.name = "password";
    inputPassword.type = "password";
    inputPassword.id = "password";
    inputPassword.required = true;
    errorPassword.className = "hide";
    errorPassword.id = "error-password";
    errorPassword.textContent = "La contraseña debe tener entre 8 y 16 carácteres. Al menos un número, al menos una mayúscula y al menos un símbolo. Sin espacios."
    buttonLogin.type = "button";
    buttonLogin.className = "smallButton";
    buttonLogin.textContent = "LogIn";
    invalidLogin.className = "hide";
    invalidLogin.id = "error-login";
    invalidLogin.textContent = "Verifica tu correo y luego inicia sesión";
    buttonSignup.type = "submit";
    buttonSignup.className = "smallButton";
    buttonSignup.textContent = "Sign Up";
    buttonGoogle.type = "button";
    buttonGoogle.className = "googleButton";
    imgGoogle.src = logoGoogle;
    imgGoogle.alt = "logo-google";
    txtGoogle.textContent = "Continuar con Google";
    invalidForm.className = "hide";
    invalidForm.id = "error-form";
    invalidForm.textContent = "Verifica los campos.";
    validForm.className = "hide";
    validForm.id = "correct-form";
    validForm.textContent = "Formulario enviado correctamente";

    // validando formularios (importando fx desde validate-inputs.js)
    inputEmail.addEventListener('keyup', validateForm);
    inputEmail.addEventListener('blur', validateForm);
    inputPassword.addEventListener('keyup', validateForm);
    inputPassword.addEventListener('blur', validateForm);

    // Crear cuenta con correo y contraseña 
    function signUp () {
        const email = inputEmail.value;
        const password = inputPassword.value;

        sigUpWithEmail(email, password)
            .then((result) => {
                const user = result.user;
                alert("Verifica tu correo y luego inicia sesión.");
                emailVerification();
            }).catch((error) => {
                alert(error.code);
            })
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inputComplet.email && inputComplet.password) {
            document.getElementById("correct-form").classList.replace("hide", "correct");
            signUp();
            setTimeout(() => {
                onNavigate("/");
            }, 3000)
        } else {
            document.getElementById("error-form").classList.replace("hide", "error  ");
        }
    });

    // Ingreso de sesión con correo y contraseña
    buttonLogin.addEventListener("click", () => {
        const email = inputEmail.value;
        const password = inputPassword.value;

        logIn(email, password)
            .then((result) => {
                const user = result.user;
                if(user.emailVerified === false) {
                    document.getElementById("error-login").classList.replace("hide", "error");
                } else {
                    onNavigate("/home");
                }
            }).catch((error) => {
                alert(error)
            })
    });

    // Ingreso de sesión con google
    buttonGoogle.addEventListener("click", () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                onNavigate("/home");
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })
    });


    
    // Mostrando el contenido
    buttonGoogle.append(imgGoogle, txtGoogle);
    divButtons.append(buttonLogin, buttonSignup);
    form.append(logo, labelEmail, inputEmail, errorEmail, labelPassword, inputPassword, errorPassword, divButtons, buttonGoogle, validForm, invalidForm, invalidLogin);
    return form;
};
