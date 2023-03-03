import logoImg from "../media/logo-todo.png";
import buttonGoogle1 from "../media/btn_google_signin_dark_normal_web.png";
import buttonGoogle2 from "../media/btn_google_signin_dark_pressed_web.png";
import { emailVerification, logIn, signInWithGoogle, sigUpWithEmail } from "../firebase/auth";
import { inputComplet, validateForm } from "../solo-functions.js/validate-inputs";

export const Welcome = (onNavigate) => {
    const sectionWelcome = document.createElement("section");
    const header = document.createElement("header");
    const logo = document.createElement("img");
    const title = document.createElement("h1");
    const subTitle = document.createElement("h3");
    const form = document.createElement("form");
    const inputEmail = document.createElement("input");
    const errorEmail = document.createElement("p");
    const inputPassword = document.createElement("input");
    const errorPassword = document.createElement("p");
    const sectionButtons = document.createElement("section");
    const buttonSignIn = document.createElement("button");
    const invalidSignIn = document.createElement("p");
    const buttonSignUp = document.createElement("button");
    const imgGoogle = document.createElement("img");
    const invalidForm = document.createElement("p");
    const validForm = document.createElement("p");
    const messageForm = document.createElement("p");

    sectionWelcome.className = "container welcome";
    header.className = "header"
    title.textContent = "Welcome to your to-do list!";
    subTitle.textContent = "To start, please sign in.";
    form.autocomplete = "off";
    logo.src = logoImg;
    logo.alt = "logo-todo";
    logo.className = "logoTodo";
    inputEmail.name = "email";
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.placeholder = "E-mail here";
    inputEmail.required = true;
    errorEmail.className = "hide";
    errorEmail.id = "error-email";
    errorEmail.textContent = "El e-mail debe tener formato válido."
    inputPassword.name = "password";
    inputPassword.type = "password";
    inputPassword.id = "password";
    inputPassword.placeholder = "Password here"
    inputPassword.required = true;
    errorPassword.className = "hide";
    errorPassword.id = "error-password";
    errorPassword.textContent = "La contraseña debe tener entre 8 y 16 carácteres. Al menos un número, al menos una mayúscula y al menos un símbolo. Sin espacios."
    buttonSignIn.type = "button";
    buttonSignIn.className = "smallButton";
    buttonSignIn.textContent = "SignIn";
    invalidSignIn.className = "hide";
    invalidSignIn.id = "error-login";
    invalidSignIn.textContent = "Verifica tu correo y luego inicia sesión";
    sectionButtons.className = "sectionButtons";
    buttonSignUp.type = "submit";
    buttonSignUp.className = "smallButton";
    buttonSignUp.textContent = "SignUp";
    imgGoogle.src = buttonGoogle1;
    imgGoogle.onmouseout = () => {
        imgGoogle.src = buttonGoogle1;
    }
    imgGoogle.onmouseover = () => {
        imgGoogle.src = buttonGoogle2;
    }
    imgGoogle.alt = "logo-google";
    imgGoogle.className = "googleButton";
    invalidForm.className = "hide";
    invalidForm.id = "error-form";
    invalidForm.textContent = "Verifica los campos.";
    validForm.className = "hide";
    validForm.id = "correct-form";
    validForm.textContent = "Formulario enviado correctamente, ahora verifica tu correo";
    messageForm.className = "hide";
    messageForm.id = "message-form";
    messageForm.textContent = "Verifica tu email.";

    // validando formularios (importando fx desde validate-inputs.js)
    inputEmail.addEventListener('keyup', validateForm);
    inputEmail.addEventListener('blur', validateForm);
    inputPassword.addEventListener('keyup', validateForm);
    inputPassword.addEventListener('blur', validateForm);

    // fx para crear una cuenta con correo y contraseña
    function signUp () {
        const email = inputEmail.value;
        const password = inputPassword.value;

        sigUpWithEmail(email, password)
            .then((result) => {
                const user = result.user;
                emailVerification();
            }).catch((error) => {
                console.log(error.code);
            })
    };

    // dandole funcionalidad a al foromnulario de crear cuenta
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inputComplet.email && inputComplet.password) {
            document.getElementById("correct-form").classList.replace("hide", "correct");
            signUp();
            setTimeout(() => {
                onNavigate("/");
            }, 5000)
        } else {
            document.getElementById("error-form").classList.replace("hide", "error  ");
        }
    });

    // fx para iniciar sesión con correo y contraseña
    function emailLogin () {
        const email = inputEmail.value;
        const password = inputPassword.value;

        logIn(email, password)
            .then((result) => {
                const user = result.user;
                if(user.emailVerified === false) {
                    document.getElementById("message-form").classList.replace("hide", "correct");
                    // alert("Verifica tu email.")
                } else {
                    onNavigate("/home");
                }
            }).catch((error) => {
                console.log(error);
            });
    };

    // dandole funcionalidad al botón de iniciar sesión
    buttonSignIn.addEventListener("click", () => {
        if (inputComplet.email && inputComplet.password) {
            emailLogin();
        } else {
            alert("Revisa tus datos.");
        }
    });

    // dandole funcionalidad al botón de google
    imgGoogle.addEventListener("click", () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                onNavigate("/home");
            }).catch((error) => {
                console.log(error);
            })
    });
    
    // Mostrando el contenido
    header.append(logo,title, subTitle);
    sectionButtons.append(buttonSignIn, buttonSignUp);
    form.append(
        inputEmail,
        errorEmail,
        inputPassword,
        errorPassword,
        sectionButtons,
        imgGoogle,
        validForm,
        invalidForm,
        invalidSignIn,
        messageForm
        );
    sectionWelcome.append(header, form)
    return sectionWelcome;
};
