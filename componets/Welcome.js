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
    const buttonSignup = document.createElement("button");
    const buttonGoogle = document.createElement("button");

    labelEmail.textContent = "E-mail";
    errorEmail.textContent = "El e-mail debe tener formato válido."
    labelPassword.textContent = "Password";
    errorPassword.textContent = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos."
    buttonLogin.textContent = "Log In";
    buttonSignup.textContent = "Sign Up";
    buttonGoogle.textContent = "Continue with Google";

    form.setAttribute("class","container");
    form.setAttribute("autocomplete", "off")
    logo.setAttribute("src", "media/logo-todo.png");
    logo.setAttribute("alt", "logo");
    labelEmail.setAttribute("for","email");
    inputEmail.setAttribute("name","email");
    inputEmail.setAttribute("type","email");
    inputEmail.setAttribute("required","required");
    errorEmail.setAttribute("class","error");
    labelPassword.setAttribute("for","password");
    inputPassword.setAttribute("name","password");
    inputPassword.setAttribute("type","password");
    inputPassword.setAttribute("required","required");
    errorPassword.setAttribute("class","error");
    buttonLogin.setAttribute("type","submit");
    buttonLogin.setAttribute("class","smallButton");
    buttonSignup.setAttribute("type","submit");
    buttonSignup.setAttribute("class","smallButton");
    buttonGoogle.setAttribute("type","button")
    buttonGoogle.setAttribute("class","googleButton")

    // Validando inputs del formulario
    const expresions = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
    };

    const inputComplet = {
        email: false,
        password: false,
    }
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
            console.log(`${name} es correcto.`);
        } else {
            console.log(`${name} es incorrecto.`);
        }
    };

    inputEmail.addEventListener('keyup', validateForm);
    inputEmail.addEventListener('blur', validateForm);
    inputPassword.addEventListener('keyup', validateForm);
    inputPassword.addEventListener('blur', validateForm);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // Crear cuenta con correo y contraseña 
    buttonSignup.addEventListener("click", () => {
        const email = inputEmail.value;
        const password = inputPassword.value;

        sigUpWithEmail(email, password)
            .then(() => {
                alert("Verifica tu correo y luego inicia sesión.");
                emailVerification();
            }).catch((error) => {
                alert(error.code);
            })
    });

        // Ingreso de sesión con correo y contraseña
        buttonLogin.addEventListener("click", () => {
            const email = inputEmail.value;
            const password = inputPassword.value;
    
            logIn(email, password)
                .then((result) => {
                    const user = result.user;
                    if(user.emailVerified === false) {
                        alert("Verifica tu email, revisa tu bandeja de entrada.")
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
    form.append(logo, labelEmail, inputEmail, errorEmail, labelPassword, inputPassword, errorPassword, divButtons, buttonGoogle);
    return form;
};
