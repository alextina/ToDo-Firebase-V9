import logoImg from "../media/logo-todo.png";
import logoGoogle from "../media/google-logo.png";
import { emailVerification, logIn, signInWithGoogle, sigUpWithEmail } from "../firebase/firestore-auth";

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

    labelEmail.textContent = "E-mail";
    errorEmail.textContent = "El e-mail debe tener formato válido."
    labelPassword.textContent = "Password";
    errorPassword.textContent = "La contraseña debe tener entre 8 y 16 carácteres. Al menos un número, al menos una mayúscula y al menos un símbolo. Sin espacios."
    buttonLogin.textContent = "Log In";
    invalidLogin.textContent = "Verifica tu correo y luego inicia sesión";
    buttonSignup.textContent = "Sign Up";
    txtGoogle.textContent = "Continue with Google";
    invalidForm.textContent = "Verifica los campos.";
    validForm.textContent = "Formulario enviado correctamente";

    form.setAttribute("class","container");
    form.setAttribute("autocomplete", "off")
    logo.setAttribute("src", logoImg);
    logo.setAttribute("alt", "logo-todo");
    logo.setAttribute("class", "logoTodo")
    labelEmail.setAttribute("for","email");
    inputEmail.setAttribute("name","email");
    inputEmail.setAttribute("type","email");
    inputEmail.setAttribute("id","email");
    inputEmail.setAttribute("required","required");
    errorEmail.setAttribute("class","hide");
    errorEmail.setAttribute("id","error-email");
    labelPassword.setAttribute("for","password");
    inputPassword.setAttribute("name","password");
    inputPassword.setAttribute("type","password");
    inputPassword.setAttribute("id","password");
    inputPassword.setAttribute("required","required");
    errorPassword.setAttribute("class","hide");
    errorPassword.setAttribute("id","error-password");
    buttonLogin.setAttribute("type","button");
    buttonLogin.setAttribute("class","smallButton");
    invalidLogin.setAttribute("class", "hide");
    invalidLogin.setAttribute("id", "error-login");
    buttonSignup.setAttribute("type","submit");
    buttonSignup.setAttribute("class","smallButton");
    buttonGoogle.setAttribute("type","button")
    buttonGoogle.setAttribute("class","googleButton")
    imgGoogle.setAttribute("src", logoGoogle);
    imgGoogle.setAttribute("alt", "logo-google");
    invalidForm.setAttribute("class","hide");
    invalidForm.setAttribute("id","error-form");
    validForm.setAttribute("class","hide");
    validForm.setAttribute("id","correct-form");

    buttonGoogle.append(imgGoogle, txtGoogle);

    // Validando inputs del formulario
    const expresions = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,16}$/,
    };

    const inputComplet = {
        email: false,
        password: false,
    };

    const validateForm = (e) => {
        // usando el atributo "name"
        // console.log(e.target.name)
        switch (e.target.name) {
            case "email":
                validateInput(expresions.email, e.target, 'email')
                break;
            case "password":
                validateInput(expresions.password, e.target, 'password')
                break;
            default:
                break;
        }
    };

    const validateInput = (expresion, input, name) => {
        if (expresion.test(input.value)) {
            document.getElementById(`error-${name}`).classList.replace("error", "hide");
            inputComplet[name] = true;
        } else {
            document.getElementById(`error-${name}`).classList.replace("hide", "error");
            inputComplet[name] = true;
        }
    };

    inputEmail.addEventListener('keyup', validateForm);
    inputEmail.addEventListener('blur', validateForm);
    inputPassword.addEventListener('keyup', validateForm);
    inputPassword.addEventListener('blur', validateForm);

    // Crear cuenta con correo y contraseña 
    function signUp () {
        const email = inputEmail.value;
        const password = inputPassword.value;

        sigUpWithEmail(email, password)
            .then(() => {
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
                    console.log("Email verificado");
                    onNavigate("/home");
                }
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
                alert(error.message);
            })
    });

    // Ingreso de sesión con google
    buttonGoogle.addEventListener("click", () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(`El usuario logueado es ${user.displayName}.`);
                onNavigate("/home");
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })
    });

    // Mostrando el contenido
    divButtons.append(buttonLogin, buttonSignup);
    form.append(logo, labelEmail, inputEmail, errorEmail, labelPassword, inputPassword, errorPassword, divButtons, buttonGoogle, validForm, invalidForm, invalidLogin);
    return form;
};
